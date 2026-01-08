import React, { useState, useContext } from "react";
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
} from "@mui/material";
import {
  Visibility,
  VisibilityOff,
  Email,
  Lock,
  Person,
} from "@mui/icons-material";
import { MoodContext } from "../../context/MoodContext";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";

const Auth = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const { mood } = useContext(MoodContext);
  const history = useHistory();

  const handleSubmit = () => {
    // 1. Yahan onLogin function call hoga jo App.js mein hai
    onLogin();

    // 2. Success message dikhao
    toast.success("Welcome to StayFlow!");

    // 3. Home page par bhej do
    history.push("/");
  };

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

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: `radial-gradient(circle at center, ${alpha(
          moodColor,
          0.15
        )} 0%, #f5f5f5 100%)`,
        pt: 8,
      }}
    >
      <Container maxWidth="xs">
        <Paper
          elevation={0}
          sx={{
            p: 4,
            borderRadius: "32px",
            backdropFilter: "blur(20px)",
            background: "rgba(255, 255, 255, 0.8)",
            border: `1px solid ${alpha(moodColor, 0.2)}`,
            boxShadow: `0 20px 60px ${alpha(moodColor, 0.1)}`,
            textAlign: "center",
          }}
        >
          <Typography
            variant="h4"
            fontWeight="900"
            sx={{ color: moodColor, mb: 1 }}
          >
            {isLogin ? "Welcome Back!" : "Join StayFlow"}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
            {isLogin
              ? "Enter your details to continue your journey"
              : "Create an account to start booking"}
          </Typography>

          <Stack spacing={3}>
            {!isLogin && (
              <TextField
                fullWidth
                label="Full Name"
                placeholder="John Doe"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Person sx={{ color: moodColor }} />
                    </InputAdornment>
                  ),
                }}
              />
            )}
            <TextField
              fullWidth
              label="Email Address"
              placeholder="example@mail.com"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Email sx={{ color: moodColor }} />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              fullWidth
              type={showPassword ? "text" : "password"}
              label="Password"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock sx={{ color: moodColor }} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Button
              variant="contained"
              fullWidth
              onClick={handleSubmit} // Abhi ke liye seedha home par
              sx={{
                py: 1.5,
                borderRadius: "15px",
                bgcolor: moodColor,
                fontWeight: "bold",
                fontSize: "1rem",
                "&:hover": { bgcolor: moodColor, filter: "brightness(0.9)" },
              }}
            >
              {isLogin ? "Login" : "Sign Up"}
            </Button>
          </Stack>

          <Typography variant="body2" sx={{ mt: 3 }}>
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <Box
              component="span"
              onClick={() => setIsLogin(!isLogin)}
              sx={{
                color: moodColor,
                fontWeight: "bold",
                cursor: "pointer",
                "&:hover": { textDecoration: "underline" },
              }}
            >
              {isLogin ? "Sign Up" : "Login"}
            </Box>
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
};

export default Auth;
