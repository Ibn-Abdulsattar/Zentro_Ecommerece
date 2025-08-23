import {
  Typography,
  MenuItem,
  FormControl,
  Select,
  Box,
  Paper,
  Slider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Divider,
} from "@mui/material";
import {
  ExpandMore,
  Star,
  Category,
  BrandingWatermark,
  MonetizationOn,
} from "@mui/icons-material";

const categories = [
  "All",
  "House Made",
  "Electronics",
  "Fashion",
  "Beauty",
  "Sports",
  "Toys & Kids",
];
const brands = ["All", "Apple", "Samsung", "Xiaomi"];

export default function Filters({
  category,
  brand,
  rating,
  priceRange,
  handleCategoryChange,
  handleBrandChange,
  handlePriceChange,
  handleRatingChange,
}) {
  return (
    <Paper
      elevation={5}
      sx={{
        borderRadius: 3,
        overflow: "hidden",
        // minWidth: 320,
      }}
    >
      {/* Header */}
      <Box
        sx={{
          bgcolor: "#F97316",
          color: "white",
          py: 2,
          textAlign: "center",
          fontWeight: "bold",
          fontSize: "1.2rem",
        }}
      >
        Filters
      </Box>

      {/* Category */}
      <Accordion defaultExpanded sx={{ py: 2 }}>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Category sx={{ mr: 1, color: "#F97316" }} />
          <Typography fontWeight={600}>Category</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FormControl fullWidth size="small">
            <Select value={category} onChange={handleCategoryChange}>
              {categories.map((c) => (
                <MenuItem key={c} value={c}>
                  {c}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </AccordionDetails>
      </Accordion>
      <Divider />

      {/* Brand */}
      <Accordion sx={{ py: 2 }}>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <BrandingWatermark sx={{ mr: 1, color: "#F97316" }} />
          <Typography fontWeight={600}>Brand</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FormControl fullWidth size="small">
            <Select value={brand} onChange={handleBrandChange}>
              {brands.map((b) => (
                <MenuItem key={b} value={b}>
                  {b}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </AccordionDetails>
      </Accordion>
      <Divider />

      {/* Price */}
      <Accordion sx={{ py: 2 }}>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <MonetizationOn sx={{ mr: 1, color: "#F97316" }} />
          <Typography fontWeight={600}>Price Range</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Slider
            value={priceRange}
            onChange={handlePriceChange}
            valueLabelDisplay="auto"
            min={0}
            max={2000}
            sx={{
              color: "#F97316",
              "& .MuiSlider-thumb:hover": {
                boxShadow: "0 0 0 8px rgba(249,115,22,0.2)",
              },
            }}
          />
        </AccordionDetails>
      </Accordion>
      <Divider />

      {/* Rating */}
      <Accordion sx={{ py: 2 }}>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Star sx={{ mr: 1, color: "#1E40AF" }} />
          <Typography fontWeight={600}>Minimum Rating</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Slider
            value={rating}
            onChange={handleRatingChange}
            valueLabelDisplay="auto"
            min={1}
            max={5}
            step={0.5}
            sx={{
              color: "#1E40AF",
              "& .MuiSlider-thumb:hover": {
                boxShadow: "0 0 0 8px rgba(30,64,175,0.2)",
              },
            }}
          />
        </AccordionDetails>
      </Accordion>
    </Paper>
  );
}
