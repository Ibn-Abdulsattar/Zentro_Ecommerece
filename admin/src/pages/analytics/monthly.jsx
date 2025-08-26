import { BarChart } from "@mui/x-charts/BarChart";
import { salesData } from "../../data/mockData";
import { Typography, Card, CardContent } from "@mui/material";

export default function Monthly() {
  return (
    <>
      <Card sx={{}}>
        <CardContent>
          <Typography variant="h6" gutterBottom fontWeight={600}>
            Monthly Revenue Trends
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Revenue performance over the last 6 months
          </Typography>
          <BarChart
            // width={500}
            height={415}
            series={[
              {
                data: salesData.map((d) => d.sales),
                label: "Revenue ($)",
                color: "#1976d2",
              },
            ]}
            xAxis={[
              {
                scaleType: "band",
                data: salesData.map((d) => d.month),
              },
            ]}
            grid={{ vertical: true, horizontal: true }}
          />
        </CardContent>
      </Card>
    </>
  );
}
