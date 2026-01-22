import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import HotelIcon from "@mui/icons-material/Hotel";
import MoneyIcon from "@mui/icons-material/AttachMoney";
import CalendarIcon from "@mui/icons-material/CalendarToday";
import PeopleIcon from "@mui/icons-material/People";
import {
  Box,
  Typography,
  Grid,
  Paper,
  Avatar,
  Stack,
  alpha,
  useTheme,
  useMediaQuery,
  MenuItem, // Add this
  TextField, // Add this
} from "@mui/material";
import { useEffect, useState } from "react";
import api from "../../api/axios";

const AdminDashboard = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [stats, setStats] = useState({
    totalHotels: 0,
    totalRevenue: 0,
    totalCustomer: 0,
  });

  // 1. Nayi States: Month aur Year ke liye
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [allBookings, setAllBookings] = useState([]); // Saari bookings store karne ke liye
  const [analyticsData, setAnalyticsData] = useState([]);

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const startYear = 2024;
  const currentYear = new Date().getFullYear();
  const years = [];
  for (let y = startYear; y <= currentYear + 1; y++) {
    years.push(y);
  }

  const loadStats = async () => {
    try {
      const [hotelRes, custRes, bookRes] = await Promise.all([
        api.get("/HotelDatas"),
        api.get("/Users"),
        api.get("/Bookingssystem"),
      ]);

      const bData =
        bookRes.data.Data ||
        bookRes.data.data ||
        (Array.isArray(bookRes.data) ? bookRes.data : []);
      const confirmedBookings = bData.filter(
        (b) => b.status?.toLowerCase() === "confirmed",
      );

      setAllBookings(confirmedBookings); // Filtered bookings ko state mein rakhein

      // Stats update karein
      setStats({
        totalHotels: (
          hotelRes.data.Data ||
          hotelRes.data.data ||
          hotelRes.data ||
          []
        ).length,
        totalRevenue: confirmedBookings.reduce(
          (sum, b) => sum + Number(b.amount || b.price || 0) * 90,
          0,
        ),
        totalCustomer: (
          custRes.data.Data ||
          custRes.data.data ||
          custRes.data ||
          []
        ).length,
      });
    } catch (err) {
      console.error("Dashboard Error:", err);
    }
  };

  // 2. Logic: Selected Month ke hisaab se Chart Data banana
  useEffect(() => {
    if (allBookings.length >= 0) {
      // Us mahine mein kitne din hain (e.g., Feb has 28)
      const daysInMonth = new Date(
        selectedYear,
        selectedMonth + 1,
        0,
      ).getDate();

      // Har din ke liye default 0 revenue ka array
      const dailyData = Array.from({ length: daysInMonth }, (_, i) => ({
        date: i + 1,
        revenue: 0,
      }));

      // Bookings ko scan karke revenue add karein
      allBookings.forEach((curr) => {
        const dateObj = new Date(curr.createdAt || curr.checkIn);
        if (
          dateObj.getMonth() === selectedMonth &&
          dateObj.getFullYear() === selectedYear
        ) {
          const day = dateObj.getDate();
          const price = Number(curr.amount || curr.price || 0) * 90;
          dailyData[day - 1].revenue += price;
        }
      });

      setAnalyticsData(dailyData);
    }
  }, [selectedMonth, selectedYear, allBookings]);

  useEffect(() => {
    loadStats();
  }, []);

  const statCards = [
    {
      label: "Revenue",
      val: `₹ ${stats.totalRevenue.toLocaleString("en-IN")}`,
      color: "#10b981",
      icon: <MoneyIcon />,
    },
    {
      label: "Total Hotels",
      val: stats.totalHotels,
      color: "#3b82f6",
      icon: <HotelIcon />,
    },
    {
      label: "Occupancy",
      val: "88%",
      color: "#f59e0b",
      icon: <CalendarIcon />,
    },
    {
      label: "Active Guests",
      val: stats.totalCustomer,
      color: "#8b5cf6",
      icon: <PeopleIcon />,
    },
  ];

  return (
    <Box sx={{ width: "100%", overflowX: "hidden" }}>
      <Stack
        direction={isMobile ? "column" : "row"}
        justifyContent="space-between"
        alignItems={isMobile ? "flex-start" : "center"}
        sx={{ mb: 4 }}
        spacing={2}
      >
        <Box>
          <Typography
            variant={isMobile ? "h5" : "h4"}
            fontWeight={900}
            sx={{ color: "#1e293b" }}
          >
            Welcome Back!
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Here's what's happening in {months[selectedMonth]}.
          </Typography>
        </Box>

        <Stack direction="row" spacing={2} sx={{ mb: 4 }}>
          {/* Month Dropdown */}
          <TextField
            select
            size="small"
            label="Month"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            sx={{ minWidth: 140, bgcolor: "white", borderRadius: "8px" }}
          >
            {months.map((m, index) => (
              <MenuItem key={m} value={index}>
                {m}
              </MenuItem>
            ))}
          </TextField>

          {/* Year Dropdown - 2024 se Start */}
          <TextField
            select
            size="small"
            label="Year"
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            sx={{ minWidth: 100, bgcolor: "white", borderRadius: "8px" }}
          >
            {years.map((y) => (
              <MenuItem key={y} value={y}>
                {y}
              </MenuItem>
            ))}
          </TextField>
        </Stack>
      </Stack>

      {/* STAT CARDS (Same as your code) */}
      <Grid container spacing={{ xs: 2, md: 3 }} sx={{ mb: 4 }}>
        {statCards.map((stat) => (
          <Grid item xs={12} sm={6} md={3} key={stat.label}>
            <Paper
              elevation={0}
              sx={{
                p: { xs: 2, md: 3 },
                borderRadius: "24px",
                border: "1px solid",
                borderColor: alpha("#cbd5e1", 0.3),
                background: "white",
                transition: "0.2s",
                "&:hover": { transform: "translateY(-5px)" },
              }}
            >
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Box>
                  <Typography
                    variant="caption"
                    fontWeight={700}
                    color="textSecondary"
                    sx={{ textTransform: "uppercase" }}
                  >
                    {stat.label}
                  </Typography>
                  <Typography
                    variant={isMobile ? "h5" : "h4"}
                    fontWeight={800}
                    sx={{ mt: 0.5 }}
                  >
                    {stat.val}
                  </Typography>
                </Box>
                <Avatar
                  sx={{
                    bgcolor: alpha(stat.color, 0.1),
                    color: stat.color,
                    width: 56,
                    height: 56,
                  }}
                >
                  {stat.icon}
                </Avatar>
              </Stack>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* CHART SECTION */}
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper
            sx={{
              p: { xs: 2, md: 4 },
              borderRadius: "24px",
              border: "1px solid",
              borderColor: alpha("#cbd5e1", 0.3),
            }}
          >
            <Typography variant="h6" fontWeight={800} mb={3}>
              Daily Revenue - {months[selectedMonth]} {selectedYear}
            </Typography>
            <Box sx={{ width: "100%", height: isMobile ? 250 : 350 }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={analyticsData}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                      <stop
                        offset="5%"
                        stopColor={theme.palette.primary.main}
                        stopOpacity={0.3}
                      />
                      <stop
                        offset="95%"
                        stopColor={theme.palette.primary.main}
                        stopOpacity={0}
                      />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="#f1f5f9"
                  />
                  <XAxis
                    dataKey="date"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fontWeight: 600, fill: "#64748b" }}
                    label={{
                      value: "Date",
                      position: "insideBottomRight",
                      offset: -5,
                    }}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: "#64748b" }}
                    tickFormatter={(value) => `₹${value}`}
                  />
                  <Tooltip
                    contentStyle={{
                      borderRadius: "12px",
                      border: "none",
                      boxShadow: "0 10px 15px rgba(0,0,0,0.1)",
                    }}
                    formatter={(value) => [
                      `₹${value.toLocaleString()}`,
                      "REVENUE",
                    ]}
                    labelFormatter={(label) =>
                      `Date: ${label} ${months[selectedMonth]}`
                    }
                  />
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    stroke={theme.palette.primary.main}
                    strokeWidth={3}
                    fillOpacity={1}
                    fill="url(#colorRev)"
                    activeDot={{ r: 8, strokeWidth: 0 }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AdminDashboard;
