import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Chip,
  Button,
  Container,
  Stack,
  Divider,
} from "@mui/material";

const Bookings = () => {
  const history = useHistory();
  const [myBookings, setMyBookings] = useState([]);

  // Page load hote hi LocalStorage se data uthao
  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("allBookings") || "[]");
    setMyBookings(savedData);
  }, []);

  if (myBookings.length === 0) {
    return (
      <Container sx={{ textAlign: "center", mt: 10 }}>
        <Typography variant="h5" color="text.secondary">
          Oops! Koi booking history nahi hai.
        </Typography>
        <Button
          variant="contained"
          onClick={() => history.push("/")}
          sx={{ mt: 3, borderRadius: "10px", textTransform: "none" }}
        >
          Explore Hotels
        </Button>
      </Container>
    );
  }

  return (
    <Box sx={{ p: { xs: 2, md: 5 }, bgcolor: "#f8fafc", minHeight: "100vh" }}>
      <Container maxWidth="md">
        <Typography
          variant="h4"
          fontWeight="900"
          sx={{ mb: 4, color: "#1e293b" }}
        >
          My Bookings 🏨
        </Typography>

        <Grid container spacing={3}>
          {myBookings.map((booking) => (
            <Grid item xs={12} key={booking.id}>
              <Card
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", sm: "row" },
                  borderRadius: "24px",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                  overflow: "hidden",
                }}
              >
                <CardMedia
                  component="img"
                  sx={{
                    width: { xs: "100%", sm: 280 },
                    height: { xs: 200, sm: "auto" },
                  }}
                  image={
                    booking.img ||
                    "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800"
                  }
                  alt="hotel"
                />
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    flex: 1,
                    p: 2,
                  }}
                >
                  <CardContent>
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignItems="flex-start"
                    >
                      <Chip
                        label="Confirmed"
                        color="success"
                        size="small"
                        sx={{ fontWeight: "bold", mb: 1 }}
                      />
                      <Typography variant="caption" color="text.secondary">
                        Order ID: {booking.id}
                      </Typography>
                    </Stack>

                    <Typography
                      variant="h5"
                      fontWeight="800"
                      sx={{ color: "#0f172a" }}
                    >
                      {booking.hotelName}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mb: 2 }}
                    >
                      📍 {booking.loc || "Location details"}
                    </Typography>

                    <Divider sx={{ my: 2 }} />

                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <Typography
                          variant="caption"
                          color="text.secondary"
                          display="block"
                        >
                          DATES
                        </Typography>
                        <Typography variant="body2" fontWeight="700">
                          {booking.dates || "Not specified"}
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography
                          variant="caption"
                          color="text.secondary"
                          display="block"
                        >
                          TOTAL PAID
                        </Typography>
                        <Typography
                          variant="body1"
                          fontWeight="900"
                          color="primary.main"
                        >
                          ${booking.totalPrice}
                        </Typography>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Bookings;
