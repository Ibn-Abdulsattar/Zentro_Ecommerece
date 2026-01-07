import React from 'react';
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
} from "@mui/material";
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Home as HomeIcon,
  Add as AddIcon,
  Phone as PhoneIcon,
  LocationOn as LocationIcon,
} from "@mui/icons-material";


export default function AddAddress({addresses}) {
  return (
    <Grid container spacing={3}>
          {addresses.length > 0 ? (
            addresses.map((addr) => (
              <Grid size={{xs:12, md:6}} key={addr._id}>
                <Card
                  sx={{
                    borderRadius: 3,
                    border: addr.isDefault ? "2px solid #1E40AF" : "1px solid #E5E7EB",
                    transition: "all 0.3s",
                    position: "relative",
                    "&:hover": {
                      boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
                      transform: "translateY(-4px)",
                    },
                  }}
                >
                  {addr.isDefault && (
                    <Box
                      sx={{
                        position: "absolute",
                        top: 0,
                        right: 0,
                        bgcolor: "#1E40AF",
                        color: "#fff",
                        px: 2,
                        py: 0.5,
                        borderBottomLeftRadius: 8,
                        borderTopRightRadius: 8,
                        fontWeight: "bold",
                        fontSize: "0.75rem",
                      }}
                    >
                      DEFAULT
                    </Box>
                  )}
                  <CardContent sx={{ p: 3 }}>
                    <Box sx={{ display: "flex", alignItems: "start", gap: 2, mb: 2 }}>
                      <HomeIcon sx={{ color: "#F97316", mt: 0.5 }} />
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
                          {addr.fullName}
                        </Typography>
                        <Typography sx={{ color: "#6B7280", mb: 0.5 }}>
                          {addr.street}, {addr.city}
                        </Typography>
                        <Typography sx={{ color: "#6B7280", mb: 1 }}>
                          {addr.state} - {addr.zip}
                        </Typography>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                          <PhoneIcon sx={{ fontSize: 16, color: "#9CA3AF" }} />
                          <Typography sx={{ color: "#6B7280", fontSize: "0.9rem" }}>
                            {addr.phone}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>

                    <Divider sx={{ my: 2 }} />

                    <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                      <Button
                        size="small"
                        variant="outlined"
                        startIcon={<EditIcon />}
                        sx={{
                          borderColor: "#1E40AF",
                          color: "#1E40AF",
                          "&:hover": {
                            borderColor: "#1E40AF",
                            bgcolor: "rgba(30, 64, 175, 0.08)",
                          },
                        }}
                      >
                        Edit
                      </Button>
                      <Button
                        size="small"
                        variant="outlined"
                        startIcon={<DeleteIcon />}
                        sx={{
                          borderColor: "#EF4444",
                          color: "#EF4444",
                          "&:hover": {
                            borderColor: "#EF4444",
                            bgcolor: "rgba(239, 68, 68, 0.08)",
                          },
                        }}
                      >
                        Delete
                      </Button>
                      {!addr.isDefault && (
                        <Button
                          size="small"
                          variant="contained"
                          sx={{
                            bgcolor: "#10B981",
                            "&:hover": { bgcolor: "#059669" },
                          }}
                        >
                          Set Default
                        </Button>
                      )}
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))
          ) : (
            <Grid size={{xs:12}}>
              <Card
                sx={{
                  borderRadius: 3,
                  border: "2px dashed #D1D5DB",
                  bgcolor: "#F9FAFB",
                }}
              >
                <CardContent>
                  <Box sx={{ textAlign: "center", py: 4 }}>
                    <LocationIcon sx={{ fontSize: 64, color: "#D1D5DB", mb: 2 }} />
                    <Typography variant="h6" sx={{ color: "#6B7280", mb: 1 }}>
                      No addresses saved
                    </Typography>
                    <Typography sx={{ color: "#9CA3AF", mb: 3 }}>
                      Add your first address to make checkout faster
                    </Typography>
                    <Button
                      variant="contained"
                      startIcon={<AddIcon />}
                      sx={{
                        bgcolor: "#F97316",
                        fontWeight: "bold",
                        "&:hover": { bgcolor: "#EA580C" },
                      }}
                    >
                      Add Address
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          )}
        </Grid>
  )
}
