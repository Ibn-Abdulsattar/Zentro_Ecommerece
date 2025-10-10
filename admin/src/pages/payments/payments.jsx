import React, { useState } from "react";
import {
  Box,
  Grid,
  Typography,
  TextField,
  Select,
  MenuItem,
  InputAdornment,
  IconButton,
  Card,
  CardContent,
  Button,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Divider,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Stack,
  Tooltip,
} from "@mui/material";

import {
  Search,
  Refresh,
  Download,
  CreditCard,
  Payment,
  AccessTime,
  CheckCircle,
  Error,
  Replay,
  TrendingUp,
  Close,
  CalendarMonth,
} from "@mui/icons-material";

export default function Payments() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateRange, setDateRange] = useState("month");
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  const payments = [
    {
      id: "PAY-2891",
      orderId: "#ORD-1234",
      customer: "John Doe",
      email: "john@example.com",
      amount: 450.0,
      method: "Credit Card",
      status: "Completed",
      date: "2025-10-04 14:30",
      fee: 13.5,
      net: 436.5,
      card: "**** 4532",
    },
    {
      id: "PAY-2890",
      orderId: "#ORD-1233",
      customer: "Jane Smith",
      email: "jane@example.com",
      amount: 320.0,
      method: "PayPal",
      status: "Completed",
      date: "2025-10-04 12:15",
      fee: 9.6,
      net: 310.4,
      card: "PayPal",
    },
    {
      id: "PAY-2889",
      orderId: "#ORD-1232",
      customer: "Bob Johnson",
      email: "bob@example.com",
      amount: 780.0,
      method: "Credit Card",
      status: "Pending",
      date: "2025-10-03 18:45",
      fee: 23.4,
      net: 756.6,
      card: "**** 8901",
    },
    {
      id: "PAY-2888",
      orderId: "#ORD-1231",
      customer: "Alice Williams",
      email: "alice@example.com",
      amount: 210.0,
      method: "Debit Card",
      status: "Completed",
      date: "2025-10-03 16:20",
      fee: 6.3,
      net: 203.7,
      card: "**** 2345",
    },
    {
      id: "PAY-2887",
      orderId: "#ORD-1230",
      customer: "Charlie Brown",
      email: "charlie@example.com",
      amount: 590.0,
      method: "Credit Card",
      status: "Failed",
      date: "2025-10-02 10:30",
      fee: 0.0,
      net: 0.0,
      card: "**** 6789",
    },
  ];

  const stats = [
    { title: "Total Revenue", value: "$24,830", change: "+12.5%", icon: <TrendingUp color="primary" /> },
    { title: "Completed Payments", value: "156", change: "+8.3%", icon: <CheckCircle color="success" /> },
    { title: "Pending Payments", value: "12", change: "-5.2%", icon: <AccessTime color="warning" /> },
    { title: "Failed Payments", value: "8", change: "+2.1%", icon: <Error color="error" /> },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "Completed":
        return "success";
      case "Pending":
        return "warning";
      case "Failed":
        return "error";
      case "Refunded":
        return "default";
      default:
        return "default";
    }
  };

  const filteredPayments = payments.filter((p) => {
    const s = searchTerm.toLowerCase();
    const matchesSearch =
      p.customer.toLowerCase().includes(s) ||
      p.orderId.toLowerCase().includes(s) ||
      p.id.toLowerCase().includes(s);
    const matchesStatus = statusFilter === "all" || p.status.toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  const StatCard = ({ title, value, change, icon }) => (
    <Card sx={{ p: 2 }}>
      <CardContent>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Box>
            <Typography variant="subtitle2" color="text.secondary">
              {title}
            </Typography>
            <Typography variant="h5" fontWeight={700}>
              {value}
            </Typography>
            <Typography
              variant="body2"
              color={change.startsWith("+") ? "success.main" : "error.main"}
            >
              {change}
            </Typography>
          </Box>
          {icon}
        </Stack>
      </CardContent>
    </Card>
  );

  return (
    <Box sx={{ bgcolor: "#f9fafb", minHeight: "100vh", p: 3 }}>
      <Typography variant="h4" fontWeight={700} mb={1}>
        Payments
      </Typography>
      <Typography variant="body1" color="text.secondary" mb={3}>
        Manage and track all payment transactions
      </Typography>

      {/* Stats */}
      <Grid container spacing={2} mb={3}>
        {stats.map((stat, i) => (
          <Grid size={{xs:12, sm:6, md:3}} key={i}>
            <StatCard {...stat} />
          </Grid>
        ))}
      </Grid>

      {/* Filters */}
      <Card sx={{ mb: 3 }}>
        <Box p={2} display="flex" flexWrap="wrap" gap={2} alignItems="center" justifyContent="space-between">
          <Stack direction="row" spacing={2} flexWrap="wrap">
            <TextField
              size="small"
              placeholder="Search by customer, order ID, or payment ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              }}
            />
            <Select
              size="small"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <MenuItem value="all">All Status</MenuItem>
              <MenuItem value="completed">Completed</MenuItem>
              <MenuItem value="pending">Pending</MenuItem>
              <MenuItem value="failed">Failed</MenuItem>
              <MenuItem value="refunded">Refunded</MenuItem>
            </Select>
            <Select
              size="small"
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
            >
              <MenuItem value="today">Today</MenuItem>
              <MenuItem value="week">Last 7 Days</MenuItem>
              <MenuItem value="month">Last Month</MenuItem>
              <MenuItem value="year">Last Year</MenuItem>
            </Select>
          </Stack>

          <Stack direction="row" spacing={1}>
            <Tooltip title="Refresh">
              <IconButton>
                <Refresh />
              </IconButton>
            </Tooltip>
            <Tooltip title="Download CSV">
              <IconButton>
                <Download />
              </IconButton>
            </Tooltip>
          </Stack>
        </Box>
      </Card>

      {/* Payments Table */}
      <Card>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Payment ID</TableCell>
              <TableCell>Customer</TableCell>
              <TableCell>Order ID</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Method</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredPayments.map((p) => (
              <TableRow hover key={p.id}>
                <TableCell>
                  <Typography color="primary">{p.id}</Typography>
                </TableCell>
                <TableCell>
                  <Typography fontWeight={600}>{p.customer}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {p.email}
                  </Typography>
                </TableCell>
                <TableCell>{p.orderId}</TableCell>
                <TableCell>${p.amount.toFixed(2)}</TableCell>
                <TableCell>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <CreditCard fontSize="small" />
                    <Typography variant="body2">{p.method}</Typography>
                  </Stack>
                </TableCell>
                <TableCell>
                  <Chip
                    label={p.status}
                    color={getStatusColor(p.status)}
                    size="small"
                    icon={
                      p.status === "Completed" ? (
                        <CheckCircle fontSize="small" />
                      ) : p.status === "Pending" ? (
                        <AccessTime fontSize="small" />
                      ) : (
                        <Error fontSize="small" />
                      )
                    }
                  />
                </TableCell>
                <TableCell>{p.date}</TableCell>
                <TableCell>
                  <IconButton
                    onClick={() => {
                      setSelectedPayment(p);
                      setShowDetails(true);
                    }}
                  >
                    <Payment />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <Divider />
        <Box display="flex" justifyContent="space-between" p={2}>
          <Typography variant="body2" color="text.secondary">
            Showing {filteredPayments.length} of {payments.length} payments
          </Typography>
          <Stack direction="row" spacing={1}>
            <Button disabled>Previous</Button>
            <Button variant="contained">1</Button>
            <Button>2</Button>
            <Button>Next</Button>
          </Stack>
        </Box>
      </Card>

      {/* Payment Details Modal */}
      <Dialog
        open={showDetails}
        onClose={() => setShowDetails(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          Payment Details
          <IconButton
            onClick={() => setShowDetails(false)}
            sx={{ position: "absolute", right: 8, top: 8 }}
          >
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          {selectedPayment && (
            <Stack spacing={3}>
              <Box>
                <Typography variant="subtitle2" color="text.secondary">
                  Payment ID
                </Typography>
                <Typography fontWeight={600}>{selectedPayment.id}</Typography>
              </Box>

              <Divider />

              <Box>
                <Typography variant="subtitle2" color="text.secondary">
                  Customer
                </Typography>
                <Typography fontWeight={600}>{selectedPayment.customer}</Typography>
                <Typography variant="body2">{selectedPayment.email}</Typography>
              </Box>

              <Divider />

              <Box>
                <Typography variant="subtitle2" color="text.secondary">
                  Payment Method
                </Typography>
                <Typography>{selectedPayment.method}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {selectedPayment.card}
                </Typography>
              </Box>

              <Divider />

              <Box>
                <Typography variant="subtitle2" color="text.secondary">
                  Financial Summary
                </Typography>
                <Stack spacing={1}>
                  <Typography>Amount: ${selectedPayment.amount.toFixed(2)}</Typography>
                  <Typography color="error">
                    Fee: -${selectedPayment.fee.toFixed(2)}
                  </Typography>
                  <Typography color="success.main" fontWeight={700}>
                    Net: ${selectedPayment.net.toFixed(2)}
                  </Typography>
                </Stack>
              </Box>
            </Stack>
          )}
        </DialogContent>
        <DialogActions>
          <Button variant="contained" startIcon={<Download />}>
            Download Receipt
          </Button>
          <Button variant="outlined" startIcon={<Replay />}>
            Refund Payment
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
