import React from "react";
import {
  Drawer,
  Box,
  Typography,
  List,
  Toolbar,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Chip,
  useTheme,
  alpha,
  Link,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate, useLocation } from "react-router-dom";

// ---- Icons ----
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PaymentIcon from "@mui/icons-material/Payment";
import InventoryIcon from "@mui/icons-material/Inventory";
import AssessmentIcon from "@mui/icons-material/Assessment";
import SettingsIcon from "@mui/icons-material/Settings";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";

const drawerWidth = 280;

// ---- Sidebar Config (Pages) ----
const sidebarConfig = [
  {
    label: "Dashboard",
    path: "/",
    icon: <DashboardIcon />,
    badge: null,
    color: "#1976d2",
  },
  {
    label: "Customers",
    path: "/customers",
    icon: <PeopleIcon />,
    badge: "124",
    color: "#2e7d32",
  },
  {
    label: "Orders",
    path: "/orders",
    icon: <ShoppingCartIcon />,
    badge: "18",
    color: "#ed6c02",
  },
  {
    label: "Payments",
    path: "/payments",
    icon: <PaymentIcon />,
    badge: null,
    color: "#9c27b0",
  },
  {
    label: "Products",
    path: "/products",
    icon: <InventoryIcon />,
    badge: "256",
    color: "#d32f2f",
  },
  {
    label: "Reports & Analytics",
    path: "/analytics",
    icon: <AnalyticsIcon />,
    badge: "New",
    color: "#00897b",
  },
  {
    label: "Settings",
    path: "/setting",
    icon: <SettingsIcon />,
    badge: null,
    color: "#5e35b1",
  },
];

// ---- Sidebar Item Component ----
function SidebarItem({ label, path, icon, badge, color }) {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isActive = location.pathname === path;

  return (
    <ListItemButton
      onClick={() => navigate(path)}
      sx={{
        borderRadius: "12px",
        mb: 0.5,
        mx: 1.5,
        minHeight: 48,
        position: "relative",
        overflow: "visible",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        bgcolor: isActive
          ? alpha(color, theme.palette.mode === "dark" ? 0.2 : 0.12)
          : "transparent",
        color: isActive ? color : "text.primary",
        "&::before": {
          content: '""',
          position: "absolute",
          left: 0,
          top: "50%",
          transform: "translateY(-50%)",
          height: isActive ? "70%" : "0%",
          width: 4,
          bgcolor: color,
          transition: "height 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          borderRadius: "0 4px 4px 0",
        },
        "&:hover": {
          bgcolor: isActive
            ? alpha(color, theme.palette.mode === "dark" ? 0.25 : 0.16)
            : alpha(color, theme.palette.mode === "dark" ? 0.1 : 0.06),
          transform: "translateX(2px)",
          "& .MuiListItemIcon-root": {
            color: color,
            transform: "scale(1.1)",
          },
        },
        "&:active": {
          transform: "scale(0.98)",
        },
      }}
    >
      <ListItemIcon
        sx={{
          color: isActive ? color : "text.secondary",
          minWidth: 42,
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          "& .MuiSvgIcon-root": {
            fontSize: "1.5rem",
          },
        }}
      >
        {icon}
      </ListItemIcon>
      <ListItemText
        primary={label}
        primaryTypographyProps={{
          fontWeight: isActive ? 600 : 500,
          fontSize: "0.938rem",
          transition: "font-weight 0.2s ease",
          letterSpacing: "0.01em",
        }}
      />
      {badge && (
        <Chip
          label={badge}
          size="small"
          sx={{
            height: 22,
            fontSize: "0.688rem",
            fontWeight: 600,
            bgcolor: isActive
              ? theme.palette.mode === "dark"
                ? alpha(theme.palette.common.white, 0.15)
                : alpha(color, 0.15)
              : color,
            color: isActive
              ? color
              : theme.palette.mode === "dark"
              ? "grey.900"
              : theme.palette.common.white,
            border: isActive ? `1.5px solid ${alpha(color, 0.5)}` : "none",
            minWidth: 28,
            "& .MuiChip-label": {
              px: badge.length > 2 ? 1 : 0.75,
            },
            transition: "all 0.3s ease",
          }}
        />
      )}
    </ListItemButton>
  );
}

