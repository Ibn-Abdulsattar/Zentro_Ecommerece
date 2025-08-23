import React from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Button,
  Card,
  CardContent,
} from "@mui/material";

// 📝 About Page for Zentro E-Commerce
export default function About() {
  return (
    <Box
      sx={{
        backgroundColor: "#F9FAFB",
        py: 6,
      }}
    >
      <Container maxWidth="xxl">
        {/* Hero Section */}
        <Box sx={{ textAlign: "center", mb: 6 }}>
          <Typography
            variant="h3"
            sx={{ fontWeight: 700, color: "#F97316", mb: 2 }}
          >
            About Zentro E-Commerce
          </Typography>
          <Typography
            variant="h6"
            sx={{ color: "#4B5563", maxWidth: "700px", mx: "auto" }}
          >
            Your one-stop destination for quality products, seamless shopping,
            and a trusted experience loved by thousands worldwide.
          </Typography>
        </Box>

        {/* Mission + Vision Section */}
        <Grid container spacing={4} sx={{ mb: 6 }}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Card sx={{ height: "100%", backgroundColor: "#FFFFFF", p: 2 }}>
              <CardContent>
                <Typography
                  variant="h5"
                  sx={{ fontWeight: 600, color: "#1E40AF", mb: 2 }}
                >
                  Our Mission
                </Typography>
                <Typography sx={{ color: "#4B5563", lineHeight: 1.8 }}>
                  At Zentro, our mission is to make online shopping effortless
                  and enjoyable. We provide top-quality products at affordable
                  prices, ensuring a smooth and secure shopping journey for
                  every customer.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Card sx={{ height: "100%", backgroundColor: "#FFFFFF", p: 2 }}>
              <CardContent>
                <Typography
                  variant="h5"
                  sx={{ fontWeight: 600, color: "#1E40AF", mb: 2 }}
                >
                  Our Vision
                </Typography>
                <Typography sx={{ color: "#4B5563", lineHeight: 1.8 }}>
                  We aim to become a global leader in e-commerce by combining
                  innovation, customer satisfaction, and trust. Our vision is to
                  connect people with the products they love, anytime and
                  anywhere.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Why Choose Us Section */}
        <Box sx={{ textAlign: "center", mb: 6 }}>
          <Typography
            variant="h4"
            sx={{ fontWeight: 700, color: "#F97316", mb: 3 }}
          >
            Why Choose Zentro?
          </Typography>
          <Grid container spacing={4}>
            {[
              {
                title: "Wide Range of Products",
                desc: "From electronics to fashion, we have everything under one roof.",
              },
              {
                title: "Trusted by Thousands",
                desc: "We are proud to have a growing community of satisfied customers worldwide.",
              },
              {
                title: "Secure & Fast Delivery",
                desc: "Your safety is our priority — with secure payments and quick shipping.",
              },
            ].map((item, index) => (
              <Grid size={{ md: 4, xxs: 12 }} key={index}>
                <Card sx={{ height: "100%", backgroundColor: "#FFFFFF", p: 2 }}>
                  <CardContent>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 600,
                        color: "#1E40AF",
                        mb: 1,
                        textAlign: "center",
                      }}
                    >
                      {item.title}
                    </Typography>
                    <Typography sx={{ color: "#4B5563", textAlign: "center" }}>
                      {item.desc}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Call To Action */}
        <Box sx={{ textAlign: "center", mt: 8 }}>
          <Typography
            variant="h5"
            sx={{ fontWeight: 600, color: "#F97316", mb: 2 }}
          >
            Ready to start shopping?
          </Typography>
          <Button
            href="productListing"
            variant="contained"
            size="large"
            sx={{
              backgroundColor: "#F97316",
              "&:hover": { backgroundColor: "#bc5105ff" },
            }}
          >
            Shop Now
          </Button>
        </Box>
      </Container>
    </Box>
  );
}
