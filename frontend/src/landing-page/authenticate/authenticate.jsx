import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Avatar,
  IconButton,
  Divider,
  Fade,
} from "@mui/material";
import Modal from "@mui/material/Modal";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import CloseIcon from "@mui/icons-material/Close";
import { useAuth } from "../../context/AuthContext";
import Form from "./Form";
import FacebookAuthButton from "./FacebookAuthButton";
import CustomGoogleButton from "./CustomGoogleButton";
import { authService } from "../../services/auth.service";

function Authenticate({ open, onClose }) {
  const { setAlert, setUser } = useAuth();
  const navigate = useNavigate();

  const [mode, setMode] = useState("signin");
  const [otp, setOtp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    otp: "",
  });
  const [error, setError] = useState(null);
  const [fieldErrors, setFieldErrors] = useState({});

  // Switch authentication modes
  const switchMode = (newMode) => {
    setMode(newMode);
    setFormData({ username: "", email: "", password: "", otp: "" });
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
      if (otp) {
        // STEP 2: VERIFY THE OTP
        const response = await authService.verifyOtp({
          email: formData.email,
          code: formData.otp,
        });
        setUser(response.user);
        setAlert({
          type: "success",
          message: "Account verified successfully!",
        });
        handleClose();
        navigate("/");
      } else {
        // STEP 1: INITIAL SIGNUP OR SIGNIN
        const response = await authService.authenticate(mode, formData);

        if (mode === "signup") {
          // Switch to OTP view instead of logging in
          setOtp(true);
          setAlert({ type: "success", message: "OTP sent to your email!" });
        } else {
          // Standard Sign-in / Forgot flow
          setUser(response.user);
          setAlert({ type: "success", message: response.message });
          handleClose();
          if (mode === "signin") navigate("/");
        }
      }
    } catch (err) {
      // Error handling
      console.log(err);
      const errorMessage =
        err.response?.data?.message || err.response?.data?.error;
      setError(errorMessage);

      // Handle specific field errors from backend
      if (err.response?.data?.errors) {
        setFieldErrors(err.response.data.errors);
      }
    } finally {
      setLoading(false);
      setMode("signin");
    }
  };

  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    boxShadow: 24,
    maxHeight: "85vh",
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
          {!otp && (mode === "signup" || mode === "signin") && (
            <>
              <Box sx={{ mb: 3 }}>
                <CustomGoogleButton
                  handleClose={handleClose}
                  setUser={setUser}
                  setAlert={setAlert}
                  navigate={navigate}
                />

                {/* <FacebookAuthButton
                  loading={loading}
                  handleClose={handleClose}
                  setUser={setUser}
                  setAlert={setAlert}
                  navigate={navigate}
                /> */}
              </Box>

              <Divider sx={{ my: 3 }}>
                <Typography variant="body2" color="text.secondary">
                  or
                </Typography>
              </Divider>
            </>
          )}

          {/* Form */}
          <Form
            otp={otp}
            mode={mode}
            handleSubmit={handleSubmit}
            formData={formData}
            handleChange={handleChange}
            fieldErrors={fieldErrors}
            loading={loading}
            showPassword={showPassword}
            handleClickShowPassword={handleClickShowPassword}
            handleMouseDownPassword={handleMouseDownPassword}
            error={error}
            switchMode={switchMode}
          />
        </Box>
      </Fade>
    </Modal>
  );
}

export default Authenticate;
