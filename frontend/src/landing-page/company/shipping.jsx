import React from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Divider,
} from "@mui/material";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import QueryBuilderIcon from "@mui/icons-material/QueryBuilder";
import PublicIcon from "@mui/icons-material/Public";
import ReplayIcon from "@mui/icons-material/Replay";

export default function Shipping() {
  const sections = [
    {
      icon: <LocalShippingIcon sx={{ fontSize: 40, color: "#1E40AF" }} />,
      title: "Delivery Options",
      content:
        "We offer Standard (3–5 business days) and Express (1–2 business days) delivery. Availability depends on your location.",
    },
    {
      icon: <QueryBuilderIcon sx={{ fontSize: 40, color: "#F97316" }} />,
      title: "Processing Time",
      content:
        "Orders are typically processed within 24 hours. Orders placed on weekends or holidays will be processed the next business day.",
    },
    {
      icon: <PublicIcon sx={{ fontSize: 40, color: "#059669" }} />,
      title: "International Shipping",
      content:
        "Zentro ships internationally to selected countries. Delivery times and charges vary depending on the destination.",
    },
    {
      icon: <ReplayIcon sx={{ fontSize: 40, color: "#DC2626" }} />,
      title: "Tracking & Updates",
      content:
        "Once shipped, you’ll receive an email/SMS with a tracking link to monitor your package in real-time.",
    },
  ];

  return (
    <Box sx={{ backgroundColor: "#F9FAFB", py: 8 }}>
      <Container maxWidth="xxl">
        {/* Page Title */}
        <Typography
          variant="h3"
          sx={{
            fontWeight: 800,
            color: "#1E40AF",
            textAlign: "center",
            mb: 2,
          }}
        >
          Shipping Information
        </Typography>

        <Typography
          variant="h6"
          sx={{
            color: "#6B7280",
            textAlign: "center",
            mb: 6,
            fontWeight: 400,
            maxWidth: "750px",
            mx: "auto",
          }}
        >
          At Zentro, we aim to deliver your orders quickly and reliably. Below
          you’ll find detailed information about our shipping process.
        </Typography>

        {/* Shipping Sections */}
        <Grid container spacing={4}>
          {sections.map((sec, i) => (
            <Grid size={{ md: 6, xs: 12 }} key={i}>
              <Card
                elevation={3}
                sx={{
                  borderRadius: 3,
                  height: "100%",
                  border: "1px solid #E5E7EB",
                }}
              >
                <CardContent sx={{ p: 4 }}>
                  {sec.icon}
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 700,
                      color: "#F97316",
                      mt: 2,
                      mb: 1,
                    }}
                  >
                    {sec.title}
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      color: "#374151",
                      lineHeight: 1.8,
                    }}
                  >
                    {sec.content}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Divider */}
        <Divider sx={{ my: 8 }} />

        {/* Notes */}
        <Box sx={{ textAlign: "center", maxWidth: "750px", mx: "auto" }}>
          <Typography
            variant="h6"
            sx={{ fontWeight: 700, color: "#1E40AF", mb: 2 }}
          >
            Important Notes
          </Typography>
          <Typography
            variant="body1"
            sx={{ color: "#4B5563", mb: 1, lineHeight: 1.8 }}
          >
            • Delivery times may vary during peak seasons or due to unforeseen
            circumstances. • Shipping charges are calculated at checkout based
            on weight, location, and shipping method. • Some items may not be
            eligible for express or international delivery due to restrictions.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
