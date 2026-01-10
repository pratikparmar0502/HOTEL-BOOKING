import React, { useState, useContext, useEffect } from "react";
// import AccountCircle from "@mui/icons-material/AccountCircle";
// import Logout from "@mui/icons-material/Logout";
// Agar Google/Facebook icons use kar rahe ho toh:
// import Google from "@mui/icons-material/Google";
// import Facebook from "@mui/icons-material/Facebook";
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
import { useHistory, useLocation } from "react-router-dom"; // location add kiya
import { toast } from "react-toastify";

const Auth = ({ onLogin }) => {
  const { mood } = useContext(MoodContext);
  const history = useHistory();
  const location = useLocation(); // URL se data lene ke liye

  // Navbar ke buttons ke hisaab se state set karna
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  // Jab bhi URL change ho (e.g. state: {mode: 'signup'}), ye check karega
  useEffect(() => {
    if (location.state?.mode === "signup") {
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

  const handleSubmit = () => {
    toast.dismiss();

    localStorage.setItem("isLoggedIn", "true");

    onLogin();

    setTimeout(() => {
      toast.success(`Welcome back! Exploring ${mood} stays.`, {
        icon: "🚀",
        style: { borderRadius: "10px" },
      });
    }, 100);

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
      {/* Background Glows */}
      <Box
        sx={{
          position: "absolute",
          top: -100,
          left: -100,
          width: 500,
          height: 500,
          bgcolor: alpha("#fff", 0.05),
          borderRadius: "50%",
          filter: "blur(100px)",
        }}
      />

      <Container maxWidth="sm">
        <Zoom in timeout={500}>
          <Paper
            elevation={0} // Elevation hata kar custom shadow lagayi
            sx={{
              p: { xs: 4, md: 6 },
              borderRadius: "32px",
              backdropFilter: "blur(25px)",
              background: "rgba(255, 255, 255, 0.92)",
              border: `1px solid ${alpha("#fff", 0.5)}`,
              boxShadow: `0 25px 50px -12px rgba(0,0,0,0.5)`,
              textAlign: "center",
              position: "relative",
            }}
          >
            {/* Logo or Small Icon placeholder */}
            {/* <Box
              sx={{
                width: 60,
                height: 60,
                bgcolor: alpha(moodColor, 0.1),
                borderRadius: "16px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 24px",
              }}
            >
              <Lock sx={{ color: moodColor, fontSize: 30 }} />
            </Box> */}

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
                  label="Full Name"
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
                label="Email Address"
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
              sx={{ mt: 4, cursor: "pointer", "&:hover opacity": 0.8 }}
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
    </Box>
  );
};

export default Auth;
