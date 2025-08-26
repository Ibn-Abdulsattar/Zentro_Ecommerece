import React, { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  TextField,
  Button,
  Switch,
  FormControlLabel,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Avatar,
  IconButton,
  Tabs,
  Tab,
} from '@mui/material';
import {
  Edit,
  Save,
  Cancel,
} from '@mui/icons-material';

const TabPanel = ({ children, value, index, ...other }) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`settings-tabpanel-${index}`}
      aria-labelledby={`settings-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
};

 const Setting = () => {
  const [tabValue, setTabValue] = useState(0);
  const [editMode, setEditMode] = useState(false);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom fontWeight={700}>
          Settings
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Manage your store settings and preferences
        </Typography>
      </Box>

      <Card>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={tabValue} onChange={handleTabChange}>
            <Tab label="Store Information" />
            <Tab label="Notifications" />
            <Tab label="Security" />
            <Tab label="Preferences" />
          </Tabs>
        </Box>

        <TabPanel value={tabValue} index={0}>
          <Grid container spacing={3}>
            <Grid size={{xs:12, md:8}}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h6" fontWeight={600}>
                  Store Information
                </Typography>
                <Button
                  variant={editMode ? "outlined" : "contained"}
                  startIcon={editMode ? <Cancel /> : <Edit />}
                  onClick={() => setEditMode(!editMode)}
                >
                  {editMode ? 'Cancel' : 'Edit'}
                </Button>
              </Box>
              
              <Grid container spacing={2}>
                <Grid size={{xs:12,}}>
                  <TextField
                    label="Store Name"
                    fullWidth
                    defaultValue="EcomAdmin Store"
                    disabled={!editMode}
                  />
                </Grid>
                <Grid size={{xs:12}}>
                  <TextField
                    label="Store Description"
                    multiline
                    rows={3}
                    fullWidth
                    defaultValue="We sell amazing products that customers love. Our mission is to provide high-quality items with exceptional customer service."
                    disabled={!editMode}
                  />
                </Grid>
                <Grid size={{xs:12, sm:6}}>
                  <TextField
                    label="Contact Email"
                    fullWidth
                    defaultValue="contact@ecomadmin.com"
                    disabled={!editMode}
                  />
                </Grid>
                <Grid size={{xs:12, sm:6}}>
                  <TextField
                    label="Phone Number"
                    fullWidth
                    defaultValue="+1 (555) 123-4567"
                    disabled={!editMode}
                  />
                </Grid>
                <Grid size={{xs:12,}}>
                  <TextField
                    label="Store Address"
                    multiline
                    rows={2}
                    fullWidth
                    defaultValue="123 Commerce Street, Business District, New York, NY 10001"
                    disabled={!editMode}
                  />
                </Grid>
                <Grid size={{xs:12, sm:6}}>
                  <TextField
                    label="Website URL"
                    fullWidth
                    defaultValue="https://www.ecomadmin.com"
                    disabled={!editMode}
                  />
                </Grid>
                <Grid size={{xs:12, sm:6}}>
                  <TextField
                    label="Tax ID"
                    fullWidth
                    defaultValue="12-3456789"
                    disabled={!editMode}
                  />
                </Grid>
                {editMode && (
                  <Grid size={{xs:12,}}>
                    <Button variant="contained" startIcon={<Save />}>
                      Save Changes
                    </Button>
                  </Grid>
                )}
              </Grid>
            </Grid>
            
            <Grid size={{xs:12, md:4}}>
              <Typography variant="h6" gutterBottom fontWeight={600}>
                Store Logo
              </Typography>
              <Box sx={{ textAlign: 'center' }}>
                <Avatar
                  sx={{ 
                    width: 120, 
                    height: 120, 
                    mx: 'auto', 
                    mb: 2,
                    bgcolor: 'primary.main',
                    fontSize: '2rem',
                    fontWeight: 700,
                  }}
                >
                  EA
                </Avatar>
                <Button variant="outlined" fullWidth>
                  Upload New Logo
                </Button>
              </Box>
            </Grid>
          </Grid>
        </TabPanel>

        <TabPanel value={tabValue} index={1}>
          <Typography variant="h6" gutterBottom fontWeight={600}>
            Notification Preferences
          </Typography>
          <List>
            <ListItem>
              <ListItemText
                primary="New Order Alerts"
                secondary="Get notified when new orders are placed"
              />
              <ListItemSecondaryAction>
                <Switch defaultChecked />
              </ListItemSecondaryAction>
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Low Stock Alerts"
                secondary="Get notified when products are running low"
              />
              <ListItemSecondaryAction>
                <Switch defaultChecked />
              </ListItemSecondaryAction>
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Customer Messages"
                secondary="Get notified of new customer inquiries"
              />
              <ListItemSecondaryAction>
                <Switch defaultChecked />
              </ListItemSecondaryAction>
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Payment Notifications"
                secondary="Get notified of successful payments and refunds"
              />
              <ListItemSecondaryAction>
                <Switch defaultChecked />
              </ListItemSecondaryAction>
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Marketing Updates"
                secondary="Receive updates about new features and tips"
              />
              <ListItemSecondaryAction>
                <Switch />
              </ListItemSecondaryAction>
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Weekly Reports"
                secondary="Receive weekly performance reports via email"
              />
              <ListItemSecondaryAction>
                <Switch defaultChecked />
              </ListItemSecondaryAction>
            </ListItem>
          </List>
        </TabPanel>

        <TabPanel value={tabValue} index={2}>
          <Typography variant="h6" gutterBottom fontWeight={600}>
            Security Settings
          </Typography>
          <Grid container spacing={3}>
            <Grid size={{xs:12, md:6}}>
              <Typography variant="subtitle1" gutterBottom fontWeight={600}>
                Change Password
              </Typography>
              <Grid container spacing={2}>
                <Grid size={{xs:12,}}>
                  <TextField
                    label="Current Password"
                    type="password"
                    fullWidth
                  />
                </Grid>
                <Grid size={{xs:12,}}>
                  <TextField
                    label="New Password"
                    type="password"
                    fullWidth
                  />
                </Grid>
                <Grid size={{xs:12,}}>
                  <TextField
                    label="Confirm New Password"
                    type="password"
                    fullWidth
                  />
                </Grid>
                <Grid size={{xs:12,}}>
                  <Button variant="contained" color="primary">
                    Update Password
                  </Button>
                </Grid>
              </Grid>
            </Grid>
            
            <Grid size={{xs:12, md:6}}>
              <Typography variant="subtitle1" gutterBottom fontWeight={600}>
                Security Options
              </Typography>
              <List>
                <ListItem>
                  <ListItemText
                    primary="Two-factor Authentication"
                    secondary="Add an extra layer of security to your account"
                  />
                  <ListItemSecondaryAction>
                    <Switch defaultChecked />
                  </ListItemSecondaryAction>
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Login Notifications"
                    secondary="Get notified of new login attempts"
                  />
                  <ListItemSecondaryAction>
                    <Switch defaultChecked />
                  </ListItemSecondaryAction>
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Session Timeout"
                    secondary="Automatically log out after 30 minutes of inactivity"
                  />
                  <ListItemSecondaryAction>
                    <Switch />
                  </ListItemSecondaryAction>
                </ListItem>
              </List>
            </Grid>
          </Grid>
        </TabPanel>

        <TabPanel value={tabValue} index={3}>
          <Typography variant="h6" gutterBottom fontWeight={600}>
            Application Preferences
          </Typography>
          <Grid container spacing={3}>
            <Grid size={{xs:12, md:6}}>
              <Typography variant="subtitle1" gutterBottom fontWeight={600}>
                Display Settings
              </Typography>
              <List>
                <ListItem>
                  <ListItemText
                    primary="Dark Mode"
                    secondary="Switch to dark theme"
                  />
                  <ListItemSecondaryAction>
                    <Switch />
                  </ListItemSecondaryAction>
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Compact View"
                    secondary="Show more data in tables"
                  />
                  <ListItemSecondaryAction>
                    <Switch />
                  </ListItemSecondaryAction>
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Auto-refresh Data"
                    secondary="Automatically refresh dashboard data"
                  />
                  <ListItemSecondaryAction>
                    <Switch defaultChecked />
                  </ListItemSecondaryAction>
                </ListItem>
              </List>
            </Grid>
            
            <Grid size={{xs:12, md:6}}>
              <Typography variant="subtitle1" gutterBottom fontWeight={600}>
                Data & Privacy
              </Typography>
              <List>
                <ListItem>
                  <ListItemText
                    primary="Analytics Tracking"
                    secondary="Help improve the platform with usage data"
                  />
                  <ListItemSecondaryAction>
                    <Switch defaultChecked />
                  </ListItemSecondaryAction>
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Data Export"
                    secondary="Allow data export in various formats"
                  />
                  <ListItemSecondaryAction>
                    <Switch defaultChecked />
                  </ListItemSecondaryAction>
                </ListItem>
              </List>
              <Box sx={{ mt: 2 }}>
                <Button variant="outlined" color="error">
                  Export All Data
                </Button>
              </Box>
            </Grid>
          </Grid>
        </TabPanel>
      </Card>
    </Box>
  );
};

export default Setting;
