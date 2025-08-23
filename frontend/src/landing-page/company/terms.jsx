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

export default function Terms() {
  const sections = [
    {
      title: "1. Acceptance of Terms",
      content:
        "By accessing and using Zentro E-Commerce, you agree to comply with and be bound by these Terms & Conditions. If you do not agree, please refrain from using our services.",
    },
    {
      title: "2. User Responsibilities",
      content:
        "Users are responsible for providing accurate account information, maintaining confidentiality of login details, and ensuring with applicable laws.",
    },
    {
      title: "3. Orders & Payments",
      content:
        "All orders placed through Zentro are subject to availability and confirmation of payment. We reserve the right to refuse or cancel any order at our discretion.",
    },
    {
      title: "4. Returns & Refunds",
      content:
        "Our return and refund policy ensures that you can shop with confidence. Please refer to our dedicated Returns Policy page for detailed information.",
    },
    {
      title: "5. Limitation of Liability",
      content:
        "Zentro E-Commerce shall not be held liable for any indirect, incidental, or consequential damages arising from the use of our platform or services.",
    },
    {
      title: "6. Changes to Terms",
      content:
        "We reserve the right to update or modify these Terms & Conditions at any time. Changes will be effective immediately upon posting on this page.",
    },
  ];

  return (
    <Box sx={{ backgroundColor: "#F3F4F6", py: 8 }}>
      <Container maxWidth="xxl">
        {/* Page Title */}
        <Typography
          variant="h3"
          sx={{
            fontWeight: 800,
            color: "#F97316",
            textAlign: "center",
            mb: 2,
          }}
        >
          Terms & Conditions
        </Typography>
        <Typography
          variant="h6"
          sx={{
            color: "#6B7280",
            textAlign: "center",
            mb: 6,
            fontWeight: 400,
          }}
        >
          Please read these terms carefully before using Zentro E-Commerce.
        </Typography>{" "}
        {/* Terms Sections */}
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
                        color: "#1E40AF",
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
