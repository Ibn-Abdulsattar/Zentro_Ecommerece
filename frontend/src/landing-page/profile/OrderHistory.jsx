import React from 'react';
import {
  Box,
  Typography,
} from "@mui/material";

export default function OrderHistory() {
  return (
    <Box
          sx={{
            textAlign: "center",
            bgcolor: "#fff",
            p: 2,
            borderRadius: 3,
            mb: 3,
            boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
          }}
        >
          <Typography
            variant="h5"
            sx={{
              fontWeight: "bold",
              background: "linear-gradient(135deg, #1E40AF 0%, #F97316 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              letterSpacing: "0.5px",
            }}
          >
            Order History
          </Typography>
          <Box
            sx={{
              width: "60px",
              height: "3px",
              background: "linear-gradient(90deg, #1E40AF 0%, #F97316 100%)",
              margin: "8px auto 0",
              borderRadius: "2px",
            }}
          />
        </Box>
  )
}
