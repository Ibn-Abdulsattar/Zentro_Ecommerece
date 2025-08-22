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
} from "@mui/material";
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


  return (
    <Box sx={{ width: "90%", margin: "auto", my: 9 }}>
      {/* 🔹 User Overview */}
      <Card sx={{ mb: 4 }}>
        <CardContent sx={{ display: "flex", alignItems: "center", gap: 3 }}>
          <Avatar sx={{ width: 80, height: 80, bgcolor: "primary.main" }}>
            {user?.name?.[0]?.toUpperCase()}
          </Avatar>
          <Box>
            <Typography variant="h6">{user?.name}</Typography>
            <Typography color="text.secondary">{user?.email}</Typography>
            <Typography color="text.secondary">
              {user?.phone || "Phone not added"}
            </Typography>
            <Button variant="outlined" size="small" sx={{ mt: 1 }}>
              Edit Profile
            </Button>
          </Box>
        </CardContent>
      </Card>

      {/* 🔹 Order History */}
      <Typography variant="h6" sx={{ mb: 2 }}>
        Order History
      </Typography>
      <Card sx={{ mb: 4 }}>
        <CardContent>
          {orders.length > 0 ? (
            <List>
              {orders.map((order) => (
                <ListItem
                  key={order._id}
                  divider
                  sx={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Box>
                    <Typography>
                      <b>Order #{order._id}</b>
                    </Typography>
                    <Typography color="text.secondary">
                      {new Date(order.createdAt).toLocaleDateString()} | Status:{" "}
                      <b>{order.status}</b>
                    </Typography>
                  </Box>
                  <Box>
                    <Typography><b>${order.total}</b></Typography>
                    <Button size="small" variant="outlined" sx={{ ml: 2 }}>
                      View Details
                    </Button>
                  </Box>
                </ListItem>
              ))}
            </List>
          ) : (
            <Typography>No orders found.</Typography>
          )}
        </CardContent>
      </Card>

      {/* 🔹 Saved Addresses */}
      <Typography variant="h6" sx={{ mb: 2 }}>
        Saved Addresses
      </Typography>
      <Grid container spacing={2}>
        {addresses.length > 0 ? (
          addresses.map((addr) => (
            <Grid item xs={12} md={6} key={addr._id}>
              <Card>
                <CardContent>
                  <Typography><b>{addr.fullName}</b></Typography>
                  <Typography>{addr.street}, {addr.city}</Typography>
                  <Typography>{addr.state} - {addr.zip}</Typography>
                  <Typography color="text.secondary">
                    Phone: {addr.phone}
                  </Typography>
                  <Divider sx={{ my: 1 }} />
                  <Button size="small" variant="outlined" sx={{ mr: 1 }}>
                    Edit
                  </Button>
                  <Button
                    size="small"
                    color="error"
                    variant="outlined"
                    sx={{ mr: 1 }}
                  >
                    Delete
                  </Button>
                  {addr.isDefault ? (
                    <Button size="small" variant="contained" disabled>
                      Default
                    </Button>
                  ) : (
                    <Button size="small" variant="contained">
                      Set Default
                    </Button>
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : (
          <Typography>No addresses saved.</Typography>
        )}
      </Grid>

      <Button variant="contained" sx={{ mt: 3 }}>
        Add New Address
      </Button>
    </Box>
  );
}

export default Profile;
