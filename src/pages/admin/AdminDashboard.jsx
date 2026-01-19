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
  Container,
  Paper,
  Avatar,
  Stack,
  alpha,
  useTheme,
  useMediaQuery,
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

  const loadStats = async () => {
    try {
      const [hotelRes, custRes, bookRes] = await Promise.all([
        api.get("/HotelDatas"),
        api.get("/Users"),
        api.get("/ConfirmBookings"),
      ]);

      const hData = hotelRes.data.Data || hotelRes.data.data || [];
      const cData = custRes.data.Data || custRes.data.data || [];
      const bData = bookRes.data.Data || bookRes.data.data || [];

      const totalRev = bData
        .filter((b) => b.status === "confirmed")
        .reduce((sum, b) => sum + (Number(b.amount) || 0), 0);

      setStats({
        totalHotels: hData.length,
        totalRevenue: totalRev,
        totalCustomer: cData.length,
      });
    } catch (err) {
      console.error("Dashboard Fetch Error:", err);
    }
  };

  useEffect(() => {
    loadStats();
  }, []);

  const statCards = [
    {
      label: "Revenue",
      val: `$${stats.totalRevenue.toLocaleString()}`,
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

  const analyticsData = [
    { month: "Jan", revenue: 4000 },
    { month: "Feb", revenue: 3000 },
    { month: "Mar", revenue: 9000 },
    { month: "Apr", revenue: 3900 },
    { month: "May", revenue: 4800 },
    { month: "Jun", revenue: 7000 },
  ];

  return (
    <Box sx={{ width: "100%", overflowX: "hidden" }}>
      <Box sx={{ mb: { xs: 3, md: 5 } }}>
        <Typography
          variant={isMobile ? "h5" : "h4"}
          fontWeight={900}
          sx={{ color: "#1e293b" }}
        >
          Welcome Back!
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Here's what's happening today in StayFlow.
        </Typography>
      </Box>

      {/* STAT CARDS GRID */}
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
                transition: "transform 0.2s",
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
                    sx={{ textTransform: "uppercase", letterSpacing: 1 }}
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

      {/* CHART SECTION (Now Active and Responsive) */}
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
              Revenue Analytics
            </Typography>
            <Box sx={{ width: "100%", height: isMobile ? 250 : 350 }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={analyticsData}>
                  <defs>
                    <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="#f1f5f9"
                  />
                  <XAxis
                    dataKey="month"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: "#64748b" }}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: "#64748b" }}
                  />
                  <Tooltip
                    contentStyle={{
                      borderRadius: "12px",
                      border: "none",
                      boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    stroke="#3b82f6"
                    strokeWidth={4}
                    fillOpacity={1}
                    fill="url(#colorRev)"
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
