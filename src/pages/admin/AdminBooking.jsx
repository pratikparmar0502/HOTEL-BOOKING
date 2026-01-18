import React, { useState, useEffect } from "react";
import { InfoOutlined } from "@mui/icons-material";
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
  Tabs,
  Tab,
  TextField,
  Stack,
  Button,
  Avatar,
  Grid,
  Tooltip,
} from "@mui/material";
import {
  CheckCircle,
  Cancel,
  Assessment,
  PendingActions,
  VerifiedUser,
  DoDisturbOn,
  DeleteForever,
  ImageNotSupported,
} from "@mui/icons-material";
import api from "../../api/axios";
import toast from "react-hot-toast";

const AdminBooking = () => {
  const [bookings, setBookings] = useState([]);
  const [activeUsers, setActiveUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tabValue, setTabValue] = useState("all");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const MY_AUTH_KEY = "ngXSnLPrB0vbLvNA";

  const fetchData = async () => {
    try {
      setLoading(true);
      const [bookingRes, userRes] = await Promise.all([
        api.get("/Bookingssystem"),
        api.get("/Users"),
      ]);
      setBookings(bookingRes.data.Data || bookingRes.data || []);
      setActiveUsers(userRes.data.Data || userRes.data || []);
    } catch (err) {
      toast.error("Data load nahi ho paya");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const stats = {
    total: bookings.length,
    pending: bookings.filter(
      (b) => (b.status?.toLowerCase() || "pending") === "pending",
    ).length,
    confirmed: bookings.filter((b) => b.status?.toLowerCase() === "confirmed")
      .length,
    cancelled: bookings.filter((b) => b.status?.toLowerCase() === "cancelled")
      .length,
  };

  // --- DELETE FUNCTION ---
  const deleteBooking = async (id) => {
    if (
      !window.confirm("Are you sure you want to delete this booking?")
    )
      return;
    const toastId = toast.loading("Booking delete ho rahi hai...");
    try {
      await api.delete(`/Bookingssystem/${id}?Authorization=${MY_AUTH_KEY}`);
      toast.success("Booking Deleted!", { id: toastId });
      fetchData(); // List refresh karne ke liye
    } catch (err) {
      toast.error("Delete fail ho gaya", { id: toastId });
    }
  };

  const updateStatus = async (id, newStatus, rowData) => {
    if (rowData.status?.toLowerCase() === newStatus.toLowerCase()) {
      toast(`Booking already ${newStatus}!`, {
        icon: <InfoOutlined style={{ color: "#3b82f6" }} />,
      });
      return;
    }

    const toastId = toast.loading(`Booking ${newStatus} ho rahi hai...`);
    try {
      const formData = new FormData();
      formData.append("status", newStatus.toLowerCase());
      formData.append("customerName", rowData.customerName);
      formData.append("hotelName", rowData.hotelName);
      formData.append("checkIn", rowData.checkIn);
      formData.append("checkOut", rowData.checkOut);
      formData.append(
        "amount",
        Math.round(Number(rowData.amount || rowData.totalPrice || 0)),
      );

      const transparentPixel =
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=";
      const response = await fetch(transparentPixel);
      const blob = await response.blob();
      const file = new File([blob], "status_update.png", { type: "image/png" });
      formData.append("hotelImage", file);

      const url = `/Bookingssystem/${id}?Authorization=${MY_AUTH_KEY}`;
      const res = await api.patch(url, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.status === 200 || res.data.Status === "Success") {
        toast.success(`Booking ${newStatus}!`, { id: toastId });
        fetchData();
      }
    } catch (err) {
      toast.error("Update Failed", { id: toastId });
    }
  };

  const filteredBookings = bookings.filter((b) => {
    const bStatus = b.status?.toLowerCase() || "pending";
    if (tabValue !== "all" && bStatus !== tabValue) return false;
    if (startDate && endDate) {
      const bDate = new Date(b.checkIn).getTime();
      const start = new Date(startDate).getTime();
      const end = new Date(endDate).getTime();
      if (bDate < start || bDate > end) return false;
    }
    return true;
  });

  if (loading)
    return <CircularProgress sx={{ display: "block", m: "auto", mt: 10 }} />;

  return (
    <Box sx={{ p: 3, bgcolor: "#f1f5f9", minHeight: "100vh" }}>
      <Typography variant="h4" fontWeight={900} mb={4} color="#1e293b">
        Admin Dashboard
      </Typography>

      {/* Stats Section */}
      <Grid container spacing={3} mb={4}>
        {[
          {
            label: "Total",
            val: stats.total,
            col: "#6366f1",
            icon: <Assessment />,
          },
          {
            label: "Pending",
            val: stats.pending,
            col: "#f59e0b",
            icon: <PendingActions />,
          },
          {
            label: "Confirmed",
            val: stats.confirmed,
            col: "#10b981",
            icon: <VerifiedUser />,
          },
          {
            label: "Cancelled",
            val: stats.cancelled,
            col: "#ef4444",
            icon: <DoDisturbOn />,
          },
        ].map((s, i) => (
          <Grid item xs={12} sm={6} md={3} key={i}>
            <Paper
              sx={{
                p: 2,
                borderRadius: 2,
                display: "flex",
                alignItems: "center",
                gap: 2,
              }}
            >
              <Avatar sx={{ bgcolor: `${s.col}20`, color: s.col }}>
                {s.icon}
              </Avatar>
              <Box>
                <Typography variant="caption" color="text.secondary">
                  {s.label}
                </Typography>
                <Typography variant="h6" fontWeight={800}>
                  {s.val}
                </Typography>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Filters Section */}
      <Paper sx={{ p: 2, mb: 3, borderRadius: 2 }}>
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={2}
          justifyContent="space-between"
          alignItems="center"
        >
          <Tabs value={tabValue} onChange={(e, v) => setTabValue(v)}>
            <Tab label="All" value="all" />
            <Tab label="Pending" value="pending" />
            <Tab label="Confirmed" value="confirmed" />
            <Tab label="Cancelled" value="cancelled" />
          </Tabs>
          <Stack direction="row" spacing={2}>
            <TextField
              type="date"
              label="From"
              size="small"
              InputLabelProps={{ shrink: true }}
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
            <TextField
              type="date"
              label="To"
              size="small"
              InputLabelProps={{ shrink: true }}
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
            <Button
              size="small"
              onClick={() => {
                setStartDate("");
                setEndDate("");
              }}
            >
              Clear
            </Button>
          </Stack>
        </Stack>
      </Paper>

      {/* Table Section */}
      <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
        <Table>
          <TableHead sx={{ bgcolor: "#f8fafc" }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 700 }}>Hotel Image</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Hotel Name</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Customer</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Check In/Out</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Amount</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Status</TableCell>
              <TableCell align="right" sx={{ fontWeight: 700 }}>
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredBookings.map((row) => {
              const userMatch = activeUsers.find(
                (u) =>
                  u.email?.toLowerCase() === row.customerName?.toLowerCase(),
              );
              return (
                <TableRow key={row._id} hover>
                  {/* REAL IMAGE DISPLAY */}
                  <TableCell>
                    <Box
                      sx={{
                        width: 80,
                        height: 60,
                        borderRadius: 1,
                        overflow: "hidden",
                        border: "1px solid #e2e8f0",
                        bgcolor: "#f8fafc",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {row.hotelImage ? (
                        <img
                          // FIX: Agar image URL "http" se start nahi hota toh API ka base URL lagayein
                          src={
                            row.hotelImage.startsWith("http")
                              ? row.hotelImage
                              : `https://api.techsnack.com${row.hotelImage}`
                          }
                          alt="hotel"
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                          }}
                          onError={(e) => {
                            // Try one more time without API prefix if it fails
                            e.target.onerror = null;
                            e.target.src =
                              "https://via.placeholder.com/80x60?text=No+Image";
                          }}
                        />
                      ) : (
                        <ImageNotSupported color="disabled" />
                      )}
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" fontWeight={600}>
                      {row.hotelName}
                    </Typography>
                  </TableCell>

                  <TableCell>
                    <Typography variant="body2" fontWeight={600}>
                      {userMatch?.displayName ||
                        (row.customerName === "admin07@gmail.com"
                          ? "Admin"
                          : "Guest")}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {row.customerName}
                    </Typography>
                  </TableCell>

                  <TableCell>
                    <Typography variant="caption" display="block">
                      {row.checkIn}
                    </Typography>
                    <Typography variant="caption" display="block">
                      to {row.checkOut}
                    </Typography>
                  </TableCell>

                  <TableCell sx={{ fontWeight: 700 }}>$ {row.amount}</TableCell>

                  <TableCell>
                    <Chip
                      label={row.status || "pending"}
                      size="small"
                      color={
                        row.status === "confirmed"
                          ? "success"
                          : row.status === "cancelled"
                            ? "error"
                            : "warning"
                      }
                    />
                  </TableCell>

                  <TableCell align="right">
                    <Stack
                      direction="row"
                      spacing={0.5}
                      justifyContent="flex-end"
                    >
                      <Tooltip title="Confirm">
                        <IconButton
                          onClick={() =>
                            updateStatus(row._id, "confirmed", row)
                          }
                          color="success"
                        >
                          <CheckCircle />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Cancel">
                        <IconButton
                          onClick={() =>
                            updateStatus(row._id, "cancelled", row)
                          }
                          color="warning"
                        >
                          <Cancel />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete">
                        <IconButton
                          onClick={() => deleteBooking(row._id)}
                          color="error"
                        >
                          <DeleteForever />
                        </IconButton>
                      </Tooltip>
                    </Stack>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default AdminBooking;
