import React from 'react';
import {
  Box,
  Typography,
  Button,
} from "@mui/material";
import {
  Add as AddIcon,
} from "@mui/icons-material";


export default function SaveAdresses() {
  return (
    <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 3,
            flexWrap: "wrap",
            gap: 2,
          }}
        >
          <Box
            sx={{
              textAlign: "center",
              bgcolor: "#fff",
              p: 2,
              borderRadius: 3,
              flex: 1,
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
              Saved Addresses
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
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            sx={{
              bgcolor: "#F97316",
              fontWeight: "bold",
              px: 3,
              "&:hover": { bgcolor: "#EA580C" },
            }}
          >
            Add New Address
          </Button>
        </Box>
  )
}
