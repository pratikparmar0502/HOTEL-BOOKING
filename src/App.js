import {
  BrowserRouter as Router,
  Route,
  Switch,
  useLocation,
  Redirect,
} from "react-router-dom";
import { CssBaseline, createTheme, ThemeProvider } from "@mui/material";
import Home from "./pages/client/Home";
import Destination from "./pages/client/Destination";
import Bookings from "./pages/client/Bookings";
import About from "./pages/client/About";
import { useEffect, useState } from "react";
import Auth from "./pages/client/Auth";
import MoodProvider from "./context/MoodContext";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminBooking from "./pages/admin/AdminBooking";
import AdminLayout from "./pages/admin/AdminLayout";
import AdminHotel from "./pages/admin/AdminHotel";
import AdminCustomers from "./pages/admin/AdminCustomers";
import toast, { Toaster } from "react-hot-toast";

const theme = createTheme({
  typography: {
    fontFamily: "'Inter', sans-serif",
    h1: { fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800 },
    h2: { fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800 },
    h3: { fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800 },
    h4: { fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800 },
    h5: { fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800 },
    h6: { fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800 },
    button: {
      fontFamily: "'Inter', sans-serif",
      fontWeight: 700,
      textTransform: "none",
    },
  },
  shape: {
    borderRadius: 12,
  },
});

// 1. Yahan handleLogout ko add kiya
const AppContent = ({ isLoggedIn, isAdmin, handleLogin, handleLogout }) => {
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith("/admin");

  return (
    <>
      {!isAdminPage && (
        <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      )}

      <Switch>
        <Route path="/admin">
          {isLoggedIn && isAdmin ? (
            <AdminLayout onLogout={handleLogout}>
              <Switch>
                <Route exact path="/admin" component={AdminDashboard} />
                <Route path="/admin/adminhotel" component={AdminHotel} />
                <Route path="/admin/adminbooking" component={AdminBooking} />
                <Route
                  path="/admin/admincustomers"
                  component={AdminCustomers}
                />
              </Switch>
            </AdminLayout>
          ) : (
            <Redirect to={isLoggedIn ? "/" : "/auth"} />
          )}
        </Route>
        <Route path={["/auth", "/login", "/signup"]}>
          {isLoggedIn ? (
            <Redirect to={isAdmin ? "/admin" : "/"} />
          ) : (
            <Auth onLogin={handleLogin} />
          )}
        </Route>
        <Route path="/bookings">
          {isLoggedIn ? <Bookings /> : <Redirect to="/auth" />}
        </Route>
        <Route path="/about" component={About} />
        <Route path="/destination" component={Destination} />
        <Route exact path="/" component={Home} />
      </Switch>

      {!isAdminPage && <Footer />}
    </>
  );
};

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true",
  );

  const [isAdmin, setIsAdmin] = useState(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    return user?.email === "admin07@gmail.com";
  });

  const handleLogin = (user) => {
    setIsLoggedIn(true);
    if (user && user.email === "admin07@gmail.com") {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
    setIsAdmin(false);
    toast.success("Logged out successfully!", {
      duration: 3000,
      position: "top-center",
    });
  };

  // App.js ke andar App function mein add karein
  useEffect(() => {
    // Check if this is a fresh tab session
    const sessionActive = sessionStorage.getItem("sessionActive");

    if (!sessionActive) {
      // Agar session active nahi hai (matlab browser/tab naya khula hai)
      // Toh local storage se purana login data uda do
      localStorage.removeItem("user");
      localStorage.removeItem("isLoggedIn");
      setIsLoggedIn(false);
      setIsAdmin(false);

      // Ab is session ko active mark kar do taaki page refresh par logout na ho
      sessionStorage.setItem("sessionActive", "true");
    }
  }, []);

  return (
    <MoodProvider>
      <ThemeProvider theme={theme}>
        <Router>
          <CssBaseline />
          <Toaster position="top-right" reverseOrder={false} />
          <AppContent
            isLoggedIn={isLoggedIn}
            isAdmin={isAdmin}
            handleLogin={handleLogin}
            handleLogout={handleLogout}
          />{" "}
        </Router>
      </ThemeProvider>
    </MoodProvider>
  );
}

export default App;
