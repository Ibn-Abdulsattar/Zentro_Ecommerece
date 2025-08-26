// Footer.tsx
import React from "react";
import { Box, Typography, Link, Container } from "@mui/material";

// 👉 A reusable Footer component styled with MUI
const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: "primary.main",
        color: "#fff",
        py: 2,
        borderTop: 1,
        borderColor: "divider",
      }}
    >
      <Container
        maxWidth="lg"
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 2,
        }}
      >
        {/* Left Side */}
        <Typography variant="body2">
          © {new Date().getFullYear()} Zentro Admin Panel. All rights reserved.
        </Typography>

        {/* Right Side */}
        <Box sx={{ display: "flex", gap: 3 }}>
          <Link
            href="/privacy"
            underline="hover"
            color="#fff"
            sx={{ "&:hover": { color: "#fff" } }}
          >
            Privacy Policy
          </Link>
          <Link
            href="/terms"
            underline="hover"
            color="#fff"
            sx={{ "&:hover": { color: "#fff" } }}
          >
            Terms of Use
          </Link>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
