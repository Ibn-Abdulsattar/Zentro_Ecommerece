import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Avatar,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemText,
  Container,
  Chip,
  IconButton,
  Paper,
  ListItemIcon,
} from "@mui/material";
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Home as HomeIcon,
  LocalShipping as ShippingIcon,
  CheckCircle as CheckIcon,
  Add as AddIcon,
  Phone as PhoneIcon,
  Email as EmailIcon,
  LocationOn as LocationIcon,
} from "@mui/icons-material";
import axios from "axios";

function Profile() {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [addresses, setAddresses] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resUser = await axios.get("/api/user/me", { withCredentials: true });
        const resOrders = await axios.get("/api/user/orders", { withCredentials: true });
        const resAddresses = await axios.get("/api/user/addresses", { withCredentials: true });

        setUser(resUser.data);
        setOrders(Array.isArray(resOrders.data) ? resOrders.data : resOrders.data.orders || []);
        setAddresses(Array.isArray(resAddresses.data) ? resAddresses.data : resAddresses.data.addresses || []);
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
        {/* Header with Gradient */}
        <Paper
          elevation={0}
          sx={{
            p: 4,
            mb: 4,
            background: "linear-gradient(135deg, #1E40AF 0%, #F97316 100%)",
            borderRadius: 3,
            position: "relative",
            overflow: "hidden",
            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              right: 0,
              width: "300px",
              height: "300px",
              background: "rgba(255, 255, 255, 0.1)",
              borderRadius: "50%",
              transform: "translate(50%, -50%)",
            },
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 3, flexWrap: "wrap", position: "relative", zIndex: 1 }}>
            <Avatar
              sx={{
                width: 100,
                height: 100,
                bgcolor: "#fff",
                color: "#1E40AF",
                fontSize: "2.5rem",
                fontWeight: "bold",
                border: "4px solid rgba(255, 255, 255, 0.3)",
                boxShadow: "0 8px 16px rgba(0,0,0,0.2)",
              }}
            >
              {user?.name?.[0]?.toUpperCase() || "U"}
            </Avatar>
            <Box sx={{ flex: 1 }}>
              <Typography variant="h4" sx={{ color: "#fff", fontWeight: "bold", mb: 1 }}>
                {user?.name || "User"}
              </Typography>
              <Box sx={{ display: "flex", gap: 3, flexWrap: "wrap", mb: 2 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <EmailIcon sx={{ color: "#fff", opacity: 0.9 }} fontSize="small" />
                  <Typography sx={{ color: "#fff", opacity: 0.9 }}>
                    {user?.email || "email@example.com"}
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <PhoneIcon sx={{ color: "#fff", opacity: 0.9 }} fontSize="small" />
                  <Typography sx={{ color: "#fff", opacity: 0.9 }}>
                    {user?.phone || "Phone not added"}
                  </Typography>
                </Box>
              </Box>
              <Button
                variant="contained"
                startIcon={<EditIcon />}
                sx={{
                  bgcolor: "#fff",
                  color: "#1E40AF",
                  fontWeight: "bold",
                  "&:hover": { bgcolor: "#F3F4F6" },
                }}
              >
                Edit Profile
              </Button>
            </Box>
          </Box>
        </Paper>

        {/* Quick Stats */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid size={{xs:12, sm:4}}>
            <Card
              sx={{
                background: "linear-gradient(135deg, #1E40AF 0%, #3B82F6 100%)",
                color: "#fff",
                transition: "transform 0.3s",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: "0 8px 20px rgba(30, 64, 175, 0.3)",
                },
              }}
            >
              <CardContent>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <Box>
                    <Typography variant="h3" sx={{ fontWeight: "bold", mb: 1 }}>
                      {orders.length}
                    </Typography>
                    <Typography sx={{ opacity: 0.9 }}>Total Orders</Typography>
                  </Box>
                  <ShippingIcon sx={{ fontSize: 48, opacity: 0.3 }} />
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid size={{xs:12, sm:4}}>
            <Card
              sx={{
                background: "linear-gradient(135deg, #F97316 0%, #FB923C 100%)",
                color: "#fff",
                transition: "transform 0.3s",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: "0 8px 20px rgba(249, 115, 22, 0.3)",
                },
              }}
            >
              <CardContent>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <Box>
                    <Typography variant="h3" sx={{ fontWeight: "bold", mb: 1 }}>
                      {orders.filter((o) => o.status === "delivered").length}
                    </Typography>
                    <Typography sx={{ opacity: 0.9 }}>Completed</Typography>
                  </Box>
                  <CheckIcon sx={{ fontSize: 48, opacity: 0.3 }} />
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid size={{xs:12, sm:4}}>
            <Card
              sx={{
                background: "linear-gradient(135deg, #10B981 0%, #34D399 100%)",
                color: "#fff",
                transition: "transform 0.3s",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: "0 8px 20px rgba(16, 185, 129, 0.3)",
                },
              }}
            >
              <CardContent>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <Box>
                    <Typography variant="h3" sx={{ fontWeight: "bold", mb: 1 }}>
                      {addresses.length}
                    </Typography>
                    <Typography sx={{ opacity: 0.9 }}>Addresses</Typography>
                  </Box>
                  <LocationIcon sx={{ fontSize: 48, opacity: 0.3 }} />
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Order History Section */}
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
                      borderBottom: index !== orders.length - 1 ? "1px solid #E5E7EB" : "none",
                      transition: "background 0.2s",
                      "&:hover": {
                        bgcolor: "#F9FAFB",
                      },
                    }}
                  >
                    <Grid container spacing={2} alignItems="center">
                      <Grid size={{xs:12, md:3}}>
                        <Typography variant="body2" sx={{ color: "#6B7280", mb: 0.5 }}>
                          Order ID
                        </Typography>
                        <Typography variant="h6" sx={{ fontWeight: "bold", color: "#1E40AF" }}>
                          #{order._id?.slice(-8).toUpperCase()}
                        </Typography>
                      </Grid>
                      <Grid size={{xs:12, md:3}}>
                        <Typography variant="body2" sx={{ color: "#6B7280", mb: 0.5 }}>
                          Date
                        </Typography>
                        <Typography sx={{ fontWeight: 500 }}>
                          {new Date(order.createdAt).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </Typography>
                      </Grid>
                      <Grid size={{xs:12, md:2}}>
                        <Typography variant="body2" sx={{ color: "#6B7280", mb: 0.5 }}>
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
                      <Grid size={{xs:12, md:2}}>
                        <Typography variant="body2" sx={{ color: "#6B7280", mb: 0.5 }}>
                          Total
                        </Typography>
                        <Typography variant="h6" sx={{ fontWeight: "bold", color: "#F97316" }}>
                          Rs. {order.total}
                        </Typography>
                      </Grid>
                      <Grid size={{xs:12, md:2}}sx={{ textAlign: { md: "right" } }}>
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

        <Grid container spacing={3}>
          {addresses.length > 0 ? (
            addresses.map((addr) => (
              <Grid size={{xs:12, md:6}} key={addr._id}>
                <Card
                  sx={{
                    borderRadius: 3,
                    border: addr.isDefault ? "2px solid #1E40AF" : "1px solid #E5E7EB",
                    transition: "all 0.3s",
                    position: "relative",
                    "&:hover": {
                      boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
                      transform: "translateY(-4px)",
                    },
                  }}
                >
                  {addr.isDefault && (
                    <Box
                      sx={{
                        position: "absolute",
                        top: 0,
                        right: 0,
                        bgcolor: "#1E40AF",
                        color: "#fff",
                        px: 2,
                        py: 0.5,
                        borderBottomLeftRadius: 8,
                        borderTopRightRadius: 8,
                        fontWeight: "bold",
                        fontSize: "0.75rem",
                      }}
                    >
                      DEFAULT
                    </Box>
                  )}
                  <CardContent sx={{ p: 3 }}>
                    <Box sx={{ display: "flex", alignItems: "start", gap: 2, mb: 2 }}>
                      <HomeIcon sx={{ color: "#F97316", mt: 0.5 }} />
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
                          {addr.fullName}
                        </Typography>
                        <Typography sx={{ color: "#6B7280", mb: 0.5 }}>
                          {addr.street}, {addr.city}
                        </Typography>
                        <Typography sx={{ color: "#6B7280", mb: 1 }}>
                          {addr.state} - {addr.zip}
                        </Typography>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                          <PhoneIcon sx={{ fontSize: 16, color: "#9CA3AF" }} />
                          <Typography sx={{ color: "#6B7280", fontSize: "0.9rem" }}>
                            {addr.phone}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>

                    <Divider sx={{ my: 2 }} />

                    <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                      <Button
                        size="small"
                        variant="outlined"
                        startIcon={<EditIcon />}
                        sx={{
                          borderColor: "#1E40AF",
                          color: "#1E40AF",
                          "&:hover": {
                            borderColor: "#1E40AF",
                            bgcolor: "rgba(30, 64, 175, 0.08)",
                          },
                        }}
                      >
                        Edit
                      </Button>
                      <Button
                        size="small"
                        variant="outlined"
                        startIcon={<DeleteIcon />}
                        sx={{
                          borderColor: "#EF4444",
                          color: "#EF4444",
                          "&:hover": {
                            borderColor: "#EF4444",
                            bgcolor: "rgba(239, 68, 68, 0.08)",
                          },
                        }}
                      >
                        Delete
                      </Button>
                      {!addr.isDefault && (
                        <Button
                          size="small"
                          variant="contained"
                          sx={{
                            bgcolor: "#10B981",
                            "&:hover": { bgcolor: "#059669" },
                          }}
                        >
                          Set Default
                        </Button>
                      )}
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))
          ) : (
            <Grid size={{xs:12}}>
              <Card
                sx={{
                  borderRadius: 3,
                  border: "2px dashed #D1D5DB",
                  bgcolor: "#F9FAFB",
                }}
              >
                <CardContent>
                  <Box sx={{ textAlign: "center", py: 4 }}>
                    <LocationIcon sx={{ fontSize: 64, color: "#D1D5DB", mb: 2 }} />
                    <Typography variant="h6" sx={{ color: "#6B7280", mb: 1 }}>
                      No addresses saved
                    </Typography>
                    <Typography sx={{ color: "#9CA3AF", mb: 3 }}>
                      Add your first address to make checkout faster
                    </Typography>
                    <Button
                      variant="contained"
                      startIcon={<AddIcon />}
                      sx={{
                        bgcolor: "#F97316",
                        fontWeight: "bold",
                        "&:hover": { bgcolor: "#EA580C" },
                      }}
                    >
                      Add Address
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          )}
        </Grid>
      </Container>
    </Box>
  );
}

export default Profile;