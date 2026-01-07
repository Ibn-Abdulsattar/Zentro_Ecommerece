import React, { useState } from "react";
import {
  Box,
  Container,
  Grid,
} from "@mui/material";
import Banner from "../../component/Banner";
import Sidebar from "./Sidebar";
import MainContent from "./MainContent";

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
        <Banner/>

        <Grid container spacing={3}>
          {/* Sidebar */}
          <Sidebar activeTab={activeTab} setActiveTab={setActiveTab}  />

          {/* Main Content */}
          <MainContent activeTab={activeTab} orders={orders} getStatusColor={getStatusColor} wishlist={wishlist} userInfo={userInfo} />
        </Grid>
      </Container>
    </Box>
  );
};

export default Dashboard;
