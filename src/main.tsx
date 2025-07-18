import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import "../app/globals.css";
import { ThemeProvider } from "../components/theme-provider";

createRoot(document.getElementById("root")!).render(
  <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
    <App />
  </ThemeProvider>
);
