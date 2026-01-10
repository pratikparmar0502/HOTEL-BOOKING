import React, { useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import {
  Box,
  Typography,
  Grid,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Stack,
  Button,
  TextField,
  Modal,
  IconButton,
  Avatar,
} from "@mui/material";
import {
  Hotel as HotelIcon,
  AttachMoney as MoneyIcon,
  CalendarToday as CalendarIcon,
  People as PeopleIcon,
  Star as StarIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";
import { alpha } from "@mui/material/styles";

const AdminDashboard = () => {
  // --- States (Same as your code) ---
  const [hotels, setHotels] = useState([
    {
      id: 1,
      name: "Grand Hyatt",
      loc: "Mumbai, India",
      status: "Active",
      rate: 4.8,
    },
    {
      id: 2,
      name: "The Taj Palace",
      loc: "Delhi, India",
      status: "Active",
      rate: 4.9,
    },
  ]);
  const [openModal, setOpenModal] = useState(false);
  const [newHotel, setNewHotel] = useState({
    name: "",
    loc: "",
    status: "Active",
    rate: "",
  });
  const [searchTerm, setSearchTerm] = useState("");

  const analyticsData = [
    { month: "Jan", revenue: 4000, bookings: 240 },
    { month: "Feb", revenue: 3000, bookings: 138 },
    { month: "Mar", revenue: 9000, bookings: 980 },
    { month: "Apr", revenue: 3900, bookings: 390 },
    { month: "May", revenue: 4800, bookings: 480 },
    { month: "Jun", revenue: 7000, bookings: 560 },
  ];

  // --- Functions (Same as your code) ---
  const handleAddHotel = () => {
    if (newHotel.name && newHotel.loc) {
      setHotels([...hotels, { ...newHotel, id: Date.now() }]);
      setOpenModal(false);
      setNewHotel({ name: "", loc: "", status: "Active", rate: "" });
    }
  };

  const handleDelete = (id) => setHotels(hotels.filter((h) => h.id !== id));

  const filteredHotels = hotels.filter(
    (hotel) =>
      hotel.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hotel.loc.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container maxWidth="xl">
      {/* HEADER SECTION */}
      <Box
        sx={{
          mb: 4,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box>
          <Typography variant="h4" fontWeight={800} color="#1e293b">
            Welcome Back!
          </Typography>
          <Typography variant="body1" color="textSecondary">
            Here's what's happening today.
          </Typography>
        </Box>
        <Stack direction="row" spacing={2}>
          <TextField
            size="small"
            placeholder="Search hotels..."
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{ bgcolor: "white", borderRadius: "10px" }}
          />
          <Button
            variant="contained"
            onClick={() => setOpenModal(true)}
            startIcon={<HotelIcon />}
            sx={{ borderRadius: "10px", px: 3 }}
          >
            Add Hotel
          </Button>
        </Stack>
      </Box>

      {/* STATS GRID (Same as your code) */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {[
          {
            label: "Revenue",
            val: "$42,500",
            color: "#10b981",
            icon: <MoneyIcon />,
          },
          {
            label: "Bookings",
            val: "1,240",
            color: "#3b82f6",
            icon: <CalendarIcon />,
          },
          {
            label: "Occupancy",
            val: "88%",
            color: "#f59e0b",
            icon: <HotelIcon />,
          },
          {
            label: "Active Guests",
            val: "450",
            color: "#8b5cf6",
            icon: <PeopleIcon />,
          },
        ].map((stat) => (
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

      {/* CHARTS SECTION (Same as your code) */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3, borderRadius: "16px", height: 400 }}>
            <Typography variant="h6" fontWeight={700} mb={2}>
              Revenue Analytics
            </Typography>
            <ResponsiveContainer width="100%" height="90%">
              <AreaChart data={analyticsData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#f1f5f9"
                />
                <XAxis dataKey="month" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
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
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, borderRadius: "16px", height: 400 }}>
            <Typography variant="h6" fontWeight={700} mb={2}>
              Bookings
            </Typography>
            <ResponsiveContainer width="100%" height="90%">
              <BarChart data={analyticsData}>
                <Bar dataKey="bookings" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                <XAxis dataKey="month" hide />
                <Tooltip cursor={{ fill: "transparent" }} />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>

      {/* TABLE SECTION (Same as your code) */}
      <TableContainer
        component={Paper}
        sx={{ borderRadius: "16px", overflow: "hidden" }}
      >
        <Table>
          <TableHead sx={{ bgcolor: "#f8fafc" }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 700 }}>Hotel Name</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Location</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Status</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Rating</TableCell>
              <TableCell sx={{ fontWeight: 700 }} align="right">
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredHotels.map((row) => (
              <TableRow key={row.id} hover>
                <TableCell>
                  <Typography fontWeight={600}>{row.name}</Typography>
                </TableCell>
                <TableCell>{row.loc}</TableCell>
                <TableCell>
                  <Chip label={row.status} color="success" size="small" />
                </TableCell>
                <TableCell>
                  <Stack direction="row" spacing={0.5} alignItems="center">
                    <StarIcon sx={{ fontSize: 18, color: "#f59e0b" }} />
                    <Typography variant="body2" fontWeight={600}>
                      {row.rate}
                    </Typography>
                  </Stack>
                </TableCell>
                <TableCell align="right">
                  <IconButton color="primary">
                    <EditIcon fontSize="small" />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() => handleDelete(row.id)}
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* MODAL (Same as your code) */}
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            borderRadius: "16px",
            p: 4,
          }}
        >
          <Typography variant="h6" fontWeight={700} mb={2}>
            Add New Hotel
          </Typography>
          <Stack spacing={2}>
            <TextField
              label="Hotel Name"
              fullWidth
              onChange={(e) =>
                setNewHotel({ ...newHotel, name: e.target.value })
              }
            />
            <TextField
              label="Location"
              fullWidth
              onChange={(e) =>
                setNewHotel({ ...newHotel, loc: e.target.value })
              }
            />
            <TextField
              label="Rating"
              type="number"
              fullWidth
              onChange={(e) =>
                setNewHotel({ ...newHotel, rate: e.target.value })
              }
            />
            <Button variant="contained" onClick={handleAddHotel} fullWidth>
              Save Hotel
            </Button>
          </Stack>
        </Box>
      </Modal>
    </Container>
  );
};

export default AdminDashboard;
