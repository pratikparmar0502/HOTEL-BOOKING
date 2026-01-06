import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { CssBaseline, createTheme, ThemeProvider } from "@mui/material";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/client/Home";
import Layout from "./components/layout/Layout";
import Destination from "./pages/client/Destination";
import Bookings from "./pages/client/Bookings";
import About from "./pages/client/About";
import { useState } from "react";

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

function App() {

  const [allBookings, setAllBookings] = useState([]);

  const addNewBooking = (hotelData) => {
    setAllBookings([...allBookings, hotelData]);
  };

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <CssBaseline />
        <Layout>
          <Switch>
            <Route path="/about">
              <About />
            </Route>

            <Route path="/bookings">
              <Bookings />
            </Route>

            <Route path="/destination">
              <Destination />
            </Route>

            <Route exact path="/">
              <Home />
            </Route>
          </Switch>
        </Layout>
      </Router>
      <ToastContainer position="top-right" autoClose={3000} />
    </ThemeProvider>
  );
}

export default App;
