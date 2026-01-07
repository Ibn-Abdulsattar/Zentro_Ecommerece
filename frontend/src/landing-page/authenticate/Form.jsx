import {
  Box,
  Button,
  Typography,
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
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Grid from "@mui/material/Grid";

export default function Form({
  otp,
  mode,
  handleSubmit,
  formData,
  handleChange,
  fieldErrors,
  loading,
  showPassword,
  handleClickShowPassword,
  handleMouseDownPassword,
  error,
  switchMode,
}) {
  return (
    <Box component="form" onSubmit={handleSubmit} noValidate>
      <Grid container spacing={2}>
        {!otp && mode === "signup" && (
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

        {!otp && (
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
        )}

        {!otp && mode !== "forgot" && (
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

      {otp && (
        <Grid size={{ xs: 12 }}>
          <Typography variant="body2" sx={{ mb: 2, textAlign: "center" }}>
            Please enter the 6-digit code sent to <b>{formData.email}</b>
          </Typography>
          <TextField
            fullWidth
            label="Enter OTP"
            name="otp"
            value={formData.otp}
            onChange={handleChange}
            error={!!fieldErrors.otp}
            helperText={fieldErrors.otp}
            disabled={loading}
            inputProps={{
              maxLength: 6,
              style: {
                textAlign: "center",
                letterSpacing: "8px",
                fontSize: "1.5rem",
              },
            }}
            required
          />
        </Grid>
      )}

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
          <CircularProgress size={24} />
        ) : otp ? (
          "Verify OTP"
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

        {!otp && mode === "signup" && (
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
  );
}
