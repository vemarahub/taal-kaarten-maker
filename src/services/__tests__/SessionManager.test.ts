import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { SessionManager } from '../SessionManager';
import { StoredSession } from '../../types/auth';

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};

// Mock crypto.subtle
const mockCrypto = {
  subtle: {
    generateKey: vi.fn(),
    exportKey: vi.fn(),
    importKey: vi.fn(),
    encrypt: vi.fn(),
    decrypt: vi.fn(),
  },
  getRandomValues: vi.fn(),
};

// Setup global mocks
Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

Object.defineProperty(global, 'crypto', {
  value: mockCrypto,
});

// Mock btoa and atob
global.btoa = vi.fn((str: string) => Buffer.from(str, 'binary').toString('base64'));
global.atob = vi.fn((str: string) => Buffer.from(str, 'base64').toString('binary'));

describe('SessionManager', () => {
  let sessionManager: SessionManager;
  let mockSession: StoredSession;

  beforeEach(() => {
    sessionManager = new SessionManager();
    mockSession = {
      username: 'testuser',
      hashedCredentials: 'hashedcreds123',
      loginTime: '2024-01-01T10:00:00.000Z',
      expiryTime: '2024-01-02T10:00:00.000Z',
      rememberMe: true,
    };

    // Reset all mocks
    vi.clearAllMocks();

    // Setup default crypto mocks
    const mockKey = { type: 'secret' } as CryptoKey;
    const mockEncryptedData = new ArrayBuffer(32);
    const mockKeyData = new ArrayBuffer(32);

    mockCrypto.subtle.generateKey.mockResolvedValue(mockKey);
    mockCrypto.subtle.exportKey.mockResolvedValue(mockKeyData);
    mockCrypto.subtle.importKey.mockResolvedValue(mockKey);
    mockCrypto.subtle.encrypt.mockResolvedValue(mockEncryptedData);
    mockCrypto.subtle.decrypt.mockResolvedValue(
      new TextEncoder().encode(JSON.stringify(mockSession))
    );
    mockCrypto.getRandomValues.mockReturnValue(new Uint8Array(12));

    // Setup btoa/atob mocks
    (global.btoa as any).mockImplementation((str: string) => 
      Buffer.from(str, 'binary').toString('base64')
    );
    (global.atob as any).mockImplementation((str: string) => 
      Buffer.from(str, 'base64').toString('binary')
    );
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('storeSession', () => {
    it('should store encrypted session data in localStorage', async () => {
      await sessionManager.storeSession(mockSession);

      expect(mockCrypto.subtle.encrypt).toHaveBeenCalled();
      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        'dutch_app_session',
        expect.any(String)
      );
    });

    it('should handle encryption errors gracefully', async () => {
      mockCrypto.subtle.encrypt.mockRejectedValue(new Error('Encryption failed'));

      await expect(sessionManager.storeSession(mockSession)).rejects.toThrow(
        'Failed to store session data'
      );
    });

    it('should generate encryption key if none exists', async () => {
      localStorageMock.getItem.mockReturnValue(null);

      await sessionManager.storeSession(mockSession);

      expect(mockCrypto.subtle.generateKey).toHaveBeenCalledWith(
        { name: 'AES-GCM', length: 256 },
        true,
        ['encrypt', 'decrypt']
      );
      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        'dutch_app_encryption_key',
        expect.any(String)
      );
    });
  });

  describe('getSession', () => {
    it('should return null when no session exists', async () => {
      localStorageMock.getItem.mockReturnValue(null);

      const result = await sessionManager.getSession();

      expect(result).toBeNull();
    });

    it('should decrypt and return stored session data', async () => {
      localStorageMock.getItem.mockReturnValue('encrypted_session_data');

      const result = await sessionManager.getSession();

      expect(mockCrypto.subtle.decrypt).toHaveBeenCalled();
      expect(result).toEqual(mockSession);
    });

    it('should clear corrupted session data and return null', async () => {
      localStorageMock.getItem.mockReturnValue('corrupted_data');
      mockCrypto.subtle.decrypt.mockRejectedValue(new Error('Decryption failed'));

      const result = await sessionManager.getSession();

      expect(result).toBeNull();
      expect(localStorageMock.removeItem).toHaveBeenCalledWith('dutch_app_session');
    });

    it('should use existing encryption key when available', async () => {
      const mockKeyString = 'existing_key_data';
      localStorageMock.getItem
        .mockReturnValueOnce('encrypted_session_data') // First call for session data
        .mockReturnValueOnce(mockKeyString); // Second call for encryption key

      await sessionManager.getSession();

      expect(mockCrypto.subtle.importKey).toHaveBeenCalledWith(
        'raw',
        expect.any(Uint8Array),
        { name: 'AES-GCM' },
        false,
        ['encrypt', 'decrypt']
      );
    });
  });

  describe('isSessionValid', () => {
    it('should return false when no session exists', async () => {
      localStorageMock.getItem.mockReturnValue(null);

      const result = await sessionManager.isSessionValid();

      expect(result).toBe(false);
    });

    it('should return true for valid session', async () => {
      const futureExpiry = new Date(Date.now() + 3600000).toISOString(); // 1 hour from now
      const validSession = { ...mockSession, expiryTime: futureExpiry };
      
      localStorageMock.getItem.mockReturnValue('encrypted_session_data');
      mockCrypto.subtle.decrypt.mockResolvedValue(
        new TextEncoder().encode(JSON.stringify(validSession))
      );

      const result = await sessionManager.isSessionValid();

      expect(result).toBe(true);
    });

    it('should return false for expired session', async () => {
      const pastExpiry = new Date(Date.now() - 3600000).toISOString(); // 1 hour ago
      const expiredSession = { ...mockSession, expiryTime: pastExpiry };
      
      localStorageMock.getItem.mockReturnValue('encrypted_session_data');
      mockCrypto.subtle.decrypt.mockResolvedValue(
        new TextEncoder().encode(JSON.stringify(expiredSession))
      );

      const result = await sessionManager.isSessionValid();

      expect(result).toBe(false);
    });

    it('should return false on validation error', async () => {
      localStorageMock.getItem.mockReturnValue('encrypted_session_data');
      mockCrypto.subtle.decrypt.mockRejectedValue(new Error('Decryption failed'));

      const result = await sessionManager.isSessionValid();

      expect(result).toBe(false);
    });
  });

  describe('clearSession', () => {
    it('should remove session and encryption key from localStorage', () => {
      sessionManager.clearSession();

      expect(localStorageMock.removeItem).toHaveBeenCalledWith('dutch_app_session');
      expect(localStorageMock.removeItem).toHaveBeenCalledWith('dutch_app_encryption_key');
    });

    it('should handle localStorage errors gracefully', () => {
      localStorageMock.removeItem.mockImplementation(() => {
        throw new Error('localStorage error');
      });

      expect(() => sessionManager.clearSession()).not.toThrow();
    });
  });

  describe('extendSession', () => {
    it('should update session expiry time', async () => {
      const newExpiry = new Date('2024-01-03T10:00:00.000Z');
      localStorageMock.getItem.mockReturnValue('encrypted_session_data');

      await sessionManager.extendSession(newExpiry);

      expect(mockCrypto.subtle.encrypt).toHaveBeenCalled();
      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        'dutch_app_session',
        expect.any(String)
      );
    });

    it('should throw error when no active session exists', async () => {
      localStorageMock.getItem.mockReturnValue(null);
      const newExpiry = new Date('2024-01-03T10:00:00.000Z');

      await expect(sessionManager.extendSession(newExpiry)).rejects.toThrow(
        'Failed to extend session'
      );
    });
  });

  describe('getSessionExpiry', () => {
    it('should return session expiry date', async () => {
      localStorageMock.getItem.mockReturnValue('encrypted_session_data');

      const result = await sessionManager.getSessionExpiry();

      expect(result).toEqual(new Date(mockSession.expiryTime));
    });

    it('should return null when no session exists', async () => {
      localStorageMock.getItem.mockReturnValue(null);

      const result = await sessionManager.getSessionExpiry();

      expect(result).toBeNull();
    });

    it('should return null on error', async () => {
      localStorageMock.getItem.mockReturnValue('encrypted_session_data');
      mockCrypto.subtle.decrypt.mockRejectedValue(new Error('Decryption failed'));

      const result = await sessionManager.getSessionExpiry();

      expect(result).toBeNull();
    });
  });

  describe('isStorageAvailable', () => {
    it('should return true when localStorage is available', () => {
      // Reset mocks to ensure clean state
      vi.clearAllMocks();
      localStorageMock.setItem.mockImplementation(() => {});
      localStorageMock.removeItem.mockImplementation(() => {});

      const result = sessionManager.isStorageAvailable();

      expect(result).toBe(true);
      expect(localStorageMock.setItem).toHaveBeenCalledWith('__storage_test__', 'test');
      expect(localStorageMock.removeItem).toHaveBeenCalledWith('__storage_test__');
    });

    it('should return false when localStorage throws error', () => {
      localStorageMock.setItem.mockImplementation(() => {
        throw new Error('localStorage not available');
      });

      const result = sessionManager.isStorageAvailable();

      expect(result).toBe(false);
    });
  });

  describe('cleanupExpiredSessions', () => {
    it('should clear session when expired', async () => {
      const pastExpiry = new Date(Date.now() - 3600000).toISOString();
      const expiredSession = { ...mockSession, expiryTime: pastExpiry };
      
      localStorageMock.getItem.mockReturnValue('encrypted_session_data');
      mockCrypto.subtle.decrypt.mockResolvedValue(
        new TextEncoder().encode(JSON.stringify(expiredSession))
      );

      await sessionManager.cleanupExpiredSessions();

      expect(localStorageMock.removeItem).toHaveBeenCalledWith('dutch_app_session');
      expect(localStorageMock.removeItem).toHaveBeenCalledWith('dutch_app_encryption_key');
    });

    it('should not clear valid session', async () => {
      const futureExpiry = new Date(Date.now() + 3600000).toISOString();
      const validSession = { ...mockSession, expiryTime: futureExpiry };
      
      localStorageMock.getItem.mockReturnValue('encrypted_session_data');
      mockCrypto.subtle.decrypt.mockResolvedValue(
        new TextEncoder().encode(JSON.stringify(validSession))
      );

      await sessionManager.cleanupExpiredSessions();

      expect(localStorageMock.removeItem).not.toHaveBeenCalled();
    });

    it('should clear session on validation error', async () => {
      localStorageMock.getItem.mockReturnValue('encrypted_session_data');
      mockCrypto.subtle.decrypt.mockRejectedValue(new Error('Validation failed'));

      await sessionManager.cleanupExpiredSessions();

      // Should be called at least once for session, and once for encryption key
      expect(localStorageMock.removeItem).toHaveBeenCalledWith('dutch_app_session');
      expect(localStorageMock.removeItem).toHaveBeenCalledWith('dutch_app_encryption_key');
    });
  });

  describe('encryption/decryption', () => {
    it('should handle encryption key generation', async () => {
      // Reset localStorage mock to not throw errors
      localStorageMock.setItem.mockImplementation(() => {});
      localStorageMock.getItem.mockReturnValue(null); // No existing key

      await sessionManager.storeSession(mockSession);

      expect(mockCrypto.subtle.generateKey).toHaveBeenCalledWith(
        { name: 'AES-GCM', length: 256 },
        true,
        ['encrypt', 'decrypt']
      );
      expect(mockCrypto.subtle.exportKey).toHaveBeenCalledWith('raw', expect.any(Object));
    });

    it('should use random IV for each encryption', async () => {
      // Reset localStorage mock to not throw errors
      localStorageMock.setItem.mockImplementation(() => {});
      localStorageMock.getItem.mockReturnValue(null);
      
      const mockIV = new Uint8Array([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
      mockCrypto.getRandomValues.mockReturnValue(mockIV);

      await sessionManager.storeSession(mockSession);

      expect(mockCrypto.getRandomValues).toHaveBeenCalledWith(expect.any(Uint8Array));
      expect(mockCrypto.subtle.encrypt).toHaveBeenCalled();
      
      // Verify the encrypt call used the correct IV
      const encryptCall = mockCrypto.subtle.encrypt.mock.calls[0];
      expect(encryptCall[0]).toEqual({ name: 'AES-GCM', iv: mockIV });
    });
  });
});