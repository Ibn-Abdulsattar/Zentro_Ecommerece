import {
  Box,
  Typography,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Button,
} from "@mui/material";
import { Search, FilterList } from "@mui/icons-material";
import CustomList from "./customList";

const Customers = () => {

  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom fontWeight={700}>
          Customers Management
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Manage customer relationships and data
        </Typography>
      </Box>

      <Card>
        <CardContent>
          <Grid container spacing={2} sx={{ mb: 3 }}>
            <Grid size={{ xs: 12, md: 3 }}>
              <TextField
                placeholder="Search customers..."
                variant="outlined"
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <FormControl fullWidth>
                <InputLabel>Status Filter</InputLabel>
                <Select label="Status Filter">
                  <MenuItem value="all">All Status</MenuItem>
                  <MenuItem value="active">Active</MenuItem>
                  <MenuItem value="inactive">Inactive</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, md: 3 }}>
              <Button
                variant="outlined"
                startIcon={<FilterList />}
                fullWidth
                sx={{ height: "56px" }}
              >
                More Filters
              </Button>
            </Grid>
          </Grid>

          {/* Customer List */}
          <CustomList />
        </CardContent>
      </Card>
    </Box>
  );
};

export default Customers;
