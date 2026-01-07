import React from "react";
import { Box, Typography, Avatar, Button, Paper } from "@mui/material";
import {
  Edit as EditIcon,
  Phone as PhoneIcon,
  Email as EmailIcon,
} from "@mui/icons-material";
import Module from "./Module";
import { useAuth } from "../../context/AuthContext";


export default function Banner() {
  const {user} =useAuth();
  const [open, setOpen] = React.useState(false);
  return (
    <Paper
      elevation={0}
      sx={{
        p: 4,
        mb: 4,
        background: "linear-gradient(135deg, #1E40AF 0%, #F97316 100%)",
        borderRadius: 3,
        position: "relative",
        overflow: "hidden",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          right: 0,
          width: "300px",
          height: "300px",
          background: "rgba(255, 255, 255, 0.1)",
          borderRadius: "50%",
          transform: "translate(50%, -50%)",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 3,
          flexWrap: "wrap",
          position: "relative",
          zIndex: 1,
        }}
      >
        <Avatar
          src={user?.avatar_url} // If this is null or undefined, MUI automatically shows the children below
          alt={user?.username}
          sx={{
            width: 100,
            height: 100,
            bgcolor: "#fff",
            color: "#1E40AF",
            fontSize: "2.5rem",
            fontWeight: "bold",
            border: "4px solid rgba(255, 255, 255, 0.3)",
            boxShadow: "0 8px 16px rgba(0,0,0,0.2)",
          }}
        >
          {user?.username?.[0]?.toUpperCase() || "U"}
        </Avatar>
        <Box sx={{ flex: 1 }}>
          <Typography
            variant="h4"
            sx={{ color: "#fff", fontWeight: "bold", mb: 1 }}
          >
            {user?.username || "User"}
          </Typography>
          <Box sx={{ display: "flex", gap: 3, flexWrap: "wrap", mb: 2 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <EmailIcon
                sx={{ color: "#fff", opacity: 0.9 }}
                fontSize="small"
              />
              <Typography sx={{ color: "#fff", opacity: 0.9 }}>
                {user?.email || "email@example.com"}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <PhoneIcon
                sx={{ color: "#fff", opacity: 0.9 }}
                fontSize="small"
              />
              <Typography sx={{ color: "#fff", opacity: 0.9 }}>
                {user?.phone_no || "Phone not added"}
              </Typography>
            </Box>
          </Box>
          <Button
            onClick={() => setOpen(true)}
            variant="contained"
            startIcon={<EditIcon />}
            sx={{
              bgcolor: "#fff",
              color: "#1E40AF",
              fontWeight: "bold",
              "&:hover": { bgcolor: "#F3F4F6" },
            }}
          >
            Edit Profile
          </Button>
        </Box>
      </Box>

      {/* Module Profile */}
      {user && <Module open={open} user={user} setOpen={setOpen} />}
    </Paper>
  );
}
