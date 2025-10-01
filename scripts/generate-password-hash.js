#!/usr/bin/env node

/**
 * Utility script to generate SHA-256 password hashes for authentication
 * Usage: node scripts/generate-password-hash.js [password]
 */

import crypto from 'crypto';
import readline from 'readline';

function generateHash(password) {
  return crypto.createHash('sha256').update(password).digest('hex');
}

function main() {
  const password = process.argv[2];
  
  if (password) {
    // Password provided as argument
    const hash = generateHash(password);
    console.log(`Password: ${password}`);
    console.log(`SHA-256 Hash: ${hash}`);
    console.log(`\nAdd this to your .env.local file:`);
    console.log(`VITE_AUTH_PASSWORD_HASH=${hash}`);
  } else {
    // Interactive mode
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    rl.question('Enter password to hash: ', (password) => {
      if (!password) {
        console.log('Password cannot be empty');
        rl.close();
        return;
      }

      const hash = generateHash(password);
      console.log(`\nSHA-256 Hash: ${hash}`);
      console.log(`\nAdd this to your .env.local file:`);
      console.log(`VITE_AUTH_PASSWORD_HASH=${hash}`);
      rl.close();
    });
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export { generateHash };