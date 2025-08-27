import React from 'react';
import {
  Card,
  CardContent,
  Typography,
} from '@mui/material';
import { LineChart } from '@mui/x-charts/LineChart';
import {  salesData } from '../../data/mockData';

export default function Sales(){
    return(
        <>
        <Card sx={{ minHeight: 400, }}>
            <CardContent>
              <Typography variant="h6" gutterBottom fontWeight={600}>
                Sales Overview
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Monthly sales performance over the last 6 months
              </Typography>
              <LineChart
                height={350}
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
        </>
    )
}