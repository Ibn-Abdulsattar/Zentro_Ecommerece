import React from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
} from "@mui/material";
import {
  LocalShipping as ShippingIcon,
  CheckCircle as CheckIcon,
  LocationOn as LocationIcon,
} from "@mui/icons-material";


export default function Stats({ orders, addresses }) {
  return (
    <Grid container spacing={3} sx={{ mb: 4 }}>
      <Grid size={{ xs: 12, sm: 4 }}>
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
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
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
      <Grid size={{ xs: 12, sm: 4 }}>
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
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
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
      <Grid size={{ xs: 12, sm: 4 }}>
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
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
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
  );
}
