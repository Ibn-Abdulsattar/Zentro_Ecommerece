import { useAuth } from "./AuthContext";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";

export default function GlobalAlert() {
  const { alert, setAlert } = useAuth();

  if (!alert) return null;

  return (
    <Slide direction="down" in={!!alert} mountOnEnter unmountOnExit>
      <Alert
        action={
          <IconButton
            aria-label="close"
            color="inherit"
            size="small"
            onClick={() => setAlert(null)}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        }
        sx={{
          position: "fixed",
          top: 50,
          left: "30%",
          right: "30%",
          transform: "translateX(-50%)",
          zIndex: 9999,
          minWidth: "20rem",
          maxWidth: "37.5rem",

          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.12)",
          backdropFilter: "blur(8px)",
          borderRadius: "12px",
          fontSize: "0.95rem",
          fontWeight: 500,
          "& .MuiAlert-icon": {
            fontSize: "1.5rem",
          },
          "& .MuiAlert-message": {
            padding: "8px 0",
            display: "flex",
            alignItems: "center",
          },
          "@media (max-width: 600px)": {
            left: "2rem",
            right: "2rem",
            transform: "none",
          },
        }}
        severity={alert.type}
      >
        {alert.message}
      </Alert>
    </Slide>
  );
}
