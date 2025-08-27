import React from 'react';
import {
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
} from '@mui/material';
import { mockOrders } from '../../data/mockData';

export default function RecentOrders(){
      const recentOrders = mockOrders.slice(0, 5);
    
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
    
    return(
        <>
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
        </>
    )
}