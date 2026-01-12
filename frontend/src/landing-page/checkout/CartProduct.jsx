import React from 'react'
import {
  Grid,
  Typography,
  IconButton,
  Select,
  MenuItem,
  Box,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

export default function CartProduct({item, updateQuantity, removeItem}) {
  return (
    <Grid container alignItems="center" spacing={2}>
                  {/* Product Image */}
                  <Grid size={{ xs: 3 }}>
                    <Box
                      component="img"
                      src={item.image}
                      alt={item.name}
                      sx={{
                        width: "100%",
                        height: 100,
                        objectFit: "cover",
                        borderRadius: 2,
                      }}
                    />
                  </Grid>

                  {/* Product Details */}
                  <Grid size={{ xs: 3 }}>
                    <Typography
                      variant="subtitle1"
                      color="#1E40AF"
                      fontWeight={600}
                    >
                      {item.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      ${item.price}
                    </Typography>
                  </Grid>

                  {/* Quantity Selector */}
                  <Grid size={{ xs: 3 }}>
                    <Select
                      value={item.quantity}
                      size="small"
                      onChange={(e) =>
                        updateQuantity(item.id, parseInt(e.target.value))
                      }
                      sx={{ minWidth: 60 }}
                    >
                      {[1, 2, 3, 4, 5].map((qty) => (
                        <MenuItem key={qty} value={qty}>
                          {qty}
                        </MenuItem>
                      ))}
                    </Select>
                  </Grid>

                  {/* Price + Remove */}
                  <Grid size={{ xs: 2 }}>
                    <Typography color="#1E40AF" fontWeight={700}>
                      ${(item.price * item.quantity).toFixed(2)}
                    </Typography>
                  </Grid>
                  <Grid size={{ xs: 1 }}>
                    <IconButton
                      color="error"
                      onClick={() => removeItem(item.id)}
                      size="small"
                    >
                      <DeleteIcon
                        sx={{
                          color: "#F97316",
                          "&:hover": { color: "#c3570aff" },
                        }}
                      />
                    </IconButton>
                  </Grid>
                </Grid>
  )
}
