import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import Navbar from "./pages/navbar.jsx";
import Footer from "./pages/footer.jsx";
import { Box, Grid } from "@mui/system";
import Sidebar from "./pages/sidebar.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Navbar />
    <Grid container>
      <Grid size={{md:3}} >
        {/* <Sidebar/> */}
      </Grid>
      <Grid size={{ xs:12}} sx={{p:"2rem", pl: 10, minHeight: "87.3vh"}}><App/></Grid>
    </Grid>
    {/* <App/> */}
    <Footer />
  </BrowserRouter>
);
