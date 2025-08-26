import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';

const StatsCard = ({
  title,
  value,
  change,
  changeType = 'neutral',
  icon,
}) => {
  const getChangeColor = () => {
    switch (changeType) {
      case 'positive':
        return 'success.main';
      case 'negative':
        return 'error.main';
      default:
        return 'text.secondary';
    }
  };

  return (
    <Card 
      sx={{ 
        height: '100%',
        transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.12)',
        },
      }}
    >
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box sx={{ flex: 1 }}>
            <Typography 
              color="textSecondary" 
              gutterBottom 
              variant="body2"
              sx={{ fontWeight: 500, mb: 1 }}
            >
              {title}
            </Typography>
            <Typography 
              variant="h4" 
              component="div" 
              fontWeight={700}
              sx={{ mb: 1, color: 'text.primary' }}
            >
              {value}
            </Typography>
            {change && (
              <Typography 
                variant="body2" 
                sx={{ 
                  color: getChangeColor(), 
                  fontWeight: 500,
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                {change}
              </Typography>
            )}
          </Box>
          {icon && (
            <Box 
              sx={{ 
                color: 'primary.main', 
                opacity: 0.8,
                backgroundColor: 'primary.light',
                borderRadius: 2,
                p: 1.5,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {React.cloneElement(icon, { fontSize: 'large' })}
            </Box>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default StatsCard;