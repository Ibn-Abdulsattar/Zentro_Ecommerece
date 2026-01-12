import { useCart } from "./cartContext";
import { Grid, Paper, Typography, Box } from "@mui/material";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import OrderSummary from "./OrderSummary";
import CartProduct from "./CartProduct";

const CartPage = () => {
  const { setAlert } = useAuth();
  const { cart, updateQuantity, removeItem, getTotal } = useCart();

  const handleCheckout = async () => {
    try {
      await axios
        .post(
          `${import.meta.env.VITE_Backend_Url}/payment/create-checkout-session`,
          { cartItems: cart }
        )
        .then((response) => {
          if (response.data.url) {
            window.location.href = response.data.url;
          }
        });
      setAlert({
        type: "success",
        message: "Redirecting to checkout...",
      });
    } catch (error) {
      setAlert({
        type: "error",
        message: error.message || "Failed to initiate checkout.",
      });
    }
  };

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
          {cart.map((item) => (
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
              {/* Cart Product Details */}
              <CartProduct
                item={item}
                updateQuantity={updateQuantity}
                removeItem={removeItem}
              />
            </Paper>
          ))}
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
          {/* Order Summary */}
          <OrderSummary getTotal={getTotal} handleCheckout={handleCheckout} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default CartPage;
