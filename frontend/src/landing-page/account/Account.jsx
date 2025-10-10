import React, { useState } from 'react';
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  Avatar,
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  TextField,
  IconButton,
} from '@mui/material';
import {
  Person as PersonIcon,
  LocalShipping as PackageIcon,
  Favorite as HeartIcon,
  LocationOn as MapPinIcon,
  Edit as EditIcon,
  Save as SaveIcon,
  Close as CloseIcon,
  ExitToApp as LogoutIcon,
} from '@mui/icons-material';

export default function Account() {
  const [isEditing, setIsEditing] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: 'Ahmed Khan',
    email: 'ahmed.khan@example.com',
    phone: '+92 300 1234567',
    address: 'Street 5, Sahiwal, Punjab, Pakistan',
  });

  const orders = [
    { id: '#ORD-001', date: '2 Oct 2025', total: 'Rs. 4,500', status: 'Delivered', items: 3 },
    { id: '#ORD-002', date: '28 Sep 2025', total: 'Rs. 8,200', status: 'Shipped', items: 2 },
    { id: '#ORD-003', date: '15 Sep 2025', total: 'Rs. 2,100', status: 'Processing', items: 1 },
    { id: '#ORD-004', date: '8 Sep 2025', total: 'Rs. 6,800', status: 'Delivered', items: 4 },
  ];

  const wishlist = [
    { id: 1, name: 'Wireless Headphones', price: 'Rs. 3,500', image: '🎧' },
    { id: 2, name: 'Smart Watch', price: 'Rs. 12,000', image: '⌚' },
    { id: 3, name: 'Laptop Bag', price: 'Rs. 2,500', image: '💼' },
  ];


  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = () => {
    setIsEditing(false);
  };

  return (
    <Box sx={{ bgcolor: '#F9FAFB', minHeight: '100vh', py: 4 }}>
      <Container maxWidth="xxl">
        {/* Header */}
        <Paper
          elevation={0}
          sx={{
            p: 3,
            mb: 3,
            background: `linear-gradient(135deg, #1E40AF 0%, #F97316 100%)`,
            borderRadius: 3,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Avatar
                sx={{
                  width: 80,
                  height: 80,
                  bgcolor: '#fff',
                  color: '#1E40AF',
                  fontSize: '2rem',
                  fontWeight: 'bold',
                  border: '3px solid rgba(255, 255, 255, 0.3)',
                }}
              >
                AK
              </Avatar>
              <Box>
                <Typography variant="h4" sx={{ color: '#fff', fontWeight: 'bold', mb: 0.5 }}>
                  {userInfo.name}
                </Typography>
                <Typography variant="body1" sx={{ color: '#fff', opacity: 0.9 }}>
                  {userInfo.email}
                </Typography>
              </Box>
            </Box>
            <Button
              variant="contained"
              startIcon={<LogoutIcon />}
              sx={{
                bgcolor: '#fff',
                color: '#1E40AF',
                fontWeight: 'bold',
                px: 3,
                '&:hover': { bgcolor: '#F3F4F6' },
              }}
            >
              Logout
            </Button>
          </Box>
        </Paper>

        {/* Dashboard Title */}
        <Box
          sx={{
            textAlign: 'center',
            bgcolor: '#fff',
            p: 2.5,
            borderRadius: 3,
            mb: 3,
            boxShadow: '0 4px 20px rgba(249, 115, 22, 0.15)',
            border: '1px solid rgba(30, 64, 175, 0.1)',
          }}
        >
          <Typography
            variant="h5"
            sx={{
              fontWeight: 'bold',
              background: 'linear-gradient(135deg, #1E40AF 0%, #F97316 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              letterSpacing: '0.8px',
            }}
          >
            My Account
          </Typography>
          <Box
            sx={{
              width: '80px',
              height: '3px',
              background: 'linear-gradient(90deg, #1E40AF 0%, #F97316 100%)',
              margin: '8px auto 0',
              borderRadius: '2px',
            }}
          />
        </Box>

        <Grid container spacing={3}>

          {/* Main Content */}
          <Grid size={{xs:12,}}>
            <Paper elevation={0} sx={{ p: 3, borderRadius: 3, minHeight: 500, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
              {/* Account Tab */}
                <Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3, flexWrap: 'wrap', gap: 2 }}>
                    <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#1E40AF' }}>
                      Account Information
                    </Typography>
                    {!isEditing ? (
                      <Button
                        startIcon={<EditIcon />}
                        onClick={handleEdit}
                        variant="outlined"
                        sx={{ 
                          color: '#F97316', 
                          borderColor: '#F97316',
                          '&:hover': {
                            borderColor: '#F97316',
                            bgcolor: 'rgba(249, 115, 22, 0.08)',
                          }
                        }}
                      >
                        Edit
                      </Button>
                    ) : (
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <Button
                          startIcon={<SaveIcon />}
                          variant="contained"
                          onClick={handleSave}
                          sx={{ bgcolor: '#10B981', '&:hover': { bgcolor: '#059669' } }}
                        >
                          Save
                        </Button>
                        <IconButton onClick={handleEdit} size="small" sx={{ color: '#6B7280' }}>
                          <CloseIcon />
                        </IconButton>
                      </Box>
                    )}
                  </Box>

                  <Grid container spacing={3}>
                    <Grid size={{xs:12, sm:6}}>
                      <TextField
                        fullWidth
                        label="Full Name"
                        value={userInfo.name}
                        disabled={!isEditing}
                        onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            '&.Mui-focused fieldset': {
                              borderColor: '#1E40AF',
                            },
                          },
                          '& .MuiInputLabel-root.Mui-focused': {
                            color: '#1E40AF',
                          },
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Email"
                        value={userInfo.email}
                        disabled={!isEditing}
                        onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            '&.Mui-focused fieldset': {
                              borderColor: '#1E40AF',
                            },
                          },
                          '& .MuiInputLabel-root.Mui-focused': {
                            color: '#1E40AF',
                          },
                        }}
                      />
                    </Grid>
                    <Grid size={{xs:12, sm:6}}>
                      <TextField
                        fullWidth
                        label="Phone"
                        value={userInfo.phone}
                        disabled={!isEditing}
                        onChange={(e) => setUserInfo({ ...userInfo, phone: e.target.value })}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            '&.Mui-focused fieldset': {
                              borderColor: '#1E40AF',
                            },
                          },
                          '& .MuiInputLabel-root.Mui-focused': {
                            color: '#1E40AF',
                          },
                        }}
                      />
                    </Grid>
                    <Grid size={{xs:12, sm:6}}>
                      <TextField
                        fullWidth
                        label="Address"
                        value={userInfo.address}
                        disabled={!isEditing}
                        onChange={(e) => setUserInfo({ ...userInfo, address: e.target.value })}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            '&.Mui-focused fieldset': {
                              borderColor: '#1E40AF',
                            },
                          },
                          '& .MuiInputLabel-root.Mui-focused': {
                            color: '#1E40AF',
                          },
                        }}
                      />
                    </Grid>
                  </Grid>

                  <Divider sx={{ my: 4 }} />

                  <Typography variant="h6" sx={{ mb: 3, color: '#1E40AF', fontWeight: 'bold' }}>
                    Quick Stats
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid size={{xs:12, sm:4}}>
                      <Card 
                        sx={{ 
                          bgcolor: '#FEF3C7', 
                          borderLeft: '4px solid #F97316',
                          transition: 'transform 0.2s',
                          '&:hover': {
                            transform: 'translateY(-4px)',
                            boxShadow: '0 4px 12px rgba(249, 115, 22, 0.2)',
                          },
                        }}
                      >
                        <CardContent>
                          <Typography variant="h3" sx={{ fontWeight: 'bold', color: '#F97316', mb: 1 }}>
                            {orders.length}
                          </Typography>
                          <Typography variant="body2" sx={{ color: '#92400E', fontWeight: 500 }}>
                            Total Orders
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                    <Grid size={{xs:12, sm:4}}>
                        <Card 
                        sx={{ 
                          bgcolor: '#DBEAFE', 
                          borderLeft: '4px solid #1E40AF',
                          transition: 'transform 0.2s',
                          '&:hover': {
                            transform: 'translateY(-4px)',
                            boxShadow: '0 4px 12px rgba(30, 64, 175, 0.2)',
                          },
                        }}
                      >
                        <CardContent>
                          <Typography variant="h3" sx={{ fontWeight: 'bold', color: '#1E40AF', mb: 1 }}>
                            {wishlist.length}
                          </Typography>
                          <Typography variant="body2" sx={{ color: '#1E3A8A', fontWeight: 500 }}>
                            Wishlist Items
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                    <Grid size={{xs:12, sm:4}}>
                      <Card 
                        sx={{ 
                          bgcolor: '#D1FAE5', 
                          borderLeft: '4px solid #10B981',
                          transition: 'transform 0.2s',
                          '&:hover': {
                            transform: 'translateY(-4px)',
                            boxShadow: '0 4px 12px rgba(16, 185, 129, 0.2)',
                          },
                        }}
                      >
                        <CardContent>
                          <Typography variant="h3" sx={{ fontWeight: 'bold', color: '#10B981', mb: 1 }}>
                            21.6K
                          </Typography>
                          <Typography variant="body2" sx={{ color: '#065F46', fontWeight: 500 }}>
                            Total Spent (Rs.)
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  </Grid>
                </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}