import {
  Box,
  Typography,
  Button,
  Rating,
  Grid,
  Divider,
  IconButton,
  Stack,
  Chip,
} from "@mui/material";
import { AddShoppingCart, FavoriteBorder, FlashOn } from "@mui/icons-material";
import { useState } from "react";

export default function Product() {
  const product = {
    title: "iPhone 15 Pro Max",
    price: 1199,
    currency: "USD",
    rating: 4.7,
    description:
      "Experience the ultimate performance with the iPhone 15 Pro Max. Built with aerospace-grade titanium, a stunning display, and the new A17 Pro chip, it’s designed for power, speed, and efficiency.",
    images: ["/laptop.webp", "/phone.avif", "/watch.webp"],
    brand: "Apple",
    category: "Electronics",
    variants: {
      colors: ["Black", "Silver", "Gold"],
      storage: ["128GB", "256GB", "512GB"],
    },
  };

  const [mainImage, setMainImage] = useState(product.images[0]);
  const [selectedColor, setSelectedColor] = useState(
    product.variants.colors[0]
  );
  const [selectedStorage, setSelectedStorage] = useState(
    product.variants.storage[0]
  );

  return (
    <Box sx={{ py: 12, px: { xs: 2, md: 8 }, bgcolor: "#fafafa" }}>
      <Typography
        variant="h4"
        sx={{
          textAlign: " center",
          fontWeight: "800",
          mb: 7,
          color: "#1E40AF",
        }}
      >
        Overview & Features
      </Typography>
      <Grid container spacing={6}>
        {/* Left: Product Images */}
        <Grid size={{ xs: 12, md: 6 }}>
          {/* Main Image */}
          <Box
            component="img"
            src={mainImage}
            alt={product.title}
            sx={{
              width: "100%",
              height: { xs: 300, sm: 400, md: 500 }, // responsive height
              borderRadius: 4,
              boxShadow: 4,
              objectFit: "cover", // use "cover" if you want it cropped instead
              bgcolor: "#f9f9f9", // fallback background in case of transparent PNG
            }}
          />

          {/* Thumbnails */}
          <Stack
            direction="row"
            spacing={2}
            sx={{ mt: 2, overflowX: "auto", pb: 1 }}
          >
            {product.images.map((img, idx) => (
              <Box
                key={idx}
                component="img"
                src={img}
                alt={`thumbnail-${idx}`}
                onClick={() => setMainImage(img)}
                sx={{
                  width: 80,
                  height: 80,
                  borderRadius: 2,
                  objectFit: "cover",
                  cursor: "pointer",
                  border:
                    mainImage === img
                      ? "2px solid #1E40AF"
                      : "2px solid transparent",
                  transition: "0.3s",
                  "&:hover": { opacity: 0.8 },
                }}
              />
            ))}
          </Stack>
        </Grid>

        {/* Right: Product Info */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Box sx={{ position: { md: "sticky" }, top: { md: 40 } }}>
            <Typography variant="h4" fontWeight="bold" gutterBottom>
              {product.title}
            </Typography>

            <Typography variant="subtitle1" color="text.secondary" gutterBottom>
              Brand: {product.brand} • {product.category}
            </Typography>

            {/* Rating */}
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <Rating value={product.rating} precision={0.5} readOnly />
              <Typography sx={{ ml: 1, fontWeight: 500 }}>
                {product.rating} / 5
              </Typography>
            </Box>

            {/* Price */}
            <Typography
              variant="h4"
              sx={{ fontWeight: "bold", color: "#F97316", mb: 2 }}
            >
              {product.currency} {product.price}
            </Typography>

            <Divider sx={{ my: 3 }} />

            {/* Variants */}
            <Box sx={{ mb: 3 }}>
              <Typography fontWeight="bold" gutterBottom>
                Choose Color:
              </Typography>
              <Stack direction="row" spacing={1}>
                {product.variants.colors.map((color) => (
                  <Chip
                    key={color}
                    label={color}
                    clickable
                    color={selectedColor === color ? "primary" : "default"}
                    onClick={() => setSelectedColor(color)}
                    sx={{ fontWeight: 500 }}
                  />
                ))}
              </Stack>
            </Box>

            <Box sx={{ mb: 3 }}>
              <Typography fontWeight="bold" gutterBottom>
                Storage:
              </Typography>
              <Stack direction="row" spacing={1}>
                {product.variants.storage.map((storage) => (
                  <Chip
                    key={storage}
                    label={storage}
                    clickable
                    color={selectedStorage === storage ? "primary" : "default"}
                    onClick={() => setSelectedStorage(storage)}
                    sx={{ fontWeight: 500 }}
                  />
                ))}
              </Stack>
            </Box>

            {/* Description */}
            <Typography variant="body1" sx={{ mb: 4, lineHeight: 1.7 }}>
              {product.description}
            </Typography>

            {/* Actions */}
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <Button
                href="/checkout"
                variant="contained"
                startIcon={<AddShoppingCart />}
                sx={{
                  bgcolor: "#1E40AF",
                  "&:hover": { bgcolor: "#163397" },
                  borderRadius: 3,
                  px: 4,
                  py: 1.5,
                  fontSize: "1rem",
                  textTransform: "none",
                  flex: 1,
                }}
              >
                Add to Cart
              </Button>
              <Button
                variant="contained"
                startIcon={<FlashOn />}
                sx={{
                  bgcolor: "#F97316",
                  "&:hover": { bgcolor: "#d75c0c" },
                  borderRadius: 3,
                  px: 4,
                  py: 1.5,
                  fontSize: "1rem",
                  textTransform: "none",
                  flex: 1,
                }}
              >
                Buy Now
              </Button>
              <IconButton
                sx={{
                  border: "1px solid #ddd",
                  borderRadius: 3,
                  "&:hover": { bgcolor: "rgba(249,115,22,0.1)" },
                  alignSelf: "center",
                }}
              >
                <FavoriteBorder sx={{ color: "#F97316" }} />
              </IconButton>
            </Stack>

            {/* Info Highlights */}
            <Stack spacing={1.5} sx={{ mt: 4 }}>
              <Typography variant="body2" color="text.secondary">
                ✅ Free Shipping on orders above $500
              </Typography>
              <Typography variant="body2" color="text.secondary">
                🔄 7-day easy return policy
              </Typography>
              <Typography variant="body2" color="text.secondary">
                🛡️ 1 Year Warranty included
              </Typography>
            </Stack>
          </Box>
        </Grid>
      </Grid>

      {/* Related Products */}
      <Box sx={{ mt: 8 }}>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          You may also like
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Explore more top deals handpicked for you
        </Typography>
        {/* Later you can plug your ProductCard grid here */}
      </Box>
    </Box>
  );
}
