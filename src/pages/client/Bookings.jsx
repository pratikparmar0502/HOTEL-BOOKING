import React, { useState, useEffect, useContext } from "react";
import { useHistory, useLocation } from "react-router-dom";
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
  IconButton,
  Paper,
  Stepper,
  Step,
  StepLabel,
  Alert,
  Badge,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Radio,
  RadioGroup,
  FormControlLabel,
  Tabs,
  Tab,
  Fab,
  CircularProgress,
  Fade,
  Collapse,
  Avatar,
  LinearProgress,
} from "@mui/material";
import {
  CheckCircle,
  Hotel,
  CalendarToday,
  Person,
  Payment,
  CreditCard,
  Receipt,
  Download,
  Share,
  Print,
  Phone,
  Email,
  LocationOn,
  Star,
  Wifi,
  Restaurant,
  Pool,
  AcUnit,
  LocalTaxi,
  Spa,
  Pets,
  ArrowBack,
  QrCode2,
  Shield,
  Lock,
  Verified,
  EventAvailable,
  EventBusy,
  NightsStay,
  EmojiEvents,
  Diamond,
  ConfirmationNumber,
  MoreVert,
  Delete,
  Edit,
  WhatsApp,
  Facebook,
  Instagram,
  Twitter,
  LocalActivity,
  Celebration,
  CardGiftcard,
  Whatshot,
  BeachAccess,
  Work, // Added Work icon import
} from "@mui/icons-material";
import { motion, AnimatePresence } from "framer-motion";
import { styled, alpha } from "@mui/material/styles";
import { MoodContext } from "../../context/MoodContext";

// Custom Timeline Components (since @mui/lab is not installed)
const Timeline = ({ children, moodcolor }) => (
  <Box sx={{ position: "relative", pl: 4, mt: 2 }}>
    <Box
      sx={{
        position: "absolute",
        left: 20,
        top: 0,
        bottom: 0,
        width: "3px",
        background: `linear-gradient(to bottom, ${moodcolor}, ${alpha(
          moodcolor,
          0.3
        )})`,
        borderRadius: "2px",
      }}
    />
    {children}
  </Box>
);

const TimelineItem = ({ children }) => (
  <Box sx={{ position: "relative", mb: 4 }}>{children}</Box>
);

const TimelineSeparator = ({ children }) => (
  <Box sx={{ position: "absolute", left: -32, top: 0 }}>{children}</Box>
);

const TimelineDot = ({ color, children }) => (
  <Box
    sx={{
      width: 40,
      height: 40,
      borderRadius: "50%",
      background: color === "primary" ? "#1976d2" : "#757575",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "white",
      boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
    }}
  >
    {children}
  </Box>
);

const TimelineConnector = () => (
  <Box
    sx={{
      position: "absolute",
      left: 19,
      top: 40,
      bottom: -40,
      width: "2px",
      background: "#e0e0e0",
    }}
  />
);

const TimelineContent = ({ children }) => <Box sx={{ pl: 6 }}>{children}</Box>;

const TimelineOppositeContent = ({ children, color }) => (
  <Typography
    variant="caption"
    color={color || "text.secondary"}
    sx={{ position: "absolute", right: 0, top: 4 }}
  >
    {children}
  </Typography>
);

// Styled Components
const GradientCard = styled(Card)(({ theme, moodcolor }) => ({
  background: `linear-gradient(135deg, ${alpha(moodcolor, 0.05)} 0%, ${alpha(
    moodcolor,
    0.02
  )} 100%)`,
  borderRadius: "28px",
  border: `2px solid ${alpha(moodcolor, 0.1)}`,
  overflow: "visible",
  position: "relative",
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "6px",
    background: `linear-gradient(90deg, ${moodcolor}, ${alpha(
      moodcolor,
      0.8
    )})`,
    borderRadius: "28px 28px 0 0",
  },
}));

const StatusBadge = styled(Chip)(({ theme, moodcolor, status }) => ({
  background:
    status === "confirmed"
      ? `linear-gradient(135deg, ${moodcolor}, ${alpha(moodcolor, 0.8)})`
      : status === "pending"
      ? `linear-gradient(135deg, #f59e0b, #fbbf24)`
      : status === "completed"
      ? `linear-gradient(135deg, #10b981, #34d399)`
      : `linear-gradient(135deg, #ef4444, #dc2626)`,
  color: "white",
  fontWeight: "bold",
  padding: theme.spacing(0.5, 2),
  boxShadow: `0 4px 15px ${alpha(
    status === "confirmed"
      ? moodcolor
      : status === "pending"
      ? "#f59e0b"
      : "#10b981",
    0.3
  )}`,
  animation: status === "confirmed" ? "pulse 2s infinite" : "none",
}));

const PriceTag = styled(Box)(({ theme, moodcolor }) => ({
  background: "linear-gradient(135deg, #ffffff, #f8fafc)",
  borderRadius: "20px",
  padding: theme.spacing(2, 3),
  border: `2px solid ${alpha(moodcolor, 0.2)}`,
  boxShadow: `0 8px 30px ${alpha(moodcolor, 0.1)}`,
  position: "relative",
  overflow: "hidden",
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "4px",
    background: `linear-gradient(90deg, ${moodcolor}, ${alpha(
      moodcolor,
      0.8
    )})`,
  },
}));

