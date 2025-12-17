import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import {
  Box,
  Button,
  Typography,
  Avatar,
  Link,
  Alert,
  FormControl,
  OutlinedInput,
  InputAdornment,
  InputLabel,
  IconButton,
  TextField,
  CircularProgress,
  Divider,
  Fade,
} from "@mui/material";
import Modal from "@mui/material/Modal";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import Grid from "@mui/material/Grid";
import FacebookIcon from "@mui/icons-material/Facebook";
import FacebookLogin from "@greatsumini/react-facebook-login";
import { useAuth } from "../AuthContext";

function CustomGoogleButton({ onSuccess, onError, }) {
  return (
    <GoogleLogin
      onSuccess={onSuccess}
      onError={onError}
      useOneTap
      text="continue_with" // "signin_with", "signup_with", "continue_with", "signin"
    />
  );
}

function FacebookAuthButton({ loading, handleClose, setUser, setAlert, navigate }) {
  return (
    <FacebookLogin
      appId={import.meta.env.VITE_FACEBOOK_APP_ID}
      onSuccess={async (response) => {
        try {
          const res = await axios.post(
            `${import.meta.env.VITE_Backend_Url}/user/facebook/callback`,
            { access_token: response.accessToken },
            { withCredentials: true }
          );

          handleClose();
          setUser(res.data.user);
          setAlert({ type: "success", message: res.data.message });
          navigate("/");
        } catch (err) {
          console.error("Facebook login error:", err);
          setAlert({
            type: "error",
            message:
              err.response?.data?.message ||
              "Facebook Sign-In failed. Try again.",
          });
        }
      }}
      onFail={(err) => {
        console.error("Facebook login failed:", err);
        setAlert({ type: "error", message: "Facebook Sign-In failed." });
      }}
      render={({ onClick }) => (
        <Button
          onClick={onClick}
          variant="outlined"
          startIcon={<FacebookIcon sx={{ color: "#1877F2" }} />}
          sx={{
            borderColor: "#e0e0e0",
            color: "#333",
            textTransform: "none",
            fontWeight: 500,
            borderRadius: 1,
            px: 2,
            py: .8,
            width: "100%",
            mt: 1.5,
          }}
          disabled={loading}
        >
          <Box component="span"  sx={{ ml: { xs: "auto" }, mr: {xs:"auto"} }}>Continue with Facebook</Box>
        </Button>
      )}
    />
  );
}


