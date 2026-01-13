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
} from "@mui/material";
import { alpha } from "@mui/material";
import { useEffect, useState } from "react";
import api from "../../api/axios";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalHotels: 0,
    totalRevenue: 0,
    totalCustomer: 0,
  });

  const loadStats = async () => {
    try {
      // 1. Teeno APIs se data ek saath mangwao
      const [hotelRes, custRes, bookRes] = await Promise.all([
        api.get("/Hotels"),
        api.get("/Users"),
        api.get("/ConfirmBookings"),
      ]);

      // 2. Data extract karne ka safe tarika
      const hData = hotelRes.data.Data || hotelRes.data.data || [];
      const cData = custRes.data.Data || custRes.data.data || [];
      const bData = bookRes.data.Data || bookRes.data.data || [];

      // 3. Revenue calculate karo
      // AdminDashboard.jsx mein:
      const totalRev = bData
        .filter((b) => b.status === "confirmed") // Sirf confirmed bookings ka paisa
        .reduce((sum, b) => sum + (Number(b.amount) || 0), 0);
      
      // 4. Stats set karo
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

  const analyticsData = [
    { month: "Jan", revenue: 4000, bookings: 240 },
    { month: "Feb", revenue: 3000, bookings: 138 },
    { month: "Mar", revenue: 9000, bookings: 980 },
    { month: "Apr", revenue: 3900, bookings: 390 },
    { month: "May", revenue: 4800, bookings: 480 },
    { month: "Jun", revenue: 7000, bookings: 560 },
  ];

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

  return (
    <Container maxWidth="xl">
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight={800}>
          Welcome Back!
        </Typography>
        <Typography variant="body1" color="textSecondary">
          Here's what's happening today.
        </Typography>
      </Box>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        {statCards.map((stat) => (
          <Grid item xs={12} sm={6} md={3} key={stat.label}>
            <Paper
              sx={{
                p: 3,
                borderRadius: "16px",
                boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
              }}
            >
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Box>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    fontWeight={600}
                  >
                    {stat.label}
                  </Typography>
                  <Typography variant="h5" fontWeight={800} sx={{ mt: 0.5 }}>
                    {stat.val}
                  </Typography>
                </Box>
                <Avatar
                  sx={{ bgcolor: alpha(stat.color, 0.1), color: stat.color }}
                >
                  {stat.icon}
                </Avatar>
              </Stack>
            </Paper>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3, borderRadius: "16px", height: 450, minHeight: 0 }}>
            <Typography variant="h6" fontWeight={700} mb={2}>
              Revenue Analytics
            </Typography>
            <Box sx={{ width: "100%", height: 350 }}>
              {" "}
              {/* Container with explicit height */}
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={analyticsData}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="#f1f5f9"
                  />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    stroke="#3b82f6"
                    fillOpacity={0.1}
                    fill="#3b82f6"
                    strokeWidth={3}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AdminDashboard;
