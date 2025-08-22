import React from "react";
import {
  Typography,
  MenuItem,
  FormControl,
  Select,
  Box,
  Paper,
  Slider,
} from "@mui/material";

export default function Sorting({ sortBy, handleSortChange }) {
  return (
    <Box sx={{ my: { xs: 4 } }} >
      {/* Sorting Section */}
      <Typography
        variant="h6"
        sx={{
          mb: 2,
          fontWeight: "bold",
          backgroundColor: "#F97316",
          textAlign: "center",
          color: "#fff",
          py: 1.5,
          borderTopLeftRadius: 12,
          borderTopRightRadius: 12,
          borderBottomLeftRadius: 0,
          borderBottomRightRadius: 0,
        }}
      >
        Sort By
      </Typography>
      <Paper
        elevation={3}
        sx={{
          p: 2,
          borderRadius: 3,
          minWidth: 250,
          bgcolor: "white",
        }}
      >
        <FormControl fullWidth size="small">
          <Select value={sortBy} onChange={handleSortChange}>
            <MenuItem value="relevance">Relevance</MenuItem>
            <MenuItem value="priceLowHigh">Price: Low → High</MenuItem>
            <MenuItem value="priceHighLow">Price: High → Low</MenuItem>
            <MenuItem value="rating">Best Rating</MenuItem>
          </Select>
        </FormControl>
      </Paper>
    </Box>
  );
}
