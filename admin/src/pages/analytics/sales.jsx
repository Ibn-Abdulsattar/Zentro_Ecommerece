import { categoryData } from "../../data/mockData";
import { Box, Typography, Card, CardContent } from "@mui/material";
import { PieChart } from "@mui/x-charts/PieChart";

export default function Sales() {
  return (
    <>
      <Card sx={{  }}>
        <CardContent>
          <Typography variant="h6" gutterBottom fontWeight={600}>
            Sales by Category
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Distribution of sales across product categories
          </Typography>
          <PieChart
            series={[
              {
                data: categoryData,
                highlightScope: { faded: "global", highlighted: "item" },
                faded: {
                  innerRadius: 30,
                  additionalRadius: -30,
                  color: "gray",
                },
              },
            ]}
            height={300}
          />
          <Box sx={{ mt: 2 }}>
            {categoryData.map((item) => (
              <Box
                key={item.id}
                sx={{ display: "flex", alignItems: "center", mb: 1 }}
              >
                <Box
                  sx={{
                    width: 12,
                    height: 12,
                    backgroundColor: item.color,
                    borderRadius: "50%",
                    mr: 1,
                  }}
                />
                <Typography variant="body2" sx={{ flexGrow: 1 }}>
                  {item.label}
                </Typography>
                <Typography variant="body2" fontWeight={600}>
                  {item.value}%
                </Typography>
              </Box>
            ))}
          </Box>
        </CardContent>
      </Card>
    </>
  );
}
