import { StoredSession, AuthErrorType, ISessionManager } from '../types/auth';

/**
 * SessionManager handles secure session storage and management
 * for persistent authentication in the Dutch learning application
 */
export class SessionManager implements ISessionManager {
  private readonly SESSION_KEY = 'dutch_app_session';
  private readonly ENCRYPTION_KEY_NAME = 'dutch_app_encryption_key';

  /**
   * Store session data securely in localStorage
   */
  async storeSession(sessionData: StoredSession): Promise<void> {
    try {
      // Encrypt the session data before storing
      const encryptedData = await this.encryptSessionData(sessionData);
      localStorage.setItem(this.SESSION_KEY, encryptedData);
    } catch (error) {
      console.error('Failed to store session:', error);
      throw new Error('Failed to store session data');
    }
  }

  /**
   * Retrieve and decrypt session data from localStorage
   */
  async getSession(): Promise<StoredSession | null> {
    try {
      const encryptedData = localStorage.getItem(this.SESSION_KEY);
      if (!encryptedData) {
        return null;
      }

      return await this.decryptSessionData(encryptedData);
    } catch (error) {
      console.error('Failed to retrieve session:', error);
      // Clear corrupted session data
      this.clearSession();
      return null;
    }
  }

  /**
   * Check if a stored session is still valid
   */
  async isSessionValid(): Promise<boolean> {
    try {
      const session = await this.getSession();
      if (!session) {
        return false;
      }

      const expiryTime = new Date(session.expiryTime);
      const now = new Date();
      
      return now < expiryTime;
    } catch (error) {
      console.error('Failed to validate session:', error);
      return false;
    }
  }

  /**
   * Clear session data from localStorage
   */
  clearSession(): void {
    try {
      localStorage.removeItem(this.SESSION_KEY);
      // Also clear the encryption key to ensure complete cleanup
      localStorage.removeItem(this.ENCRYPTION_KEY_NAME);
    } catch (error) {
      console.error('Failed to clear session:', error);
    }
  }

  /**
   * Update session expiry time
   */
  async extendSession(newExpiryTime: Date): Promise<void> {
    try {
      const session = await this.getSession();
      if (!session) {
        throw new Error('No active session to extend');
      }

      const updatedSession: StoredSession = {
        ...session,
        expiryTime: newExpiryTime.toISOString()
      };

      await this.storeSession(updatedSession);
    } catch (error) {
      console.error('Failed to extend session:', error);
      throw new Error('Failed to extend session');
    }
  }

  /**
   * Get session expiry time
   */
  async getSessionExpiry(): Promise<Date | null> {
    try {
      const session = await this.getSession();
      return session ? new Date(session.expiryTime) : null;
    } catch (error) {
      console.error('Failed to get session expiry:', error);
      return null;
    }
  }

  /**
   * Check if localStorage is available
   */
  isStorageAvailable(): boolean {
    try {
      const testKey = '__storage_test__';
      localStorage.setItem(testKey, 'test');
      localStorage.removeItem(testKey);
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Check if running in PWA mode (mobile app)
   */
  isPWAMode(): boolean {
    return window.matchMedia('(display-mode: standalone)').matches ||
           (window.navigator as any).standalone === true ||
           document.referrer.includes('android-app://');
  }

  /**
   * Get device-specific session duration for PWA
   * Mobile PWA gets longer sessions for better UX
   */
  getPWASessionDuration(): number {
    if (this.isPWAMode()) {
      // 7 days for PWA mode (mobile app experience)
      return 7 * 24 * 60 * 60 * 1000;
    }
    // Default session duration for web browser
    return 24 * 60 * 60 * 1000;
  }

  /**
   * Encrypt session data using Web Crypto API
   */
  private async encryptSessionData(data: StoredSession): Promise<string> {
    try {
      // Get or generate encryption key
      const key = await this.getOrGenerateEncryptionKey();
      
      // Convert data to JSON string
      const jsonString = JSON.stringify(data);
      const encoder = new TextEncoder();
      const dataBuffer = encoder.encode(jsonString);

      // Generate random IV
      const iv = crypto.getRandomValues(new Uint8Array(12));

      // Encrypt the data
      const encryptedBuffer = await crypto.subtle.encrypt(
        { name: 'AES-GCM', iv },
        key,
        dataBuffer
      );

      // Combine IV and encrypted data
      const combined = new Uint8Array(iv.length + encryptedBuffer.byteLength);
      combined.set(iv);
      combined.set(new Uint8Array(encryptedBuffer), iv.length);

      // Convert to base64 for storage
      return btoa(String.fromCharCode(...combined));
    } catch (error) {
      console.error('Encryption failed:', error);
      throw new Error('Failed to encrypt session data');
    }
  }

  /**
   * Decrypt session data using Web Crypto API
   */
  private async decryptSessionData(encryptedData: string): Promise<StoredSession> {
    try {
      // Get encryption key
      const key = await this.getOrGenerateEncryptionKey();

      // Convert from base64
      const combined = new Uint8Array(
        atob(encryptedData).split('').map(char => char.charCodeAt(0))
      );

      // Extract IV and encrypted data
      const iv = combined.slice(0, 12);
      const encryptedBuffer = combined.slice(12);

      // Decrypt the data
      const decryptedBuffer = await crypto.subtle.decrypt(
        { name: 'AES-GCM', iv },
        key,
        encryptedBuffer
      );

      // Convert back to string and parse JSON
      const decoder = new TextDecoder();
      const jsonString = decoder.decode(decryptedBuffer);
      
      return JSON.parse(jsonString) as StoredSession;
    } catch (error) {
      console.error('Decryption failed:', error);
      throw new Error('Failed to decrypt session data');
    }
  }

  /**
   * Get or generate encryption key for session data
   */
  private async getOrGenerateEncryptionKey(): Promise<CryptoKey> {
    try {
      // Try to get existing key from localStorage
      const storedKey = localStorage.getItem(this.ENCRYPTION_KEY_NAME);
      
      if (storedKey) {
        // Import the stored key
        const keyData = new Uint8Array(
          atob(storedKey).split('').map(char => char.charCodeAt(0))
        );
        
        return await crypto.subtle.importKey(
          'raw',
          keyData,
          { name: 'AES-GCM' },
          false,
          ['encrypt', 'decrypt']
        );
      }

      // Generate new key
      const key = await crypto.subtle.generateKey(
        { name: 'AES-GCM', length: 256 },
        true,
        ['encrypt', 'decrypt']
      );

      // Export and store the key
      const exportedKey = await crypto.subtle.exportKey('raw', key);
      const keyArray = new Uint8Array(exportedKey);
      const keyString = btoa(String.fromCharCode(...keyArray));
      localStorage.setItem(this.ENCRYPTION_KEY_NAME, keyString);

      return key;
    } catch (error) {
      console.error('Failed to get/generate encryption key:', error);
      throw new Error('Failed to manage encryption key');
    }
  }

  /**
   * Clean up expired sessions (utility method)
   */
  async cleanupExpiredSessions(): Promise<void> {
    try {
      const isValid = await this.isSessionValid();
      if (!isValid) {
        this.clearSession();
      }
    } catch (error) {
      console.error('Failed to cleanup expired sessions:', error);
      // Clear session on any error to be safe
      this.clearSession();
    }
  }
}

// Export singleton instance
export const sessionManager = new SessionManager();