// Main Component
const Bookings = () => {
  const history = useHistory(); // Changed from useHistory to useNavigate
  const location = useLocation();
  const [bookings, setBookings] = useState([]);
  const [activeTab, setActiveTab] = useState(0);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [openDetail, setOpenDetail] = useState(false);
  const [openPayment, setOpenPayment] = useState(false);
  const [paymentStep, setPaymentStep] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [showConfetti, setShowConfetti] = useState(false);
  const [tabValue, setTabValue] = useState(0);
  const { mood, setMood } = useContext(MoodContext);

  const getMoodColor = (currentMood) => {
    const colors = {
      nature: "#10b981",
      urban: "#ef4444",
      ocean: "#0ea5e9",
      romantic: "#ec4899",
      royal: "#f59e0b",
      default: "#3b82f6",
    };
    return colors[currentMood] || colors.default;
  };

  // // Mood color function
  // const getMoodColor = () => {
  //   return "#8b5cf6"; // Purple default
  // };

  const moodColor = getMoodColor(mood);

  // Sample booking data
  const sampleBookings = [
    {
      id: "BK" + Date.now(),
      hotelName: "Whispering Pines Sanctuary",
      hotelImage:
        "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800",
      location: "Gulmarg, Kashmir",
      checkIn: "2024-03-15",
      checkOut: "2024-03-20",
      guests: 2,
      rooms: 1,
      totalNights: 5,
      totalPrice: 1495,
      basePrice: 1295,
      taxes: 149.5,
      serviceFee: 50.5,
      status: "confirmed",
      bookingDate: "2024-03-10",
      amenities: ["Free Wifi", "Breakfast", "Pool", "Spa", "Parking"],
      specialRequests: "Early check-in requested",
      paymentMethod: "Credit Card",
      bookingType: "Standard",
      rewards: 150,
      cancellationPolicy: "Free cancellation until 24 hours before check-in",
    },
    {
      id: "BK" + (Date.now() + 1),
      hotelName: "Luxury Sky Villa",
      hotelImage:
        "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800",
      location: "Bali, Indonesia",
      checkIn: "2024-04-01",
      checkOut: "2024-04-07",
      guests: 4,
      rooms: 2,
      totalNights: 6,
      totalPrice: 3594,
      basePrice: 2995,
      taxes: 299.5,
      serviceFee: 99.5,
      status: "pending",
      bookingDate: "2024-03-12",
      amenities: ["Private Pool", "Chef Service", "Ocean View", "Butler"],
      specialRequests: "Anniversary decoration",
      paymentMethod: "PayPal",
      bookingType: "Premium",
      rewards: 300,
      cancellationPolicy: "Free cancellation until 48 hours before check-in",
    },
    {
      id: "BK" + (Date.now() + 2),
      hotelName: "Urban Loft Downtown",
      hotelImage:
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800",
      location: "Mumbai, India",
      checkIn: "2024-03-25",
      checkOut: "2024-03-27",
      guests: 1,
      rooms: 1,
      totalNights: 2,
      totalPrice: 598,
      basePrice: 499,
      taxes: 49.9,
      serviceFee: 49.1,
      status: "completed",
      bookingDate: "2024-03-05",
      amenities: ["City View", "Gym", "Workspace", "Concierge"],
      specialRequests: "Late checkout",
      paymentMethod: "Credit Card",
      bookingType: "Business",
      rewards: 50,
      cancellationPolicy: "Non-refundable",
    },
  ];

  useEffect(() => {
    // LocalStorage se data load karein
    const savedBookings = JSON.parse(
      localStorage.getItem("allBookings") || "[]"
    );
    setBookings(savedBookings);

    // Agar redirect ho kar koi ID aayi hai
    // if (location.state && location.state.openPaymentFor) {
    //   const bookingId = location.state.openPaymentFor;
    //   const allBookings = JSON.parse(
    //     localStorage.getItem("allBookings") || "[]"
    //   );
    //   const target = allBookings.find((b) => b.id === bookingId);

    //   if (target) {
    //     setSelectedBooking(target); // Wo wali booking select karo
    //     setOpenPayment(true); // Seedha Payment dialog khol do
    //     setPaymentStep(0); // Step 1 se shuru karo
    //   }

    //   // Clear state taaki refresh pe modal na khule
    //   history.replace({ ...location, state: undefined });
    // }
  }, [location, history]);

  const handleViewDetails = (booking) => {
    setSelectedBooking(booking);
    setOpenDetail(true);
  };

  const handleMakePayment = (booking) => {
    setSelectedBooking(booking);
    setOpenPayment(true);
    setPaymentStep(0);
  };

  const handleCompletePayment = () => {
    setPaymentStep(1);
    setTimeout(() => {
      setPaymentStep(2);
      setShowConfetti(true);

      setTimeout(() => {
        setOpenPayment(false);
        setShowConfetti(false);

        // --- Status Update Logic ---
        const updatedBookings = bookings.map((b) =>
          b.id === selectedBooking.id ? { ...b, status: "confirmed" } : b
        );

        setBookings(updatedBookings);
        // LocalStorage mein save zaroor karein
        localStorage.setItem("allBookings", JSON.stringify(updatedBookings));
      }, 2000);
    }, 1500);
  };

  const handleCancelBooking = (bookingId) => {
    if (window.confirm("Are you sure you want to cancel this booking?")) {
      // Status badlo, delete mat karo
      const updated = bookings.map((b) =>
        b.id === bookingId ? { ...b, status: "cancelled" } : b
      );

      setBookings(updated);
      localStorage.setItem("allBookings", JSON.stringify(updated));
    }
  };

  const handleDownloadReceipt = (booking) => {
    const receiptContent = `
      StayFlow Booking Receipt
      ========================
      
      Booking ID: ${booking.id}
      Hotel: ${booking.hotelName}
      Location: ${booking.location}
      Check-in: ${formatDate(booking.checkIn)}
      Check-out: ${formatDate(booking.checkOut)}
      Guests: ${booking.guests}
      Nights: ${booking.totalNights}
      
      Price Breakdown:
      - Base Price: $${booking.basePrice}
      - Taxes: $${booking.taxes}
      - Service Fee: $${booking.serviceFee}
      -----------------------
      Total: $${booking.totalPrice}
      
      Status: ${booking.status}
      Booking Date: ${formatDate(booking.bookingDate)}
      
      Thank you for choosing StayFlow!
    `;

    const blob = new Blob([receiptContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `StayFlow-Receipt-${booking.id}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "N/A";
    return new Date(dateStr).toLocaleDateString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const calculateDaysLeft = (checkInDate) => {
    const today = new Date();
    const checkIn = new Date(checkInDate);
    const diffTime = checkIn - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  const tabs = [
    {
      label: "Upcoming",
      count: bookings.filter((b) => ["confirmed", "pending"].includes(b.status))
        .length,
    },
    {
      label: "Completed",
      count: bookings.filter((b) => b.status === "completed").length,
    },
    {
      label: "Cancelled",
      count: bookings.filter((b) => b.status === "cancelled").length,
    },
  ];

  const renderAmenityIcon = (amenity) => {
    const icons = {
      "Free Wifi": <Wifi fontSize="small" />,
      Breakfast: <Restaurant fontSize="small" />,
      Pool: <Pool fontSize="small" />,
      Spa: <Spa fontSize="small" />,
      Parking: <LocalTaxi fontSize="small" />,
      "Private Pool": <Pool fontSize="small" />,
      "Chef Service": <Restaurant fontSize="small" />,
      "Ocean View": <BeachAccess fontSize="small" />,
      Butler: <Person fontSize="small" />,
      "City View": <LocationOn fontSize="small" />,
      Gym: <Whatshot fontSize="small" />,
      Workspace: <Work fontSize="small" />, // Using imported Work icon
      Concierge: <Person fontSize="small" />,
    };
    return icons[amenity] || <Hotel fontSize="small" />;
  };

  // Tab Value ke hisaab se data filter karein
  const filteredBookings = bookings.filter((b) => {
    if (tabValue === 0) return b.status === "pending"; // Upcoming
    if (tabValue === 1) return b.status === "confirmed"; // Completed
    if (tabValue === 2) return b.status === "cancelled"; // Cancelled
    return true;
  });

  const handleOpenPayment = (booking) => {
    setSelectedBooking(booking); // Jo booking select ki hai use set karein
    setOpenPayment(true); // Payment wala modal open karein
    setPaymentStep(0); // Step 1 se shuru karein
  };

  return (
    <>
      <Box
        sx={{
          // minHeight: "100vh",
          // background: `linear-gradient(135deg, ${alpha(
          //   moodColor,
          //   0.02
          // )} 0%, #ffffff 100%)`,
          // pb: 10,
          minHeight: "100vh",
          background: `linear-gradient(180deg, ${alpha(
            moodColor,
            0.08
          )} 0%, #ffffff 100%)`,
          transition: "background 0.5s ease", // for smooth
          pb: 8,
        }}
      >
        {/* Confetti Animation */}
        <AnimatePresence>
          {showConfetti && (
            <Box
              component={motion.div}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              sx={{
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                pointerEvents: "none",
                zIndex: 9999,
                background:
                  "radial-gradient(circle at center, transparent 0%, rgba(255,255,255,0.1) 100%)",
              }}
            >
              {[...Array(30)].map((_, i) => (
                <Box
                  key={i}
                  component={motion.div}
                  initial={{
                    y: -100,
                    x: Math.random() * window.innerWidth,
                    rotate: 0,
                    scale: 0,
                  }}
                  animate={{
                    y: window.innerHeight + 100,
                    rotate: 360,
                    scale: 1,
                    transition: {
                      duration: 2,
                      delay: Math.random() * 0.5,
                      ease: "easeOut",
                    },
                  }}
                  sx={{
                    position: "absolute",
                    fontSize: "20px",
                    color: [
                      moodColor,
                      "#f59e0b",
                      "#ef4444",
                      "#0ea5e9",
                      "#ec4899",
                    ][Math.floor(Math.random() * 5)],
                  }}
                >
                  {
                    ["✨", "🎉", "🎊", "🏨", "⭐", "💫"][
                      Math.floor(Math.random() * 6)
                    ]
                  }
                </Box>
              ))}
            </Box>
          )}
        </AnimatePresence>

        {/* Header */}
        <Box
          sx={{
            background: `linear-gradient(135deg, ${moodColor} 0%, ${alpha(
              moodColor,
              0.8
            )} 100%)`,
            borderRadius: "0 0 32px 32px",
            py: 5,
            px: 3,
            mb: 6,
          }}
        >
          <Container maxWidth="lg">
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              sx={{ mb: 4 }}
            >
              <Box>
                <Button
                  startIcon={<ArrowBack />}
                  onClick={() => history.push("/")} // Changed to navigate
                  sx={{
                    color: "white",
                    borderRadius: "20px",
                    background: "rgba(255,255,255,0.2)",
                    backdropFilter: "blur(10px)",
                    "&:hover": {
                      background: "rgba(255,255,255,0.3)",
                    },
                  }}
                >
                  Back to Home
                </Button>
              </Box>

              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <IconButton
                  sx={{ background: "rgba(255,255,255,0.2)", color: "white" }}
                >
                  <Share />
                </IconButton>
                <IconButton
                  sx={{ background: "rgba(255,255,255,0.2)", color: "white" }}
                >
                  <Print />
                </IconButton>
              </Box>
            </Stack>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Typography
                variant="h3"
                fontWeight="900"
                sx={{ color: "white", mb: 2 }}
              >
                My Bookings
              </Typography>
              <Typography
                variant="h6"
                sx={{ color: "rgba(255,255,255,0.9)", fontWeight: 400 }}
              >
                Manage your stays and upcoming adventures
              </Typography>
            </motion.div>

            {/* Stats */}
            <Grid container spacing={2} sx={{ mt: 4 }}>
              {[
                {
                  label: "Total Bookings",
                  value: bookings.length,
                  icon: <ConfirmationNumber />,
                },
                {
                  label: "Upcoming",
                  value: bookings.filter((b) =>
                    ["confirmed", "pending"].includes(b.status)
                  ).length,
                  icon: <CalendarToday />,
                },
                {
                  label: "Rewards",
                  value: bookings.reduce((sum, b) => sum + (b.rewards || 0), 0),
                  icon: <Diamond />,
                },
                {
                  label: "Cities",
                  value: [
                    ...new Set(
                      bookings
                        .map((b) => b.location?.split(",")[0] || "")
                        .filter(Boolean)
                    ),
                  ].length,
                  icon: <LocationOn />,
                },
              ].map((stat, idx) => (
                <Grid item xs={6} sm={3} key={idx}>
                  <Paper
                    component={motion.div}
                    whileHover={{ scale: 1.05 }}
                    sx={{
                      p: 2,
                      borderRadius: "20px",
                      background: "rgba(255,255,255,0.15)",
                      backdropFilter: "blur(20px)",
                      border: "1px solid rgba(255,255,255,0.2)",
                      textAlign: "center",
                    }}
                  >
                    <Box sx={{ color: "white", mb: 1 }}>{stat.icon}</Box>
                    <Typography
                      variant="h4"
                      fontWeight="900"
                      sx={{ color: "white" }}
                    >
                      {stat.value}
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{ color: "rgba(255,255,255,0.8)" }}
                    >
                      {stat.label}
                    </Typography>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>

        <Container maxWidth="lg">
          {/* Tabs */}
          <Paper
            elevation={0}
            sx={{
              borderRadius: "24px",
              overflow: "hidden",
              background: "rgba(255, 255, 255, 0.8)",
              backdropFilter: "blur(10px)",
              border: `1px solid ${alpha(moodColor, 0.1)}`,
              transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              "&:hover": {
                transform: "translateY(-8px)",
                boxShadow: `0 20px 40px ${alpha(moodColor, 0.15)}`,
                border: `1px solid ${alpha(moodColor, 0.3)}`,
              },
            }}
          >
            <Tabs
              value={tabValue}
              onChange={(e, newValue) => setTabValue(newValue)}
              variant="fullWidth"
              centered
              sx={{
                // "& .MuiTab-root": {
                //   fontSize: "1rem",
                //   fontWeight: 600,
                //   py: 2,
                //   position: "relative",
                //   "&::after": {
                //     content: '""',
                //     position: "absolute",
                //     bottom: 0,
                //     left: "50%",
                //     transform: "translateX(-50%)",
                //     width: 0,
                //     height: "3px",
                //     background: moodColor,
                //     transition: "width 0.3s ease",
                //   },
                //   "&.Mui-selected": {
                //     color: moodColor,
                //     "&::after": {
                //       width: "80%",
                //     },
                //   },
                // },
                "& .MuiTabs-indicator": {
                  height: 4,
                  borderRadius: "4px 4px 0 0",
                  backgroundColor: moodColor,
                },
                "& .MuiTab-root": {
                  fontWeight: "700",
                  fontSize: "1rem",
                  transition: "0.3s",
                  "&.Mui-selected": {
                    color: moodColor,
                    transform: "scale(1.1)",
                  },
                },
              }}
            >
              {tabs.map((tab, idx) => (
                <Tab
                  // onChange={(e, val) => setTabValue(val)}
                  key={idx}
                  label={
                    <Badge
                      badgeContent={tab.count}
                      color="primary"
                      sx={{ "& .MuiBadge-badge": { background: moodColor } }}
                    >
                      {tab.label}
                    </Badge>
                  }
                />
              ))}
            </Tabs>
          </Paper>

          {/* Bookings List */}
          <Container maxWidth="lg" sx={{ py: 4, flex: 1 }}>
            {filteredBookings.length > 0 ? (
              <Grid container spacing={3}>
                {filteredBookings.map((booking, index) => (
                  <Grid item xs={12} md={6} key={booking.id}>
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <GradientCard moodcolor={moodColor}>
                        <Grid container>
                          {/* Image Section */}
                          <Grid item xs={12} md={4}>
                            <Box
                              sx={{
                                position: "relative",
                                height: { xs: 200, md: "100%" },
                              }}
                            >
                              <CardMedia
                                component="img"
                                image={booking.hotelImage}
                                alt={booking.hotelName}
                                sx={{
                                  height: "100%",
                                  width: "100%",
                                  objectFit: "cover",
                                  borderRight: {
                                    md: `2px solid ${alpha(moodColor, 0.1)}`,
                                  },
                                  borderBottom: {
                                    xs: `2px solid ${alpha(moodColor, 0.1)}`,
                                    md: "none",
                                  },
                                }}
                              />

                              {/* Overlay */}
                              <Box
                                sx={{
                                  position: "absolute",
                                  top: 0,
                                  left: 0,
                                  right: 0,
                                  bottom: 0,
                                  background: `linear-gradient(to top, rgba(0,0,0,0.4) 0%, transparent 50%)`,
                                  p: 3,
                                  display: "flex",
                                  flexDirection: "column",
                                  justifyContent: "space-between",
                                }}
                              >
                                <Box>
                                  <StatusBadge
                                    moodcolor={moodColor}
                                    status={booking.status}
                                    label={
                                      <Stack
                                        direction="row"
                                        alignItems="center"
                                        spacing={0.5}
                                      >
                                        <CheckCircle
                                          sx={{ fontSize: "1rem" }}
                                        />
                                        <span>
                                          {booking.status
                                            .charAt(0)
                                            .toUpperCase() +
                                            booking.status.slice(1)}
                                        </span>
                                      </Stack>
                                    }
                                  />
                                </Box>

                                <Box>
                                  <Typography
                                    variant="caption"
                                    sx={{ color: "white", display: "block" }}
                                  >
                                    BOOKING ID
                                  </Typography>
                                  <Typography
                                    variant="h6"
                                    sx={{ color: "white", fontWeight: "bold" }}
                                  >
                                    {booking.id}
                                  </Typography>
                                </Box>
                              </Box>
                            </Box>
                          </Grid>

                          {/* Details Section */}
                          <Grid item xs={12} md={8}>
                            <Box sx={{ p: 3 }}>
                              <Stack
                                direction="row"
                                justifyContent="space-between"
                                alignItems="flex-start"
                                sx={{ mb: 3 }}
                              >
                                <Box>
                                  <Typography
                                    variant="h5"
                                    fontWeight="900"
                                    sx={{ mb: 1 }}
                                  >
                                    {booking.hotelName}
                                  </Typography>
                                  <Stack
                                    direction="row"
                                    alignItems="center"
                                    spacing={1}
                                    sx={{ mb: 2 }}
                                  >
                                    <LocationOn
                                      sx={{
                                        fontSize: "1rem",
                                        color: moodColor,
                                      }}
                                    />
                                    <Typography
                                      variant="body2"
                                      color="text.secondary"
                                    >
                                      {booking.location}
                                    </Typography>
                                    <Star
                                      sx={{
                                        fontSize: "1rem",
                                        color: "#fbbf24",
                                        ml: 2,
                                      }}
                                    />
                                    <Typography
                                      variant="body2"
                                      fontWeight="600"
                                    >
                                      4.8/5
                                    </Typography>
                                  </Stack>
                                </Box>

                                <Stack direction="row" spacing={1}>
                                  <IconButton
                                    onClick={() =>
                                      handleDownloadReceipt(booking)
                                    }
                                    sx={{ color: moodColor }}
                                  >
                                    <Download />
                                  </IconButton>
                                  <IconButton sx={{ color: moodColor }}>
                                    <Share />
                                  </IconButton>
                                </Stack>
                              </Stack>

                              {/* Booking Details Grid */}
                              <Grid container spacing={2}>
                                <Grid item xs={6} sm={3}>
                                  <Paper
                                    elevation={0}
                                    sx={{
                                      p: 1.5,
                                      borderRadius: "12px",
                                      background: alpha(moodColor, 0.05),
                                      textAlign: "center",
                                    }}
                                  >
                                    <CalendarToday
                                      sx={{
                                        color: moodColor,
                                        fontSize: "1.2rem",
                                        mb: 0.5,
                                      }}
                                    />
                                    <Typography
                                      variant="caption"
                                      color="text.secondary"
                                      display="block"
                                    >
                                      Check-in
                                    </Typography>
                                    <Typography
                                      variant="body2"
                                      fontWeight="700"
                                    >
                                      {formatDate(booking.checkIn)}
                                    </Typography>
                                  </Paper>
                                </Grid>

                                <Grid item xs={6} sm={3}>
                                  <Paper
                                    elevation={0}
                                    sx={{
                                      p: 1.5,
                                      borderRadius: "12px",
                                      background: alpha(moodColor, 0.05),
                                      textAlign: "center",
                                    }}
                                  >
                                    <EventBusy
                                      sx={{
                                        color: moodColor,
                                        fontSize: "1.2rem",
                                        mb: 0.5,
                                      }}
                                    />
                                    <Typography
                                      variant="caption"
                                      color="text.secondary"
                                      display="block"
                                    >
                                      Check-out
                                    </Typography>
                                    <Typography
                                      variant="body2"
                                      fontWeight="700"
                                    >
                                      {formatDate(booking.checkOut)}
                                    </Typography>
                                  </Paper>
                                </Grid>

                                <Grid item xs={6} sm={3}>
                                  <Paper
                                    elevation={0}
                                    sx={{
                                      p: 1.5,
                                      borderRadius: "12px",
                                      background: alpha(moodColor, 0.05),
                                      textAlign: "center",
                                    }}
                                  >
                                    <Person
                                      sx={{
                                        color: moodColor,
                                        fontSize: "1.2rem",
                                        mb: 0.5,
                                      }}
                                    />
                                    <Typography
                                      variant="caption"
                                      color="text.secondary"
                                      display="block"
                                    >
                                      Guests
                                    </Typography>
                                    <Typography
                                      variant="body2"
                                      fontWeight="700"
                                    >
                                      {booking.guests}{" "}
                                      {booking.guests > 1 ? "People" : "Person"}
                                    </Typography>
                                  </Paper>
                                </Grid>

                                <Grid item xs={6} sm={3}>
                                  <Paper
                                    elevation={0}
                                    sx={{
                                      p: 1.5,
                                      borderRadius: "12px",
                                      background: alpha(moodColor, 0.05),
                                      textAlign: "center",
                                    }}
                                  >
                                    <NightsStay
                                      sx={{
                                        color: moodColor,
                                        fontSize: "1.2rem",
                                        mb: 0.5,
                                      }}
                                    />
                                    <Typography
                                      variant="caption"
                                      color="text.secondary"
                                      display="block"
                                    >
                                      Nights
                                    </Typography>
                                    <Typography
                                      variant="body2"
                                      fontWeight="700"
                                    >
                                      {booking.totalNights} Nights
                                    </Typography>
                                  </Paper>
                                </Grid>
                              </Grid>

                              <Divider sx={{ my: 3 }} />

                              {/* Bottom Actions */}
                              <Stack
                                direction={{ xs: "column", sm: "row" }}
                                justifyContent="space-between"
                                alignItems={{ xs: "stretch", sm: "center" }}
                                spacing={3}
                              >
                                <PriceTag moodcolor={moodColor}>
                                  <Typography
                                    variant="caption"
                                    color="text.secondary"
                                    display="block"
                                  >
                                    Total Amount
                                  </Typography>
                                  <Stack
                                    direction="row"
                                    alignItems="baseline"
                                    spacing={1}
                                  >
                                    <Typography
                                      variant="h5"
                                      fontWeight="900"
                                      color={moodColor}
                                    >
                                      ${booking.totalPrice}
                                    </Typography>
                                    <Typography
                                      variant="caption"
                                      color="text.secondary"
                                    >
                                      via {booking.paymentMethod}
                                    </Typography>
                                  </Stack>
                                </PriceTag>

                                <Stack
                                  direction="row"
                                  spacing={2}
                                  sx={{ flexWrap: "wrap" }}
                                >
                                  {booking.status === "pending" && (
                                    <Button
                                      variant="contained"
                                      onClick={() => handleMakePayment(booking)}
                                      sx={{
                                        background: `linear-gradient(135deg, ${moodColor}, ${alpha(
                                          moodColor,
                                          0.8
                                        )})`,
                                        borderRadius: "20px",
                                        px: 3,
                                        fontWeight: "bold",
                                        minWidth: "180px",
                                      }}
                                    >
                                      Complete Payment
                                    </Button>
                                  )}

                                  <Button
                                    variant="outlined"
                                    onClick={() => handleViewDetails(booking)}
                                    sx={{
                                      borderColor: moodColor,
                                      color: moodColor,
                                      borderRadius: "20px",
                                      px: 3,
                                      fontWeight: "bold",
                                      minWidth: "140px",
                                    }}
                                  >
                                    View Details
                                  </Button>

                                  {booking.status === "pending" && (
                                    <Stack
                                      direction="row"
                                      spacing={2}
                                      sx={{ p: 2 }}
                                    >
                                      <Button
                                        onClick={() =>
                                          handleOpenPayment(booking)
                                        }
                                      >
                                        Pay Now
                                      </Button>
                                      <Button
                                        color="error"
                                        onClick={() =>
                                          handleCancelBooking(booking.id)
                                        }
                                      >
                                        Cancel
                                      </Button>
                                    </Stack>
                                  )}
                                </Stack>
                              </Stack>
                            </Box>
                          </Grid>
                        </Grid>
                      </GradientCard>
                    </motion.div>
                  </Grid>
                ))}
              </Grid>
            ) : (
              <Box sx={{ textAlign: "center", py: 10 }}>
                <Hotel sx={{ fontSize: 80, color: alpha(moodColor, 0.2) }} />
                <Typography variant="h5" sx={{ mt: 2, fontWeight: 700 }}>
                  {tabValue === 0 && "No Upcoming Bookings"}
                  {tabValue === 1 && "No Completed Trips"}
                  {tabValue === 2 && "No Cancelled Stays"}
                </Typography>
                <Button onClick={() => history.push("/")} sx={{ mt: 2 }}>
                  Book Now
                </Button>
              </Box>
            )}
          </Container>

          {/* Empty State for Tab */}
          {filteredBookings.length === 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <Paper
                sx={{
                  p: 6,
                  textAlign: "center",
                  borderRadius: "28px",
                  background: `linear-gradient(135deg, ${alpha(
                    moodColor,
                    0.05
                  )} 0%, ${alpha(moodColor, 0.02)} 100%)`,
                  border: `2px dashed ${alpha(moodColor, 0.2)}`,
                }}
              >
                <Celebration
                  sx={{ fontSize: 60, color: alpha(moodColor, 0.3), mb: 3 }}
                />
                <Typography variant="h5" fontWeight="700" sx={{ mb: 2 }}>
                  No {tabs[activeTab].label.toLowerCase()} bookings
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {activeTab === 0
                    ? "Your upcoming adventures will appear here!"
                    : activeTab === 1
                    ? "Your completed stays will show up here!"
                    : "Cancelled bookings will appear here"}
                </Typography>
              </Paper>
            </motion.div>
          )}
        </Container>

        {/* Booking Details Dialog */}
        <Dialog
          open={openDetail}
          onClose={() => setOpenDetail(false)}
          maxWidth="md"
          fullWidth
          PaperProps={{
            sx: {
              borderRadius: "28px",
              background: "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
            },
          }}
        >
          {selectedBooking && (
            <>
              <DialogTitle
                sx={{ borderBottom: `2px solid ${alpha(moodColor, 0.1)}` }}
              >
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography variant="h5" fontWeight="900">
                    Booking Details
                  </Typography>
                  <StatusBadge
                    moodcolor={moodColor}
                    status={selectedBooking.status}
                    label={selectedBooking.status.toUpperCase()}
                  />
                </Stack>
              </DialogTitle>

              <DialogContent sx={{ p: 4 }}>
                <Grid container spacing={4}>
                  <Grid item xs={12} md={6}>
                    {/* Timeline */}
                    <Typography variant="h6" fontWeight="700" sx={{ mb: 3 }}>
                      Booking Timeline
                    </Typography>
                    <Timeline moodcolor={moodColor}>
                      <TimelineItem>
                        <TimelineOppositeContent color="text.secondary">
                          {formatDate(selectedBooking.bookingDate)}
                        </TimelineOppositeContent>
                        <TimelineSeparator>
                          <TimelineDot color="primary">
                            <ConfirmationNumber />
                          </TimelineDot>
                          <TimelineConnector />
                        </TimelineSeparator>
                        <TimelineContent>
                          <Typography variant="body2" fontWeight="600">
                            Booking Confirmed
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            You made the booking
                          </Typography>
                        </TimelineContent>
                      </TimelineItem>

                      <TimelineItem>
                        <TimelineOppositeContent color="text.secondary">
                          {formatDate(selectedBooking.checkIn)}
                        </TimelineOppositeContent>
                        <TimelineSeparator>
                          <TimelineDot color="primary">
                            <EventAvailable />
                          </TimelineDot>
                          <TimelineConnector />
                        </TimelineSeparator>
                        <TimelineContent>
                          <Typography variant="body2" fontWeight="600">
                            Check-in
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            Hotel check-in starts at 2:00 PM
                          </Typography>
                        </TimelineContent>
                      </TimelineItem>

                      <TimelineItem>
                        <TimelineOppositeContent color="text.secondary">
                          {formatDate(selectedBooking.checkOut)}
                        </TimelineOppositeContent>
                        <TimelineSeparator>
                          <TimelineDot color="primary">
                            <EventBusy />
                          </TimelineDot>
                        </TimelineSeparator>
                        <TimelineContent>
                          <Typography variant="body2" fontWeight="600">
                            Check-out
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            Check-out by 11:00 AM
                          </Typography>
                        </TimelineContent>
                      </TimelineItem>
                    </Timeline>

                    {/* Amenities */}
                    <Typography
                      variant="h6"
                      fontWeight="700"
                      sx={{ mt: 4, mb: 2 }}
                    >
                      Included Amenities
                    </Typography>
                    <Grid container spacing={1}>
                      {selectedBooking.amenities
                        ?.slice(0, 6)
                        .map((amenity, idx) => (
                          <Grid item xs={6} key={idx}>
                            <Chip
                              icon={renderAmenityIcon(amenity)}
                              label={amenity}
                              size="small"
                              sx={{
                                background: alpha(moodColor, 0.1),
                                border: `1px solid ${alpha(moodColor, 0.2)}`,
                                width: "100%",
                                justifyContent: "flex-start",
                              }}
                            />
                            {/* <Chip
                              label={booking.status.toUpperCase()}
                              sx={{
                                fontWeight: "bold",
                                borderRadius: "10px",
                                background: alpha(
                                  booking.status === "confirmed"
                                    ? "#2e7d32"
                                    : booking.status === "pending"
                                    ? "#ed6c02"
                                    : "#d32f2f",
                                  0.1
                                ),
                                color:
                                  booking.status === "confirmed"
                                    ? "#1b5e20"
                                    : booking.status === "pending"
                                    ? "#e65100"
                                    : "#c62828",
                                border: `1px solid ${alpha(moodColor, 0.2)}`,
                                backdropFilter: "blur(5px)",
                              }}
                            /> */}
                          </Grid>
                        ))}
                    </Grid>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    {/* Price Breakdown */}
                    <Typography variant="h6" fontWeight="700" sx={{ mb: 3 }}>
                      Price Breakdown
                    </Typography>
                    <Paper
                      elevation={0}
                      sx={{
                        p: 3,
                        borderRadius: "20px",
                        background: alpha(moodColor, 0.05),
                      }}
                    >
                      <Stack spacing={2}>
                        <Stack direction="row" justifyContent="space-between">
                          <Typography variant="body2" color="text.secondary">
                            Base Price ({selectedBooking.totalNights} nights × $
                            {Math.round(
                              selectedBooking.basePrice /
                                selectedBooking.totalNights
                            )}
                            )
                          </Typography>
                          <Typography variant="body2" fontWeight="600">
                            ${selectedBooking.basePrice}
                          </Typography>
                        </Stack>

                        <Stack direction="row" justifyContent="space-between">
                          <Typography variant="body2" color="text.secondary">
                            Taxes & Fees
                          </Typography>
                          <Typography variant="body2" fontWeight="600">
                            ${selectedBooking.taxes}
                          </Typography>
                        </Stack>

                        <Stack direction="row" justifyContent="space-between">
                          <Typography variant="body2" color="text.secondary">
                            Service Charge
                          </Typography>
                          <Typography variant="body2" fontWeight="600">
                            ${selectedBooking.serviceFee}
                          </Typography>
                        </Stack>

                        <Divider />

                        <Stack direction="row" justifyContent="space-between">
                          <Typography variant="body1" fontWeight="700">
                            Total Amount
                          </Typography>
                          <Typography
                            variant="h5"
                            fontWeight="900"
                            color={moodColor}
                          >
                            ${selectedBooking.totalPrice}
                          </Typography>
                        </Stack>
                      </Stack>
                    </Paper>

                    {/* Special Requests */}
                    {selectedBooking.specialRequests && (
                      <>
                        <Typography
                          variant="h6"
                          fontWeight="700"
                          sx={{ mt: 4, mb: 2 }}
                        >
                          Special Requests
                        </Typography>
                        <Paper
                          elevation={0}
                          sx={{
                            p: 3,
                            borderRadius: "20px",
                            background: alpha("#fbbf24", 0.1),
                          }}
                        >
                          <Typography variant="body2">
                            {selectedBooking.specialRequests}
                          </Typography>
                        </Paper>
                      </>
                    )}

                    {/* Contact Info */}
                    <Typography
                      variant="h6"
                      fontWeight="700"
                      sx={{ mt: 4, mb: 2 }}
                    >
                      Need Help?
                    </Typography>
                    <Stack spacing={2}>
                      <Button
                        variant="outlined"
                        startIcon={<Phone />}
                        fullWidth
                        sx={{
                          borderRadius: "15px",
                          borderColor: moodColor,
                          color: moodColor,
                          justifyContent: "flex-start",
                          py: 1.5,
                        }}
                      >
                        Call Hotel: +91 9876543210
                      </Button>

                      <Button
                        variant="outlined"
                        startIcon={<WhatsApp />}
                        fullWidth
                        sx={{
                          borderRadius: "15px",
                          borderColor: "#25D366",
                          color: "#25D366",
                          justifyContent: "flex-start",
                          py: 1.5,
                        }}
                      >
                        WhatsApp Support
                      </Button>

                      <Button
                        variant="outlined"
                        startIcon={<Email />}
                        fullWidth
                        sx={{
                          borderRadius: "15px",
                          justifyContent: "flex-start",
                          py: 1.5,
                        }}
                      >
                        Email: support@stayflow.com
                      </Button>
                    </Stack>
                  </Grid>
                </Grid>
              </DialogContent>

              <DialogActions
                sx={{ p: 3, borderTop: `2px solid ${alpha(moodColor, 0.1)}` }}
              >
                <Button
                  onClick={() => setOpenDetail(false)}
                  sx={{
                    borderRadius: "20px",
                    px: 4,
                    color: "text.secondary",
                  }}
                >
                  Close
                </Button>
                <Button
                  variant="contained"
                  startIcon={<Download />}
                  onClick={() => handleDownloadReceipt(selectedBooking)}
                  sx={{
                    borderRadius: "20px",
                    px: 4,
                    background: `linear-gradient(135deg, ${moodColor}, ${alpha(
                      moodColor,
                      0.8
                    )})`,
                    fontWeight: "bold",
                  }}
                >
                  Download Invoice
                </Button>
              </DialogActions>
            </>
          )}
        </Dialog>

        {/* Payment Dialog */}
        <Dialog
          open={openPayment}
          onClose={() => setOpenPayment(false)}
          maxWidth="sm"
          fullWidth
          PaperProps={{
            sx: {
              borderRadius: "28px",
              overflow: "hidden",
            },
          }}
        >
          {selectedBooking && (
            <>
              <Box
                sx={{
                  background: `linear-gradient(135deg, ${moodColor} 0%, ${alpha(
                    moodColor,
                    0.8
                  )} 100%)`,
                  p: 4,
                  textAlign: "center",
                  color: "white",
                }}
              >
                <Lock sx={{ fontSize: 40, mb: 2, opacity: 0.9 }} />
                <Typography variant="h5" fontWeight="900">
                  Secure Payment
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                  Complete your booking for {selectedBooking.hotelName}
                </Typography>
              </Box>

              <DialogContent sx={{ p: 4 }}>
                <Stepper activeStep={paymentStep} sx={{ mb: 4 }}>
                  {["Details", "Payment", "Success"].map((label) => (
                    <Step key={label}>
                      <StepLabel
                        StepIconProps={{
                          sx: {
                            "&.Mui-active, &.Mui-completed": {
                              color: moodColor,
                            },
                          },
                        }}
                      >
                        {label}
                      </StepLabel>
                    </Step>
                  ))}
                </Stepper>

                {paymentStep === 0 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                  >
                    <Typography variant="h6" fontWeight="700" sx={{ mb: 3 }}>
                      Select Payment Method
                    </Typography>

                    <RadioGroup
                      value={paymentMethod}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    >
                      <Paper
                        elevation={0}
                        sx={{
                          p: 2,
                          mb: 2,
                          borderRadius: "15px",
                          border: `2px solid ${
                            paymentMethod === "card"
                              ? moodColor
                              : alpha(moodColor, 0.1)
                          }`,
                          background:
                            paymentMethod === "card"
                              ? alpha(moodColor, 0.05)
                              : "transparent",
                        }}
                      >
                        <FormControlLabel
                          value="card"
                          control={<Radio sx={{ color: moodColor }} />}
                          label={
                            <Stack
                              direction="row"
                              alignItems="center"
                              spacing={2}
                            >
                              <CreditCard sx={{ color: moodColor }} />
                              <Box>
                                <Typography fontWeight="600">
                                  Credit/Debit Card
                                </Typography>
                                <Typography
                                  variant="caption"
                                  color="text.secondary"
                                >
                                  Pay with Visa, Mastercard, or Rupay
                                </Typography>
                              </Box>
                            </Stack>
                          }
                        />
                      </Paper>

                      <Paper
                        elevation={0}
                        sx={{
                          p: 2,
                          mb: 2,
                          borderRadius: "15px",
                          border: `2px solid ${
                            paymentMethod === "paypal"
                              ? moodColor
                              : alpha(moodColor, 0.1)
                          }`,
                          background:
                            paymentMethod === "paypal"
                              ? alpha(moodColor, 0.05)
                              : "transparent",
                        }}
                      >
                        <FormControlLabel
                          value="paypal"
                          control={<Radio sx={{ color: moodColor }} />}
                          label={
                            <Stack
                              direction="row"
                              alignItems="center"
                              spacing={2}
                            >
                              <Payment sx={{ color: "#003087" }} />
                              <Box>
                                <Typography fontWeight="600">PayPal</Typography>
                                <Typography
                                  variant="caption"
                                  color="text.secondary"
                                >
                                  Pay with your PayPal account
                                </Typography>
                              </Box>
                            </Stack>
                          }
                        />
                      </Paper>

                      <Paper
                        elevation={0}
                        sx={{
                          p: 2,
                          borderRadius: "15px",
                          border: `2px solid ${
                            paymentMethod === "upi"
                              ? moodColor
                              : alpha(moodColor, 0.1)
                          }`,
                          background:
                            paymentMethod === "upi"
                              ? alpha(moodColor, 0.05)
                              : "transparent",
                        }}
                      >
                        <FormControlLabel
                          value="upi"
                          control={<Radio sx={{ color: moodColor }} />}
                          label={
                            <Stack
                              direction="row"
                              alignItems="center"
                              spacing={2}
                            >
                              <QrCode2 sx={{ color: moodColor }} />
                              <Box>
                                <Typography fontWeight="600">UPI</Typography>
                                <Typography
                                  variant="caption"
                                  color="text.secondary"
                                >
                                  Pay with Google Pay, PhonePe, or Paytm
                                </Typography>
                              </Box>
                            </Stack>
                          }
                        />
                      </Paper>
                    </RadioGroup>

                    {/* Price Summary */}
                    <Paper
                      elevation={0}
                      sx={{
                        p: 3,
                        mt: 4,
                        borderRadius: "20px",
                        background: alpha(moodColor, 0.05),
                        border: `1px solid ${alpha(moodColor, 0.2)}`,
                      }}
                    >
                      <Stack spacing={1}>
                        <Stack direction="row" justifyContent="space-between">
                          <Typography variant="body2" color="text.secondary">
                            Amount to Pay
                          </Typography>
                          <Typography
                            variant="h5"
                            fontWeight="900"
                            color={moodColor}
                          >
                            ${selectedBooking.totalPrice}
                          </Typography>
                        </Stack>
                        <Typography variant="caption" color="text.secondary">
                          Includes all taxes and service charges
                        </Typography>
                      </Stack>
                    </Paper>
                  </motion.div>
                )}

                {paymentStep === 1 && (
                  <Box sx={{ textAlign: "center", py: 6 }}>
                    <CircularProgress
                      size={60}
                      sx={{ color: moodColor, mb: 3 }}
                    />
                    <Typography variant="h6" fontWeight="700" sx={{ mb: 2 }}>
                      Processing Payment
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Please wait while we secure your booking...
                    </Typography>
                    <LinearProgress
                      sx={{ mt: 3, height: 8, borderRadius: 4 }}
                    />
                  </Box>
                )}

                {paymentStep === 2 && (
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                  >
                    <Box sx={{ textAlign: "center", py: 4 }}>
                      <Box
                        sx={{
                          width: 80,
                          height: 80,
                          borderRadius: "50%",
                          background: `linear-gradient(135deg, ${moodColor}, ${alpha(
                            moodColor,
                            0.8
                          )})`,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          mx: "auto",
                          mb: 3,
                        }}
                      >
                        <Verified sx={{ fontSize: 40, color: "white" }} />
                      </Box>
                      <Typography variant="h4" fontWeight="900" sx={{ mb: 2 }}>
                        Payment Successful! 🎉
                      </Typography>
                      <Typography
                        variant="body1"
                        color="text.secondary"
                        sx={{ mb: 4 }}
                      >
                        Your booking at {selectedBooking.hotelName} is
                        confirmed!
                      </Typography>
                      <Paper
                        elevation={0}
                        sx={{
                          p: 2,
                          borderRadius: "15px",
                          background: alpha(moodColor, 0.05),
                          border: `2px dashed ${moodColor}`,
                        }}
                      >
                        <Typography variant="body2" sx={{ mb: 1 }}>
                          <strong>Booking ID:</strong> {selectedBooking.id}
                        </Typography>
                        <Typography variant="body2">
                          <strong>Check-in:</strong>{" "}
                          {formatDate(selectedBooking.checkIn)}
                        </Typography>
                      </Paper>
                    </Box>
                  </motion.div>
                )}
              </DialogContent>

              <DialogActions
                sx={{ p: 3, borderTop: `2px solid ${alpha(moodColor, 0.1)}` }}
              >
                {paymentStep === 0 && (
                  <>
                    <Button
                      onClick={() => setOpenPayment(false)}
                      sx={{
                        borderRadius: "20px",
                        px: 4,
                        color: "text.secondary",
                      }}
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="contained"
                      onClick={handleCompletePayment}
                      sx={{
                        borderRadius: "20px",
                        px: 4,
                        background: `linear-gradient(135deg, ${moodColor}, ${alpha(
                          moodColor,
                          0.8
                        )})`,
                        fontWeight: "bold",
                      }}
                    >
                      Pay ${selectedBooking.totalPrice}
                    </Button>
                  </>
                )}

                {paymentStep === 2 && (
                  <Button
                    variant="contained"
                    onClick={() => {
                      setOpenPayment(false);
                      setSelectedBooking(null);
                    }}
                    sx={{
                      borderRadius: "20px",
                      px: 4,
                      background: `linear-gradient(135deg, ${moodColor}, ${alpha(
                        moodColor,
                        0.8
                      )})`,
                      fontWeight: "bold",
                    }}
                  >
                    View Booking Details
                  </Button>
                )}
              </DialogActions>
            </>
          )}
        </Dialog>

        {/* Floating Action Button */}
        <Fab
          color="primary"
          sx={{
            position: "fixed",
            bottom: 32,
            right: 32,
            background: `linear-gradient(135deg, ${moodColor}, ${alpha(
              moodColor,
              0.8
            )})`,
            width: 56,
            height: 56,
            boxShadow: `0 8px 30px ${alpha(moodColor, 0.3)}`,
            "&:hover": {
              transform: "scale(1.1)",
            },
            transition: "all 0.3s ease",
          }}
          onClick={() => history.push("/")}
        >
          <Hotel sx={{ color: "white" }} />
        </Fab>

        {/* Global Styles */}
        <style jsx global>{`
          @keyframes pulse {
            0%,
            100% {
              opacity: 1;
            }
            50% {
              opacity: 0.7;
            }
          }
        `}</style>
      </Box>
    </>
  );
};

export default Bookings;
