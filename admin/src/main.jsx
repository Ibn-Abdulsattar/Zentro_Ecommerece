// index.jsx (or RootLayout.jsx)
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import Navbar from "./pages/navbar.jsx";
import Footer from "./pages/footer.jsx";
import Sidebar, { drawerWidth } from "./pages/Sidebar.jsx";
import { Box } from "@mui/material";
import React from "react";

function RootLayout() {
  const [open, setOpen] = React.useState(false);
  const toggleDrawer = (newOpen) => () => setOpen(newOpen);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      {/* Navbar */}
      <Navbar toggleDrawer={toggleDrawer} />

      {/* Main layout (Sidebar + Content) */}
      <Box sx={{ display: "flex", flexGrow: 1 }}>
        {/* Sidebar */}
        <Sidebar open={open} toggleDrawer={toggleDrawer} />

        {/* Main content shifts on desktop */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            ml: { md: `${drawerWidth}px` },
          }}
        >
          <App />
        </Box>
      </Box>

      {/* Footer */}
      <Footer />
    </Box>
  );
}

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <RootLayout />
  </BrowserRouter>
);