function Register({ open, onClose }) {
  const { setAlert, setUser } = useAuth();
  const navigate = useNavigate();

  const [mode, setMode] = useState("signin");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const [fieldErrors, setFieldErrors] = useState({});

  // Switch authentication modes
  const switchMode = (newMode) => {
    setMode(newMode);
    setFormData({ username: "", email: "", password: "" });
    setError(null);
    setFieldErrors({});
  };

  // Handle input changes with validation
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear field-specific error when user starts typing
    if (fieldErrors[name]) {
      setFieldErrors((prev) => ({ ...prev, [name]: null }));
    }
    if (error) setError(null);
  };

  // Validate form before submission
  const validateForm = () => {
    const errors = {};

    if (mode === "signup" && !formData.username.trim()) {
      errors.username = "Full name is required";
    }

    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Please enter a valid email address";
    }

    if (mode !== "forgot") {
      if (!formData.password) {
        errors.password = "Password is required";
      } else if (mode === "signup" && formData.password.length < 8) {
        errors.password = "Password must be at least 8 characters";
      }
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleClickShowPassword = () => setShowPassword((prev) => !prev);
  const handleMouseDownPassword = (e) => e.preventDefault();

  const handleClose = () => {
    if (!loading) {
      onClose();
      // Reset form after modal closes
      setTimeout(() => {
        setMode("signin");
        setFormData({ username: "", email: "", password: "" });
        setError(null);
        setFieldErrors({});
      }, 200);
    }
  };

  // Form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_Backend_Url}/user/${mode}`,
        formData,
        { withCredentials: true }
      );

      // Success handling
      setUser(res.data.user);
      setAlert({ type: "success", message: res.data.message });
      handleClose();

      if (mode === "signin" || mode === "signup") {
        navigate("/");
      }
    } catch (err) {
      // Error handling
      const errorMessage =
        err.response?.data?.message ||
        err.response?.data?.error ||
        "An error occurred. Please try again.";

      setError(errorMessage);

      // Handle specific field errors from backend
      if (err.response?.data?.errors) {
        setFieldErrors(err.response.data.errors);
      }
    } finally {
      setLoading(false);
    }
  };

  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    boxShadow: 24,
    maxHeight: "80vh",
    overflowY: "auto",
    borderRadius: 8,
    p: 4,
    outline: "none",
  };

  const getModeTitle = () => {
    switch (mode) {
      case "signup":
        return "Create your account";
      case "signin":
        return "Welcome back";
      case "forgot":
        return "Reset your password";
      default:
        return "Sign In";
    }
  };

  const getModeSubtitle = () => {
    switch (mode) {
      case "signup":
        return "Sign up to get started";
      case "signin":
        return "Sign in to continue";
      case "forgot":
        return "Enter your email to receive a reset link";
      default:
        return "";
    }
  };


  // Google Login Success Handler
  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_Backend_Url}/user/google/callback`,
        { credential: credentialResponse.credential },
        { withCredentials: true }
      );

      handleClose();
      setUser(res.data.user);
      setAlert({ type: "success", message: res.data.message });
      navigate("/");
    } catch (err) {
      console.error("Google login error:", err);
      setAlert({
        type: "error",
        message: err?.message || "Google Sign-In failed.",
      });
    }
  };

  // Google Login Error Handler
  const handleGoogleError = () => {
    setAlert({
      type: "error",
      message: "Google Sign-In failed. Try again.",
    });
  };
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="auth-modal-title"
      aria-describedby="auth-modal-description"
      closeAfterTransition
    >
      <Fade in={open}>
        <Box
          sx={{
            bgcolor: "#ffffff",
            width: { xs: "85%", sm: "450px" },
            maxWidth: "100%",
            p: "1.5rem",
          }}
          style={modalStyle}
        >
          {/* Close Button */}
          <IconButton
            onClick={handleClose}
            disabled={loading}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: "grey.500",
            }}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>

          {/* Header */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              mb: 3,
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "#F97316", width: 56, height: 56 }}>
              <LockOutlinedIcon />
            </Avatar>

            <Typography
              component="h1"
              variant="h5"
              fontWeight={600}
              id="auth-modal-title"
            >
              {getModeTitle()}
            </Typography>

            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ mt: 0.5 }}
              id="auth-modal-description"
            >
              {getModeSubtitle()}
            </Typography>
          </Box>

          {/* OAuth Buttons */}
          {(mode === "signup" || mode === "signin") && (
            <>
              <Box sx={{ mb: 3 }}>
                <CustomGoogleButton
                  onSuccess={handleGoogleSuccess}
                  onError={handleGoogleError}
                />

                <FacebookAuthButton
    loading={loading}
    handleClose={handleClose}
    setUser={setUser}
    setAlert={setAlert}
    navigate={navigate}
  />
              </Box>

              <Divider sx={{ my: 3 }}>
                <Typography variant="body2" color="text.secondary">
                  or
                </Typography>
              </Divider>
            </>
          )}

          {/* Form */}
          <Box component="form" onSubmit={handleSubmit} noValidate>
            <Grid container spacing={2}>
              {mode === "signup" && (
                <Grid size={{ xs: 12 }}>
                  <TextField
                    fullWidth
                    label="Full Name"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    error={!!fieldErrors.username}
                    helperText={fieldErrors.username}
                    disabled={loading}
                    autoComplete="name"
                    required
                  />
                </Grid>
              )}

              <Grid size={{ xs: 12 }}>
                <TextField
                  fullWidth
                  label="Email Address"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  error={!!fieldErrors.email}
                  helperText={fieldErrors.email}
                  disabled={loading}
                  autoComplete="email"
                  required
                />
              </Grid>

              {mode !== "forgot" && (
                <Grid size={{ xs: 12 }}>
                  <FormControl
                    variant="outlined"
                    fullWidth
                    error={!!fieldErrors.password}
                  >
                    <InputLabel required>Password</InputLabel>
                    <OutlinedInput
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      disabled={loading}
                      autoComplete={
                        mode === "signup" ? "new-password" : "current-password"
                      }
                      label="Password"
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                            disabled={loading}
                            aria-label="toggle password visibility"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                    {fieldErrors.password && (
                      <Typography
                        variant="caption"
                        color="error"
                        sx={{ mt: 0.5, ml: 1.75 }}
                      >
                        {fieldErrors.password}
                      </Typography>
                    )}
                  </FormControl>
                </Grid>
              )}
            </Grid>

            {/* Error Alert */}
            {error && (
              <Alert severity="error" sx={{ mt: 2 }}>
                {error}
              </Alert>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                height: 44,
                bgcolor: "#F97316",
                textTransform: "none",
                fontSize: "1rem",
                fontWeight: 600,
                "&:hover": {
                  bgcolor: "#ea580c",
                },
              }}
              disabled={loading}
            >
              {loading ? (
                <CircularProgress size={24} sx={{ color: "white" }} />
              ) : mode === "signup" ? (
                "Create Account"
              ) : mode === "signin" ? (
                "Sign In"
              ) : (
                "Send Reset Link"
              )}
            </Button>

            {/* Switch Mode Links */}
            <Box sx={{ textAlign: "center", mt: 2 }}>
              {mode === "signin" && (
                <>
                  <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <Link
                      component="button"
                      type="button"
                      variant="body2"
                      onClick={() => switchMode("forgot")}
                      disabled={loading}
                      sx={{
                        display: "block",
                        mb: 1,
                        color: "#F97316",
                        textDecoration: "none",
                        "&:hover": { textDecoration: "underline" },
                      }}
                    >
                      Forgot your password?
                    </Link>
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    Don't have an account?{" "}
                    <Link
                      component="button"
                      type="button"
                      onClick={() => switchMode("signup")}
                      disabled={loading}
                      sx={{
                        color: "#F97316",
                        fontWeight: 600,
                        textDecoration: "none",
                        "&:hover": { textDecoration: "underline" },
                      }}
                    >
                      Sign up
                    </Link>
                  </Typography>
                </>
              )}

              {mode === "signup" && (
                <Typography variant="body2" color="text.secondary">
                  Already have an account?{" "}
                  <Link
                    component="button"
                    type="button"
                    onClick={() => switchMode("signin")}
                    disabled={loading}
                    sx={{
                      color: "#F97316",
                      fontWeight: 600,
                      textDecoration: "none",
                      "&:hover": { textDecoration: "underline" },
                    }}
                  >
                    Sign in
                  </Link>
                </Typography>
              )}

              {mode === "forgot" && (
                <Link
                  component="button"
                  type="button"
                  variant="body2"
                  onClick={() => switchMode("signin")}
                  disabled={loading}
                  sx={{
                    color: "#F97316",
                    fontWeight: 600,
                    textDecoration: "none",
                    "&:hover": { textDecoration: "underline" },
                  }}
                >
                  ← Back to Sign In
                </Link>
              )}
            </Box>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
}

export default Register;
