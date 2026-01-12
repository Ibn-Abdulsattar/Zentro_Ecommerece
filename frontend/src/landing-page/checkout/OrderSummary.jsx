import React from 'react'
import {
  Paper,
  Typography,
  Box,
  Divider,
  Button,
} from "@mui/material";

export default function OrderSummary({getTotal, handleCheckout}) {
  return (
    <Paper
            elevation={4}
            sx={{
              p: 3,
              borderRadius: 3,
              bgcolor: "background.paper",
              "&:hover": { boxShadow: 6 },
            }}
          >
            <Typography
              variant="h6"
              fontWeight={600}
              color="#F97316"
              gutterBottom
            >
              Order Summary
            </Typography>
            <Divider sx={{ my: 2 }} />

            <Box display="flex" justifyContent="space-between" mb={2}>
              <Typography color="text.secondary">Subtotal</Typography>
              <Typography color="#1E40AF" fontWeight={600}>
                ${getTotal().toFixed(2)}
              </Typography>
            </Box>

            <Box display="flex" justifyContent="space-between" mb={2}>
              <Typography color="text.secondary">Shipping</Typography>
              <Typography color="#1E40AF" fontWeight={600}>
                $20.00
              </Typography>
            </Box>

            <Divider sx={{ my: 2 }} />

            <Box display="flex" justifyContent="space-between" mb={2}>
              <Typography variant="h6">Total</Typography>
              <Typography variant="h6" fontWeight={700} color="#F97316">
                ${(getTotal() + 20).toFixed(2)}
              </Typography>
            </Box>

            <Button
              onClick={handleCheckout}
              variant="contained"
              fullWidth
              size="large"
              sx={{
                mt: 2,
                py: 1.5,
                fontWeight: 600,
                bgcolor: "#F97316",
                "&:hover": { bgcolor: "#c3570aff" },
              }}
            >
              Checkout
            </Button>
          </Paper>
  )
}
