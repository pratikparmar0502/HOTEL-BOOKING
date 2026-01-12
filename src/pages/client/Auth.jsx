import React, { useState, useContext, useEffect } from "react";
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
import {
  Visibility,
  VisibilityOff,
  Email,
  Lock,
  Person,
  ArrowForward,
} from "@mui/icons-material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useHistory, useLocation } from "react-router-dom";
import toast from "react-hot-toast";

import { MoodContext } from "../../context/MoodContext";
import api from "../../api/axios";

const Auth = ({ onLogin }) => {
  const { mood } = useContext(MoodContext) || { mood: "default" };
  const history = useHistory();
  const location = useLocation();

  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const modeFromNavbar = location.state?.mode;

    if (modeFromNavbar === "signup") {
      setIsLogin(false); // Signup form dikhao
    } else {
      setIsLogin(true); // Default ya "login" state par Login form dikhao
    }
  }, [location.state]);
  const moodColor =
    {
      nature: "#2e7d32",
      urban: "#6200ea",
      ocean: "#00bcd4",
      romantic: "#d81b60",
      royal: "#ffab00",
    }[mood] || "#1976d2";

  // --- FORMIK & YUP CONFIG ---
  const formik = useFormik({
    initialValues: { name: "", email: "", password: "" },
    validationSchema: Yup.object({
      name: !isLogin
        ? Yup.string().min(3, "Too short").required("Name is required")
        : Yup.string(),
      email: Yup.string().email("Invalid email").required("Email is required"),
      password: Yup.string()
        .min(6, "Min 6 characters")
        .required("Password is required"),
    }),
    onSubmit: async (values) => {
      const loadToast = toast.loading(
        isLogin ? "Signing in..." : "Creating account..."
      );
      try {
        // Sabse pehle saare users ko fetch karo check karne ke liye
        const res = await api.get("/Users"); //
        const users = res.data.Data || res.data.data || [];

        if (isLogin) {
          // --- LOGIN LOGIC ---
          const user = users.find(
            (u) => u.email === values.email && u.password === values.password
          );
          if (user) {
            localStorage.setItem("user", JSON.stringify(user));
            localStorage.setItem("isLoggedIn", "true");
            if (onLogin) onLogin(user); // State update here 🚀

            toast.success(`Welcome!`, { id: loadToast });

            if (values.email === "admin07@gmail.com") {
              history.push("/admin");
            } else {
              history.push("/");
            }
          } else {
            toast.error("Invalid credentials", { id: loadToast });
          }
        } else {
          const emailExists = users.some((u) => u.email === values.email);

          if (emailExists) {
            toast.error("Email already registered! Please login.", {
              id: loadToast,
            });
            return; // Yahan se function ruk jayega, POST nahi hoga
          }

          // SIGNUP
          if (values.email === "admin07@gmail.com") {
            toast.dismiss(loadToast);
            toast.error("This email is reserved for Admin!");
            return;
          }

          await api.post("/Users", {
            name: values.name,
            email: values.email,
            password: values.password,
          });

          toast.success("Account Created! Please login.", { id: loadToast });
          setTimeout(() => setIsLogin(true), 1500); // Switch to login UI
        }
      } catch (err) {
        toast.error("API Connection Failed", { id: loadToast });
      }
    },
  });

  // Toggle Function
  const handleToggle = () => {
    formik.resetForm();
    history.push(isLogin ? "/signup" : "/login");
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
                   linear-gradient(135deg, ${moodColor} 0%, #121212 100%)`,
      }}
    >
      <Container maxWidth="xs">
        <Zoom in timeout={500} key={isLogin}>
          <Paper
            elevation={0}
            sx={{
              p: 5,
              borderRadius: "32px",
              textAlign: "center",
              background: "rgba(255, 255, 255, 0.92)",
              backdropFilter: "blur(25px)",
              boxShadow: `0 25px 50px -12px rgba(0,0,0,0.5)`,
            }}
          >
            <Typography variant="h4" fontWeight="900" mb={1}>
              {isLogin ? "Welcome Back" : "Join StayFlow"}
            </Typography>
            <Typography variant="body2" color="text.secondary" mb={4}>
              {isLogin
                ? "Enter details to access your account"
                : "Sign up to start your journey"}
            </Typography>

            <form onSubmit={formik.handleSubmit}>
              <Stack spacing={2.5}>
                {!isLogin && (
                  <TextField
                    fullWidth
                    label="Full Name"
                    name="name"
                    {...formik.getFieldProps("name")}
                    error={formik.touched.name && !!formik.errors.name}
                    helperText={formik.touched.name && formik.errors.name}
                    InputProps={{
                      startAdornment: (
                        <Person sx={{ mr: 1, color: moodColor }} />
                      ),
                    }}
                  />
                )}
                <TextField
                  fullWidth
                  label="Email Address"
                  name="email"
                  {...formik.getFieldProps("email")}
                  error={formik.touched.email && !!formik.errors.email}
                  helperText={formik.touched.email && formik.errors.email}
                  InputProps={{
                    startAdornment: <Email sx={{ mr: 1, color: moodColor }} />,
                  }}
                />
                <TextField
                  fullWidth
                  label="Password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  {...formik.getFieldProps("password")}
                  error={formik.touched.password && !!formik.errors.password}
                  helperText={formik.touched.password && formik.errors.password}
                  InputProps={{
                    startAdornment: <Lock sx={{ mr: 1, color: moodColor }} />,
                    endAdornment: (
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    ),
                  }}
                />
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  size="large"
                  endIcon={<ArrowForward />}
                  sx={{
                    py: 1.8,
                    borderRadius: "12px",
                    bgcolor: moodColor,
                    fontWeight: "bold",
                    mt: 2,
                  }}
                >
                  {isLogin ? "Log In" : "Sign Up"}
                </Button>
              </Stack>
            </form>

            <Typography
              onClick={handleToggle}
              sx={{
                mt: 4,
                cursor: "pointer",
                fontWeight: 600,
                color: "text.secondary",
              }}
            >
              {isLogin
                ? "Don't have an account? "
                : "Already have an account? "}
              <Box
                component="span"
                sx={{ color: moodColor, fontWeight: "800" }}
              >
                {isLogin ? "Sign Up" : "Log In"}
              </Box>
            </Typography>
          </Paper>
        </Zoom>
      </Container>
    </Box>
  );
};

export default Auth;
