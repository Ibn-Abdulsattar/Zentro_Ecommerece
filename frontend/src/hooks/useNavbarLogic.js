import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { styled, alpha, AppBar, Button, IconButton } from "@mui/material";
import { useAuth } from "../context/AuthContext";

 const useNavbarLogic = () => {
  const navigate = useNavigate();
  const { user, setUser, setAlert } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);


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

  const StyledAppBar = styled(AppBar)(({ $scrolled }) => ({
  background: $scrolled ? "rgba(30, 64, 175, 0.95)" : "#1E40AF",
  backdropFilter: $scrolled ? "blur(10px)" : "none",
  boxShadow: $scrolled ? "0 4px 30px rgba(0, 0, 0, 0.1)" : "none",
  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
}));

  const handleSetting = (link) => {
    if (link === "logout") {
      axios
        .post(
          `${import.meta.env.VITE_Backend_Url}/user/logout`,
          { type: "user" },
          { withCredentials: true }
        )
        .then(() => {
          navigate("/");
          setAnchorElUser(null);
          setAlert({ type: "success", message: "You logged out successfuly" });
          setUser(null);
        })
        .catch((err) => {
          console.log(err);
        });
    }

    navigate(link);
    setAnchorElUser(null);
  };

  const settings = [
    { sec: "Profile", link: "/profile" },
    { sec: "Account", link: "/account" },
    { sec: "Dashboard", link: "/dashboard" },
    { sec: "Logout", link: "logout" },
  ];

    const pages = [
    "House Made",
    "Electronics",
    "Fashion",
    "Beauty",
    // "Sports",
    // "Toys & Kids",
  ];

  return {
    user, scrolled, anchorElNav, anchorElUser,
    setAnchorElNav, setAnchorElUser, navigate, StyledIconButton, StyledAppBar, NavButton,settings, handleSetting, pages,
  };
};

export default useNavbarLogic;
