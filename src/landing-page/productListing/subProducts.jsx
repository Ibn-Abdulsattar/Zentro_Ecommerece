import React, { useState } from "react";
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  Typography,
  Box,
  Paper,
  Link,
} from "@mui/material";
import Filters from "./filters";
import Sorting from "./sorting";

// Mock product data
const products = [
  {
    id: 1,
    title: "iPhone 15 Pro Max",
    price: 1199,
    currency: "USD",
    rating: 4.7,
    image: "/laptop.webp",
    brand: "Apple",
    category: "Electronics",
  },
  {
    id: 2,
    title: "Samsung Galaxy S23",
    price: 999,
    currency: "USD",
    rating: 4.5,
    image: "phone.avif",
    brand: "Samsung",
    category: "Electronics",
  },
  {
    id: 3,
    title: "Sony WH-1000XM5 Headphones",
    price: 399,
    currency: "USD",
    rating: 4.8,
    image: "/headphone.avif",
    brand: "Sony",
    category: "Electronics",
  },
  {
    id: 4,
    title: "Nike Air Max 270",
    price: 150,
    currency: "USD",
    rating: 4.6,
    image: "/smartWatch.avif",
    brand: "Nike",
    category: "Fashion",
  },
  {
    id: 5,
    title: "The Ordinary Niacinamide 10% + Zinc 1%",
    price: 12,
    currency: "USD",
    rating: 4.4,
    image: "/sports.jpg",
    brand: "The Ordinary",
    category: "Beauty",
  },
  {
    id: 6,
    title: "iPhone 15 Pro Max",
    price: 1199,
    currency: "USD",
    rating: 4.7,
    image: "/laptop.webp",
    brand: "Apple",
    category: "Electronics",
  },
  {
    id: 7,
    title: "Nike Air Max 270",
    price: 150,
    currency: "USD",
    rating: 4.6,
    image: "/smartWatch.avif",
    brand: "Nike",
    category: "Fashion",
  },
  {
    id: 8,
    title: "The Ordinary Niacinamide 10% + Zinc 1%",
    price: 12,
    currency: "USD",
    rating: 4.4,
    image: "/sports.jpg",
    brand: "The Ordinary",
    category: "Beauty",
  },
];

export default function SubProducts() {
  const [rating, setRating] = useState(1);
  const [sortBy, setSortBy] = useState("relevance");
  const [category, setCategory] = useState("All");
  const [brand, setBrand] = useState("All");
  const [priceRange, setPriceRange] = useState([0, 2000]);

  const handleSortChange = (e) => setSortBy(e.target.value);
  const handleCategoryChange = (e) => setCategory(e.target.value);
  const handleBrandChange = (e) => setBrand(e.target.value);
  const handlePriceChange = (e, newValue) => setPriceRange(newValue);
  const handleRatingChange = (e, newValue) => setRating(newValue);

  const filteredProducts = products
    .filter((p) => (category === "All" ? true : p.category === category))
    .filter((p) => (brand === "All" ? true : p.brand === brand))
    .filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1])
    .filter((p) => p.rating >= rating)
    .sort((a, b) => {
      switch (sortBy) {
        case "priceLowHigh":
          return a.price - b.price;
        case "priceHighLow":
          return b.price - a.price;
        case "rating":
          return b.rating - a.rating;
        default:
          return 0;
      }
    });

  return (
    <Box sx={{ padding: "2rem", backgroundColor: "#f9fafb", my: 7 }}>
      {/* Title */}
      <Box
        sx={{
          mb: 7,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography variant="h4" fontWeight={800} color="text.primary">
          <span style={{ borderBottom: "5px solid #F97316" }}>
            Featured Products
          </span>
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {/* Filters Section */}
        <Grid size={{ xs: 12, md: 3 }}>
          <Filters
            category={category}
            brand={brand}
            rating={rating}
            priceRange={priceRange}
            handleCategoryChange={handleCategoryChange}
            handleBrandChange={handleBrandChange}
            handlePriceChange={handlePriceChange}
            handleRatingChange={handleRatingChange}
          />

          <Sorting sortBy={sortBy} handleSortChange={handleSortChange} />
        </Grid>

        {/* Products Section */}
        <Grid size={{ xs: 12, md: 9 }}>
          <Grid container spacing={3}>
            {filteredProducts.map((product) => (
              <Grid
                key={product.id}
                size={{ xs: 12, sm: 6, md: 4,}}
              >
                <Link href = '/productDetail' sx={{textDecoration: "none"}}>
                <Card
                  sx={{
                    borderRadius: 3,
                    boxShadow: 4,
                    transition: "0.3s",
                    "&:hover": { boxShadow: 6, transform: "translateY(-4px)" },
                  }}
                >
                  <CardMedia
                    component="img"
                    height="220"
                    image={product.image}
                    alt={product.title}
                  />
                  <CardContent>
                    <Typography variant="subtitle1" fontWeight="bold">
                      {product.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {product.brand}
                    </Typography>
                    <Typography variant="h6" color="#1E40AF">
                      ${product.price}
                    </Typography>
                    <Typography variant="body2">⭐ {product.rating}</Typography>
                  </CardContent>
                  <CardActions>
                    <Button href='/checkout'
                      fullWidth
                      variant="contained"
                      sx={{
                        bgcolor: "#F97316",
                        borderRadius: 2,
                        textTransform: "none",
                        "&:hover": { bgcolor: "#cb5603" },
                      }}
                    >
                      Add to Cart
                    </Button>
                  </CardActions>
                </Card>
                </Link>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}
