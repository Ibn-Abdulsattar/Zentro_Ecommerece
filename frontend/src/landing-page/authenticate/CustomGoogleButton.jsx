import { GoogleLogin } from "@react-oauth/google";
import { authService } from "../../services/auth.service";

export default function CustomGoogleButton({ handleClose, setUser, setAlert, navigate }) {

      // Google Login Success Handler
  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const response = await authService.OAuthGoogle(credentialResponse);


      handleClose();
      setUser(response.user);
      setAlert({ type: "success", message: response.message });
      navigate("/");
    } catch (err) {
      console.error("Google login error:", err);
      setAlert({
        type: "error",
        message: err.response?.message || "Google Sign-In failed.",
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
    <GoogleLogin
      onSuccess={handleGoogleSuccess}
      onError={handleGoogleError}
      useOneTap
      text="continue_with" // "signin_with", "signup_with", "continue_with", "signin"
    />
  );
}