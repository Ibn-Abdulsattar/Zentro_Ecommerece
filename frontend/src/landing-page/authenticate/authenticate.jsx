import { useState } from "react";
import {
  Box,
  Button,
  Typography,
  Container,
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
// import axios from "axios";
import Grid from "@mui/material/Grid";

function Authenticate({ open, onClose }) {
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

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 500,
    bgcolor: "background.paper",
    // border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  // 🚀 form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // setLoading(true);

    // let endpoint;
    // let payload = {};

    // if (mode === "signup") {
    //   endpoint =
    //     "https://ofe1qf8tyd.execute-api.ap-south-1.amazonaws.com/user/signup";
    //   payload = { ...formData };
    // } else if (mode === "signin") {
    //   endpoint =
    //     "https://ofe1qf8tyd.execute-api.ap-south-1.amazonaws.com/user/signin";
    //   payload = { email: formData.email, password: formData.password };
    // } else if (mode === "forgot") {
    //   endpoint =
    //     "https://ofe1qf8tyd.execute-api.ap-south-1.amazonaws.com/user/forgot-password";
    //   payload = { email: formData.email };
    // }

    // try {
    //   const res = await axios.post(endpoint, payload, {
    //     withCredentials: true,
    //     headers: { "Content-Type": "application/json" },
    //   });

    //   if (mode === "forgot") {
    //     alert("Password reset instructions sent to your email.");
    //     switchMode("signin");
    //   } else {
    //     window.location.href = "https://main.dunuolnoll92w.amplifyapp.com/";
    //   }
    // } catch (err) {
    //   const msg =
    //     err.response?.data?.msg ||
    //     err.response?.data?.message ||
    //     "Request failed.";
    //   setError(msg);
    // } finally {
    //   setLoading(false);
    // }
  };

  return (
    <div>
      <Modal
        open={open} onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box style={style}>
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              alignItems: "center",
              height: "50vh",
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
            </Box>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}

export default Authenticate;
