import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import Badge from "@mui/material/Badge";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useNavigate } from "react-router-dom";
import Authenticate from "./authenticate/authenticate";
import { Link } from "@mui/material";
import { useAuth } from "./AuthContext";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { styled, alpha } from "@mui/material/styles";
import axios from "axios";

function Navbar() {
  const navigate = useNavigate();

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [authOpen, setAuthOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const { user, setAlert, setUser } = useAuth();
  const userMenuButtonRef = React.useRef(null);

  const pages = [
    "House Made",
    "Electronics",
    "Fashion",
    "Beauty",
    "Sports",
    "Toys & Kids",
  ];

  // Handle scroll effect
  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = () => {
    setAnchorElUser(userMenuButtonRef.current);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleProfile = () => {
    handleCloseUserMenu();
    navigate("/profile");
  };

  const handleDashboard = () => {
    handleCloseUserMenu();
    navigate("/dashboard");
  };

  const handleAccount = () => {
    handleCloseUserMenu();
    navigate("/account");
  };

  const handleLogout = () => {
    axios
      .post(
        `${import.meta.env.VITE_Backend_Url}/user/logout`,
        {type: "user"},
        { withCredentials: true }
      )
      .then(() => {
        handleCloseUserMenu();
        setAlert({ type: "success", message: "You logged out successfuly" });
        setUser(null);
      })
      .catch((err) => {
        console.log(err);

      });
  };

  const handleRegister = () => {
    handleCloseUserMenu();
    setAuthOpen(true);
  };

  const settings = [
    { sec: "Profile", handler: handleProfile },
    { sec: "Account", handler: handleAccount },
    { sec: "Dashboard", handler: handleDashboard },
    { sec: "Logout", handler: handleLogout },
  ];

  const StyledIconButton = styled(IconButton)(({ theme }) => ({
    color: "inherit",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    borderRadius: theme.spacing(2),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.15),
      transform: "scale(1.05)",
      boxShadow: `0 4px 15px ${alpha(theme.palette.common.black, 0.2)}`,
    },
    "&:active": {
      transform: "scale(0.95)",
    },
  }));

  const NavButton = styled(Button)(({ theme }) => ({
    margin: theme.spacing(0, 1),
    color: "white",
    fontWeight: 500,
    fontSize: "0.95rem",
    padding: theme.spacing(1, 2),
    borderRadius: theme.spacing(1),
    position: "relative",
    overflow: "hidden",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    "&::before": {
      content: '""',
      position: "absolute",
      bottom: 0,
      left: "50%",
      width: 0,
      height: "3px",
      backgroundColor: "#F97316",
      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
      transform: "translateX(-50%)",
    },
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.1),
      transform: "translateY(-2px)",
      "&::before": {
        width: "80%",
      },
    },
    "&:active": {
      transform: "translateY(0)",
    },
  }));

  const StyledAppBar = styled(AppBar)(({ scrolled }) => ({
    background: scrolled ? "rgba(30, 64, 175, 0.95)" : "#1E40AF",
    backdropFilter: scrolled ? "blur(10px)" : "none",
    boxShadow: scrolled ? "0 4px 30px rgba(0, 0, 0, 0.1)" : "none",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  }));

  return (
    <>
      <StyledAppBar position="sticky" scrolled={scrolled}>
        <Container maxWidth="xxl">
          <Toolbar disableGutters>
            {/* Desktop Logo */}
            <Link
              href="/"
              sx={{
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Avatar
                src="/Zentro-logo-transparent.png"
                alt="Zentro Logo"
                sx={{
                  width: 200,
                  height: "5rem",
                  display: { md: "flex", xs: "none" },
                  cursor: "pointer",
                  transition: "transform 0.3s ease",
                  "&:hover": {
                    transform: "scale(1.05)",
                  },
                }}
              />
            </Link>

            {/* Mobile Menu Icon */}
            <Box sx={{ flexGrow: 0, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="navigation menu"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
                sx={{
                  "&:hover": {
                    backgroundColor: alpha("#fff", 0.1),
                  },
                }}
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
                PaperProps={{
                  elevation: 8,
                  sx: {
                    mt: 1,
                    borderRadius: 2,
                    minWidth: 200,
                    boxShadow: "0 8px 32px rgba(0,0,0,0.15)",
                  },
                }}
              >
                {pages.map((page) => (
                  <MenuItem
                    key={page}
                    onClick={handleCloseNavMenu}
                    sx={{
                      py: 1.5,
                      "&:hover": {
                        backgroundColor: alpha("#1E40AF", 0.08),
                      },
                    }}
                  >
                    <Typography sx={{ fontWeight: 500 }}>{page}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>

            {/* Mobile Logo */}
            <Link
              href="/"
              sx={{ textDecoration: "none", display: "flex", flexGrow: 1 }}
            >
              <Avatar
                src="/Zentro-logo-transparent.png"
                alt="Zentro Logo"
                sx={{
                  width: 190,
                  height: "5rem",
                  display: { xs: "flex", md: "none" },
                }}
              />
            </Link>

            {/* Desktop Navigation Links */}
            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                ml: "auto",
                mr: 2,
                alignItems: "center",
              }}
            >
              {pages.map((page) => (
                <NavButton key={page} onClick={handleCloseNavMenu}>
                  {page}
                </NavButton>
              ))}
            </Box>

            {/* Action Icons */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              {user && (
                <>
                  <StyledIconButton size="medium" aria-label="notifications">
                    <Badge badgeContent={3} color="error">
                      <NotificationsIcon />
                    </Badge>
                  </StyledIconButton>

                  <StyledIconButton size="medium" aria-label="shopping cart">
                    <Badge badgeContent={2} color="error">
                      <ShoppingCartIcon />
                    </Badge>
                  </StyledIconButton>
                </>
              )}

              {/* User Avatar */}
              <Tooltip title={user ? "Account settings" : "Sign in"} arrow>
                <StyledIconButton
                  ref={userMenuButtonRef}
                  size="medium"
                  edge="end"
                  aria-label="account"
                  onClick={user ? handleOpenUserMenu : handleRegister}
                  sx={{ ml: 1 }}
                >
                  <Avatar
                    sx={{
                      width: 40,
                      height: 40,
                      bgcolor: user ? "#F97316" : "transparent",
                      border: user ? "none" : "2px solid white",
                      fontSize: "1.1rem",
                      fontWeight: 600,
                    }}
                  >
                    {user ? (
                      user.username.charAt(0).toUpperCase()
                    ) : (
                      <AccountCircleIcon sx={{ fontSize: 28 }} />
                    )}
                  </Avatar>
                </StyledIconButton>
              </Tooltip>

              {/* User Menu */}
              <Menu
                sx={{ ml: { xs: 25, sm: 80, md: 105, lg: 143 } }}
                id="menu-appbar"
                anchorPosition={{ top: 70, left: 0 }}
                anchorEl={anchorElUser}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left", // ✅ aligns under avatar’s right edge
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right", // ✅ makes it open downward-right
                }}
                getContentAnchorEl={null} // ✅ (old versions) prevents auto-centering
                keepMounted
                PaperProps={{
                  elevation: 8,
                  sx: {
                    mt: 5.5,
                    borderRadius: 2,
                    minWidth: 180,
                    backgroundColor: "background.paper",
                    boxShadow: "0 8px 32px rgba(0,0,0,0.15)",
                    overflow: "visible",
                    "&::before": {
                      content: '""',
                      display: "block",
                      position: "absolute",
                      top: 0,
                      right: 14,
                      width: 10,
                      height: 10,
                      bgcolor: "background.paper",
                      transform: "translateY(-50%) rotate(45deg)",
                      zIndex: 0,
                      // marginLeft: "30rem"
                    },
                  },
                }}
                MenuListProps={{
                  dense: true,
                  sx: { py: 1 },
                }}
              >
                {user &&
                  settings.map((item, idx) => (
                    <MenuItem
                      key={idx}
                      onClick={item.handler}
                      sx={{
                        transition: "all 0.2s ease",
                        borderLeft: "3px solid transparent",
                        "&:hover": {
                          borderLeft: "3px solid #F97316",
                          backgroundColor: alpha("#1E40AF", 0.05),
                        },
                      }}
                    >
                      <Typography
                        sx={{
                          fontWeight: 500,
                          fontSize: "0.95rem",
                          color:
                            item.sec === "Logout"
                              ? "error.main"
                              : "text.primary",
                        }}
                      >
                        {item.sec}
                      </Typography>
                    </MenuItem>
                  ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </StyledAppBar>
      <Authenticate open={authOpen} onClose={() => setAuthOpen(false)} />
    </>
  );
}

export default Navbar;
