"use client";
import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Paper,
  Alert,
  InputAdornment,
  IconButton,
  LinearProgress,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Fade,
  CircularProgress,
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../AuthContext";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import LockResetIcon from "@mui/icons-material/LockReset";

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
  const [success, setSuccess] = useState(false);

  // Password strength state
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [requirements, setRequirements] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    special: false,
  });

  // Check password requirements in real-time
  useEffect(() => {
    if (password) {
      const reqs = {
        length: password.length >= 8 && password.length <= 20,
        uppercase: /[A-Z]/.test(password),
        lowercase: /[a-z]/.test(password),
        number: /\d/.test(password),
        special: /[@$!%*?&]/.test(password),
      };
      setRequirements(reqs);

      // Calculate password strength (0-100)
      const metRequirements = Object.values(reqs).filter(Boolean).length;
      setPasswordStrength((metRequirements / 5) * 100);

      // Clear password error when typing
      if (errors.password) {
        setErrors((prev) => ({ ...prev, password: null }));
      }
    } else {
      setRequirements({
        length: false,
        uppercase: false,
        lowercase: false,
        number: false,
        special: false,
      });
      setPasswordStrength(0);
    }
  }, [password]);

  // Clear confirm error when typing
  useEffect(() => {
    if (confirm && errors.confirm) {
      setErrors((prev) => ({ ...prev, confirm: null }));
    }
  }, [confirm]);

  const validateFields = () => {
    const newErrors = {};

    if (!password.trim()) {
      newErrors.password = "Password is required";
    } else if (!Object.values(requirements).every(Boolean)) {
      newErrors.password = "Please meet all password requirements";
    }

    if (!confirm.trim()) {
      newErrors.confirm = "Please confirm your password";
    } else if (confirm !== password) {
      newErrors.confirm = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // setError("");

    if (!validateFields()) return;

    setLoading(true);

    try {
      const response = await axios.put(
        `${import.meta.env.VITE_Backend_Url}/user/reset-password/${resetToken}`,
        { password },
        { withCredentials: true }
      );

      setSuccess(true);
      setAlert({
        type: "success",
        message: response.data?.message || "Password updated successfully!",
      });

      // Redirect after 2 seconds
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (err) {
      setAlert({
        type: "error",
        message: "Invalid or expired token",
      });
    } finally {
      setLoading(false);
    }
  };

  const getStrengthColor = () => {
    if (passwordStrength < 40) return "error";
    if (passwordStrength < 80) return "warning";
    return "success";
  };

  const getStrengthLabel = () => {
    if (passwordStrength < 40) return "Weak";
    if (passwordStrength < 80) return "Medium";
    return "Strong";
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

          {/* Success State */}
          {success ? (
            <Fade in={success}>
              <Box sx={{ textAlign: "center", py: 3 }}>
                <CheckCircleIcon
                  sx={{ fontSize: 60, color: "success.main", mb: 2 }}
                />
                <Alert severity="success" sx={{ mb: 2 }}>
                  Your password has been reset successfully!
                </Alert>
                <Typography variant="body2" color="text.secondary">
                  Redirecting you to sign in...
                </Typography>
              </Box>
            </Fade>
          ) : (
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

              {/* Password Strength Indicator */}
              {password && (
                <Fade in={!!password}>
                  <Box sx={{ mb: 3 }}>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        mb: 0.5,
                      }}
                    >
                      <Typography variant="caption" color="text.secondary">
                        Password strength
                      </Typography>
                      <Typography
                        variant="caption"
                        fontWeight={600}
                        color={`${getStrengthColor()}.main`}
                      >
                        {getStrengthLabel()}
                      </Typography>
                    </Box>
                    <LinearProgress
                      variant="determinate"
                      value={passwordStrength}
                      color={getStrengthColor()}
                      sx={{ height: 6, borderRadius: 3 }}
                    />
                  </Box>
                </Fade>
              )}

              {/* Password Requirements */}
              {/* <Box
                sx={{
                  bgcolor: "#f9fafb",
                  borderRadius: 2,
                  p: 2,
                  mb: 3,
                }}
              >
                <Typography
                  variant="caption"
                  fontWeight={600}
                  color="text.secondary"
                  sx={{ display: "block", mb: 1 }}
                >
                  Password must contain:
                </Typography>
                <List dense disablePadding>
                  {[
                    { key: "length", label: "8-20 characters" },
                    { key: "uppercase", label: "One uppercase letter (A-Z)" },
                    { key: "lowercase", label: "One lowercase letter (a-z)" },
                    { key: "number", label: "One number (0-9)" },
                    {
                      key: "special",
                      label: "One special character (@$!%*?&)",
                    },
                  ].map((req) => (
                    <ListItem key={req.key} disablePadding sx={{ py: 0.25 }}>
                      <ListItemIcon sx={{ minWidth: 32 }}>
                        {requirements[req.key] ? (
                          <CheckCircleIcon
                            sx={{ fontSize: 16, color: "success.main" }}
                          />
                        ) : (
                          <CancelIcon
                            sx={{ fontSize: 16, color: "text.disabled" }}
                          />
                        )}
                      </ListItemIcon>
                      <ListItemText
                        primary={req.label}
                        primaryTypographyProps={{
                          variant: "caption",
                          color: requirements[req.key]
                            ? "success.main"
                            : "text.secondary",
                        }}
                      />
                    </ListItem>
                  ))}
                </List>
              </Box> */}

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
          )}
        </Paper>
      </Fade>
    </Container>
  );
}
