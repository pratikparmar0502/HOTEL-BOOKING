import { useState, useEffect, useContext } from "react";
import { useHistory, useLocation } from "react-router-dom";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardMedia,
  Chip,
  Button,
  Container,
  Stack,
  Divider,
  IconButton,
  Paper,
  Badge,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Tabs,
  Tab,
  Fab,
  CircularProgress,
  CardContent,
  Tooltip,
  CardActionArea,
} from "@mui/material";
import {
  CheckCircle,
  Hotel,
  CalendarToday,
  Download,
  LocationOn,
  ArrowBack,
  Verified,
  ConfirmationNumber,
  WhatsApp,
  Celebration,
  AccessTime,
  Cancel,
  ChevronRight,
  Phone,
  Email,
  Diamond,
} from "@mui/icons-material";
import { motion, AnimatePresence } from "framer-motion";
import { styled, alpha } from "@mui/material";
import { MoodContext } from "../../context/MoodContext";
import api from "../../api/axios";
import toast from "react-hot-toast";

// ========== HELPER FUNCTIONS ==========
const formatDate = (dateStr) => {
  if (!dateStr) return "N/A";
  try {
    return new Date(dateStr).toLocaleDateString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return dateStr;
  }
};

const calculateDaysLeft = (checkInDate) => {
  if (!checkInDate) return 0;
  try {
    const today = new Date();
    const checkIn = new Date(checkInDate);
    const diffTime = checkIn - today;
    return Math.max(0, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));
  } catch {
    return 0;
  }
};

// ========== CUSTOM COMPONENTS ==========
const StatusChip = ({ status, moodColor }) => {
  const statusConfig = {
    pending: {
      label: "Pending",
      color: "#f59e0b",
      bgColor: alpha("#f59e0b", 0.1),
      icon: <AccessTime fontSize="small" />,
    },
    confirmed: {
      label: "Confirmed",
      color: "#00c853", // Vibrant Green
      bgColor: alpha("#00c853", 0.1),
      icon: <CheckCircle fontSize="small" />,
    },
    cancelled: {
      label: "Cancelled",
      color: "#ef4444",
      bgColor: alpha("#ef4444", 0.1),
      icon: <Cancel fontSize="small" />,
    },
    completed: {
      label: "Completed",
      color: moodColor,
      bgColor: alpha(moodColor, 0.1),
      icon: <Verified fontSize="small" />,
    },
  };

  const config = statusConfig[status] || statusConfig.pending;

  return (
    <Chip
      icon={config.icon}
      label={config.label}
      size="small"
      sx={{
        bgcolor: config.bgColor,
        color: config.color,
        fontWeight: 700,
        px: 1,
        "& .MuiChip-icon": { color: config.color },
      }}
    />
  );
};

const BookingCard = ({
  booking,
  moodColor,
  onViewDetails,
  onPayNow,
  onCancel,
  onDownloadReceipt,
}) => {
  const daysLeft = calculateDaysLeft(booking.checkIn);
  const isUpcoming = daysLeft > 0;
  const status = booking.status?.toLowerCase() || "pending";

  return (
    <Card
      component={motion.div}
      whileHover={{ y: -8 }}
      sx={{
        borderRadius: "20px",
        overflow: "hidden",
        height: "100%",
        border: `1px solid ${alpha(moodColor, 0.1)}`,
        boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
      }}
    >
      <Box sx={{ position: "relative" }}>
        <CardMedia
          component="img"
          height="220"
          image={
            booking.hotelImage ||
            "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800"
          }
          alt={booking.hotelName}
          sx={{ filter: status === "cancelled" ? "grayscale(1)" : "none" }}
        />
        <Box sx={{ position: "absolute", top: 12, right: 12 }}>
          <StatusChip status={status} moodColor={moodColor} />
        </Box>
      </Box>

      <CardContent sx={{ p: 2.5 }}>
        <Typography variant="h6" fontWeight={800} noWrap sx={{ mb: 1 }}>
          {booking.hotelName}
        </Typography>

        <Stack direction="row" justifyContent="space-between" sx={{ mb: 2 }}>
          <Box>
            <Typography variant="caption" color="text.secondary">
              Check-in
            </Typography>
            <Typography variant="body2" fontWeight={600}>
              {formatDate(booking.checkIn)}
            </Typography>
          </Box>
          <ChevronRight sx={{ color: "text.secondary", alignSelf: "center" }} />
          <Box sx={{ textAlign: "right" }}>
            <Typography variant="caption" color="text.secondary">
              Check-out
            </Typography>
            <Typography variant="body2" fontWeight={600}>
              {formatDate(booking.checkOut)}
            </Typography>
          </Box>
        </Stack>

        <Divider sx={{ mb: 2 }} />

        {/* Total Amount Section (Alag Line) */}
        <Box sx={{ mb: 2.5 }}>
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ textTransform: "uppercase" }}
          >
            Total Amount
          </Typography>
          <Typography variant="h5" fontWeight={900} color={moodColor}>
            $ {booking.amount || 0}
          </Typography>
        </Box>

        {/* Buttons Side by Side */}
        {status === "pending" && (
          <Stack direction="row" spacing={2}>
            <Button
              variant="contained"
              fullWidth
              onClick={() => onPayNow(booking)}
              sx={{
                bgcolor: moodColor,
                borderRadius: "12px",
                fontWeight: 700,
                py: 1.2,
                "&:hover": { bgcolor: moodColor, filter: "brightness(0.9)" },
              }}
            >
              Pay Now
            </Button>
            <Button
              variant="outlined"
              fullWidth
              color="error"
              onClick={() => onCancel(booking)}
              sx={{ borderRadius: "12px", fontWeight: 700, borderWidth: "2px" }}
            >
              Cancel
            </Button>
          </Stack>
        )}

        {status === "confirmed" && (
          <Button
            variant="outlined"
            fullWidth
            startIcon={<Download />}
            onClick={() => onDownloadReceipt(booking)}
            sx={{
              borderRadius: "12px",
              py: 1.2,
              borderColor: "#00c853",
              color: "#00c853",
            }}
          >
            Download Receipt
          </Button>
        )}

        <Button
          fullWidth
          variant="text"
          onClick={() => onViewDetails(booking)}
          sx={{ mt: 1, textTransform: "none", color: "text.secondary" }}
        >
          View Details
        </Button>
      </CardContent>
    </Card>
  );
};

