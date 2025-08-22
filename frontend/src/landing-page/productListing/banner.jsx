import { Box, Typography, Container, Link } from "@mui/material";

export default function Banner() {
  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        height: { xs: "14rem", md: "22rem" },
        backgroundImage: `url('/newBanner.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        overflow: "hidden",
      }}
    >
      {/* Overlay for better text readability */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to bottom, rgba(0,0,0,0.4), rgba(0,0,0,0.7))",
        }}
      />

      {/* Text Content */}
      <Container sx={{ position: "relative", textAlign: "center",  }}>
        <Typography
          variant="h3"
          sx={{
            fontWeight: "bold",
            letterSpacing: 1,
            mb: 1,
            textShadow: "2px 2px 10px rgba(0,0,0,0.6)",
          }}
        >
          Shop the Best Deals
        </Typography>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 800,
            opacity: 0.9,
            textShadow: "1px 1px 6px rgba(0,0,0,0.6)",
          }}
        >
          <Link href='/' sx={{'&:hover': {color: "#F97316"}, textDecoration: "none", color: "#fff"}}>Home</Link> / Product Listing
        </Typography>
      </Container>
    </Box>
  );
}
