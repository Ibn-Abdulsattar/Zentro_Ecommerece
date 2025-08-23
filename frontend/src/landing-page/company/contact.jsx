import React from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  TextField,
  Button,
  Card,
  CardContent,
  IconButton,
} from "@mui/material";
import { Phone, Email, LocationOn } from "@mui/icons-material";

export default function Contact() {
  return (
    <Box sx={{ backgroundColor: "#F9FAFB", py: 8 }}>
      <Container maxWidth="xxl">
        {/* Page Title */}
        <Box sx={{ textAlign: "center", mb: 6 }}>
          <Typography
            variant="h3"
            sx={{ fontWeight: 700, color: "#F97316", mb: 2 }}
          >
            Contact Us
          </Typography>
          <Typography variant="h6" sx={{ color: "#4B5563", mx: "auto" }}>
            Have questions? We’d love to hear from you! Reach out anytime and
            our team will respond as soon as possible.
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {/* Contact Information */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Card sx={{ height: "100%", p: 2 }}>
              <CardContent>
                <Typography
                  variant="h5"
                  sx={{ fontWeight: 600, color: "#1E40AF", mb: 3 }}
                >
                  Get in Touch
                </Typography>

                <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                  <IconButton disabled sx={{ color: "#F97316", mr: 2 }}>
                    <Phone />
                  </IconButton>
                  <Typography variant="body1" sx={{ color: "#4B5563" }}>
                    +92-3086972305
                  </Typography>
                </Box>

                <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                  <IconButton disabled sx={{ color: "#F97316", mr: 2 }}>
                    <Email />
                  </IconButton>
                  <Typography variant="body1" sx={{ color: "#4B5563" }}>
                    support@zentro.com
                  </Typography>
                </Box>

                <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                  <IconButton disabled sx={{ color: "#F97316", mr: 2 }}>
                    <LocationOn />
                  </IconButton>
                  <Typography variant="body1" sx={{ color: "#4B5563" }}>
                    Sahiwal, Pakistan
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Contact Form */}
          <Grid size={{ xs: 12, md: 8 }}>
            <Card sx={{ height: "100%", p: 2 }}>
              <CardContent>
                <Typography
                  variant="h5"
                  sx={{ fontWeight: 600, color: "#1E40AF", mb: 3 }}
                >
                  Send Us a Message
                </Typography>

                <Grid container spacing={2}>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField label="Full Name" variant="outlined" fullWidth />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      label="Email Address"
                      variant="outlined"
                      fullWidth
                    />
                  </Grid>
                  <Grid size={{ xs: 12 }}>
                    <TextField label="Subject" variant="outlined" fullWidth />
                  </Grid>
                  <Grid size={{ xs: 12 }}>
                    <TextField
                      label="Message"
                      variant="outlined"
                      multiline
                      rows={4}
                      fullWidth
                    />
                  </Grid>
                  <Grid size={{ xs: 12 }}>
                    <Button
                      variant="contained"
                      size="large"
                      sx={{
                        backgroundColor: "#F97316",
                        "&:hover": { backgroundColor: "#bc5105" },
                      }}
                    >
                      Send Message
                    </Button>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
