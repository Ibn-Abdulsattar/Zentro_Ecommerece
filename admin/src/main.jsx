// index.jsx (or RootLayout.jsx)
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import AdminLayout from "./pages/adminLayout.jsx";
const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
import { GoogleOAuthProvider } from "@react-oauth/google";
import { AuthProvider } from "./pages/AuthContext";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <AuthProvider>
        <AdminLayout>
          <App />
        </AdminLayout>
      </AuthProvider>
    </GoogleOAuthProvider>
  </BrowserRouter>
);
