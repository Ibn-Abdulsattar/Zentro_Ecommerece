// Sidebar.jsx
import React from "react";
import {
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Divider,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";

export const drawerWidth = 250;

export default function Sidebar({ open, toggleDrawer }) {
  const section = [
    { pg: "Dashboard", url: "/" },
    { pg: "Customers", url: "/customers" },
    { pg: "Orders", url: "/orders" },
    { pg: "Products", url: "/products" },
    { pg: "Settings", url: "/setting" },
    { pg: "Analytics", url: "/analytics" },
  ];

  const DrawerList = (
    <Box sx={{ width: drawerWidth }} role="presentation">
      <List>
        {section.map((item, index) => (
          <ListItem sx={{ my: 2 }} key={item.pg} disablePadding>
            <ListItemButton sx={{ py: 2 }} href={item.url}>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={item.pg} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
    </Box>
  );

  return (
    <>
      {/* Temporary drawer on mobile */}
      <Drawer
        variant="temporary"
        open={open}
        onClose={toggleDrawer(false)}
        ModalProps={{ keepMounted: true }} // Better mobile performance
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
        }}
      >
                <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          px: 2,
          py: 1.5,
          bgcolor: "primary.main",
          color: "#fff",
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          🛍️ Zentro
        </Typography>
        <IconButton onClick={toggleDrawer(false)} sx={{ color: "#fff" }}>
          <CloseIcon />
        </IconButton>
      </Box>
        {DrawerList}
        <Typography
          variant="body2"
          sx={{
            fontWeight: 500,
            mt: "auto",
            pb: 3,
            pl: 1,
            borderTop: "1px: solid #333232ff",
          }}
        >
          © {new Date().getFullYear()} 🛍️ Zentro Admin Panel
        </Typography>
      </Drawer>

      {/* Permanent drawer on desktop */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", md: "block" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
            top: "64px", // space for Navbar
            bottom: "48px", // space for Footer
            // height: "79%",
          },
        }}
        open
      >

        {DrawerList}
        <Typography
          variant="body2"
          sx={{ fontWeight: 500, mt: "auto", pb: 3, pl: 1 }}
        >
          © {new Date().getFullYear()} 🛍️ Zentro Admin Panel
        </Typography>
      </Drawer>
    </>
  );
}