// ---- Main Sidebar Component ----
export default function Sidebar({ mobileOpen, onDrawerToggle, isMobile, onMenuClick }) {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const drawerContent = (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        bgcolor: isDark ? "grey.900" : "#fafafa",
      }}
    >
      {/* Header */}
      <Toolbar
        sx={{
          px: 2.5,
          py: 0.2,
          bgcolor: isDark
            ? alpha(theme.palette.background.paper, 0.6)
            : "background.paper",
          borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
          boxShadow: isDark
            ? "0 2px 12px rgba(0,0,0,0.3)"
            : "0 2px 12px rgba(0,0,0,0.06)",
        }}
      >
        <Box
          display="flex"
          alignItems="center"
          gap={1.5}
          sx={{
            width: "100%",
            transition: "all 0.3s ease",
            cursor: "pointer",
            "&:hover": {
              transform: "translateY(-1px)",
            },
          }}
        >
          <Box
            sx={{
              p: 0.5,
              borderRadius: "14px",
              bgcolor: alpha(theme.palette.primary.main, 0.12),
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "all 0.3s ease",
              "&:hover": {
                transform: "rotate(-5deg)",
              },
            }}
          >
            <Link href="/" sx={{ display: "flex", textDecoration: "none" }}>
              <AdminPanelSettingsIcon
                sx={{
                  color: "primary.main",
                  fontSize: "2rem",
                }}
              />
            </Link>
          </Box>
          <Box sx={{ flex: 1 }}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                // fontSize: "1.25rem",
                background: isDark
                  ? `linear-gradient(135deg, ${theme.palette.primary.light}, ${theme.palette.secondary.light})`
                  : `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                lineHeight: 1.3,
                letterSpacing: "-0.02em",
              }}
            >
              Admin Panel
            </Typography>
            <Typography
              variant="caption"
              sx={{
                color: "text.secondary",
                fontSize: "0.75rem",
                fontWeight: 500,
                letterSpacing: "0.03em",
              }}
            >
              Management System
            </Typography>
          </Box>
        </Box>
        <IconButton sx={{display:{xs: "inline-flex", md: "none"},}} onClick={onMenuClick} aria-label="close">
          <CloseIcon />
        </IconButton>
      </Toolbar>

      {/* Navigation Menu */}
      <Box
        sx={{
          flex: 1,
          overflow: "auto",
          py: 2,
          "&::-webkit-scrollbar": {
            width: 8,
          },
          "&::-webkit-scrollbar-track": {
            bgcolor: "transparent",
            my: 1,
          },
          "&::-webkit-scrollbar-thumb": {
            bgcolor: alpha(theme.palette.primary.main, 0.2),
            borderRadius: 4,
            border: `2px solid ${isDark ? theme.palette.grey[900] : "#fafafa"}`,
            "&:hover": {
              bgcolor: alpha(theme.palette.primary.main, 0.4),
            },
          },
        }}
      >
        <List sx={{ px: 0 }}>
          {sidebarConfig.map((item, idx) => (
            <SidebarItem key={idx} {...item} />
          ))}
        </List>
      </Box>

      {/* Footer */}
      <Box
        sx={{
          p: 2.5,
          borderTop: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
          bgcolor: isDark
            ? alpha(theme.palette.background.paper, 0.6)
            : "background.paper",
          boxShadow: isDark
            ? "0 -2px 12px rgba(0,0,0,0.3)"
            : "0 -2px 12px rgba(0,0,0,0.06)",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 1,
            mb: 0.5,
          }}
        ></Box>
        <Typography
          variant="caption"
          sx={{
            color: "text.disabled",
            textAlign: "center",
            display: "block",
            fontSize: "1rem",
            fontWeight: 600,
          }}
        >
          © 2025 Admin Panel v2.1.0
        </Typography>
      </Box>
    </Box>
  );

  return (
    <>
      {/* Mobile Drawer */}
      {isMobile ? (
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={onDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              border: "none",
              boxShadow: "0 8px 32px rgba(0,0,0,0.15)",
            },
          }}
        >
          {drawerContent}
        </Drawer>
      ) : (
        /* Desktop Permanent Drawer */
        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
              border: "none",
              boxShadow: isDark
                ? "0 0 24px rgba(0,0,0,0.4)"
                : "0 0 24px rgba(0,0,0,0.08)",
              zIndex: theme.zIndex.drawer,
            },
          }}
          open
        >
          {drawerContent}
        </Drawer>
      )}
    </>
  );
}
