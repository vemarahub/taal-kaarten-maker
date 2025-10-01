import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { loadEnvironmentConfig, validateEnvironmentConfig } from "./config/auth";

// Validate environment configuration at startup
const envConfig = loadEnvironmentConfig();
const validationErrors = validateEnvironmentConfig(envConfig);

if (validationErrors.length > 0) {
  console.error("❌ Environment configuration errors:");
  validationErrors.forEach(error => console.error(`  - ${error}`));
  
  if (envConfig.isProduction) {
    // In production, show user-friendly error
    document.body.innerHTML = `
      <div style="
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100vh;
        font-family: system-ui, -apple-system, sans-serif;
        text-align: center;
        padding: 2rem;
        background: #f8fafc;
      ">
        <h1 style="color: #dc2626; margin-bottom: 1rem;">Configuration Error</h1>
        <p style="color: #64748b; max-width: 500px;">
          The application is not properly configured. Please contact the administrator.
        </p>
      </div>
    `;
    throw new Error("Missing required environment variables");
  } else {
    // In development, show detailed errors
    document.body.innerHTML = `
      <div style="
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100vh;
        font-family: system-ui, -apple-system, sans-serif;
        text-align: center;
        padding: 2rem;
        background: #f8fafc;
      ">
        <h1 style="color: #dc2626; margin-bottom: 1rem;">Environment Configuration Missing</h1>
        <div style="background: #fee2e2; border: 1px solid #fecaca; border-radius: 8px; padding: 1rem; margin: 1rem 0; max-width: 600px;">
          <p style="color: #991b1b; font-weight: 600; margin-bottom: 0.5rem;">Missing environment variables:</p>
          <ul style="color: #991b1b; text-align: left; margin: 0;">
            ${validationErrors.map(error => `<li>${error}</li>`).join('')}
          </ul>
        </div>
        <p style="color: #64748b; max-width: 500px; margin-bottom: 1rem;">
          Copy <code>.env.example</code> to <code>.env.local</code> and configure the required variables.
        </p>
        <p style="color: #64748b; font-size: 0.875rem;">
          See the README.md for deployment instructions.
        </p>
      </div>
    `;
    throw new Error("Missing required environment variables");
  }
}

console.log("✅ Environment configuration validated successfully");

// Render the app
createRoot(document.getElementById("root")!).render(<App />);

// ✅ Register PWA service worker (vite-plugin-pwa)
import { registerSW } from "virtual:pwa-register";

const updateSW = registerSW({
  onNeedRefresh() {
    if (confirm("New content available. Reload?")) {
      updateSW(true);
    }
  },
  onOfflineReady() {
    console.log("App ready to work offline 🎉");
  }
});
