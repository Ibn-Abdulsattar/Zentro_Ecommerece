import React from "react";
import {
  Box,
  Typography,
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

export default function TopProducts() {
  const topPerformers = [
    {
      product: "Wireless Headphones",
      sales: 234,
      revenue: 18705,
      growth: 15.2,
    },
    { product: "Smart Watch", sales: 156, revenue: 31199, growth: 23.8 },
    { product: "Coffee Beans", sales: 89, revenue: 2224, growth: -5.3 },
    { product: "Office Chair", sales: 67, revenue: 20099, growth: 8.7 },
    { product: "Skincare Set", sales: 123, revenue: 11069, growth: 12.4 },
  ];

  const getGrowthColor = (growth) => {
    return growth >= 0 ? "success.main" : "error.main";
  };
  return (
    <>
      <Card sx={{mt:4}}>
        <CardContent>
          <Typography variant="h6" gutterBottom fontWeight={600}>
            Top Performing Products
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Products ranked by sales performance and growth
          </Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Product</TableCell>
                  <TableCell>Sales</TableCell>
                  <TableCell>Revenue</TableCell>
                  <TableCell>Growth</TableCell>
                  <TableCell>Performance</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {topPerformers.map((item, index) => (
                  <TableRow key={item.product} hover>
                    <TableCell>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Box
                          sx={{
                            width: 32,
                            height: 32,
                            borderRadius: "50%",
                            backgroundColor: "primary.main",
                            color: "white",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            mr: 2,
                            fontWeight: 600,
                          }}
                        >
                          {index + 1}
                        </Box>
                        <Typography variant="subtitle2" fontWeight={600}>
                          {item.product}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>{item.sales}</TableCell>
                    <TableCell>
                      <Typography variant="subtitle2" fontWeight={600}>
                        ${item.revenue.toLocaleString()}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography
                        color={getGrowthColor(item.growth)}
                        variant="body2"
                        fontWeight={600}
                      >
                        {item.growth > 0 ? "+" : ""}
                        {item.growth}%
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          width: 100,
                        }}
                      >
                        <LinearProgress
                          variant="determinate"
                          value={Math.abs(item.growth) * 3}
                          sx={{
                            flexGrow: 1,
                            mr: 1,
                            height: 6,
                            borderRadius: 3,
                            "& .MuiLinearProgress-bar": {
                              backgroundColor:
                                item.growth >= 0
                                  ? "success.main"
                                  : "error.main",
                            },
                          }}
                        />
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </>
  );
}
