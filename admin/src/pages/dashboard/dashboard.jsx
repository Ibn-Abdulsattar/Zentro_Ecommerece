import React from 'react';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Avatar,
  LinearProgress,
} from '@mui/material';
import { LineChart } from '@mui/x-charts/LineChart';
import {
  TrendingUp,
  ShoppingCart,
  People,
  AttachMoney,
  ArrowUpward,
  ArrowDownward,
} from '@mui/icons-material';
import StatsCard from "../../components/Common/statsCard.jsx";
import { mockOrders, mockProducts, salesData } from '../../data/mockData';

 const Dashboard = () => {
  const recentOrders = mockOrders.slice(0, 5);
  const topProducts = mockProducts
    .sort((a, b) => b.sales - a.sales)
    .slice(0, 5);

  const getStatusColor = (status) => {
    switch (status) {
      case 'delivered':
        return 'success';
      case 'shipped':
        return 'info';
      case 'processing':
        return 'warning';
      case 'pending':
        return 'default';
      case 'cancelled':
        return 'error';
      default:
        return 'default';
    }
  };

  const totalRevenue = salesData.reduce((sum, item) => sum + item.sales, 0);
  const totalOrders = salesData.reduce((sum, item) => sum + item.orders, 0);

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
          <Card sx={{ height: 400 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom fontWeight={600}>
                Sales Overview
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Monthly sales performance over the last 6 months
              </Typography>
              <LineChart
                width={500}
                height={300}
                series={[
                  {
                    data: salesData.map(d => d.sales),
                    label: 'Revenue ($)',
                    color: '#1976d2',
                    curve: 'smooth',
                  },
                ]}
                xAxis={[{ 
                  scaleType: 'point', 
                  data: salesData.map(d => d.month),
                }]}
                grid={{ vertical: true, horizontal: true }}
              />
            </CardContent>
          </Card>
        </Grid>
        
        <Grid size={{xs:12, lg:4}}>
          <Card sx={{ height: 400 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom fontWeight={600}>
                Top Products
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Best selling products this month
              </Typography>
              <Box sx={{ maxHeight: 300, overflowY: 'auto' }}>
                {topProducts.map((product, index) => (
                  <Box
                    key={product.id}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      py: 2,
                      borderBottom: index < topProducts.length - 1 ? '1px solid' : 'none',
                      borderColor: 'divider',
                    }}
                  >
                    <Avatar
                      src={product.image}
                      sx={{ width: 48, height: 48, mr: 2 }}
                    />
                    <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                      <Typography variant="subtitle2" noWrap fontWeight={600}>
                        {product.name}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        {product.sales} sales
                      </Typography>
                      <LinearProgress 
                        variant="determinate" 
                        value={(product.sales / 250) * 100} 
                        sx={{ mt: 1, height: 4, borderRadius: 2 }}
                      />
                    </Box>
                    <Box sx={{ textAlign: 'right', ml: 2 }}>
                      <Typography variant="h6" color="primary.main" fontWeight={600}>
                        ${product.price}
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{xs:12}}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Box>
                  <Typography variant="h6" gutterBottom fontWeight={600}>
                    Recent Orders
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Latest customer orders and their status
                  </Typography>
                </Box>
              </Box>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Order ID</TableCell>
                      <TableCell>Customer</TableCell>
                      <TableCell>Date</TableCell>
                      <TableCell>Items</TableCell>
                      <TableCell>Total</TableCell>
                      <TableCell>Status</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {recentOrders.map((order) => (
                      <TableRow key={order.id} hover>
                        <TableCell>
                          <Typography variant="subtitle2" color="primary" fontWeight={600}>
                            {order.id}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Box>
                            <Typography variant="subtitle2">{order.customer}</Typography>
                            <Typography variant="body2" color="text.secondary">
                              {order.email}
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell>{order.date}</TableCell>
                        <TableCell>{order.items}</TableCell>
                        <TableCell>
                          <Typography variant="subtitle2" fontWeight={600}>
                            ${order.total}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={order.status}
                            color={getStatusColor(order.status)}
                            size="small"
                            sx={{ textTransform: 'capitalize', fontWeight: 500 }}
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;