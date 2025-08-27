// Footer.tsx
import React from "react";
import { Box, Typography, Link, Container, Divider } from "@mui/material";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: "primary.main",
        color: "#fff",
        borderTop: 1,
        borderColor: "secondary.light",
        mt: "auto",
        py: 3,zIndex:2000, position: "relative"
      }}
    >
      <Container
        maxWidth="xxl"
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 2,
        }}
      >
        {/* Left Side - Branding */}
        <Typography variant="body2" sx={{ fontWeight: 500 }}>
          © {new Date().getFullYear()} 🛍️ Zentro Admin Panel
        </Typography>

        {/* Right Side - Links */}
        <Box sx={{ display: "flex", gap: 3, flexWrap: "wrap" }}>
          <Link
            href="/privacy"
            underline="hover"
            color="#fff"
            sx={{
              fontWeight: 500,
              "&:hover": { color: "#F97316" },
            }}
          >
            Privacy Policy
          </Link>
          <Link
            href="/terms"
            underline="hover"
            color="#fff"
            sx={{
              fontWeight: 500,
              "&:hover": { color: "#F97316" },
            }}
          >
            Terms of Use
          </Link>
          <Link
            href="/support"
            underline="hover"
            color="#fff"
            sx={{
              fontWeight: 500,
              "&:hover": { color: "#F97316" },
            }}
          >
            Support
          </Link>
          <Link
            href="/docs"
            underline="hover"
            color="#fff"
            sx={{
              fontWeight: 500,
              "&:hover": { color: "#F97316" },
            }}
          >
            API Docs
          </Link>
        </Box>
      </Container>

      {/* Divider + Note */}
      <Divider sx={{ my: 2, borderColor: "secondary.light" }} />
      <Container maxWidth="lg" sx={{ textAlign: "center" }}>
        <Typography variant="caption" sx={{ color: "#fff" }}>
          Built with ❤️ using MERN & Material-UI
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
