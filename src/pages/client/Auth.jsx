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
  Fade,
  Zoom,
} from "@mui/material";
import {
  Visibility,
  VisibilityOff,
  Email,
  Lock,
  Person,
  ArrowForward,
  Google,
  Facebook,
} from "@mui/icons-material";
import { MoodContext } from "../../context/MoodContext";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";

const Auth = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const { mood } = useContext(MoodContext);
  const history = useHistory();

  // Mood Color Logic
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

  const handleSubmit = () => {
    toast.dismiss();

    onLogin(); // App.js wala logic chalao

    // Ek chota sa delay de kar toast dikhao taaki page change hone par crash na ho
    setTimeout(() => {
      toast.success(`Welcome to StayFlow! Let's explore ${mood} vibes.`, {
        toastId: "login-success", // Unique ID taaki duplicate na bane
      });
    }, 100);
    localStorage.setItem("isLoggedIn", "true");
    history.push("/");
  };

  return (
    <Box
      sx={{
        minHeight: "90vh",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        // Ye hai wo "Piche ka blue" magic
        background: `linear-gradient(135deg, ${moodColor} 0%, ${alpha(
          moodColor,
          0.8
        )} 50%, #000000 100%)`,
        backgroundSize: "cover",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Decorative Circles in Background (Glow Effect) */}
      <Box
        sx={{
          position: "absolute",
          top: -100,
          left: -100,
          width: 400,
          height: 400,
          borderRadius: "50%",
          background: alpha("#fff", 0.1),
          filter: "blur(80px)",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          bottom: -50,
          right: -50,
          width: 300,
          height: 300,
          borderRadius: "50%",
          background: alpha(moodColor, 0.4),
          filter: "blur(60px)",
        }}
      />

      <Container maxWidth="sm">
        <Zoom in timeout={600}>
          <Paper
            elevation={24}
            sx={{
              p: { xs: 3, md: 5 },
              borderRadius: "40px",
              // The Glassmorphism Effect
              backdropFilter: "blur(20px)",
              background: "rgba(255, 255, 255, 0.9)",
              border: `1px solid ${alpha(moodColor, 0.3)}`,
              textAlign: "center",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Top Color Bar */}
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: "8px",
                background: `linear-gradient(90deg, ${moodColor}, ${alpha(
                  moodColor,
                  0.5
                )})`,
              }}
            />

            <Typography
              variant="h3"
              fontWeight="900"
              sx={{
                color: moodColor,
                mb: 1,
                letterSpacing: "-1px",
                textShadow: `0 10px 20px ${alpha(moodColor, 0.2)}`,
              }}
            >
              {isLogin ? "Welcome Back" : "Create Account"}
            </Typography>

            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ mb: 4, fontWeight: 500 }}
            >
              {isLogin
                ? "Enter your credentials to access your dashboard."
                : "Join us and start your premium journey today."}
            </Typography>

            <Stack spacing={2.5}>
              {!isLogin && (
                <TextField
                  fullWidth
                  label="Full Name"
                  variant="outlined"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Person sx={{ color: moodColor }} />
                      </InputAdornment>
                    ),
                    sx: { borderRadius: "15px" },
                  }}
                />
              )}

              <TextField
                fullWidth
                label="Email Address"
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Email sx={{ color: moodColor }} />
                    </InputAdornment>
                  ),
                  sx: { borderRadius: "15px" },
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
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                  sx: { borderRadius: "15px" },
                }}
              />

              <Button
                variant="contained"
                size="large"
                onClick={handleSubmit}
                endIcon={<ArrowForward />}
                sx={{
                  py: 1.8,
                  mt: 2,
                  borderRadius: "15px",
                  bgcolor: moodColor,
                  fontWeight: "800",
                  fontSize: "1.1rem",
                  boxShadow: `0 10px 20px ${alpha(moodColor, 0.4)}`,
                  transition: "all 0.3s ease",
                  "&:hover": {
                    bgcolor: moodColor,
                    transform: "translateY(-3px)",
                    boxShadow: `0 15px 30px ${alpha(moodColor, 0.5)}`,
                  },
                }}
              >
                {isLogin ? "Sign Up" : "Get Started"}
              </Button>
            </Stack>

            {/* Social Login Dummy Buttons for Pro Look */}
            {/* <Box sx={{ mt: 4 }}>
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ display: "block", mb: 2 }}
              >
                — OR CONTINUE WITH —
              </Typography>
              <Stack direction="row" spacing={2} justifyContent="center">
                <IconButton sx={{ border: "1px solid #ddd" }}>
                  <Google sx={{ color: "#DB4437" }} />
                </IconButton>
                <IconButton sx={{ border: "1px solid #ddd" }}>
                  <Facebook sx={{ color: "#4267B2" }} />
                </IconButton>
              </Stack>
            </Box> */}

            <Box
              sx={{
                mt: 4,
                p: 2,
                bgcolor: alpha(moodColor, 0.05),
                borderRadius: "15px",
                cursor: "pointer",
              }}
              onClick={() => setIsLogin(!isLogin)}
            >
              <Typography
                variant="body2"
                sx={{ fontWeight: 600, color: "text.secondary" }}
              >
                {isLogin ? "New to StayFlow? " : "Already a member? "}
                <Box
                  component="span"
                  sx={{ color: moodColor, fontWeight: "800" }}
                >
                  {isLogin ? "Create Account" : "Login Here"}
                </Box>
              </Typography>
            </Box>
          </Paper>
        </Zoom>
      </Container>
    </Box>
  );
};

export default Auth;
