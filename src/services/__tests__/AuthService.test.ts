import { describe, it, expect, beforeEach, vi } from 'vitest';
import { AuthService } from '../AuthService';
import { AuthErrorType } from '../../types/auth';

// Mock crypto.subtle for testing
const mockCrypto = {
  subtle: {
    digest: vi.fn()
  }
};

Object.defineProperty(global, 'crypto', {
  value: mockCrypto,
  writable: true
});

describe('AuthService', () => {
  let authService: AuthService;

  beforeEach(() => {
    // Reset mocks
    vi.clearAllMocks();
    
    // Mock successful hash generation - create the expected hash for 'testpass'
    const expectedHashArray = new Uint8Array([
      239, 146, 183, 120, 186, 254, 119, 30, 137, 36, 91, 137, 236, 188, 8, 164, 
      68, 164, 225, 102, 192, 102, 89, 145, 136, 31, 56, 61, 68, 115, 233, 79
    ]);
    
    mockCrypto.subtle.digest.mockResolvedValue(expectedHashArray.buffer);
    
    authService = new AuthService();
  });

  describe('constructor', () => {
    it('should initialize with environment configuration', () => {
      expect(authService).toBeInstanceOf(AuthService);
      expect(authService.validateConfig()).toBe(true);
    });
  });

  describe('validateCredentials', () => {
    it('should return true for valid credentials', async () => {
      // Mock the hash to match expected value exactly - convert hex to bytes
      const expectedHash = '13d249f2cb4127b40cfa757866850278793f814ded3c587fe5889e889a7a9f6c';
      const expectedHashArray = new Uint8Array(expectedHash.match(/.{2}/g).map(byte => parseInt(byte, 16)));
      mockCrypto.subtle.digest.mockResolvedValue(expectedHashArray.buffer);

      const result = await authService.validateCredentials('testuser', 'testpass');
      expect(result).toBe(true);
    });

    it('should return false for invalid username', async () => {
      const result = await authService.validateCredentials('wronguser', 'testpass');
      expect(result).toBe(false);
    });

    it('should return false for invalid password', async () => {
      // Mock different hash for wrong password
      mockCrypto.subtle.digest.mockResolvedValue(
        new Uint8Array(32).fill(0).buffer
      );

      const result = await authService.validateCredentials('testuser', 'wrongpass');
      expect(result).toBe(false);
    });

    it('should handle errors gracefully', async () => {
      mockCrypto.subtle.digest.mockRejectedValue(new Error('Crypto error'));

      const result = await authService.validateCredentials('testuser', 'testpass');
      expect(result).toBe(false);
    });
  });

  describe('hashPassword', () => {
    it('should hash password correctly', async () => {
      const mockHashBuffer = new Uint8Array([239, 146, 183, 120]).buffer;
      mockCrypto.subtle.digest.mockResolvedValue(mockHashBuffer);

      const result = await authService.hashPassword('testpass');
      expect(result).toBe('ef92b778');
      expect(mockCrypto.subtle.digest).toHaveBeenCalledWith('SHA-256', expect.any(Object));
    });

    it('should throw Error when hashing fails', async () => {
      mockCrypto.subtle.digest.mockRejectedValue(new Error('Crypto error'));

      await expect(authService.hashPassword('testpass')).rejects.toThrow('Failed to hash password');
    });
  });

  describe('generateSessionHash', () => {
    it('should generate unique session hash', async () => {
      const mockHashBuffer = new Uint8Array([1, 2, 3, 4]).buffer;
      mockCrypto.subtle.digest.mockResolvedValue(mockHashBuffer);

      const result = await authService.generateSessionHash('testuser', 'testpass');
      expect(result).toBe('01020304');
      expect(mockCrypto.subtle.digest).toHaveBeenCalled();
    });

    it('should throw Error when session hash generation fails', async () => {
      mockCrypto.subtle.digest.mockRejectedValue(new Error('Crypto error'));

      await expect(authService.generateSessionHash('testuser', 'testpass')).rejects.toThrow('Failed to generate session hash');
    });
  });

  describe('getSessionDuration', () => {
    it('should return session duration in milliseconds', () => {
      const duration = authService.getSessionDuration();
      expect(duration).toBe(24 * 60 * 60 * 1000); // 24 hours in ms
    });
  });

  describe('calculateSessionExpiry', () => {
    it('should calculate correct expiry time', () => {
      const now = new Date();
      const expiry = authService.calculateSessionExpiry();
      const expectedExpiry = new Date(now.getTime() + 24 * 60 * 60 * 1000);
      
      // Allow for small time difference due to execution time
      expect(Math.abs(expiry.getTime() - expectedExpiry.getTime())).toBeLessThan(1000);
    });
  });

  describe('validateConfig', () => {
    it('should return true for valid configuration', () => {
      expect(authService.validateConfig()).toBe(true);
    });
  });

  describe('getConfigInfo', () => {
    it('should return configuration info without sensitive data', () => {
      const configInfo = authService.getConfigInfo();
      
      expect(configInfo).toEqual({
        hasUsername: true,
        hasPasswordHash: true,
        sessionDuration: '24'
      });
    });
  });
});