import { Grid } from "@mui/material";
import StatsCard from "../../components/Common/statsCard.jsx";
import {
  TrendingUp,
  ShoppingCart,
  People,
  AttachMoney,
} from "@mui/icons-material";

export default function Reports() {
  return (
    <>
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatsCard
            title="Revenue Growth"
            value="23.5%"
            change="+5.2% from last quarter"
            changeType="positive"
            icon={<TrendingUp />}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatsCard
            title="Conversion Rate"
            value="3.2%"
            change="+0.8% from last month"
            changeType="positive"
            icon={<ShoppingCart />}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatsCard
            title="Customer Retention"
            value="87.3%"
            change="+2.1% from last month"
            changeType="positive"
            icon={<People />}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatsCard
            title="Avg. Order Value"
            value="$127.50"
            change="+$12.30 from last month"
            changeType="positive"
            icon={<AttachMoney />}
          />
        </Grid>
      </Grid>
    </>
  );
}
