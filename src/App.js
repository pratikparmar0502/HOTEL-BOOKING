import {
  BrowserRouter as Router,
  Route,
  Switch,
  useLocation,
  Redirect,
} from "react-router-dom";
import { CssBaseline, createTheme, ThemeProvider } from "@mui/material";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/client/Home";
import Destination from "./pages/client/Destination";
import Bookings from "./pages/client/Bookings";
import About from "./pages/client/About";
import { useState } from "react";
import Auth from "./pages/client/Auth";
import MoodProvider from "./context/MoodContext";
import AdminDashboard from "./pages/admin/AdminDashboard";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

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

// Helper component taaki useLocation Router ke andar rahe
const AppContent = ({ isLoggedIn, handleLogin }) => {
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith("/admin");

  return (
    <>
      {/* Navbar sirf tab dikhega jab admin page NA HO */}
      {!isAdminPage && <Navbar />}

      <Switch>
        <Route exact path="/admin" component={AdminDashboard} />

        <Route path={["/auth", "/login", "/signup"]}>
          <Auth onLogin={handleLogin} />
        </Route>

        <Route path="/bookings">
          {isLoggedIn ? <Bookings /> : <Redirect to="/auth" />}
        </Route>

        <Route path="/about" component={About} />
        <Route path="/destination" component={Destination} />
        <Route exact path="/" component={Home} />
      </Switch>

      {/* Footer sirf tab dikhega jab admin page NA HO */}
      {!isAdminPage && <Footer />}
    </>
  );
};

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );

  const handleLogin = () => {
    setIsLoggedIn(true);
    localStorage.setItem("isLoggedIn", "true");
  };

  return (
    <MoodProvider>
      <ThemeProvider theme={theme}>
        <Router>
          <CssBaseline />
          <AppContent isLoggedIn={isLoggedIn} handleLogin={handleLogin} />
          <ToastContainer position="top-right" autoClose={3000} />
        </Router>
      </ThemeProvider>
    </MoodProvider>
  );
}

export default App;
