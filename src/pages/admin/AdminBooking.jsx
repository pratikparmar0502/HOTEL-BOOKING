import React, { useState } from "react";
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
  Button,
} from "@mui/material";
import CheckCircle from "@mui/icons-material/CheckCircle";
import Cancel from "@mui/icons-material/Cancel";

const initialBookings = [
  {
    id: "BK-001",
    guest: "Rahul Sharma",
    hotel: "Grand Hyatt",
    date: "2026-01-12",
    amount: "₹12,000",
    status: "Confirmed",
  },
  {
    id: "BK-002",
    guest: "Sneha Gupta",
    hotel: "The Taj Palace",
    date: "2026-01-15",
    amount: "₹25,500",
    status: "Pending",
  },
  {
    id: "BK-003",
    guest: "Amit Kumar",
    hotel: "Grand Hyatt",
    date: "2026-01-10",
    amount: "₹8,000",
    status: "Cancelled",
  },
];

const AdminBooking = () => {
  const [bookings, setBookings] = useState(initialBookings);

  const updateStatus = (id, newStatus) => {
    setBookings(
      bookings.map((b) => (b.id === id ? { ...b, status: newStatus } : b))
    );
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Confirmed":
        return "success";
      case "Pending":
        return "warning";
      case "Cancelled":
        return "error";
      default:
        return "default";
    }
  };

  return (
    <Box>
      <Typography variant="h4" fontWeight={800} mb={3}>
        Guest Bookings
      </Typography>

      <TableContainer
        component={Paper}
        sx={{ borderRadius: "16px", boxShadow: "0 4px 20px rgba(0,0,0,0.05)" }}
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
            {bookings.map((row) => (
              <TableRow key={row._id} hover>
                <TableCell fontWeight={600}>{row._id}</TableCell>
                <TableCell>{row.guest}</TableCell>
                <TableCell>{row.hotel}</TableCell>
                <TableCell>{row.amount}</TableCell>
                <TableCell>
                  <Chip
                    label={row.status}
                    color={getStatusColor(row.status)}
                    size="small"
                    sx={{ fontWeight: 600 }}
                  />
                </TableCell>
                <TableCell align="right">
                  <IconButton
                    onClick={() => updateStatus(row.id, "Confirmed")}
                    color="success"
                    title="Confirm"
                  >
                    <CheckCircle fontSize="small" />
                  </IconButton>
                  <IconButton
                    onClick={() => updateStatus(row.id, "Cancelled")}
                    color="error"
                    title="Cancel"
                  >
                    <Cancel fontSize="small" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default AdminBooking;
