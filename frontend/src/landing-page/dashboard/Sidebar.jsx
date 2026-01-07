import React from 'react';
import {
  Grid,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from "@mui/material";
import {
  MapPin,
  Package,
  Heart,
} from "lucide-react";

export default function Sidebar({activeTab, setActiveTab}) {
  return (
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
  )
}
