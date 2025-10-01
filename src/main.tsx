import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Debug logging for production
console.log("🚀 Main.tsx loaded successfully");
console.log("🌍 Environment:", import.meta.env.MODE);
console.log("📍 Base URL:", import.meta.env.BASE_URL);

try {
  const rootElement = document.getElementById("root");
  console.log("🎯 Root element found:", !!rootElement);
  
  if (!rootElement) {
    throw new Error("Root element not found");
  }
  
  console.log("⚛️ Creating React root...");
  const root = createRoot(rootElement);
  
  console.log("🎨 Rendering App component...");
  root.render(<App />);
  
  console.log("✅ App rendered successfully");
} catch (error) {
  console.error("❌ Error during app initialization:", error);
  // Fallback: show error message in the DOM
  const rootElement = document.getElementById("root");
  if (rootElement) {
    rootElement.innerHTML = `
      <div style="padding: 20px; font-family: Arial, sans-serif;">
        <h1 style="color: red;">App Failed to Load</h1>
        <p>Error: ${error instanceof Error ? error.message : 'Unknown error'}</p>
        <p>Check the browser console for more details.</p>
      </div>
    `;
  }
}

// ✅ Register PWA service worker (vite-plugin-pwa) - TEMPORARILY DISABLED FOR DEBUGGING
// if ('serviceWorker' in navigator) {
//   window.addEventListener('load', () => {
//     navigator.serviceWorker.register('/sw.js')
//       .then((registration) => {
//         console.log('SW registered: ', registration);
//       })
//       .catch((registrationError) => {
//         console.log('SW registration failed: ', registrationError);
//       });
//   });
// }
