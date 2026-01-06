import React, { useContext, useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Stack,
  Box,
  Container,
  IconButton,
  useScrollTrigger,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
  alpha,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  Forest,
  Apartment,
  Waves,
  Favorite,
  Castle,
  AllInclusive,
  AccountCircle,
  Menu as MenuIcon,
  Close,
  Home,
  Place,
  Bookmark,
} from "@mui/icons-material";
import InfoIcon from "@mui/icons-material/Info";
import { MoodContext } from "../../context/MoodContext";
import { useHistory, useLocation } from "react-router-dom";

const Navbar = () => {
  const { scrollYProgress } = useScroll();
  const width = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const { mood, setMood } = useContext(MoodContext);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const history = useHistory();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  // const isTablet = useMediaQuery(theme.breakpoints.down("lg"));

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 50,
  });

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

  const getLogoIcon = () => {
    const iconStyle = {
      fontSize: isMobile ? "2.2rem" : "2.8rem",
      color: getMoodColor(mood),
      filter: `drop-shadow(0 2px 8px ${alpha(getMoodColor(mood), 0.3)})`,
    };
    const icons = {
      nature: <Forest sx={iconStyle} />,
      urban: <Apartment sx={iconStyle} />,
      ocean: <Waves sx={iconStyle} />,
      romantic: <Favorite sx={iconStyle} />,
      royal: <Castle sx={iconStyle} />,
      default: <AllInclusive sx={iconStyle} />,
    };
    return icons[mood] || icons.default;
  };

  const moods = [
    { id: "default", label: "All", icon: <AllInclusive /> },
    { id: "nature", label: "Nature", icon: <Forest /> },
    { id: "urban", label: "Urban", icon: <Apartment /> },
    { id: "ocean", label: "Ocean", icon: <Waves /> },
    { id: "romantic", label: "Romantic", icon: <Favorite /> },
    { id: "royal", label: "Royal", icon: <Castle /> },
  ];

  const navItems = [
    { label: "Home", path: "/", icon: <Home /> },
    { label: "Destination", path: "/destination", icon: <Place /> },
    { label: "My Bookings", path: "/bookings", icon: <Bookmark /> },
    { label: "About", path: "/about", icon: <InfoIcon /> },
  ];

  const handleNavigation = (path) => {
    history.push(path); // Changed from navigate()
    if (isMobile) setDrawerOpen(false);
  };

  const isActivePath = (path) => location.pathname === path;

  return (
    <>
      <AppBar
        position="sticky"
        elevation={trigger ? 4 : 0}
        sx={{
          bgcolor: trigger ? "rgba(255, 255, 255, 0.98)" : "white",
          backdropFilter: trigger ? "blur(20px)" : "none",
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          borderBottom: `1px solid ${alpha(getMoodColor(mood), 0.1)}`,
        }}
      >
        <Container maxWidth="xl">
          {/* Top Bar */}
          <Toolbar
            sx={{
              justifyContent: "space-between",
              minHeight: { xs: 70, md: 80 },
              px: { xs: 1, sm: 2 },
            }}
          >
            {/* Logo Section */}
            <Box
              component={motion.div}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setMood("default");
                handleNavigation("/");
              }}
              sx={{
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
                flexShrink: 0,
              }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={mood}
                  initial={{ rotate: -20, scale: 0.8, opacity: 0 }}
                  animate={{ rotate: 0, scale: 1, opacity: 1 }}
                  exit={{ rotate: 20, scale: 0.8, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 200 }}
                >
                  {getLogoIcon()}
                </motion.div>
              </AnimatePresence>
              <Box sx={{ ml: { xs: 1, sm: 1.5 } }}>
                <Typography
                  variant={isMobile ? "h5" : "h4"}
                  sx={{
                    fontWeight: 900,
                    letterSpacing: { xs: "-0.5px", sm: "-1.5px" },
                    lineHeight: 1.2,
                    fontFamily: "'Inter', sans-serif",
                    background: `linear-gradient(45deg, #111827, ${getMoodColor(
                      mood
                    )})`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    whiteSpace: "nowrap",
                  }}
                >
                  Stayflow
                </Typography>
              </Box>
            </Box>

            {/* Desktop Navigation */}
            {!isMobile && (
              <Stack
                direction="row"
                spacing={{ md: 3, lg: 4 }}
                sx={{ mx: 3, flex: 1, justifyContent: "center" }}
              >
                {navItems.map((item) => (
                  <Button
                    key={item.label}
                    onClick={() => handleNavigation(item.path)}
                    startIcon={item.icon}
                    sx={{
                      color: isActivePath(item.path)
                        ? getMoodColor(mood)
                        : "text.primary",
                      fontWeight: isActivePath(item.path) ? 700 : 600,
                      textTransform: "none",
                      fontSize: "0.95rem",
                      position: "relative",
                      borderRadius: "8px",
                      px: 2,
                      py: 1,
                      "&:hover": {
                        backgroundColor: alpha(getMoodColor(mood), 0.08),
                      },
                      "&::after": {
                        content: '""',
                        position: "absolute",
                        bottom: 0,
                        left: "50%",
                        transform: isActivePath(item.path)
                          ? "translateX(-50%) scaleX(1)"
                          : "translateX(-50%) scaleX(0)",
                        width: "80%",
                        height: "3px",
                        backgroundColor: getMoodColor(mood),
                        borderRadius: "2px",
                        transition: "transform 0.3s ease",
                      },
                    }}
                  >
                    {item.label}
                  </Button>
                ))}
              </Stack>
            )}

            {/* Right Actions */}
            <Stack direction="row" spacing={1} alignItems="center">
              {!isMobile ? (
                <>
                  <Button
                    variant="outlined"
                    onClick={() => handleNavigation("/login")} // Changed
                    sx={{
                      borderRadius: "20px",
                      borderColor: alpha(getMoodColor(mood), 0.3),
                      color: getMoodColor(mood),
                      fontWeight: 600,
                      textTransform: "none",
                      px: 3,
                      "&:hover": {
                        borderColor: getMoodColor(mood),
                        backgroundColor: alpha(getMoodColor(mood), 0.05),
                      },
                    }}
                  >
                    Log in
                  </Button>
                  <Button
                    variant="contained"
                    onClick={() => handleNavigation("/signup")} // Changed
                    sx={{
                      borderRadius: "20px",
                      backgroundColor: getMoodColor(mood),
                      color: "white",
                      fontWeight: 600,
                      textTransform: "none",
                      px: 3,
                      boxShadow: `0 4px 14px ${alpha(getMoodColor(mood), 0.3)}`,
                      "&:hover": {
                        backgroundColor: getMoodColor(mood),
                        boxShadow: `0 6px 20px ${alpha(
                          getMoodColor(mood),
                          0.4
                        )}`,
                      },
                    }}
                  >
                    Sign Up
                  </Button>
                </>
              ) : (
                <Button
                  variant="contained"
                  size="small"
                  onClick={() => handleNavigation("/login")} // Changed
                  sx={{
                    borderRadius: "20px",
                    backgroundColor: getMoodColor(mood),
                    color: "white",
                    fontWeight: 600,
                    textTransform: "none",
                    px: 2,
                  }}
                >
                  Log in
                </Button>
              )}

              {/* User Profile / Mobile Menu */}
              <IconButton
                onClick={
                  () =>
                    isMobile
                      ? setDrawerOpen(true)
                      : handleNavigation("/profile") // Changed
                }
                sx={{
                  ml: 1,
                  backgroundColor: alpha(getMoodColor(mood), 0.1),
                  "&:hover": {
                    backgroundColor: alpha(getMoodColor(mood), 0.2),
                  },
                }}
              >
                {isMobile ? <MenuIcon /> : <AccountCircle />}
              </IconButton>
            </Stack>
          </Toolbar>

          {/* Mood Tabs Section */}
          <Box
            sx={{
              pb: 2,
              px: { xs: 1, sm: 2 },
              borderTop: `1px solid ${alpha(getMoodColor(mood), 0.05)}`,
            }}
          >
            <Stack
              direction="row"
              spacing={{ xs: 1.5, sm: 2, md: 3 }}
              sx={{
                overflowX: "auto",
                scrollbarWidth: "none",
                "&::-webkit-scrollbar": { display: "none" },
                justifyContent: isMobile ? "flex-start" : "center",
              }}
            >
              {moods.map((m) => {
                const isActive = mood === m.id;
                return (
                  <Box
                    key={m.id}
                    onClick={() => setMood(m.id)}
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      cursor: "pointer",
                      minWidth: isMobile ? "70px" : "85px",
                      padding: isMobile ? "6px 8px" : "8px 12px",
                      borderRadius: "12px",
                      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                      color: isActive
                        ? getMoodColor(m.id)
                        : alpha("#6b7280", isMobile ? 0.6 : 0.7),
                      backgroundColor: isActive
                        ? alpha(getMoodColor(m.id), 0.1)
                        : "transparent",
                      transform: isActive ? "scale(1.05)" : "scale(1)",
                      "&:hover": {
                        color: getMoodColor(m.id),
                        backgroundColor: alpha(getMoodColor(m.id), 0.08),
                        transform: "translateY(-2px)",
                      },
                    }}
                  >
                    <Box
                      sx={{
                        fontSize: isMobile ? "1.4rem" : "1.6rem",
                        mb: 0.5,
                        display: "flex",
                        filter: isActive
                          ? `drop-shadow(0 2px 4px ${alpha(
                              getMoodColor(m.id),
                              0.3
                            )})`
                          : "none",
                      }}
                    >
                      {m.icon}
                    </Box>
                    <Typography
                      variant="caption"
                      sx={{
                        fontWeight: isActive ? 800 : 600,
                        fontSize: isMobile ? "0.65rem" : "0.7rem",
                        textAlign: "center",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {m.label}
                    </Typography>
                  </Box>
                );
              })}
            </Stack>
          </Box>
          <Box
            sx={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: "3px", // Patli aur premium line
              overflow: "hidden",
              bgcolor: alpha(getMoodColor(mood), 0.1), // Halka background track
            }}
          >
            <motion.div
              style={{
                width: width, // Ye hamara transform variable hai
                height: "100%",
                backgroundColor: getMoodColor(mood),
                boxShadow: `0 0 10px ${getMoodColor(mood)}`, // Glowing effect
              }}
            />
          </Box>
        </Container>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        PaperProps={{
          sx: {
            width: 280,
            backgroundColor: "background.paper",
          },
        }}
      >
        <Box sx={{ p: 2, display: "flex", justifyContent: "flex-end" }}>
          <IconButton onClick={() => setDrawerOpen(false)}>
            <Close />
          </IconButton>
        </Box>
        <Divider />
        <List sx={{ p: 2 }}>
          {navItems.map((item) => (
            <ListItem
              key={item.label}
              onClick={() => handleNavigation(item.path)}
              sx={{
                borderRadius: "8px",
                mb: 1,
                backgroundColor: isActivePath(item.path)
                  ? alpha(getMoodColor(mood), 0.1)
                  : "transparent",
                "&:hover": {
                  backgroundColor: alpha(getMoodColor(mood), 0.05),
                },
              }}
            >
              <ListItemText
                primary={
                  <Typography
                    sx={{
                      color: isActivePath(item.path)
                        ? getMoodColor(mood)
                        : "text.primary",
                      fontWeight: isActivePath(item.path) ? 700 : 600,
                    }}
                  >
                    {item.label}
                  </Typography>
                }
              />
            </ListItem>
          ))}
        </List>
        <Divider />
        <Box sx={{ p: 3 }}>
          <Button
            fullWidth
            variant="contained"
            onClick={() => {
              handleNavigation("/signup"); // Changed
              setDrawerOpen(false);
            }}
            sx={{
              mb: 2,
              borderRadius: "12px",
              backgroundColor: getMoodColor(mood),
              color: "white",
              fontWeight: 600,
              textTransform: "none",
              py: 1.5,
            }}
          >
            Sign Up
          </Button>
          <Button
            fullWidth
            variant="outlined"
            onClick={() => {
              handleNavigation("/profile"); // Changed
              setDrawerOpen(false);
            }}
            sx={{
              borderRadius: "12px",
              borderColor: alpha(getMoodColor(mood), 0.3),
              color: getMoodColor(mood),
              fontWeight: 600,
              textTransform: "none",
              py: 1.5,
            }}
          >
            My Profile
          </Button>
        </Box>
      </Drawer>
    </>
  );
};

export default Navbar;
