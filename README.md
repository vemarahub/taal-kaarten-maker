# Welcome to HelloWereld

## Project info

**URL**: https://lovable.dev/projects/f7d8ad6f-78d2-486d-a597-4e7abe061709

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/f7d8ad6f-78d2-486d-a597-4e7abe061709) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

### Quick Deployment

Simply open [Lovable](https://lovable.dev/projects/f7d8ad6f-78d2-486d-a597-4e7abe061709) and click on Share -> Publish.

### Environment Configuration for Deployment

This application requires authentication configuration through environment variables. Before deploying, you must set up the following environment variables:

#### Required Environment Variables

| Variable | Description | Example | Required |
|----------|-------------|---------|----------|
| `VITE_AUTH_USERNAME` | Username for authentication | `admin` | ✅ Yes |
| `VITE_AUTH_PASSWORD_HASH` | SHA-256 hash of the password | `6ca13d52ca70c883e0f0bb101e425a89e8624de51db2d2392593af6a84118090` | ✅ Yes |
| `VITE_SESSION_DURATION` | Session duration in hours | `24` | ✅ Yes |

#### Setting Up Environment Variables

1. **For Local Development:**
   ```bash
   # Copy the example file
   cp .env.example .env.local
   
   # Edit .env.local with your actual values
   # Generate password hash using:
   echo -n "your-password" | shasum -a 256
   ```

2. **For Production Deployment:**
   - Set the environment variables in your hosting platform's dashboard
   - Ensure all three variables are configured before deployment
   - The application will validate these variables at startup and show an error if any are missing

#### Generating Password Hash

To generate a secure password hash for `VITE_AUTH_PASSWORD_HASH`, you have two options:

**Option 1: Using the provided script (recommended):**
```bash
# Interactive mode
node scripts/generate-password-hash.js

# Or provide password as argument
node scripts/generate-password-hash.js "your-secure-password"
```

**Option 2: Using command line:**
```bash
# Replace "your-secure-password" with your actual password
echo -n "your-secure-password" | shasum -a 256
```

Example:
```bash
echo -n "mypassword123" | shasum -a 256
# Output: 6ca13d52ca70c883e0f0bb101e425a89e8624de51db2d2392593af6a84118090
```

#### Deployment Platforms

**Vercel:**
```bash
# Set environment variables via CLI
vercel env add VITE_AUTH_USERNAME
vercel env add VITE_AUTH_PASSWORD_HASH  
vercel env add VITE_SESSION_DURATION
```

**Netlify:**
- Go to Site Settings → Environment Variables
- Add each required variable with its value

**GitHub Pages (via GitHub Actions):**
- Go to your repository Settings → Secrets and variables → Actions
- Add the following repository secrets:
  - `VITE_AUTH_USERNAME`
  - `VITE_AUTH_PASSWORD_HASH`
  - `VITE_SESSION_DURATION`
- The GitHub Actions workflow will automatically use these secrets during deployment

**Other Platforms:**
- Consult your platform's documentation for setting environment variables
- Ensure variables are available at build time (prefixed with `VITE_`)

#### Security Notes

- Never commit actual passwords or sensitive values to the repository
- Use strong, unique passwords for production deployments
- The password hash is exposed to the client-side code (this is intentional for this authentication method)
- Consider implementing server-side authentication for higher security requirements

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)
