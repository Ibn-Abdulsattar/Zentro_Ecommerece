import React from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Divider,
  Button,
} from "@mui/material";
import ReplayIcon from "@mui/icons-material/Replay";
import PaymentIcon from "@mui/icons-material/Payment";
import InventoryIcon from "@mui/icons-material/Inventory";
import InfoIcon from "@mui/icons-material/Info";

export default function Return() {
  const policies = [
    {
      icon: <ReplayIcon sx={{ fontSize: 40, color: "#1E40AF" }} />,
      title: "30-Day Return Policy",
      content:
        "You can return most items within 30 days of delivery. The item must be unused, in original packaging, and accompanied by proof of purchase.",
    },
    {
      icon: <PaymentIcon sx={{ fontSize: 40, color: "#F97316" }} />,
      title: "Refund Process",
      content:
        "Refunds are issued to your original payment method within 5–7 business days after we receive and inspect your return.",
    },
    {
      icon: <InventoryIcon sx={{ fontSize: 40, color: "#059669" }} />,
      title: "Non-Returnable Items",
      content:
        "Certain products like perishable goods, personal care items, and gift cards are not eligible for returns.",
    },
    {
      icon: <InfoIcon sx={{ fontSize: 40, color: "#DC2626" }} />,
      title: "Return Instructions",
      content:
        "To start a return, log in to your account, go to 'My Orders', and click on 'Request Return'. We’ll provide you with a return shipping label.",
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
          Returns & Refunds
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
          We want you to be fully satisfied with your purchase. Here’s
          everything you need to know about our return and refund policy.
        </Typography>

        {/* Policy Sections */}
        <Grid container spacing={4}>
          {policies.map((policy, i) => (
            <Grid size={{ xs: 12, md: 6 }} key={i}>
              <Card
                elevation={3}
                sx={{
                  borderRadius: 3,
                  height: "100%",
                  border: "1px solid #E5E7EB",
                }}
              >
                <CardContent sx={{ p: 4 }}>
                  {policy.icon}
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 700,
                      color: "#F97316",
                      mt: 2,
                      mb: 1,
                    }}
                  >
                    {policy.title}
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      color: "#374151",
                      lineHeight: 1.8,
                    }}
                  >
                    {policy.content}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Divider */}
        <Divider sx={{ my: 8 }} />

        {/* CTA Section */}
        <Box sx={{ textAlign: "center" }}>
          <Typography
            variant="h5"
            sx={{
              fontWeight: 700,
              color: "#1E40AF",
              mb: 2,
            }}
          >
            Need to start a return?
          </Typography>
          <Button
            href="/contact"
            variant="contained"
            size="large"
            sx={{
              backgroundColor: "#F97316",
              "&:hover": { backgroundColor: "#c2410c" },
            }}
          >
            Contact Support
          </Button>
        </Box>
      </Container>
    </Box>
  );
}
