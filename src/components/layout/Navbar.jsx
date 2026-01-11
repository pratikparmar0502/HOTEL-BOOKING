import React, { useContext, useState } from "react";
import { MoodContext } from "../../context/MoodContext";
// Inhe replace karo (Navbar ke upar):
import Forest from "@mui/icons-material/Forest";
import Apartment from "@mui/icons-material/Apartment";
import Waves from "@mui/icons-material/Waves";
import Favorite from "@mui/icons-material/Favorite";
import Castle from "@mui/icons-material/Castle";
import AllInclusive from "@mui/icons-material/AllInclusive";
import Home from "@mui/icons-material/Home";
import Place from "@mui/icons-material/Place";
import Bookmark from "@mui/icons-material/Bookmark";
import Person from "@mui/icons-material/Person";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuIcon from "@mui/icons-material/Menu";
import Avatar from "@mui/material/Avatar";
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
  useScrollTrigger,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
  alpha,
  useTheme,
  useMediaQuery,
  ListItemButton,
  ListItemIcon,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import { useHistory, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const navItems = [
  { label: "Home", path: "/", icon: <Home /> },
  { label: "Rooms", path: "/destination", icon: <Place /> },
  { label: "My Bookings", path: "/bookings", icon: <Bookmark /> },
  { label: "About", path: "/about", icon: <InfoIcon /> },
];

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
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn"); // Data saaf
    handleClose();
    history.push("/login"); // Login page par bhej do
    window.location.reload(); // Taaki navbar turant update ho jaye
  };

  // isLoggedIn ko define karein
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  const filteredNavItems = navItems.filter((item) => {
    // Agar item "My Bookings" hai aur user login NAHI hai, toh use nikaal do
    if (item.label === "My Bookings" && !isLoggedIn) {
      return false;
    }
    return true; // Baaki saare items dikhao
  });

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

  const moodColor = getMoodColor(mood);

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

  const handleNavigation = (path) => {
    history.push(path);
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
              minHeight: { xs: 60, md: 70 },
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
                spacing={{ md: 3, lg: 5 }}
                sx={{ mx: 3, flex: 1, justifyContent: "center" }}
              >
                {filteredNavItems.map((item) => (
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

            <Stack
              direction="row"
              spacing={{ xs: 1, sm: 1.5, md: 2 }} // Mobile pe gap kam, desktop pe zyada
              alignItems="center"
            >
              {!isLoggedIn ? (
                <>
                  {/* Log In Button */}
                  <Button
                    variant="outlined"
                    onClick={() => history.push("/auth", { mode: "login" })}
                    sx={{
                      color: getMoodColor(mood),
                      fontWeight: 700,
                      // Mobile par font size chhota (0.75rem), Desktop par (0.85rem)
                      fontSize: { xs: "0.75rem", sm: "0.8rem", md: "0.85rem" },
                      textTransform: "none",
                      borderRadius: "20px",
                      // Mobile par padding kam (px: 1.5), Desktop par (px: 3)
                      px: { xs: 1.5, sm: 2, md: 3 },
                      py: 0.6,
                      borderColor: alpha(getMoodColor(mood), 0.4),
                      minWidth: "auto",
                      "&:hover": {
                        borderColor: getMoodColor(mood),
                        bgcolor: alpha(getMoodColor(mood), 0.08),
                      },
                    }}
                  >
                    Log In
                  </Button>

                  {/* Sign Up Button */}
                  <Button
                    variant="contained"
                    onClick={() => history.push("/auth", { mode: "signup" })}
                    sx={{
                      background: `linear-gradient(45deg, ${getMoodColor(
                        mood
                      )}, ${getMoodColor(mood)}dd)`,
                      color: "white",
                      fontWeight: 700,
                      fontSize: { xs: "0.75rem", sm: "0.8rem", md: "0.85rem" },
                      textTransform: "none",
                      borderRadius: "20px",
                      px: { xs: 2, sm: 2.5, md: 3.5 },
                      py: 0.7,
                      boxShadow: `0 4px 12px ${alpha(getMoodColor(mood), 0.3)}`,
                      minWidth: "auto",
                      whiteSpace: "nowrap", // Isse text next line mein nahi jayega
                      "&:hover": {
                        boxShadow: `0 6px 15px ${alpha(
                          getMoodColor(mood),
                          0.5
                        )}`,
                        transform: "translateY(-1.5px)",
                      },
                    }}
                  >
                    Sign Up
                  </Button>
                </>
              ) : (
                // Logged In State (Logout + Avatar)
                <Stack direction="row" spacing={1.5} alignItems="center">
                  <Button
                    variant="contained"
                    onClick={handleLogout}
                    sx={{
                      fontSize: { xs: "0.7rem", md: "0.85rem" },
                      px: { xs: 1.5, md: 3 },
                      borderRadius: "20px",
                      textTransform: "none",
                      bgcolor: getMoodColor(mood),
                    }}
                  >
                    Logout
                  </Button>
                  <Avatar
                    sx={{
                      width: { xs: 32, md: 40 },
                      height: { xs: 32, md: 40 },
                    }}
                  >
                    <AccountCircle />
                  </Avatar>
                </Stack>
              )}
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
        <List sx={{ p: 2 }}>
          {filteredNavItems.map(
            (
              item // navItems ki jagah filteredNavItems use kiya
            ) => (
              // <ListItem
              //   button // Ye clickable banane ke liye
              //   key={item.label}

              //   onClick={() => {
              //     handleNavigation(item.path);
              //     setDrawerOpen(false); // Click karte hi drawer band ho jaye
              //   }}
              //   sx={{
              //     borderRadius: "12px",
              //     mb: 1,
              //     backgroundColor: isActivePath(item.path)
              //       ? alpha(getMoodColor(mood), 0.1)
              //       : "transparent",
              //     color: isActivePath(item.path)
              //       ? getMoodColor(mood)
              //       : "text.primary",
              //   }}
              // >
              //   {/* Icon bhi dikhate hain Drawer mein, mast lagega */}
              //   <ListItemIcon
              //     sx={{
              //       color: isActivePath(item.path)
              //         ? getMoodColor(mood)
              //         : "inherit",
              //     }}
              //   >
              //     {item.icon}
              //   </ListItemIcon>

              //   <ListItemText
              //     primary={
              //       <Typography
              //         sx={{ fontWeight: isActivePath(item.path) ? 700 : 600 }}
              //       >
              //         {item.label}
              //       </Typography>
              //     }
              //   />
              // </ListItem>
              <ListItem
                key={item.label}
                disablePadding // Ye add karo
              >
                <ListItemButton // ListItem ke andar ListItemButton use karo
                  onClick={() => {
                    handleNavigation(item.path);
                    setDrawerOpen(false);
                  }}
                  sx={{
                    borderRadius: "12px",
                    mb: 1,
                    backgroundColor: isActivePath(item.path)
                      ? alpha(getMoodColor(mood), 0.1)
                      : "transparent",
                    color: isActivePath(item.path)
                      ? getMoodColor(mood)
                      : "text.primary",
                  }}
                >
                  <ListItemIcon
                    sx={{
                      color: isActivePath(item.path)
                        ? getMoodColor(mood)
                        : "inherit",
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.label} />
                </ListItemButton>
              </ListItem>
            )
          )}
        </List>

        <Divider />

        {/* Niche wale Buttons ka logic (Sign Up / Logout) */}
        {/* <Box sx={{ p: 3 }}>
          {isLoggedIn ? (
            // Agar login hai toh seedha "My Profile" text button dikhao
            <Button
              onClick={() => {
                // Direct Logout Logic
                localStorage.removeItem("isLoggedIn");
                localStorage.removeItem("userData"); // Agar save kiya ho toh
                toast.info("Logged out successfully");
                history.push("/login");
                window.location.reload(); // Page refresh taaki Navbar update ho jaye
              }}
              sx={{
                color: moodColor,
                fontWeight: "700",
                textTransform: "none",
                fontSize: "1rem",
                border: `2px solid ${alpha(moodColor, 0.3)}`,
                borderRadius: "12px",
                px: 2,
                "&:hover": {
                  bgcolor: alpha(moodColor, 0.1),
                  borderColor: moodColor,
                },
              }}
            >
              My Profile
            </Button>
          ) : (
            // Agar login nahi hai toh Sign Up button
            <Button
              variant="contained" // "text" ki jagah "contained" zyada modern lagta hai
              onClick={() => history.push("/signup")}
              sx={{
                // Safety check: Agar moodColor na mile toh blue (#3b82f6) use karega
                bgcolor: moodColor || "#3b82f6",
                color: "#fff",
                borderRadius: "14px", // Thoda rounded corners for modern feel
                fontWeight: "700",
                px: 3, // Side padding thodi zyada
                py: 1,
                textTransform: "none", // Capital letters hatane ke liye
                fontSize: "0.95rem",
                letterSpacing: "0.5px",
                boxShadow: `0 8px 20px ${alpha(moodColor || "#3b82f6", 0.3)}`, // Button ke niche halka sa glow
                transition: "all 0.3s ease",
                "&:hover": {
                  bgcolor: moodColor || "#3b82f6",
                  transform: "translateY(-2px)", // Hover par halka sa upar uthega
                  boxShadow: `0 12px 25px ${alpha(
                    moodColor || "#3b82f6",
                    0.4
                  )}`,
                  filter: "brightness(1.1)",
                },
                "&:active": {
                  transform: "translateY(0)", // Click par wapas niche
                },
              }}
            >
              Sign Up
            </Button>
          )}
        </Box> */}
        <Box sx={{ p: 3, mt: "auto" }}>
          {isLoggedIn ? (
            /* --- MODERN MY PROFILE / LOGOUT BUTTON --- */
            <Button
              fullWidth
              onClick={() => {
                localStorage.removeItem("isLoggedIn");
                toast.info("Logged out safely!");
                history.push("/login");
                window.location.reload();
              }}
              sx={{
                py: 1.8,
                borderRadius: "16px",
                fontSize: "1rem",
                fontWeight: "700",
                textTransform: "none",
                color: moodColor || "#3b82f6",
                // Glass effect with Mood Border
                bgcolor: alpha(moodColor || "#3b82f6", 0.05),
                border: `2px solid ${alpha(moodColor || "#3b82f6", 0.2)}`,
                transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                display: "flex",
                gap: 1.5,
                "&:hover": {
                  bgcolor: alpha(moodColor || "#3b82f6", 0.1),
                  border: `2px solid ${moodColor || "#3b82f6"}`,
                  transform: "scale(1.02)",
                },
              }}
            >
              <Person sx={{ fontSize: 22 }} />
              My Profile (Logout)
            </Button>
          ) : (
            /* --- MODERN SIGN UP BUTTON --- */
            <Button
              fullWidth
              variant="contained"
              onClick={() => {
                history.push("/signup");
                setDrawerOpen(false);
              }}
              sx={{
                py: 2,
                borderRadius: "18px",
                fontSize: "1rem",
                fontWeight: "800",
                textTransform: "none",
                // Fancy Gradient Background
                background: `linear-gradient(135deg, ${
                  moodColor || "#3b82f6"
                } 0%, ${alpha(moodColor || "#3b82f6", 0.8)} 100%)`,
                color: "#fff",
                boxShadow: `0 10px 25px ${alpha(moodColor || "#3b82f6", 0.4)}`,
                transition: "all 0.3s ease-in-out",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: `0 15px 30px ${alpha(
                    moodColor || "#3b82f6",
                    0.5
                  )}`,
                  filter: "brightness(1.1)",
                },
                "&:active": {
                  transform: "scale(0.95)",
                },
              }}
            >
              Join StayFlow
            </Button>
          )}

          {/* Optional: Chota sa welcome note niche */}
          {!isLoggedIn && (
            <Typography
              variant="caption"
              sx={{
                display: "block",
                textAlign: "center",
                mt: 2,
                color: "text.secondary",
                fontWeight: 500,
              }}
            >
              Start your premium experience today
            </Typography>
          )}
        </Box>
      </Drawer>
    </>
  );
};

export default Navbar;
