import {
  Box,
  Typography,
} from "@mui/material";

export default function AccountTitle() {
  return (
            <Box
          sx={{
            textAlign: "center",
            bgcolor: "#fff",
            p: 2.5,
            borderRadius: 3,
            mb: 3,
            boxShadow: "0 4px 20px rgba(249, 115, 22, 0.15)",
            border: "1px solid rgba(30, 64, 175, 0.1)",
          }}
        >
          <Typography
            variant="h5"
            sx={{
              fontWeight: "bold",
              background: "linear-gradient(135deg, #1E40AF 0%, #F97316 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              letterSpacing: "0.8px",
            }}
          >
            My Account
          </Typography>
          <Box
            sx={{
              width: "80px",
              height: "3px",
              background: "linear-gradient(90deg, #1E40AF 0%, #F97316 100%)",
              margin: "8px auto 0",
              borderRadius: "2px",
            }}
          />
        </Box>
  )
}
