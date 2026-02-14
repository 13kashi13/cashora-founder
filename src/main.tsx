import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Immediately mark fonts as loaded to prevent blank screen
document.documentElement.classList.add('fonts-loaded');

createRoot(document.getElementById("root")!).render(<App />);
