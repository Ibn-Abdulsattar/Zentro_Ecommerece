import {
  Grid,
  Typography,
  Card,
  CardContent,
} from "@mui/material";

export default function QuickStats({orders, wishlist}) {
  return (
    <div>                <Typography
                  variant="h6"
                  sx={{ mb: 3, color: "#1E40AF", fontWeight: "bold" }}
                >
                  Quick Stats
                </Typography>
                <Grid container spacing={2}>
                  <Grid size={{ xs: 12, sm: 4 }}>
                    <Card
                      sx={{
                        bgcolor: "#FEF3C7",
                        borderLeft: "4px solid #F97316",
                        transition: "transform 0.2s",
                        "&:hover": {
                          transform: "translateY(-4px)",
                          boxShadow: "0 4px 12px rgba(249, 115, 22, 0.2)",
                        },
                      }}
                    >
                      <CardContent>
                        <Typography
                          variant="h3"
                          sx={{ fontWeight: "bold", color: "#F97316", mb: 1 }}
                        >
                          {orders.length}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: "#92400E", fontWeight: 500 }}
                        >
                          Total Orders
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid size={{ xs: 12, sm: 4 }}>
                    <Card
                      sx={{
                        bgcolor: "#DBEAFE",
                        borderLeft: "4px solid #1E40AF",
                        transition: "transform 0.2s",
                        "&:hover": {
                          transform: "translateY(-4px)",
                          boxShadow: "0 4px 12px rgba(30, 64, 175, 0.2)",
                        },
                      }}
                    >
                      <CardContent>
                        <Typography
                          variant="h3"
                          sx={{ fontWeight: "bold", color: "#1E40AF", mb: 1 }}
                        >
                          {wishlist.length}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: "#1E3A8A", fontWeight: 500 }}
                        >
                          Wishlist Items
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid size={{ xs: 12, sm: 4 }}>
                    <Card
                      sx={{
                        bgcolor: "#D1FAE5",
                        borderLeft: "4px solid #10B981",
                        transition: "transform 0.2s",
                        "&:hover": {
                          transform: "translateY(-4px)",
                          boxShadow: "0 4px 12px rgba(16, 185, 129, 0.2)",
                        },
                      }}
                    >
                      <CardContent>
                        <Typography
                          variant="h3"
                          sx={{ fontWeight: "bold", color: "#10B981", mb: 1 }}
                        >
                          21.6K
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: "#065F46", fontWeight: 500 }}
                        >
                          Total Spent (Rs.)
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid></div>
  )
}
