import {
  Box,
  Typography,
  Button,
  IconButton,
} from "@mui/material";
import {
  Edit as EditIcon,
  Save as SaveIcon,
  Close as CloseIcon,
} from "@mui/icons-material";
export default function AccountInfo({isEditing, handleEdit, handleSave}) {
  return (
    <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 3,
                    flexWrap: "wrap",
                    gap: 2,
                  }}
                >
                  <Typography
                    variant="h5"
                    sx={{ fontWeight: "bold", color: "#1E40AF" }}
                  >
                    Account Information
                  </Typography>
                  {!isEditing ? (
                    <Button
                      startIcon={<EditIcon />}
                      onClick={handleEdit}
                      variant="outlined"
                      sx={{
                        color: "#F97316",
                        borderColor: "#F97316",
                        "&:hover": {
                          borderColor: "#F97316",
                          bgcolor: "rgba(249, 115, 22, 0.08)",
                        },
                      }}
                    >
                      Edit
                    </Button>
                  ) : (
                    <Box sx={{ display: "flex", gap: 1 }}>
                      <Button
                        startIcon={<SaveIcon />}
                        variant="contained"
                        onClick={handleSave}
                        sx={{
                          bgcolor: "#10B981",
                          "&:hover": { bgcolor: "#059669" },
                        }}
                      >
                        Save
                      </Button>
                      <IconButton
                        onClick={handleEdit}
                        size="small"
                        sx={{ color: "#6B7280" }}
                      >
                        <CloseIcon />
                      </IconButton>
                    </Box>
                  )}
                </Box>
  )
}
