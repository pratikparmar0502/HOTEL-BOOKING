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
  Tabs,
  Tab,
  TextField,
  Stack,
  Button,
  Avatar,
  Grid,
  Tooltip,
  useTheme,
  useMediaQuery,
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

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));

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

  const deleteBooking = async (id) => {
    if (!window.confirm("Delete this booking?")) return;
    const toastId = toast.loading("Deleting...");
    try {
      await api.delete(`/Bookingssystem/₹{id}?Authorization=₹{MY_AUTH_KEY}`);
      toast.success("Deleted!", { id: toastId });
      fetchData();
    } catch (err) {
      toast.error("Delete failed", { id: toastId });
    }
  };

  const updateStatus = async (id, newStatus, rowData) => {
    const toastId = toast.loading(`Updating to ₹{newStatus}...`);
    try {
      const formData = new FormData();
      formData.append("status", newStatus.toLowerCase());
      formData.append("customerName", rowData.customerName);
      formData.append("hotelName", rowData.hotelName);
      formData.append("checkIn", rowData.checkIn);
      formData.append("checkOut", rowData.checkOut);
      formData.append("amount", Math.round(Number(rowData.amount || 0)));

      if (rowData.hotelImage) {
        const imgUrl = rowData.hotelImage.startsWith("http")
          ? rowData.hotelImage
          : `https://api.techsnack.online₹{rowData.hotelImage}`;
        const imgRes = await fetch(imgUrl);
        const blob = await imgRes.blob();
        formData.append(
          "hotelImage",
          new File([blob], "hotel.png", { type: blob.type }),
        );
      }

      await api.patch(
        `/Bookingssystem/₹{id}?Authorization=₹{MY_AUTH_KEY}`,
        formData,
      );
      toast.success(`Success!`, { id: toastId });
      fetchData();
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
      return bDate >= start && bDate <= end;
    }
    return true;
  });

  if (loading)
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "80vh",
        }}
      >
        <CircularProgress />
      </Box>
    );

  return (
    <Box sx={{ p: { xs: 1, sm: 3 }, bgcolor: "#f1f5f9", minHeight: "100vh" }}>
      <Typography
        variant={isMobile ? "h5" : "h4"}
        fontWeight={900}
        mb={4}
        color="#1e293b"
      >
        Bookings Management
      </Typography>

      {/* STATS CARDS */}
      <Grid container spacing={2} mb={4}>
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
          <Grid item xs={6} md={3} key={i}>
            <Paper
              sx={{
                p: 2,
                borderRadius: 3,
                display: "flex",
                alignItems: "center",
                gap: 1.5,
              }}
            >
              <Avatar
                sx={{
                  bgcolor: `₹{s.col}15`,
                  color: s.col,
                  width: 40,
                  height: 40,
                }}
              >
                {s.icon}
              </Avatar>
              <Box>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{ display: "block", lineHeight: 1 }}
                >
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

      {/* FILTERS & TABS */}
      <Paper sx={{ p: 2, mb: 3, borderRadius: 3 }}>
        <Stack
          direction={{ xs: "column", lg: "row" }}
          spacing={2}
          justifyContent="space-between"
          alignItems={{ xs: "stretch", lg: "center" }}
        >
          <Tabs
            value={tabValue}
            onChange={(e, v) => setTabValue(v)}
            variant="scrollable"
            scrollButtons="auto"
            sx={{ borderBottom: { xs: 1, lg: 0 }, borderColor: "divider" }}
          >
            <Tab label="All" value="all" />
            <Tab label="Pending" value="pending" />
            <Tab label="Confirmed" value="confirmed" />
            <Tab label="Cancelled" value="cancelled" />
          </Tabs>

          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <TextField
              type="date"
              label="From"
              size="small"
              InputLabelProps={{ shrink: true }}
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              fullWidth
            />
            <TextField
              type="date"
              label="To"
              size="small"
              InputLabelProps={{ shrink: true }}
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              fullWidth
            />
            <Button
              variant="outlined"
              color="inherit"
              onClick={() => {
                setStartDate("");
                setEndDate("");
              }}
              sx={{ borderRadius: 2 }}
            >
              Clear
            </Button>
          </Stack>
        </Stack>
      </Paper>

      {/* RESPONSIVE TABLE */}
      <TableContainer
        component={Paper}
        sx={{
          borderRadius: 3,
          boxShadow: "0 10px 30px rgba(0,0,0,0.03)",
          overflowX: "auto",
        }}
      >
        <Table sx={{ minWidth: 900 }}>
          {" "}
          {/* Forces scroll on mobile */}
          <TableHead sx={{ bgcolor: "#f8fafc" }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 700 }}>Hotel</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Customer</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Dates</TableCell>
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
                  <TableCell>
                    <Stack direction="row" spacing={2} alignItems="center">
                      <Avatar
                        variant="rounded"
                        src={
                          row.hotelImage?.startsWith("http")
                            ? row.hotelImage
                            : `https://api.techsnack.com₹{row.hotelImage}`
                        }
                        sx={{ width: 60, height: 45, bgcolor: "#f1f5f9" }}
                      >
                        <ImageNotSupported />
                      </Avatar>
                      <Typography variant="body2" fontWeight={700}>
                        {row.hotelName}
                      </Typography>
                    </Stack>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" fontWeight={600}>
                      {userMatch?.displayName ||
                        row.customerName?.split("@")[0]}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {row.customerName}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="caption"
                      sx={{ fontWeight: 600, color: "#475569" }}
                    >
                      {row.checkIn} — {row.checkOut}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" fontWeight={800}>
                      ₹{row.amount}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={row.status || "pending"}
                      size="small"
                      sx={{
                        fontWeight: 700,
                        textTransform: "uppercase",
                        fontSize: "10px",
                      }}
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
                          size="small"
                          onClick={() =>
                            updateStatus(row._id, "confirmed", row)
                          }
                          color="success"
                        >
                          <CheckCircle fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Cancel">
                        <IconButton
                          size="small"
                          onClick={() =>
                            updateStatus(row._id, "cancelled", row)
                          }
                          color="warning"
                        >
                          <Cancel fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete">
                        <IconButton
                          size="small"
                          onClick={() => deleteBooking(row._id)}
                          color="error"
                        >
                          <DeleteForever fontSize="small" />
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
