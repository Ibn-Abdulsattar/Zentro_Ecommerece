import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Avatar,
  LinearProgress,
} from '@mui/material';
import { mockProducts} from '../../data/mockData';

export default function TopProducts(){
      const topProducts = mockProducts
        .sort((a, b) => b.sales - a.sales)
        .slice(0, 5);

    return(
        <>
        <Card sx={{ height: 500 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom fontWeight={600}>
                Top Products
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Best selling products this month
              </Typography>
              <Box sx={{ maxHeight: 370, overflowY: 'auto' }}>
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
        </>
    )
}