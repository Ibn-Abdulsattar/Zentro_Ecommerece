import { useState } from "react";
import React from "react";
import { useNavigate } from "react-router-dom";
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
} from "@mui/material";
import Modal from "@mui/material/Modal";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import axios from "axios";
import Grid from "@mui/material/Grid";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";

function Register({ open, onClose }) {
  const [mode, setMode] = useState("signin"); // signin | signup | forgot
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);

  // 🔄 toggle modes
  const switchMode = (newMode) => {
    setMode(newMode);
    setFormData({ username: "", email: "", password: "" });
    setError(null);
  };

  const handleChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  const handleClickShowPassword = () => setShowPassword((prev) => !prev);
  const handleMouseDownPassword = (e) => e.preventDefault();

  const navigate = useNavigate();
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    boxShadow: 24,
    maxHeight: "90vh", // viewport height
    overflowY: "auto",
    borderRadius: 4,

    p: 4,
  };

  // 🚀 form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    axios
      .post(`http://localhost:8080/user/${mode}`, formData, {
        withCredentials: true,
      })
      .then(() => {
        onClose();
        navigate("/");
        alert("Welcome to Zentro");
      })
      .catch((err) => alert(err.message))
      .finally(() => {
        setLoading(false);
      });
  };

  const authButton = {
    borderColor: "#F97316",
    color: "black",
    textTransform: "none",
    fontWeight: 500,
    borderRadius: 2,
    px: 2,
    py: 1,
    mt: 2,
    "&:hover": {
      backgroundColor: "rgba(24, 119, 242, 0.1)",
      borderColor: "#1877F2",
    },
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{ bgcolor: "#f7f4f4ff", width: { xs: "80%", sm: "40%" } }}
          style={style}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              alignItems: "center",
              height: "100%",
              bgcolor: "#f7f4f4ff",
              borderRadius: 2,
              p: 3,
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "#F97316" }}>
              <LockOutlinedIcon />
            </Avatar>

            <Typography component="h1" variant="h5">
              {mode === "signup"
                ? "Sign Up"
                : mode === "signin"
                ? "Sign In"
                : "Forgot Password"}
            </Typography>

            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                {mode === "signup" && (
                  <Grid size={{ xs: 12 }}>
                    <TextField
                      fullWidth
                      label="Full Name"
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
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
                    required
                  />
                </Grid>

                {mode !== "forgot" && (
                  <Grid size={{ xs: 12 }}>
                    <FormControl variant="outlined" fullWidth>
                      <InputLabel>Password</InputLabel>
                      <OutlinedInput
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                              edge="end"
                            >
                              {showPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        }
                      />
                    </FormControl>
                  </Grid>
                )}
              </Grid>

              {error && (
                <Alert severity="error" sx={{ mt: 2 }}>
                  {error}
                </Alert>
              )}

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, height: 40, bgcolor: "#F97316" }}
                disabled={loading}
              >
                {loading ? (
                  <CircularProgress size={24} sx={{ color: "white" }} />
                ) : mode === "signup" ? (
                  "Sign Up"
                ) : mode === "signin" ? (
                  "Sign In"
                ) : (
                  "Send Reset Link"
                )}
              </Button>

              {/* Switch Links */}
              <Grid container justifyContent="center">
                {mode === "signin" && (
                  <>
                    <Grid size={{ xs: 12 }} textAlign="center">
                      <Link
                        href="#"
                        variant="body2"
                        onClick={() => switchMode("forgot")}
                      >
                        Forgot Password?
                      </Link>
                    </Grid>
                    <Grid size={{ xs: 12 }} textAlign="center">
                      <Link
                        href="#"
                        variant="body2"
                        onClick={() => switchMode("signup")}
                      >
                        Don't have an account? Sign up
                      </Link>
                    </Grid>
                  </>
                )}

                {mode === "signup" && (
                  <Grid size={{ xs: 12 }} textAlign="center">
                    <Link
                      href="#"
                      variant="body2"
                      onClick={() => switchMode("signin")}
                    >
                      Already have an account? Sign in
                    </Link>
                  </Grid>
                )}

                {mode === "forgot" && (
                  <Grid size={{ xs: 12 }} textAlign="center">
                    <Link
                      href="#"
                      variant="body2"
                      onClick={() => switchMode("signin")}
                    >
                      Back to Sign In
                    </Link>
                  </Grid>
                )}
              </Grid>
              {/* Authentication with Google and facebook */}
              <Grid container sx={{ my: 1 }}>
                <Grid size={{ md: 6, xs: 12 }}>
                  <Button
                    href="http://localhost:8080/user/google"
                    variant="outlined"
                    startIcon={<GoogleIcon sx={{ color: "#F97316" }} />}
                    style={authButton}
                    fullWidth
                  >
                    Continue with Google
                  </Button>
                </Grid>
                <Grid size={{ md: 6, xs: 12 }}>
                  {/* Facebook Button */}
                  <Button
                    href=""
                    variant="outlined"
                    startIcon={<FacebookIcon sx={{ color: "#F97316" }} />}
                    style={authButton}
                    fullWidth
                  >
                    Continue with Facebook
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}

export default Register;
