import {
  Grid,
  TextField,
} from "@mui/material";



export default function AccountInfoEdit({ userInfo, isEditing, setUserInfo }) {
  return (
    <Grid container spacing={3}>
      <Grid size={{ xs: 12, sm: 6 }}>
        <TextField
          fullWidth
          label="Full Name"
          value={userInfo.name}
          disabled={!isEditing}
          onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
          sx={{
            "& .MuiOutlinedInput-root": {
              "&.Mui-focused fieldset": {
                borderColor: "#1E40AF",
              },
            },
            "& .MuiInputLabel-root.Mui-focused": {
              color: "#1E40AF",
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
            "& .MuiOutlinedInput-root": {
              "&.Mui-focused fieldset": {
                borderColor: "#1E40AF",
              },
            },
            "& .MuiInputLabel-root.Mui-focused": {
              color: "#1E40AF",
            },
          }}
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 6 }}>
        <TextField
          fullWidth
          label="Phone"
          value={userInfo.phone}
          disabled={!isEditing}
          onChange={(e) => setUserInfo({ ...userInfo, phone: e.target.value })}
          sx={{
            "& .MuiOutlinedInput-root": {
              "&.Mui-focused fieldset": {
                borderColor: "#1E40AF",
              },
            },
            "& .MuiInputLabel-root.Mui-focused": {
              color: "#1E40AF",
            },
          }}
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 6 }}>
        <TextField
          fullWidth
          label="Address"
          value={userInfo.address}
          disabled={!isEditing}
          onChange={(e) =>
            setUserInfo({ ...userInfo, address: e.target.value })
          }
          sx={{
            "& .MuiOutlinedInput-root": {
              "&.Mui-focused fieldset": {
                borderColor: "#1E40AF",
              },
            },
            "& .MuiInputLabel-root.Mui-focused": {
              color: "#1E40AF",
            },
          }}
        />
      </Grid>
    </Grid>
  );
}
