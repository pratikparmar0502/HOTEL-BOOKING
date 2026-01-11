import React, { useState, useContext, useEffect } from "react";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Email from "@mui/icons-material/Email";
import Lock from "@mui/icons-material/Lock";
import Person from "@mui/icons-material/Person";
import ArrowForward from "@mui/icons-material/ArrowForward";
import {
  Box,
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Stack,
  IconButton,
  InputAdornment,
  alpha,
  Zoom,
} from "@mui/material";
import { MoodContext } from "../../context/MoodContext";

import { useHistory, useLocation } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import api from "../../api/axios";

const Auth = ({ onLogin }) => {
  const moodContext = useContext(MoodContext);
  const mood = moodContext ? moodContext.mood : "default";

  const history = useHistory();
  const location = useLocation();

  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  // Form Data State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    if (location.pathname === "/signup" || location.state?.mode === "signup") {
      setIsLogin(false);
    } else {
      setIsLogin(true);
    }
  }, [location]);

  const getMoodColor = (m) => {
    const colors = {
      nature: "#2e7d32",
      urban: "#6200ea",
      ocean: "#00bcd4",
      romantic: "#d81b60",
      royal: "#ffab00",
      default: "#1976d2",
    };
    return colors[m] || colors.default;
  };
  const moodColor = getMoodColor(mood);

  // Handle Input Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!formData.email || !formData.password) {
      toast.error("Please fill all fields ❌");
      return;
    }

    try {
      if (isLogin) {
        // --- LOGIN LOGIC (Using customers collection) ---
        const res = await api.get("/customers");
        const users = res.data.Data || res.data.data || [];

        const user = users.find(
          (u) => u.email === formData.email && u.password === formData.password
        );

        if (user) {
          // ✨ ADMIN CHECK
          if (
            user.email === "admin07@gmail.com" &&
            user.password === "admin071845"
          ) {
            localStorage.setItem("user", JSON.stringify(user));
            localStorage.setItem("isLoggedIn", "true");
            if (onLogin) onLogin();
            toast.success("Welcome Boss! Admin Access Granted. 👑");
            setTimeout(() => history.push("/admin"), 1000);
          } else {
            toast.info("Logged in as User.");
            setTimeout(() => history.push("/"), 1000);
          }
        } else {
          toast.error("Invalid Email or Password ❌");
        }
      } else {
        // --- SIGNUP LOGIC (Saving to customers) ---
        await api.post("/customers", formData);
        toast.success("Account Created! Please Login.");
        setIsLogin(true);
      }
    } catch (err) {
      console.error("Auth Error:", err);
      toast.error("API Error: Check if '/customers' exists.");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: `radial-gradient(circle at 20% 30%, ${alpha(
          moodColor,
          0.15
        )} 0%, transparent 40%),
                     radial-gradient(circle at 80% 70%, ${alpha(
                       moodColor,
                       0.15
                     )} 0%, transparent 40%),
                     linear-gradient(135deg, ${moodColor} 0%, ${alpha(
          moodColor,
          0.8
        )} 50%, #121212 100%)`,
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Container maxWidth="sm">
        <Zoom in timeout={500}>
          <Paper
            elevation={0}
            sx={{
              p: { xs: 4, md: 6 },
              borderRadius: "32px",
              backdropFilter: "blur(25px)",
              background: "rgba(255, 255, 255, 0.92)",
              border: `1px solid ${alpha("#fff", 0.5)}`,
              boxShadow: `0 25px 50px -12px rgba(0,0,0,0.5)`,
              textAlign: "center",
            }}
          >
            <Typography
              variant="h4"
              fontWeight="900"
              sx={{ color: "#1a1a1a", mb: 1 }}
            >
              {isLogin ? "Welcome Back" : "Join StayFlow"}
            </Typography>

            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ mb: 4, fontWeight: 500 }}
            >
              {isLogin
                ? "Glad to see you again! Please login."
                : "Create an account to start your journey."}
            </Typography>

            <Stack spacing={2}>
              {!isLogin && (
                <TextField
                  fullWidth
                  name="name"
                  label="Full Name"
                  value={formData.name}
                  onChange={handleChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Person sx={{ color: moodColor }} />
                      </InputAdornment>
                    ),
                    sx: { borderRadius: "12px" },
                  }}
                />
              )}

              <TextField
                fullWidth
                name="email"
                label="Email Address"
                value={formData.email}
                onChange={handleChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Email sx={{ color: moodColor }} />
                    </InputAdornment>
                  ),
                  sx: { borderRadius: "12px" },
                }}
              />

              <TextField
                fullWidth
                name="password"
                type={showPassword ? "text" : "password"}
                label="Password"
                value={formData.password}
                onChange={handleChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock sx={{ color: moodColor }} />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                  sx: { borderRadius: "12px" },
                }}
              />

              <Button
                variant="contained"
                fullWidth
                size="large"
                onClick={handleSubmit}
                endIcon={<ArrowForward />}
                sx={{
                  py: 1.8,
                  borderRadius: "12px",
                  bgcolor: moodColor,
                  fontWeight: "bold",
                  fontSize: "1rem",
                  textTransform: "none",
                  boxShadow: `0 8px 20px ${alpha(moodColor, 0.3)}`,
                  "&:hover": {
                    bgcolor: moodColor,
                    transform: "translateY(-2px)",
                    boxShadow: `0 12px 25px ${alpha(moodColor, 0.4)}`,
                  },
                }}
              >
                {isLogin ? "Log In" : "Create Account"}
              </Button>
            </Stack>

            <Box
              sx={{ mt: 4, cursor: "pointer" }}
              onClick={() => setIsLogin(!isLogin)}
            >
              <Typography
                variant="body2"
                sx={{ fontWeight: 600, color: "text.secondary" }}
              >
                {isLogin
                  ? "Don't have an account? "
                  : "Already have an account? "}
                <Box
                  component="span"
                  sx={{ color: moodColor, fontWeight: "800", ml: 0.5 }}
                >
                  {isLogin ? "Sign Up" : "Log In"}
                </Box>
              </Typography>
            </Box>
          </Paper>
        </Zoom>
      </Container>
      <ToastContainer position="top-center" />
    </Box>
  );
};

export default Auth;
