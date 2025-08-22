import React, { useState } from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Box,
  Chip,
  IconButton,
  Container,
  Grid,
  ToggleButton,
  ToggleButtonGroup,
  Link,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import VisibilityIcon from "@mui/icons-material/Visibility";

// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

// Dummy products
const products = [
  {
    id: 1,
    name: "Smartphone X",
    price: 120,
    oldPrice: 150,
    image: "/phone.avif",
    rating: 4,
    desc: "High performance smartphone",
  },
  {
    id: 2,
    name: "Wireless Headphones",
    price: 80,
    oldPrice: 100,
    image: "/headphone.avif",
    rating: 5,
    desc: "Noise-cancelling headphones",
  },
  {
    id: 3,
    name: "Smartwatch Pro",
    price: 200,
    oldPrice: 250,
    image: "/smartWatch.avif",
    rating: 4,
    desc: "Advanced smartwatch",
  },
  {
    id: 4,
    name: "Laptop Air",
    price: 900,
    oldPrice: 1100,
    image: "/laptop.webp",
    rating: 5,
    desc: "Lightweight laptop",
  },
  {
    id: 5,
    name: "Gaming Console",
    price: 400,
    oldPrice: 450,
    image: "/gaming.avif",
    rating: 5,
    desc: "Immersive gaming experience",
  },
];

// Reusable Card
const TrendingCard = ({ p }) => (
  <Card
    sx={{
      p: 2,
      borderRadius: 3,
      boxShadow: 2,
      position: "relative",
      transition: "0.3s",
      "&:hover": { transform: "scale(1.02)", boxShadow: 5 },
    }}
  >
    {/* Badge */}
    <Chip
      label="Trending"
      size="small"
      sx={{
        position: "absolute",
        top: 30,
        left: 20,
        bgcolor: "primary.main",
        color: "#fff",
      }}
    />

    {/* Action Icons */}
    <Box sx={{ position: "absolute", top: 12, right: 12 }}>
      <IconButton size="small">
        <FavoriteIcon color="error" />
      </IconButton>
      <IconButton size="small">
        <VisibilityIcon color="primary" />
      </IconButton>
    </Box>

    {/* Image */}
    <CardMedia
      component="img"
      image={p.image}
      alt={p.name}
      sx={{ height: 200, borderRadius: 2 }}
    />

    {/* Content */}
    <CardContent>
      <Typography variant="h6">{p.name}</Typography>
      <Typography color="primary" fontWeight="bold">
        ${p.price}
        <Typography
          component="span"
          sx={{
            ml: 1,
            textDecoration: "line-through",
            color: "text.secondary",
          }}
        >
          ${p.oldPrice}
        </Typography>
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {p.desc}
      </Typography>
      <Typography sx={{ color: "gold", mt: 1 }}>
        {"⭐".repeat(p.rating)}
        {"☆".repeat(5 - p.rating)}
      </Typography>

      {/* Buttons */}
      <Box sx={{ display: "flex", gap: 1, mt: 2 }}>
        <Button href='/checkout' variant="contained" color="warning" fullWidth>
          Add to Cart
        </Button>
        <Button variant="outlined" color="primary" fullWidth>
          Buy Now
        </Button>
      </Box>
    </CardContent>
  </Card>
);

// Main Section
export default function Trending() {
  const [view, setView] = useState("carousel");

  return (
    <Box sx={{ padding: 6 }}>
      {/* Header */}
      <Box display="flex" justifyContent="space-between" mb={5}>
        <Typography variant="h4" fontWeight="800">
          🔥{" "}
          <span style={{ borderBottom: "5px solid #F97316" }}>
            Trending Products
          </span>
        </Typography>
        <ToggleButtonGroup
          value={view}
          exclusive
          onChange={(e, v) => v && setView(v)}
          size="small"
        >
          <ToggleButton
            value="carousel"
            sx={{
              textTransform: "none",
              fontWeight: "bold",
              "&.Mui-selected": {
                bgcolor: "#1E40AF",
                color: "#fff",
                "&:hover": { bgcolor: "#1E3A8A" },
              },
            }}
          >
            Carousel
          </ToggleButton>
          <ToggleButton
            value="grid"
            sx={{
              textTransform: "none",
              fontWeight: "bold",
              "&.Mui-selected": {
                bgcolor: "#F97316",
                color: "#fff",
                "&:hover": { bgcolor: "#c75504ff" },
              },
            }}
          >
            Grid
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>

      {/* Products */}
      {view === "carousel" ? (
        <Swiper
          modules={[Navigation]}
          navigation
          spaceBetween={20}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 4 },
          }}
        >
          {products.map((p, idx) => (
            <SwiperSlide key={idx}>
              <Link href = '/productDetail' sx={{textDecoration: "none"}}>
              <TrendingCard p={p} />
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <Grid container spacing={3}>
          {products.map((p) => (
            <Grid size={{ md: 3, sm: 6, xs: 12 }} key={p.id}>
              <Link href = '/productDetail' sx={{textDecoration: "none"}}><TrendingCard p={p} /></Link>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}