// ========== MAIN COMPONENT ==========
const Bookings = () => {
  const history = useHistory();
  const [bookings, setBookings] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [openDetail, setOpenDetail] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [tabValue, setTabValue] = useState(0);
  const [loading, setLoading] = useState(true);
  const { mood } = useContext(MoodContext);

  const moodColor =
    {
      nature: "#10b981",
      urban: "#ef4444",
      ocean: "#0ea5e9",
      romantic: "#ec4899",
      royal: "#f59e0b",
      default: "#3b82f6",
    }[mood] || "#3b82f6";

  const fetchMyBookings = async () => {
    try {
      setLoading(true);
      const userData = JSON.parse(localStorage.getItem("user"));
      const userEmail = userData?.email?.toLowerCase().trim();

      const response = await api.get("/Bookingssystem");
      const allData = response.data.Data || response.data || [];

      const myData = allData.filter((b) => {
        const dbEmail = b.email?.toString().toLowerCase().trim() || "";
        const dbCustomer =
          b.customerName?.toString().toLowerCase().trim() || "";
        return dbEmail === userEmail || dbCustomer === userEmail;
      });

      setBookings(
        myData.map((b) => ({
          ...b,
          status: b.status?.toLowerCase() || "pending",
          amount: Number(b.amount || 0),
        })),
      );
    } catch (err) {
      toast.error("Failed to fetch bookings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyBookings();
    // Load Razorpay Script
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const handlePayNow = (booking) => {
    if (!window.Razorpay) {
      toast.error("Razorpay SDK not loaded!");
      return;
    }

    const options = {
      key: "rzp_test_YOUR_KEY", // Replace with your real key
      amount: booking.amount * 100,
      currency: "INR",
      name: "StayFlow Hotels",
      description: `Payment for ${booking.hotelName}`,
      handler: async (response) => {
        await handleUpdateStatus(
          booking,
          "confirmed",
          response.razorpay_payment_id,
        );
      },
      prefill: { name: booking.customerName, email: booking.email },
      theme: { color: moodColor },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const handleUpdateStatus = async (booking, newStatus) => {
    const toastId = toast.loading(`Processing ${newStatus}...`);

    try {
      const formData = new FormData();

      // 1. Postman exact fields
      formData.append("customerName", booking.customerName || "");
      formData.append("hotelName", booking.hotelName || "");
      formData.append("checkIn", booking.checkIn || "");
      formData.append("checkOut", booking.checkOut || "");
      formData.append("amount", Number(booking.amount) || 0); // Pure number
      formData.append("status", newStatus);

      // 2. FINAL FIX FOR "EMPTY FILE" ERROR
      // Hum ek 1x1 pixel ki valid transparent PNG file create kar rahe hain
      const base64Image =
        "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==";
      const byteCharacters = atob(base64Image);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const pixelFile = new Blob([byteArray], { type: "image/png" });

      // Ab ye "Empty file" nahi rahi, ye ek valid image file hai
      formData.append("hotelImage", pixelFile, "booking_img.png");

      // 3. API Call
      const response = await api.patch(
        `/Bookingssystem/${booking._id}?Authorization=ngXSnLPrB0vbLvNA`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      if (response.status === 200 || response.data.Status === "Success") {
        toast.success(`Booking ${newStatus} Done!`, { id: toastId });
        fetchMyBookings();
      }
    } catch (error) {
      console.error("DEBUG ERROR:", error.response?.data);
      const serverMsg = error.response?.data?.Message || "Something went wrong";
      toast.error(serverMsg, { id: toastId });
    }
  };
  // Cancel function ko chhota kar dein kyunki ab handleUpdateStatus sab sambhaal lega
  const handleCancelBooking = async (booking) => {
    if (!booking || !booking._id) {
      toast.error("Booking data missing!");
      return;
    }

    if (window.confirm("Are you sure you want to cancel this booking?")) {
      await handleUpdateStatus(booking, "cancelled");
    }
  };
  const handleDownloadReceipt = (booking) => {
    const content = `STAYFLOW RECEIPT\nHotel: ${booking.hotelName}\nAmount: ₹${booking.amount}\nStatus: ${booking.status}`;
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Receipt-${booking._id}.txt`;
    a.click();
    toast.success("Receipt downloaded!");
  };

  const filtered = bookings.filter((b) => {
    if (tabValue === 0) return ["pending", "confirmed"].includes(b.status);
    if (tabValue === 1) return b.status === "completed";
    return b.status === "cancelled";
  });

  if (loading)
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
        <CircularProgress sx={{ color: moodColor }} />
      </Box>
    );

  return (
    <Box sx={{ bgcolor: "#f8fafc", minHeight: "100vh", pb: 10 }}>
      <AnimatePresence>
        {showConfetti && (
          <Box
            sx={{
              position: "fixed",
              inset: 0,
              zIndex: 9999,
              pointerEvents: "none",
            }}
          >
            {/* Simple Confetti logic here or use a library */}
            <Typography variant="h1" sx={{ textAlign: "center", mt: 20 }}>
              🎉 SUCCESS! 🎉
            </Typography>
          </Box>
        )}
      </AnimatePresence>

      <Box
        sx={{
          background: `linear-gradient(135deg, ${moodColor} 0%, ${alpha(moodColor, 0.8)} 100%)`,
          py: 6,
          color: "white",
          borderRadius: "0 0 30px 30px",
          mb: 4,
        }}
      >
        <Container>
          <IconButton
            onClick={() => history.push("/")}
            sx={{ color: "white", mb: 2 }}
          >
            <ArrowBack />
          </IconButton>
          <Typography variant="h3" fontWeight={900}>
            My Bookings
          </Typography>
        </Container>
      </Box>

      <Container>
        <Tabs
          value={tabValue}
          onChange={(e, v) => setTabValue(v)}
          sx={{ mb: 4, bgcolor: "white", borderRadius: "15px", p: 1 }}
        >
          <Tab label="Upcoming" />
          <Tab label="Completed" />
          <Tab label="Cancelled" />
        </Tabs>

        {filtered.length === 0 ? (
          <Typography
            sx={{ textAlign: "center", py: 10, color: "text.secondary" }}
          >
            No bookings found here.
          </Typography>
        ) : (
          <Grid container spacing={3}>
            {filtered.map((booking) => (
              <Grid item xs={12} sm={6} md={4} key={booking._id}>
                <BookingCard
                  booking={booking}
                  moodColor={moodColor}
                  onPayNow={handlePayNow}
                  onCancel={handleCancelBooking}
                  onViewDetails={(b) => {
                    setSelectedBooking(b);
                    setOpenDetail(true);
                  }}
                  onDownloadReceipt={handleDownloadReceipt}
                />
              </Grid>
            ))}
          </Grid>
        )}
      </Container>

      {/* Detail Dialog */}
      <Dialog
        open={openDetail}
        onClose={() => setOpenDetail(false)}
        maxWidth="sm"
        fullWidth
      >
        {selectedBooking && (
          <>
            <DialogTitle sx={{ fontWeight: 800 }}>
              {selectedBooking.hotelName}
            </DialogTitle>
            <DialogContent dividers>
              <Stack spacing={2}>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography color="text.secondary">Customer:</Typography>
                  <Typography fontWeight={700}>
                    {selectedBooking.customerName}
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography color="text.secondary">Dates:</Typography>
                  <Typography fontWeight={700}>
                    {selectedBooking.checkIn} - {selectedBooking.checkOut}
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography color="text.secondary">Amount:</Typography>
                  <Typography fontWeight={700} color={moodColor}>
                    $ {selectedBooking.amount}
                  </Typography>
                </Box>
              </Stack>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpenDetail(false)}>Close</Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Box>
  );
};

export default Bookings;
