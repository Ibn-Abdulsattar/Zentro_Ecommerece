import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
  List,
  ListItem,
  Container,
  Chip,
} from "@mui/material";
import { LocalShipping as ShippingIcon } from "@mui/icons-material";
import axios from "axios";
import Banner from "./Banner";
import Stats from "./Stats";
import OrderHistory from "./OrderHistory";
import SaveAdresses from "./SaveAdresses";
import AddAddress from "./AddAddress";


function Profile() {
  const [orders, setOrders] = useState([]);
  const [addresses, setAddresses] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resOrders = await axios.get("/api/user/orders", {
          withCredentials: true,
        });
        const resAddresses = await axios.get("/api/user/addresses", {
          withCredentials: true,
        });
        setOrders(
          Array.isArray(resOrders.data)
            ? resOrders.data
            : resOrders.data.orders || []
        );
        setAddresses(
          Array.isArray(resAddresses.data)
            ? resAddresses.data
            : resAddresses.data.addresses || []
        );
      } catch (err) {
        console.error("Error fetching profile data", err);
      }
    };
    fetchData();
  }, []);

  const getStatusColor = (status) => {
    const statusMap = {
      pending: "#F97316",
      processing: "#1E40AF",
      shipped: "#F97316",
      delivered: "#10B981",
      cancelled: "#EF4444",
    };
    return statusMap[status?.toLowerCase()] || "#6B7280";
  };

  return (
    <Box sx={{ bgcolor: "#F9FAFB", minHeight: "100vh", py: 4 }}>
      <Container maxWidth="xxl">
        {/* Banner */}
        <Banner />

        {/* Quick Stats */}
        <Stats orders={orders} addresses={addresses} />

        {/* Order History Section */}
        <OrderHistory />

        <Card
          sx={{
            mb: 4,
            borderRadius: 3,
            boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
          }}
        >
          <CardContent sx={{ p: 0 }}>
            {orders.length > 0 ? (
              <List sx={{ p: 0 }}>
                {orders.map((order, index) => (
                  <ListItem
                    key={order._id}
                    sx={{
                      py: 3,
                      px: 3,
                      borderBottom:
                        index !== orders.length - 1
                          ? "1px solid #E5E7EB"
                          : "none",
                      transition: "background 0.2s",
                      "&:hover": {
                        bgcolor: "#F9FAFB",
                      },
                    }}
                  >
                    <Grid container spacing={2} alignItems="center">
                      <Grid size={{ xs: 12, md: 3 }}>
                        <Typography
                          variant="body2"
                          sx={{ color: "#6B7280", mb: 0.5 }}
                        >
                          Order ID
                        </Typography>
                        <Typography
                          variant="h6"
                          sx={{ fontWeight: "bold", color: "#1E40AF" }}
                        >
                          #{order._id?.slice(-8).toUpperCase()}
                        </Typography>
                      </Grid>
                      <Grid size={{ xs: 12, md: 3 }}>
                        <Typography
                          variant="body2"
                          sx={{ color: "#6B7280", mb: 0.5 }}
                        >
                          Date
                        </Typography>
                        <Typography sx={{ fontWeight: 500 }}>
                          {new Date(order.createdAt).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            }
                          )}
                        </Typography>
                      </Grid>
                      <Grid size={{ xs: 12, md: 2 }}>
                        <Typography
                          variant="body2"
                          sx={{ color: "#6B7280", mb: 0.5 }}
                        >
                          Status
                        </Typography>
                        <Chip
                          label={order.status}
                          sx={{
                            bgcolor: getStatusColor(order.status),
                            color: "#fff",
                            fontWeight: "bold",
                            textTransform: "capitalize",
                          }}
                        />
                      </Grid>
                      <Grid size={{ xs: 12, md: 2 }}>
                        <Typography
                          variant="body2"
                          sx={{ color: "#6B7280", mb: 0.5 }}
                        >
                          Total
                        </Typography>
                        <Typography
                          variant="h6"
                          sx={{ fontWeight: "bold", color: "#F97316" }}
                        >
                          Rs. {order.total}
                        </Typography>
                      </Grid>
                      <Grid
                        size={{ xs: 12, md: 2 }}
                        sx={{ textAlign: { md: "right" } }}
                      >
                        <Button
                          variant="outlined"
                          size="small"
                          sx={{
                            borderColor: "#1E40AF",
                            color: "#1E40AF",
                            fontWeight: "bold",
                            "&:hover": {
                              borderColor: "#1E40AF",
                              bgcolor: "rgba(30, 64, 175, 0.08)",
                            },
                          }}
                        >
                          View Details
                        </Button>
                      </Grid>
                    </Grid>
                  </ListItem>
                ))}
              </List>
            ) : (
              <Box sx={{ textAlign: "center", py: 6 }}>
                <ShippingIcon sx={{ fontSize: 64, color: "#D1D5DB", mb: 2 }} />
                <Typography variant="h6" sx={{ color: "#6B7280", mb: 1 }}>
                  No orders yet
                </Typography>
                <Typography sx={{ color: "#9CA3AF" }}>
                  Your order history will appear here
                </Typography>
              </Box>
            )}
          </CardContent>
        </Card>

        {/* Saved Addresses Section */}
        <SaveAdresses />

        {/* Add Address */}
        <AddAddress addresses={addresses} />
      </Container>
    </Box>
  );
}

export default Profile;
