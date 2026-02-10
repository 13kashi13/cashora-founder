import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Prevent FOUC by marking fonts as loaded
document.documentElement.classList.add('fonts-loaded');

// Ensure stable rendering in production
if (typeof window !== 'undefined') {
  // Prevent layout shifts on load
  window.addEventListener('load', () => {
    document.body.style.visibility = 'visible';
  });
}

createRoot(document.getElementById("root")!).render(<App />);
