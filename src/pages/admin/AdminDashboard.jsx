import React, { useState, useContext } from "react";
import {
  Box,
  Container,
  TextField,
  Button,
  Typography,
  Paper,
  Grid,
  Stack,
  alpha,
} from "@mui/material";
import { MoodContext } from "../../context/MoodContext";
import { toast } from "react-toastify";
import AddBusinessIcon from "@mui/icons-material/AddBusiness";

const AdminDashboard = () => {
  const { mood } = useContext(MoodContext);

  // Aapke Colors
  const colors = {
    nature: "#10b981",
    urban: "#ef4444",
    ocean: "#0ea5e9",
    romantic: "#ec4899",
    royal: "#f59e0b",
    default: "#3b82f6",
  };
  const moodColor = colors[mood] || colors.default;

  const [hotelData, setHotelData] = useState({
    name: "",
    location: "",
    price: "",
    image: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Saving Hotel:", hotelData);
    toast.success("Hotel Added Successfully! 🏨");
    // Yahan hum baad mein logic daalenge save karne ka
  };

  return (
    <Box sx={{ py: 12, bgcolor: "#f8fafc", minHeight: "100vh" }}>
      <Container maxWidth="sm">
        <Paper
          elevation={0}
          sx={{
            p: 4,
            borderRadius: "24px",
            border: `1px solid #e2e8f0`,
            boxShadow: `0 20px 40px ${alpha(moodColor, 0.05)}`,
          }}
        >
          <Stack alignItems="center" spacing={1} sx={{ mb: 4 }}>
            <Box
              sx={{
                p: 2,
                borderRadius: "50%",
                bgcolor: alpha(moodColor, 0.1),
                color: moodColor,
              }}
            >
              <AddBusinessIcon fontSize="large" />
            </Box>
            <Typography variant="h5" fontWeight="800">
              Add New Hotel
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Enter details to list a new property
            </Typography>
          </Stack>

          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Hotel Name"
                  variant="outlined"
                  onChange={(e) =>
                    setHotelData({ ...hotelData, name: e.target.value })
                  }
                  sx={{ "& .MuiOutlinedInput-root": { borderRadius: "12px" } }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Location"
                  onChange={(e) =>
                    setHotelData({ ...hotelData, location: e.target.value })
                  }
                  sx={{ "& .MuiOutlinedInput-root": { borderRadius: "12px" } }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Price per Night (₹)"
                  type="number"
                  onChange={(e) =>
                    setHotelData({ ...hotelData, price: e.target.value })
                  }
                  sx={{ "& .MuiOutlinedInput-root": { borderRadius: "12px" } }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Image URL"
                  placeholder="https://images.unsplash.com/..."
                  onChange={(e) =>
                    setHotelData({ ...hotelData, image: e.target.value })
                  }
                  sx={{ "& .MuiOutlinedInput-root": { borderRadius: "12px" } }}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                  sx={{
                    bgcolor: moodColor,
                    py: 1.5,
                    borderRadius: "12px",
                    fontWeight: "700",
                    fontSize: "1rem",
                    boxShadow: `0 8px 20px ${alpha(moodColor, 0.3)}`,
                    "&:hover": {
                      bgcolor: moodColor,
                      filter: "brightness(0.9)",
                    },
                  }}
                >
                  Save Property
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Container>
    </Box>
  );
};

export default AdminDashboard;
