import React from "react";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Toolbar,
  Typography,
  Button,
  alpha,
} from "@mui/material";
import { useHistory, useLocation } from "react-router-dom";
import {
  Dashboard as DashboardIcon,
  Hotel as HotelIcon,
  CalendarToday as CalendarIcon,
  People as PeopleIcon,
  Logout as LogoutIcon,
} from "@mui/icons-material";

const drawerWidth = 280;

const Layout = ({ children, onLogout }) => {
  const history = useHistory();
  const location = useLocation();

  const menuItems = [
    { text: "Dashboard", icon: <DashboardIcon />, path: "/admin" },
    { text: "Manage Hotels", icon: <HotelIcon />, path: "/admin/adminhotels" },
    {
      text: "Bookings",
      icon: <CalendarIcon />,
      path: "/admin/adminbookings",
      badge: 5,
    },
    { text: "Customers", icon: <PeopleIcon />, path: "/admin/admincustomers" },
  ];

  return (
    <Box sx={{ display: "flex", bgcolor: "#f8fafc", minHeight: "100vh" }}>
      {/* SIDEBAR FIXED */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            borderRight: "1px solid #e2e8f0",
          },
        }}
      >
        <Toolbar
          sx={{
            background: "linear-gradient(45deg, #1e293b 30%, #334155 90%)",
            color: "white",
            mb: 2,
          }}
        >
          <HotelIcon sx={{ mr: 1.5, color: "#38bdf8" }} />
          <Typography variant="h6" fontWeight={800}>
            {" "}
            STAYFLOW{" "}
          </Typography>
        </Toolbar>

        <List sx={{ px: 2, flexGrow: 1 }}>
          {menuItems.map((item) => (
            <ListItem key={item.text} disablePadding sx={{ mb: 1 }}>
              <ListItemButton
                selected={location.pathname === item.path}
                onClick={() => history.push(item.path)}
                sx={{
                  borderRadius: "12px",
                  "&.Mui-selected": { bgcolor: alpha("#3b82f6", 0.1) },
                }}
              >
                <ListItemIcon
                  sx={{
                    color:
                      location.pathname === item.path
                        ? "primary.main"
                        : "inherit",
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.text}
                  primaryTypographyProps={{ fontWeight: 600 }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>

        <Box sx={{ p: 2 }}>
          <Button
            fullWidth
            onClick={onLogout}
            variant="contained"
            color="error"
            startIcon={<LogoutIcon />}
            sx={{ borderRadius: "12px" }}
          >
            Logout
          </Button>
        </Box>
      </Drawer>

      {/* DYNAMIC CONTENT AREA */}
      <Box component="main" sx={{ flexGrow: 1, p: 4 }}>
        {children}
      </Box>
    </Box>
  );
};

export default Layout;
