import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  IconButton,
  CircularProgress,
} from "@mui/material";
import CheckCircle from "@mui/icons-material/CheckCircle";
import Cancel from "@mui/icons-material/Cancel";
import api from "../../api/axios";
import toast from "react-hot-toast";

const AdminBooking = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  // 1. Real API se data lana
  useEffect(() => {
    const getBookings = async () => {
      try {
        const res = await api.get("/ConfirmBookings");
        const fetchedData = res.data.Data || res.data || [];
        setBookings(fetchedData);
      } catch (err) {
        console.error("Fetch Error:", err);
        toast.error("Failed to load bookings");
      } finally {
        setLoading(false);
      }
    };
    getBookings();
  }, []);

  const updateStatus = async (id, newStatus) => {
    try {
      // 1. Check karein ki URL sahi hai.
      // Agar PATCH kaam nahi kar raha, toh apne senior/doc se poochein ki 'id' URL mein jayegi ya body mein.
      const res = await api.patch(`/ConfirmBookings/${id}`, {
        status: newStatus,
        // FIX: Agar header se 'Key doesn't match' aa raha hai, toh key yahan body mein bhej kar dekhein:
        customerKey: "ngXSnLPrB0vbLvNA",
      });

      if (res.data.Status === "Success" || res.status === 200) {
        setBookings((prev) =>
          prev.map((b) =>
            b._id === id || b.id === id ? { ...b, status: newStatus } : b
          )
        );
        toast.success(`Booking ${newStatus}!`);
      }
    } catch (err) {
      console.error("Update Error Details:", err.response?.data);
      // Agar yahan bhi 404 aa raha hai, toh matlab backend /ConfirmBookings/:id support nahi karta
      toast.error(err.response?.data?.Message || "Status update failed (404)");
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "confirmed":
        return "success";
      case "pending":
        return "warning";
      case "cancelled":
        return "error";
      default:
        return "default";
    }
  };

  if (loading)
    return <CircularProgress sx={{ display: "block", m: "auto", mt: 5 }} />;

  return (
    <Box sx={{ p: 3 }}>
      <Typography
        variant="h4"
        fontWeight={800}
        mb={3}
        sx={{ color: "#1e293b" }}
      >
        Guest Bookings
      </Typography>

      <TableContainer
        component={Paper}
        sx={{ borderRadius: "16px", boxShadow: "0 4px 20px rgba(0,0,0,0.08)" }}
      >
        <Table>
          <TableHead sx={{ bgcolor: "#f8fafc" }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 700 }}>Booking ID</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Guest Name</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Hotel</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Amount</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Status</TableCell>
              <TableCell sx={{ fontWeight: 700 }} align="right">
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {bookings.length > 0 ? (
              bookings.map((row) => (
                <TableRow key={row._id} hover>
                  <TableCell sx={{ fontWeight: 600, color: "#64748b" }}>
                    #{row._id?.slice(-6)}
                  </TableCell>
                  <TableCell>{row.customerName || "N/A"}</TableCell>
                  <TableCell>{row.hotelName || "N/A"}</TableCell>
                  <TableCell>₹{row.amount}</TableCell>
                  <TableCell>
                    <Chip
                      label={row.status || "Pending"}
                      color={getStatusColor(row.status || "Pending")}
                    />
                  </TableCell>
                  <TableCell align="right">
                    <IconButton
                      onClick={() => updateStatus(row._id, "Confirmed")}
                      color="success"
                    >
                      <CheckCircle fontSize="small" />
                    </IconButton>
                    <IconButton
                      onClick={() => updateStatus(row._id, "Cancelled")}
                      color="error"
                    >
                      <Cancel fontSize="small" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  No Bookings Found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default AdminBooking;
