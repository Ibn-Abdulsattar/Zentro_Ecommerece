import {
  Box,
  Grid,
  Paper,
  Typography,
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  IconButton,
} from "@mui/material";
import {
  Edit,
} from "lucide-react";

export default function MainContent({activeTab, orders, getStatusColor, wishlist, userInfo}) {
  return (
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
  )
}
