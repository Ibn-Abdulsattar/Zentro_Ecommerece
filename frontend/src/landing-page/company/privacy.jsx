import React from "react";
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Divider,
  Stack,
} from "@mui/material";
import { Grid } from "@mui/system";

// 📝 Privacy Policy Page for Zentro E-Commerce
export default function Privacy() {
  // ✅ Sections data (easily extendable)
  const sections = [
    {
      title: "1. Information We Collect",
      content:
        "We may collect personal information such as your name, email, phone number, and address when you register, place an order, or interact with our platform.IP address for analytics purposes.",
    },
    {
      title: "2. How We Use Your Information",
      content:
        "Your information helps us process orders, improve our services, provide customer support, and send updates or promotional offers (with your consent). We ensure that your data is used responsibly and securely.",
    },
    {
      title: "3. Data Protection",
      content:
        "We implement strict security measures to protect your data against unauthorized access, alteration, or disclosure. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute protection.",
    },
    {
      title: "4. Third-Party Services",
      content:
        "We may use third-party payment gateways, analytics providers, or delivery partners. These services have their own privacy policies, and we encourage you to review them for more details.",
    },
    {
      title: "5. Your Rights",
      content:
        "You have the right to access, update, or delete your personal information. You can also opt out of promotional emails at any time by clicking the 'unsubscribe' link.",
    },
    {
      title: "6. Updates to This Policy",
      content:
        "We may update this Privacy Policy from time to time. Changes will be posted on this page with a revised 'Last Updated' date.",
    },
  ];

  return (
    <Box sx={{ backgroundColor: "#F9FAFB", py: 8 }}>
      <Container maxWidth="xxl">
        {/* Title */}
        <Typography
          variant="h3"
          sx={{ fontWeight: 800, color: "#1E40AF", textAlign: "center", mb: 3 }}
        >
          Privacy Policy
        </Typography>

        <Typography
          variant="body1"
          sx={{
            color: "#4B5563",
            textAlign: "center",
            maxWidth: "700px",
            mx: "auto",
            mb: 6,
          }}
        >
          At Zentro E-Commerce, your privacy is our priority. This Privacy
          Policy explains how we collect, use, and protect your information.
        </Typography>

        <Stack spacing={4}>
          <Grid container spacing={4}>
            {sections.map((section, index) => (
              <Grid key={index} size={{ xs: 12, md: 6 }}>
                <Card
                  key={index}
                  elevation={3}
                  sx={{
                    borderRadius: 3,
                    backgroundColor: "#FFFFFF",
                    overflow: "hidden",
                    border: "1px solid #E5E7EB",
                  }}
                >
                  {/* Accent line on top */}
                  <Box sx={{ height: "4px" }} />
                  <CardContent sx={{ p: 4 }}>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 700,
                        color: "#F97316",
                        mb: 1.5,
                      }}
                    >
                      {section.title}
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        color: "#374151",
                        lineHeight: 1.9,
                        fontSize: "1rem",
                      }}
                    >
                      {section.content}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Stack>
      </Container>
    </Box>
  );
}
