// CartPage.js
import React from "react";
import { useCart } from "./cartContext";
import {
  Grid,
  Paper,
  Typography,
  IconButton,
  Select,
  MenuItem,
  Box,
  Divider,
  Button,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const CartPage = () => {
  const { cart, updateQuantity, removeItem, getTotal } = useCart();

  return (
    <Box sx={{ mt: 6, px: { xs: 2, md: 4 } }}>
      <Grid container spacing={4}>
        {/* Cart Items */}
        <Grid size={{ md: 8, xs: 12 }}>
          {/* Page Title */}
          <Typography
            variant="h4"
            sx={{ textAlign: "center" }}
            fontWeight={800}
            gutterBottom
          >
            <span style={{ borderBottom: "5px solid #F97316" }}>
              Shopping Cart
            </span>
          </Typography>
          {cart.length === 0 ? (
            <Paper sx={{ p: 4, textAlign: "center" }}>
              <Typography variant="h6" color="text.secondary">
                Your cart is empty
              </Typography>
            </Paper>
          ) : (
            cart.map((item) => (
              <Paper
                key={item.id}
                elevation={3}
                sx={{
                  p: 2,
                  mb: 3,
                  borderRadius: 2,
                  "&:hover": { boxShadow: 6 },
                }}
              >
                <Grid container alignItems="center" spacing={2}>
                  {/* Product Image */}
                  <Grid size={{ xs: 3 }}>
                    <Box
                      component="img"
                      src={item.image}
                      alt={item.name}
                      sx={{
                        width: "100%",
                        height: 100,
                        objectFit: "cover",
                        borderRadius: 2,
                      }}
                    />
                  </Grid>

                  {/* Product Details */}
                  <Grid size={{ xs: 3 }}>
                    <Typography variant="subtitle1" color='#1E40AF' fontWeight={600}>
                      {item.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      ${item.price}
                    </Typography>
                  </Grid>

                  {/* Quantity Selector */}
                  <Grid size={{ xs: 3 }}>
                    <Select
                      value={item.quantity}
                      size="small"
                      onChange={(e) =>
                        updateQuantity(item.id, parseInt(e.target.value))
                      }
                      sx={{ minWidth: 60 }}
                    >
                      {[1, 2, 3, 4, 5].map((qty) => (
                        <MenuItem key={qty} value={qty}>
                          {qty}
                        </MenuItem>
                      ))}
                    </Select>
                  </Grid>

                  {/* Price + Remove */}
                  <Grid size={{ xs: 2 }}>
                    <Typography color="#1E40AF" fontWeight={700}>
                      ${(item.price * item.quantity).toFixed(2)}
                    </Typography>
                  </Grid>
                  <Grid size={{ xs: 1 }}>
                    <IconButton
                      color="error"
                      onClick={() => removeItem(item.id)}
                      size="small"
                    >
                      <DeleteIcon sx={{ color: "#F97316", '&:hover':{color:"#c3570aff"} }} />
                    </IconButton>
                  </Grid>
                </Grid>
              </Paper>
            ))
          )}
        </Grid>

        {/* Price Summary */}
        <Grid size={{ xs: 12, md: 4 }}>
          {/* Page Title */}
          <Typography
            variant="h4"
            sx={{ textAlign: "center" }}
            fontWeight={800}
            gutterBottom
          >
            <span style={{ borderBottom: "5px solid #F97316" }}>Total</span>
          </Typography>
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
              variant="contained"
              fullWidth
              size="large"
              sx={{ mt: 2, py: 1.5, fontWeight: 600, bgcolor: "#F97316", '&:hover':{bgcolor:"#c3570aff"} }}
            >
              Checkout
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CartPage;
