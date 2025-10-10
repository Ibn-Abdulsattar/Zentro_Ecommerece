import React, { useState } from "react";
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  Avatar,
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  TextField,
  IconButton,
} from "@mui/material";
import {
  ShoppingBag,
  CreditCard,
  MapPin,
  Package,
  Heart,
  LogOut,
  Edit,
} from "lucide-react";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState(0);

  const userInfo = {
    name: "Ahmed Khan",
    email: "ahmed.khan@example.com",
    phone: "+92 300 1234567",
    address: "Street 5, Sahiwal, Punjab, Pakistan",
  };

  const orders = [
    {
      id: "#ORD-001",
      date: "2 Oct 2025",
      total: "Rs. 4,500",
      status: "Delivered",
      items: 3,
    },
    {
      id: "#ORD-002",
      date: "28 Sep 2025",
      total: "Rs. 8,200",
      status: "Shipped",
      items: 2,
    },
    {
      id: "#ORD-003",
      date: "15 Sep 2025",
      total: "Rs. 2,100",
      status: "Processing",
      items: 1,
    },
    {
      id: "#ORD-004",
      date: "8 Sep 2025",
      total: "Rs. 6,800",
      status: "Delivered",
      items: 4,
    },
  ];

  const wishlist = [
    { id: 1, name: "Wireless Headphones", price: "Rs. 3,500", image: "🎧" },
    { id: 2, name: "Smart Watch", price: "Rs. 12,000", image: "⌚" },
    { id: 3, name: "Laptop Bag", price: "Rs. 2,500", image: "💼" },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "Delivered":
        return "#10B981";
      case "Shipped":
        return "#F97316";
      case "Processing":
        return "#1E40AF";
      default:
        return "#6B7280";
    }
  };

  return (
    <Box sx={{ bgcolor: "#F9FAFB", minHeight: "100vh", pt: 4 }}>
      <Container maxWidth="xxl">
        {/* Header */}
        <Paper
          elevation={0}
          sx={{
            p: 3,
            mb: 3,
            background: `linear-gradient(135deg, #1E40AF 0%, #F97316 100%)`,
            borderRadius: 2,
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Avatar
                sx={{
                  width: 80,
                  height: 80,
                  bgcolor: "#fff",
                  color: "#1E40AF",
                  fontSize: "2rem",
                  fontWeight: "bold",
                }}
              >
                AK
              </Avatar>
              <Box>
                <Typography
                  variant="h4"
                  sx={{ color: "#fff", fontWeight: "bold" }}
                >
                  {userInfo.name}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ color: "#fff", opacity: 0.9 }}
                >
                  {userInfo.email}
                </Typography>
              </Box>
            </Box>
            <Button
              variant="contained"
              startIcon={<LogOut size={18} />}
              sx={{
                bgcolor: "#fff",
                color: "#1E40AF",
                "&:hover": { bgcolor: "#F3F4F6" },
              }}
            >
              Logout
            </Button>
          </Box>
        </Paper>

        <Grid container spacing={3}>
          {/* Sidebar */}
          <Grid size={{ xs: 12, md: 3 }}>
            <Paper elevation={8} sx={{ p: 2, borderRadius: 2 }}>
              <Typography
        variant="h6"
        sx={{
          fontWeight: 'bold',
          color: '#fff',
          mb: 3,
          textAlign: 'center',
          background: 'linear-gradient(135deg, #1E40AF 0%, #F97316 100%)',
          p: 2.5,
          borderRadius: 2,
          boxShadow: '0 4px 15px rgba(30, 64, 175, 0.3)',
          letterSpacing: '1px',
          textTransform: 'uppercase',
          fontSize: '1.1rem',
        }}
      >
        My Dashboard
      </Typography>
              <List>
                <ListItem
                  button
                  selected={activeTab === 0}
                  onClick={() => setActiveTab(0)}
                  sx={{
                    borderRadius: 1,
                    mb: 1,
                    "&.Mui-selected": {
                      bgcolor: "#1E40AF",
                      color: "#fff",
                      "&:hover": { bgcolor: "#1E40AF" },
                    },
                  }}
                >
                  <ListItemIcon
                    sx={{ color: activeTab === 0 ? "#F97316" : "#1E40AF" }}
                  >
                    <Package size={20} />
                  </ListItemIcon>
                  <ListItemText primary="Orders" />
                </ListItem>

                <ListItem
                  button
                  selected={activeTab === 1}
                  onClick={() => setActiveTab(1)}
                  sx={{
                    borderRadius: 1,
                    mb: 1,
                    "&.Mui-selected": {
                      bgcolor: "#1E40AF",
                      color: "#fff",
                      "&:hover": { bgcolor: "#1E40AF" },
                    },
                  }}
                >
                  <ListItemIcon
                    sx={{ color: activeTab === 1 ? "#F97316" : "#1E40AF" }}
                  >
                    <Heart size={20} />
                  </ListItemIcon>
                  <ListItemText primary="Wishlist" />
                </ListItem>

                <ListItem
                  button
                  selected={activeTab === 2}
                  onClick={() => setActiveTab(2)}
                  sx={{
                    borderRadius: 1,
                    "&.Mui-selected": {
                      bgcolor: "#1E40AF",
                      color: "#fff",
                      "&:hover": { bgcolor: "#1E40AF" },
                    },
                  }}
                >
                  <ListItemIcon
                    sx={{ color: activeTab === 2 ? "#F97316" : "#1E40AF" }}
                  >
                    <MapPin size={20} />
                  </ListItemIcon>
                  <ListItemText primary="Addresses" />
                </ListItem>
              </List>
            </Paper>
          </Grid>

          {/* Main Content */}
          <Grid size={{ xs: 12, md: 9 }}>
            <Paper elevation={8} sx={{ p: 3, borderRadius: 2, minHeight: 500 }}>
              {/* Orders Tab */}
              {activeTab === 0 && (
                <Box>
                  <Typography
                    variant="h5"
                    sx={{ fontWeight: "bold", color: "#1E40AF", mb: 3 }}
                  >
                    My Orders
                  </Typography>
                  {orders.map((order) => (
                    <Card
                      key={order.id}
                      sx={{ mb: 2, border: "1px solid #E5E7EB" }}
                    >
                      <CardContent>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            mb: 2,
                          }}
                        >
                          <Box>
                            <Typography
                              variant="h6"
                              sx={{ fontWeight: "bold" }}
                            >
                              {order.id}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {order.date} • {order.items} items
                            </Typography>
                          </Box>
                          <Chip
                            label={order.status}
                            sx={{
                              bgcolor: getStatusColor(order.status),
                              color: "#fff",
                              fontWeight: "bold",
                            }}
                          />
                        </Box>
                        <Divider sx={{ my: 2 }} />
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                        >
                          <Typography
                            variant="h6"
                            sx={{ color: "#F97316", fontWeight: "bold" }}
                          >
                            {order.total}
                          </Typography>
                          <Button
                            variant="outlined"
                            sx={{ borderColor: "#1E40AF", color: "#1E40AF" }}
                          >
                            View Details
                          </Button>
                        </Box>
                      </CardContent>
                    </Card>
                  ))}
                </Box>
              )}

              {/* Wishlist Tab */}
              {activeTab === 1 && (
                <Box>
                  <Typography
                    variant="h5"
                    sx={{ fontWeight: "bold", color: "#1E40AF", mb: 3 }}
                  >
                    My Wishlist
                  </Typography>
                  <Grid container spacing={3}>
                    {wishlist.map((item) => (
                      <Grid size={{ xs: 12, sm: 6, md: 4 }} key={item.id}>
                        <Card sx={{ border: "1px solid #E5E7EB" }}>
                          <CardContent>
                            <Box sx={{ textAlign: "center", mb: 2 }}>
                              <Typography variant="h1">{item.image}</Typography>
                            </Box>
                            <Typography variant="h6" sx={{ mb: 1 }}>
                              {item.name}
                            </Typography>
                            <Typography
                              variant="h6"
                              sx={{
                                color: "#F97316",
                                fontWeight: "bold",
                                mb: 2,
                              }}
                            >
                              {item.price}
                            </Typography>
                            <Button
                              fullWidth
                              variant="contained"
                              sx={{
                                bgcolor: "#1E40AF",
                                "&:hover": { bgcolor: "#1E3A8A" },
                              }}
                            >
                              Add to Cart
                            </Button>
                          </CardContent>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              )}

              {/* Addresses Tab */}
              {activeTab === 2 && (
                <Box>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      mb: 3,
                    }}
                  >
                    <Typography
                      variant="h5"
                      sx={{ fontWeight: "bold", color: "#1E40AF" }}
                    >
                      Saved Addresses
                    </Typography>
                    <Button
                      variant="contained"
                      sx={{
                        bgcolor: "#F97316",
                        "&:hover": { bgcolor: "#EA580C" },
                      }}
                    >
                      Add New Address
                    </Button>
                  </Box>
                  <Card sx={{ border: "2px solid #1E40AF", mb: 2 }}>
                    <CardContent>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "start",
                        }}
                      >
                        <Box>
                          <Chip
                            label="Default"
                            size="small"
                            sx={{ bgcolor: "#1E40AF", color: "#fff", mb: 1 }}
                          />
                          <Typography
                            variant="h6"
                            sx={{ fontWeight: "bold", mb: 1 }}
                          >
                            Home
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {userInfo.address}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {userInfo.phone}
                          </Typography>
                        </Box>
                        <Box>
                          <IconButton size="small" sx={{ color: "#F97316" }}>
                            <Edit size={18} />
                          </IconButton>
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                </Box>
              )}
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Dashboard;
