import React, { useState } from "react";
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  Button,
  Card,
  CardContent,
  Divider,
  TextField,
  IconButton,
} from "@mui/material";
import {
  Person as PersonIcon,
  LocalShipping as PackageIcon,
  Favorite as HeartIcon,
  LocationOn as MapPinIcon,
  Edit as EditIcon,
  Save as SaveIcon,
  Close as CloseIcon,
  ExitToApp as LogoutIcon,
} from "@mui/icons-material";
import Banner from "../../component/Banner";
import AccountTitle from "./AccountTitle";
import QuickStats from "./QuickStats";
import AccountInfo from "./AccountInfo";
import AccountInfoEdit from "./AccountInfoEdit";

export default function Account() {
  const [isEditing, setIsEditing] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: "Ahmed Khan",
    email: "ahmed.khan@example.com",
    phone: "+92 300 1234567",
    address: "Street 5, Sahiwal, Punjab, Pakistan",
  });

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

  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = () => {
    setIsEditing(false);
  };

  return (
    <Box sx={{ bgcolor: "#F9FAFB", minHeight: "100vh", py: 4 }}>
      <Container maxWidth="xxl">
        {/* Header */}
        <Banner />

        {/* Account Title */}
        <AccountTitle />

        {/* Main Content */}

        <Grid container spacing={3}>
          <Grid size={{ xs: 12 }}>
            <Paper
              elevation={0}
              sx={{
                p: 3,
                borderRadius: 3,
                minHeight: 500,
                boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
              }}
            >
              {/* Account Tab */}
              <Box>
                {/* Account Info */}
                <AccountInfo
                  isEditin={isEditing}
                  handleEdit={handleEdit}
                  handleSave={handleSave}
                />

                {/* Account Info Edit */}
                <AccountInfoEdit
                  userInfo={userInfo}
                  isEditing={isEditing}
                  setUserInfo={setUserInfo}
                />

                <Divider sx={{ my: 4 }} />

                {/* Quick Stats */}
                <QuickStats orders={orders} wishlist={wishlist} />
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
