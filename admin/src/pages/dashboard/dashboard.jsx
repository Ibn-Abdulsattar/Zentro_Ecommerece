import {
  Grid,
  Typography,
  Box,
} from '@mui/material';
import {
  TrendingUp,
  ShoppingCart,
  People,
  AttachMoney,
} from '@mui/icons-material';
import StatsCard from "../../components/Common/statsCard.jsx";
import { salesData } from '../../data/mockData';
import Sales from './sales.jsx';
import TopProducts from './topProducts.jsx';
import RecentOrders from './recentOrders.jsx';

  const totalRevenue = salesData.reduce((sum, item) => sum + item.sales, 0);
  const totalOrders = salesData.reduce((sum, item) => sum + item.orders, 0);

  export default function Dashboard(){
  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom fontWeight={700} color="text.primary">
          Dashboard Overview
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Welcome back! Here's what's happening with your store today.
        </Typography>
      </Box>
      
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid size={{xs:12, sm:6, md:3}}>
          <StatsCard
            title="Total Revenue"
            value={`$${totalRevenue.toLocaleString()}`}
            change="+12.5% from last month"
            changeType="positive"
            icon={<AttachMoney />}
          />
        </Grid>
        <Grid size={{xs:12, sm:6, md:3}}>
          <StatsCard
            title="Orders"
            value={totalOrders.toLocaleString()}
            change="+8.2% from last month"
            changeType="positive"
            icon={<ShoppingCart />}
          />
        </Grid>
        <Grid size={{xs:12, sm:6, md:3}}>
          <StatsCard
            title="Customers"
            value="2,847"
            change="+15.3% from last month"
            changeType="positive"
            icon={<People />}
          />
        </Grid>
        <Grid size={{xs:12, sm:6, md:3}}>
          <StatsCard
            title="Growth Rate"
            value="23.5%"
            change="+2.1% from last month"
            changeType="positive"
            icon={<TrendingUp />}
          />
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid size={{xs:12, lg:8}}>
          {/* Sales Overview */}
          <Sales/>
        </Grid>
        
        <Grid size={{xs:12, lg:4}}>
          {/* Top Products */}
          <TopProducts/>
        </Grid>

        <Grid size={{xs:12}}>
          {/* Recent Orders */}
          <RecentOrders/>
        </Grid>
      </Grid>
    </Box>
  );
};
