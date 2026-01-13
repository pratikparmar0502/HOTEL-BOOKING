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
  const getBookings = async () => {
    try {
      const res = await api.get("/Bookingssystem");
      const fetchedData = res.data.Data || res.data || [];
      setBookings(fetchedData);
    } catch (err) {
      console.error("Fetch Error:", err);
      toast.error("Failed to load bookings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getBookings();
  }, []);
  const updateStatus = async (id, newStatus) => {
    const toastId = toast.loading("Updating...");
    try {
      // 1. FormData banayein (Server ki requirement ke liye)
      const formData = new FormData();
      formData.append("status", newStatus.toLowerCase());

      // 2. TOKEN KO URL MEIN BHEJEIN (Final Trick)
      // Kai baar Techsnack APIs form-data ke case mein headers
      // ko ignore kar deti hain aur sirf URL query ko dekhti hain.
      const url = `/Bookingssystem/${id}?Authorization=ngXSnLPrB0vbLvNA`;

      const res = await api.patch(url, formData, {
        headers: {
          // Headers mein bhi key rakhein double security ke liye
          Authorization: "ngXSnLPrB0vbLvNA",
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.data.Status === "Success" || res.status === 200) {
        setBookings((prev) =>
          prev.map((b) => (b._id === id ? { ...b, status: newStatus } : b))
        );
        toast.success(`Booking ${newStatus}!`, { id: toastId });
      }
    } catch (err) {
      console.log("Full Response:", err.response?.data);

      // Agar ab bhi Key Match na ho, toh 'customerKey' try karein
      if (err.response?.data?.Message?.includes("Key")) {
        handleRetryWithCustomerKey(id, newStatus, toastId);
      } else {
        toast.error(err.response?.data?.Message || "Error", { id: toastId });
      }
    }
  };

  // Retry logic agar pehla fail ho
  const handleRetryWithCustomerKey = async (id, newStatus, toastId) => {
    try {
      const formData = new FormData();
      formData.append("status", newStatus.toLowerCase());

      // Kuch endpoints 'customerKey' maangte hain
      const res = await api.patch(
        `/Bookingssystem/${id}?customerKey=ngXSnLPrB0vbLvNA`,
        formData
      );

      if (res.data.Status === "Success") {
        setBookings((prev) =>
          prev.map((b) => (b._id === id ? { ...b, status: newStatus } : b))
        );
        toast.success("Updated!", { id: toastId });
      }
    } catch (e) {
      toast.error("API Key Issue: Check your Techsnack Dashboard", {
        id: toastId,
      });
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
