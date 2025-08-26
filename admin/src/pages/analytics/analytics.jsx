import React from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  LinearProgress,
} from "@mui/material";
import Reports from "./reports.jsx";
import Monthly from "./monthly.jsx";
import Sales from "./sales.jsx";
import TopProducts from "./topProducts.jsx";

export const Analytics = () => {
  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom fontWeight={700}>
          Analytics & Reports
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Comprehensive insights into your business performance
        </Typography>
      </Box>

      {/* Reports */}
      <Reports />

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, lg: 6 }}>
          {/* Monthly */}
          <Monthly />
        </Grid>

        <Grid size={{ xs: 12, lg: 6 }}>
          {/* Sales */}
          <Sales />
        </Grid>

        <Grid size={{ xs: 12 }}>
          {/* TopProducts */}
          <TopProducts />
        </Grid>
      </Grid>
    </Box>
  );
};
