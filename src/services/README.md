# Authentication Services

This directory contains the core authentication services for the Dutch learning application.

## Files

- `AuthService.ts` - Main authentication service class
- `SessionManager.ts` - Session storage and management service
- `__tests__/AuthService.test.ts` - Unit tests for the authentication service
- `__tests__/SessionManager.test.ts` - Unit tests for the session manager

## AuthService

The `AuthService` class provides secure credential validation and session management functionality.

### Key Features

- Environment variable-based credential validation
- Secure password hashing using Web Crypto API
- Session hash generation for persistent storage
- Configurable session duration
- Comprehensive error handling

### Usage

```typescript
import { authService } from './services/AuthService';

// Validate credentials
const isValid = await authService.validateCredentials('username', 'password');

// Generate session hash
const sessionHash = await authService.generateSessionHash('username', 'password');

// Get session duration
const duration = authService.getSessionDuration();

// Calculate session expiry
const expiry = authService.calculateSessionExpiry();
```

### Environment Variables

The service requires the following environment variables:

- `VITE_AUTH_USERNAME` - The valid username for authentication
- `VITE_AUTH_PASSWORD_HASH` - SHA-256 hash of the valid password
- `VITE_SESSION_DURATION` - Session duration in hours (optional, defaults to 24)

### Generating Password Hashes

Use the provided utility script to generate password hashes:

```bash
npm run generate-hash your-password
```

Or run interactively:

```bash
npm run generate-hash
```

### Security

- Passwords are never stored in plaintext
- All hashing uses the Web Crypto API
- Environment variables keep credentials out of the codebase
- Session hashes include timestamps for uniqueness
- Comprehensive error handling prevents information leakage

## SessionManager

The `SessionManager` class provides secure session storage and management for persistent authentication.

### Key Features

- Secure session data encryption using AES-GCM
- localStorage-based session persistence
- Automatic session expiration handling
- Session validation and cleanup utilities
- Encryption key management
- Storage availability detection

### Usage

```typescript
import { sessionManager } from './services/SessionManager';

// Store encrypted session
await sessionManager.storeSession({
  username: 'user',
  hashedCredentials: 'hash',
  loginTime: '2024-01-01T10:00:00.000Z',
  expiryTime: '2024-01-02T10:00:00.000Z',
  rememberMe: true
});

// Retrieve session
const session = await sessionManager.getSession();

// Check if session is valid
const isValid = await sessionManager.isSessionValid();

// Clear session
sessionManager.clearSession();

// Extend session expiry
await sessionManager.extendSession(new Date('2024-01-03T10:00:00.000Z'));
```

### Security Features

- AES-GCM encryption for all stored session data
- Random IV generation for each encryption operation
- Secure encryption key generation and storage
- Automatic cleanup of corrupted session data
- Protection against localStorage unavailability