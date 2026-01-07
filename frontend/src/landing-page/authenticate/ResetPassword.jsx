"use client";
import React, { useState, useEffect} from "react";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Paper,
  InputAdornment,
  IconButton,
  Fade,
  CircularProgress,
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import LockResetIcon from "@mui/icons-material/LockReset";
import { authService } from "../../services/auth.service";
import { useAuth } from "../../context/AuthContext";

export default function ResetPassword() {
  const { setAlert } = useAuth();
  const { resetToken } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // Password strength state
  const [requirements, setRequirements] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    special: false,
  });

  const validateFields = () => {
    const newErrors = {};

    if (!password.trim()) {
      newErrors.password = "Password is required";
    } else if (!Object.values(requirements).every(Boolean)) {
      newErrors.password = "Please enter a valid password!";
    }

    if (!confirm.trim()) {
      newErrors.confirm = "Please confirm your password";
    } else if (confirm !== password) {
      newErrors.confirm = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  useEffect(() => {
  setRequirements({
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /[0-9]/.test(password),
    special: /[!@#$%^&*]/.test(password),
  });
}, [password]);


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateFields()) return;

    setLoading(true);

    try {
      const response = await authService.resetPassword(resetToken, {
        password,
      });

      setAlert({
        type: "success",
        message: response?.message || "Password updated successfully!",
      });

      // Redirect after 2 seconds
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (err) {
      console.log(err);
      setAlert({
        type: "error",
        message: err.message || "Invalid or expired token",
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <Container
      maxWidth="sm"
      sx={{
        minHeight: "80vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        py: 4,
      }}
    >
      <Fade in={true} timeout={600}>
        <Paper
          elevation={6}
          sx={{
            p: { xs: 3, sm: 4 },
            borderRadius: 3,
            width: "100%",
          }}
        >
          {/* Header */}
          <Box sx={{ textAlign: "center", mb: 4 }}>
            <Box
              sx={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: 64,
                height: 64,
                borderRadius: "50%",
                bgcolor: "#FEF3F2",
                mb: 2,
              }}
            >
              <LockResetIcon sx={{ fontSize: 32, color: "#F97316" }} />
            </Box>

            <Typography
              variant="h4"
              component="h1"
              gutterBottom
              sx={{ fontWeight: 600 }}
            >
              Reset Password
            </Typography>

            <Typography variant="body2" color="text.secondary">
              Create a strong password to secure your account
            </Typography>
          </Box>

          <Box component="form" onSubmit={handleSubmit} noValidate>
            {/* New Password Field */}
            <TextField
              label="New Password"
              variant="outlined"
              fullWidth
              required
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={!!errors.password}
              helperText={errors.password}
              disabled={loading}
              autoComplete="new-password"
              sx={{ mb: 2 }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                      disabled={loading}
                      aria-label="toggle password visibility"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            {/* Confirm Password Field */}
            <TextField
              label="Confirm Password"
              variant="outlined"
              fullWidth
              required
              type={showConfirm ? "text" : "password"}
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              error={!!errors.confirm}
              helperText={
                errors.confirm ||
                (confirm && password === confirm && "Passwords match ✓")
              }
              disabled={loading}
              autoComplete="new-password"
              sx={{ mb: 3 }}
              FormHelperTextProps={{
                sx: {
                  color:
                    confirm && password === confirm && !errors.confirm
                      ? "success.main"
                      : undefined,
                },
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowConfirm(!showConfirm)}
                      edge="end"
                      disabled={loading}
                      aria-label="toggle confirm password visibility"
                    >
                      {showConfirm ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            {/* Submit Button */}
            <Button
              type="submit"
              variant="contained"
              fullWidth
              size="large"
              disabled={loading || !password || !confirm}
              sx={{
                bgcolor: "#F97316",
                textTransform: "none",
                fontWeight: 600,
                height: 48,
                "&:hover": { bgcolor: "#ea580c" },
              }}
            >
              {loading ? (
                <CircularProgress size={24} sx={{ color: "white" }} />
              ) : (
                "Reset Password"
              )}
            </Button>

            {/* Back to Sign In */}
            <Box sx={{ textAlign: "center", mt: 2 }}>
              <Button
                onClick={() => navigate("/")}
                disabled={loading}
                sx={{
                  textTransform: "none",
                  color: "text.secondary",
                  "&:hover": { bgcolor: "transparent", color: "#F97316" },
                }}
              >
                ← Back to Sign In
              </Button>
            </Box>
          </Box>
        </Paper>
      </Fade>
    </Container>
  );
}
