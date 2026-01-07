 import axios from 'axios';
import FacebookIcon from "@mui/icons-material/Facebook";
import FacebookLogin from "@greatsumini/react-facebook-login";
import { Button, Box } from '@mui/material';
 
 export default function FacebookAuthButton({
  loading,
  handleClose,
  setUser,
  setAlert,
  navigate,
}) {
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
            py: 0.8,
            width: "100%",
            mt: 1.5,
          }}
          disabled={loading}
        >
          <Box component="span" sx={{ ml: { xs: "auto" }, mr: { xs: "auto" } }}>
            Continue with Facebook
          </Box>
        </Button>
      )}
    />
  );
}