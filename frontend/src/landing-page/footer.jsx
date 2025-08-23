import React from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  IconButton,
  Divider,
} from "@mui/material";
import {
  Facebook,
  Twitter,
  Instagram,
  LinkedIn,
  YouTube,
} from "@mui/icons-material";

const footerLinks = {
  company: [
    { pg: "About Us", url: "/about" },
    { pg: "Contact Us", url: "/contact" },
  ],
  support: [
    { pg: "Help Center", url: "/helpCenter" },
    { pg: "Returns", url: "/return" },
    { pg: "Shipping", url: "/shipping" },
  ],
  legal: [
    { pg: "Privacy Policy", url: "/privacy" },
    { pg: "Terms of Service", url: "/terms" },
  ],
};

const socialLinks = [
  { icon: <Facebook />, url: "#" },
  { icon: <Twitter />, url: "#" },
  { icon: <Instagram />, url: "#" },
  { icon: <LinkedIn />, url: "#" },
  { icon: <YouTube />, url: "#" },
];

function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "#1E40AF", // Footer Background
        color: "#E5E7EB", // Footer Text
        mt: 6,
        pt: 6,
        pb: 3,
      }}
    >
      <Container maxWidth="xxl">
        <Grid container spacing={4} columns={16}>
          {/* Logo + Description */}
          <Grid size={{ md: 4, sm: 6, xs: 6 }}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
              Zentro E-Commerce
            </Typography>
            <Typography
              variant="body2"
              sx={{ mb: 2, lineHeight: 1.7, color: "#9CA3AF" }}
            >
              Created by <i style={{ color: "#fff" }}>Ibn-Abdulsattar</i>
              <br />
              Contact: <i style={{ color: "#fff" }}>+92-3086972305</i>
              <br />
            </Typography>
            <Typography variant="body2" sx={{ color: "#9CA3AF" }}>
              Your one-stop online store for everything you need. Trusted by
              thousands of happy customers worldwide.
            </Typography>
          </Grid>

          {/* Dynamic Footer Links */}
          {Object.entries(footerLinks).map(([section, links]) => (
            <Grid size={{ md: 3, sm: 6, xs: 6 }} key={section}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </Typography>
              {links.map((link) => (
                <Link
                  key={link.pg}
                  href={link.url}
                  underline="none"
                  sx={{
                    display: "block",
                    mb: 1,
                    color: "#E5E7EB",
                    "&:hover": { color: "#F97316" }, // Accent Orange
                  }}
                >
                  {link.pg}
                </Link>
              ))}
            </Grid>
          ))}

          {/* Social Media */}
          <Grid size={{ md: 3, xs: 12 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
              Follow Us
            </Typography>
            <Box>
              {socialLinks.map((social, index) => (
                <IconButton
                  key={index}
                  href={social.url}
                  sx={{
                    color: "#E5E7EB",
                    "&:hover": { color: "#F97316" }, // Hover Orange
                  }}
                >
                  {social.icon}
                </IconButton>
              ))}
            </Box>
          </Grid>
        </Grid>

        {/* Divider */}
        <Divider sx={{ borderColor: "#fff", my: 3 }} />

        {/* Bottom Bar */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: { xs: "column", sm: "row" },
            textAlign: { xs: "center", sm: "left" },
          }}
        >
          <Typography variant="body2" sx={{ color: "#9CA3AF" }}>
            © {new Date().getFullYear()} Zentro E-Commerce. All rights reserved.
          </Typography>
          <Typography variant="body2" sx={{ color: "#9CA3AF" }}>
            Designed with ❤️ using React & MUI
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}

export default Footer;
