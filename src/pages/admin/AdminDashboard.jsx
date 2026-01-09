import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import {
  Box,
  CssBaseline,
  AppBar,
  Toolbar,
  Typography,
  Drawer,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  Badge,
  Avatar,
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
  InputAdornment,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  Hotel as HotelIcon,
  CalendarToday as CalendarIcon,
  People as PeopleIcon,
  AttachMoney as MoneyIcon,
  Notifications as NotificationsIcon,
  Search as SearchIcon,
  Star as StarIcon,
  // Bed as BedIcon,
  Logout as LogoutIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  // MoreVert as MoreVertIcon,
  // TrendingUp as TrendingUpIcon,
} from "@mui/icons-material";
import { alpha } from "@mui/material/styles";

const drawerWidth = 280;

const AdminDashboard = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  // const [anchorEl, setAnchorEl] = useState(null);
  const history = useHistory();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);
  // const handleProfileMenuOpen = (event) => setAnchorEl(event.currentTarget);
  // const handleMenuClose = () => setAnchorEl(null);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    history.push("/auth");
    window.location.reload();
  };

  // Modern Sidebar Logic
  const drawer = (
    <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <Toolbar
        sx={{
          background: "linear-gradient(45deg, #1e293b 30%, #334155 90%)",
          color: "white",
          mb: 2,
        }}
      >
        <HotelIcon sx={{ mr: 1.5, color: "#38bdf8" }} />
        <Typography variant="h6" fontWeight={800} letterSpacing={1}>
          {" "}
          STAYFLOW{" "}
        </Typography>
      </Toolbar>

      <Box sx={{ px: 2, mb: 2 }}>
        <Typography
          variant="overline"
          sx={{ color: "text.secondary", fontWeight: 700, ml: 1 }}
        >
          Main Menu
        </Typography>
      </Box>

      <List sx={{ px: 2, flexGrow: 1 }}>
        {[
          { text: "Dashboard", icon: <DashboardIcon />, path: "/admin" },
          { text: "Manage Hotels", icon: <HotelIcon />, path: "/admin/hotels" },
          { text: "Bookings", icon: <CalendarIcon />, badge: 5 },
          { text: "Customers", icon: <PeopleIcon /> },
        ].map((item) => (
          <ListItem key={item.text} disablePadding sx={{ mb: 1 }}>
            <ListItemButton
              sx={{
                borderRadius: "12px",
                "&.Mui-selected": {
                  bgcolor: alpha(theme.palette.primary.main, 0.1),
                },
              }}
              selected={item.text === "Dashboard"}
            >
              <ListItemIcon
                sx={{
                  color: item.text === "Dashboard" ? "primary.main" : "inherit",
                }}
              >
                {item.badge ? (
                  <Badge badgeContent={item.badge} color="error">
                    {item.icon}
                  </Badge>
                ) : (
                  item.icon
                )}
              </ListItemIcon>
              <ListItemText
                primary={item.text}
                primaryTypographyProps={{ fontWeight: 600 }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      {/* Sidebar Logout - Bottom Section */}
      <Box sx={{ p: 2, mt: "auto" }}>
        <Divider sx={{ mb: 2 }} />
        <Button
          fullWidth
          variant="contained"
          color="error"
          startIcon={<LogoutIcon />}
          onClick={handleLogout}
          sx={{
            borderRadius: "12px",
            py: 1.5,
            textTransform: "none",
            fontWeight: 700,
            boxShadow: "0 4px 12px rgba(239, 68, 68, 0.2)",
          }}
        >
          Logout
        </Button>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ display: "flex", bgcolor: "#f8fafc", minHeight: "100vh" }}>
      <CssBaseline />

      <AppBar
        position="fixed"
        sx={{
          width: { md: `calc(100% - ${drawerWidth}px)` },
          ml: { md: `${drawerWidth}px` },
          bgcolor: "rgba(255,255,255,0.8)",
          backdropFilter: "blur(8px)",
          color: "text.primary",
          boxShadow: "none",
          borderBottom: "1px solid #e2e8f0",
        }}
      >
        <Toolbar>
          <IconButton
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: "none" } }}
          >
            <MenuIcon />
          </IconButton>

          <TextField
            size="small"
            placeholder="Search everything..."
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
              sx: { borderRadius: "10px", bgcolor: "#f1f5f9", border: "none" },
            }}
            sx={{ width: 300, display: { xs: "none", sm: "block" } }}
          />

          <Box sx={{ flexGrow: 1 }} />

          <Stack direction="row" spacing={1.5} alignItems="center">
            <IconButton sx={{ bgcolor: "#f1f5f9" }}>
              <NotificationsIcon />
            </IconButton>
            <Box sx={{ textAlign: "right", mr: 1 }}>
              <Typography variant="body2" fontWeight={700}>
                Admin Master
              </Typography>
              <Typography variant="caption" color="textSecondary">
                super_admin
              </Typography>
            </Box>
            <Avatar src="https://ui-avatars.com/api/?name=Admin&background=0D8ABC&color=fff" />
          </Stack>
        </Toolbar>
      </AppBar>

      <Box
        component="nav"
        sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
      >
        <Drawer
          variant={isMobile ? "temporary" : "permanent"}
          open={mobileOpen}
          onClose={handleDrawerToggle}
          sx={{
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              borderRight: "1px solid #e2e8f0",
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>

      <Box component="main" sx={{ flexGrow: 1, p: 4, mt: 8 }}>
        <Container maxWidth="xl">
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
                Here's what's happening with your hotels today.
              </Typography>
            </Box>
            <Button
              variant="contained"
              startIcon={<HotelIcon />}
              sx={{ borderRadius: "10px", px: 3 }}
            >
              Add New Hotel
            </Button>
          </Box>

          {/* Quick Stats Grid */}
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
                      <Typography
                        variant="h5"
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
                      }}
                    >
                      {stat.icon}
                    </Avatar>
                  </Stack>
                </Paper>
              </Grid>
            ))}
          </Grid>

          {/* Main Table Section */}
          <Paper
            sx={{
              borderRadius: "16px",
              overflow: "hidden",
              boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)",
            }}
          >
            <Box
              sx={{
                p: 3,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography variant="h6" fontWeight={700}>
                Manage Hotel Inventory
              </Typography>
              <Button size="small">Export Data</Button>
            </Box>
            <TableContainer>
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
                  {[
                    {
                      name: "Grand Hyatt",
                      loc: "Mumbai, India",
                      status: "Active",
                      rate: 4.8,
                    },
                    {
                      name: "The Taj Palace",
                      loc: "Delhi, India",
                      status: "Active",
                      rate: 4.9,
                    },
                    {
                      name: "Hilton Resort",
                      loc: "Goa, India",
                      status: "Maintenance",
                      rate: 4.2,
                    },
                  ].map((row) => (
                    <TableRow key={row.name} hover>
                      <TableCell>
                        <Typography fontWeight={600}>{row.name}</Typography>
                      </TableCell>
                      <TableCell>{row.loc}</TableCell>
                      <TableCell>
                        <Chip
                          label={row.status}
                          size="small"
                          color={
                            row.status === "Active" ? "success" : "warning"
                          }
                          sx={{ fontWeight: 700, borderRadius: "6px" }}
                        />
                      </TableCell>
                      <TableCell>
                        <Stack
                          direction="row"
                          spacing={0.5}
                          alignItems="center"
                        >
                          <StarIcon sx={{ fontSize: 18, color: "#f59e0b" }} />
                          <Typography variant="body2" fontWeight={600}>
                            {row.rate}
                          </Typography>
                        </Stack>
                      </TableCell>
                      <TableCell align="right">
                        <IconButton size="small" color="primary">
                          <EditIcon fontSize="small" />
                        </IconButton>
                        <IconButton size="small" color="error">
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Container>
      </Box>
    </Box>
  );
};

export default AdminDashboard;
