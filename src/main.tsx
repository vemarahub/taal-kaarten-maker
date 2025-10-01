import { createRoot } from "react-dom/client";
import "./index.css";

// Test if basic React rendering works
function TestApp() {
  return (
    <div style={{ padding: '2rem', fontFamily: 'system-ui' }}>
      <h1>Test App</h1>
      <p>Environment variables:</p>
      <ul>
        <li>VITE_AUTH_USERNAME: {import.meta.env.VITE_AUTH_USERNAME || 'NOT SET'}</li>
        <li>VITE_AUTH_PASSWORD_HASH: {import.meta.env.VITE_AUTH_PASSWORD_HASH ? 'SET' : 'NOT SET'}</li>
        <li>VITE_SESSION_DURATION: {import.meta.env.VITE_SESSION_DURATION || 'NOT SET'}</li>
      </ul>
    </div>
  );
}

createRoot(document.getElementById("root")!).render(<TestApp />);

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
