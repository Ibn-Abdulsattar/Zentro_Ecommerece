import * as React from "react";
import {
  Button,
  Modal,
  TextField,
  Stack,
  Avatar,
  ButtonBase,
  Typography,
  Box,
} from "@mui/material";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import userService from "../../services/user.service";
import { useAuth } from "../../context/AuthContext";
// Modern Responsive Style
const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%", // Responsive width for mobile
  maxWidth: "440px", // Limits width on desktop
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: "1.25rem",
  outline: "none",
  p: { xs: 3, sm: 4 }, // Responsive padding
};

export default function Module({ open, setOpen, user }) {
  const { setUser, setAlert } = useAuth();
  const [avatarSrc, setAvatarSrc] = React.useState(
    user?.avatar_url || undefined
  );
  const [formData, setFormData] = React.useState({
    username: user?.username || "",
    phoneNo: user?.phone_no || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleClose = () => setOpen(false);

  // 1. Update handleAvatarChange to store the actual File object
const [fileObject, setFileObject] = React.useState(null);

const handleAvatarChange = (event) => {
  const file = event.target.files?.[0];
  if (file) {
    setFileObject(file); // Store the actual file for the backend
    const reader = new FileReader();
    reader.onload = () => setAvatarSrc(reader.result); // For preview only
    reader.readAsDataURL(file);
  }
};

// 2. Update handleSubmit to use FormData
const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const formDataToSend = new FormData();
    formDataToSend.append("username", formData.username);
    formDataToSend.append("phoneNo", formData.phoneNo);
    
    if (fileObject) {
      // Name MUST match upload.single('avatarSrc') in backend
      formDataToSend.append("avatarSrc", fileObject); 
    }

    const response = await userService.updateProfile(formDataToSend);
    
    setUser(response.user);
    setAlert({ type: "success", message: response.message });
    setOpen(false);
  } catch (err) {
    setAlert({ type: "error", message: err.message });
  }
};


  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="edit-profile-title"
      closeAfterTransition
    >
      <Box sx={modalStyle}>
        <Typography
          id="edit-profile-title"
          variant="h6"
          fontWeight="700"
          mb={3}
          textAlign="center"
        >
          Edit Profile
        </Typography>

        <Stack
          spacing={3}
          component="form"
          encType="multipart/form-data"
          onSubmit={handleSubmit}
          alignItems="center"
        >
          {/* Avatar Preview & Field with Modern Overlay */}
          <ButtonBase
            component="label"
            sx={{
              position: "relative",
              borderRadius: "50%",
              overflow: "hidden",
              border: "4px solid",
              borderColor: "primary.light",
              transition: "all 0.3s ease",
              "&:hover .upload-overlay": { opacity: 1 },
              "&:hover": { borderColor: "primary.main" },
            }}
          >
            <Avatar
              alt="Profile Picture"
              src={avatarSrc}
              sx={{ width: 110, height: 110 }}
            />

            {/* The "Camera" Overlay on Hover */}
            <Box
              className="upload-overlay"
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                bgcolor: "rgba(0, 0, 0, 0.4)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                opacity: 0,
                transition: "opacity 0.3s ease",
              }}
            >
              <PhotoCameraIcon />
            </Box>

            <input
              type="file"
              accept="image/*"
              hidden
              onChange={handleAvatarChange}
            />
          </ButtonBase>

          {/* Form Fields */}
          <Stack spacing={2.5} width="100%">
            <TextField
              fullWidth
              label="Username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              variant="outlined"
            />

            <TextField
              fullWidth
              label="Phone Number"
              name="phoneNo"
              value={formData.phoneNo}
              onChange={handleChange}
              variant="outlined"
            />
          </Stack>

          {/* Action Buttons */}
          <Stack
            direction="row"
            spacing={2}
            justifyContent="flex-end"
            width="100%"
            pt={1}
          >
            <Button
              onClick={handleClose}
              color="inherit"
              sx={{ fontWeight: 600 }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              sx={{
                borderRadius: "0.75rem",
                px: 4,
                textTransform: "none",
                fontWeight: 700,
              }}
            >
              Save Changes
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Modal>
  );
}
