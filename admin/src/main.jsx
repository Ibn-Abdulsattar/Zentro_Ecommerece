import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import Navbar from "./pages/navbar.jsx";
import Footer from "./pages/footer.jsx";
import { Box } from "@mui/system";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Navbar />
    <Box>
      <App/>
    </Box>
    <Footer />
  </BrowserRouter>
);
