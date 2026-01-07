import { Box, Paper, Typography, Avatar, Button } from "@mui/material";
import { LogOut } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { authService } from "../services/auth.service";
import {useNavigate} from 'react-router-dom'

export default function Banner() {
    const navigate = useNavigate();
  const { user, setAlert, setUser } = useAuth();

  const handleLogout = async (e) => {
    try {
        e.preventDefault();
      const response = await authService.authenticate("logout", {});
      navigate("/")
      setUser(null);
      setAlert({ type: "success", message: response.message });
    } catch (err) {
      setAlert({ type: "error", message: err.message });
    }
  };

  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        mb: 3,
        background: `linear-gradient(135deg, #1E40AF 0%, #F97316 100%)`,
        borderRadius: 2,
      }}
    >
      {user && <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Avatar
            src={user.avatar_url}
            sx={{
              width: 80,
              height: 80,
              bgcolor: "#fff",
              color: "#1E40AF",
              fontSize: "2rem",
              fontWeight: "bold",
            }}
          >
            AK
          </Avatar>
          <Box>
            <Typography variant="h4" sx={{ color: "#fff", fontWeight: "bold" }}>
              {user.username}
            </Typography>
            <Typography variant="body1" sx={{ color: "#fff", opacity: 0.9 }}>
              {user.email}
            </Typography>
          </Box>
        </Box>
        <Button
          onClick={handleLogout}
          variant="contained"
          startIcon={<LogOut size={18} />}
          sx={{
            bgcolor: "#fff",
            color: "#1E40AF",
            "&:hover": { bgcolor: "#F3F4F6" },
          }}
        >
          Logout
        </Button>
      </Box>}
    </Paper>
  );
}
