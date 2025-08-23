import React from "react";
import {
  Box,
  Container,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Grid,
  Card,
  CardContent,
  Button,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import ReplayIcon from "@mui/icons-material/Replay";
import PaymentIcon from "@mui/icons-material/Payment";

export default function HelpCenter() {
  const topics = [
    {
      icon: <LocalShippingIcon sx={{ fontSize: 40, color: "#1E40AF" }} />,
      title: "Shipping Information",
      desc: "Learn more about our shipping policies, delivery times, and tracking options.",
      link: "/shipping",
    },
    {
      icon: <ReplayIcon sx={{ fontSize: 40, color: "#F97316" }} />,
      title: "Returns & Refunds",
      desc: "Understand our return process and refund timelines to shop with confidence.",
      link: "/return",
    },
    {
      icon: <PaymentIcon sx={{ fontSize: 40, color: "#059669" }} />,
      title: "Payment Options",
      desc: "Explore secure payment methods supported by Zentro E-Commerce.",
      link: "/payment",
    },
    {
      icon: <SupportAgentIcon sx={{ fontSize: 40, color: "#DC2626" }} />,
      title: "Customer Support",
      desc: "Need help? Reach out to our dedicated support team for quick assistance.",
      link: "/contact",
    },
  ];

  const faqs = [
    {
      q: "How can I track my order?",
      a: "You can track your order by logging into your account and navigating to 'My Orders'. A tracking number will also be emailed to you once your order is shipped.",
    },
    {
      q: "What is the return window?",
      a: "Most items can be returned within 30 days of delivery, provided they are unused and in original packaging.",
    },
    {
      q: "Which payment methods are accepted?",
      a: "We accept credit/debit cards, PayPal, and cash on delivery in selected regions.",
    },
    {
      q: "How do I contact customer support?",
      a: "You can reach us via the Contact page or email support@zentro.com. Our team typically responds within 24 hours.",
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
          Help Center
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
          Find answers to common questions and explore helpful resources to make
          your Zentro E-Commerce experience smooth and enjoyable.
        </Typography>

        {/* Help Topics */}
        <Grid container spacing={4} sx={{ mb: 8 }}>
          {topics.map((topic, i) => (
            <Grid size={{ xs: 12, md: 6 }} key={i}>
              <Card
                elevation={3}
                sx={{
                  borderRadius: 3,
                  height: "100%",
                  border: "1px solid #E5E7EB",
                }}
              >
                <CardContent sx={{ p: 4, textAlign: "center" }}>
                  {topic.icon}
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: 700, color: "#F97316", mt: 2, mb: 1 }}
                  >
                    {topic.title}
                  </Typography>
                  <Typography variant="body1" sx={{ color: "#374151", mb: 2 }}>
                    {topic.desc}
                  </Typography>
                  <Button
                    href={topic.link}
                    size="small"
                    variant="outlined"
                    sx={{
                      borderColor: "#1E40AF",
                      color: "#1E40AF",
                      "&:hover": {
                        backgroundColor: "#1E40AF",
                        color: "#fff",
                      },
                    }}
                  >
                    Learn More
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* FAQs */}
        <Typography
          variant="h4"
          sx={{ fontWeight: 700, color: "#F97316", mb: 3, textAlign: "center" }}
        >
          Frequently Asked Questions
        </Typography>
        {faqs.map((faq, i) => (
          <Accordion key={i} sx={{ mb: 2 }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography sx={{ fontWeight: 600, color: "#1E40AF", py: 2 }}>
                {faq.q}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography sx={{ color: "#374151" }}>{faq.a}</Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Container>
    </Box>
  );
}
