import React, { useState, useEffect } from "react";
import api from "../../api/axios";
import { toast, ToastContainer } from "react-toastify";
import {
  Box,
  Typography,
  Button,
  Stack,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Modal,
  MenuItem,
  TextField,
} from "@mui/material";
import { Delete as DeleteIcon, Add as AddIcon } from "@mui/icons-material";

const AdminBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  const initialValues = {
    hotelName: "",
    customerName: "",
    amount: "",
    date: "",
  };
  const [formData, setFormData] = useState(initialValues);

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    try {
      // Teeno data ek saath fetch karte hain 🚀
      const [bookRes, hotRes, custRes] = await Promise.all([
        api.get("/adminbookings"),
        api.get("/adminhotels"),
        api.get("/admincustomers"),
      ]);

      setBookings(bookRes.data.Data || bookRes.data.data || []);
      setHotels(hotRes.data.Data || hotRes.data.data || []);
      setCustomers(custRes.data.Data || custRes.data.data || []);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  const handleSave = () => {
    api
      .post("/adminbookings", formData)
      .then(() => {
        toast.success("Booking Successful!");
        setOpenModal(false);
        setFormData(initialValues);
        fetchAllData();
      })
      .catch(() => toast.error("Booking Failed!"));
  };

  const deleteBooking = (id) => {
    api.delete(`admin/bookings/${id}`).then(() => {
      toast.info("Booking Cancelled");
      fetchAllData();
    });
  };

  return (
    <Box sx={{ p: 3 }}>
      <Stack direction="row" justifyContent="space-between" mb={4}>
        <Typography variant="h4" fontWeight={800}>
          Manage Bookings
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setOpenModal(true)}
        >
          New Booking
        </Button>
      </Stack>

      <TableContainer component={Paper} sx={{ borderRadius: 3 }}>
        <Table>
          <TableHead sx={{ bgcolor: "#f8fafc" }}>
            <TableRow>
              <TableCell>Customer</TableCell>
              <TableCell>Hotel</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {bookings.map((row) => (
              <TableRow key={row._id}>
                <TableCell>{row.customerName}</TableCell>
                <TableCell>{row.hotelName}</TableCell>
                <TableCell>{row.date}</TableCell>
                <TableCell>${row.amount}</TableCell>
                <TableCell align="right">
                  <IconButton
                    onClick={() => deleteBooking(row._id)}
                    color="error"
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* MODAL FOR NEW BOOKING */}
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "white",
            p: 4,
            borderRadius: 4,
          }}
        >
          <Typography variant="h6" mb={3}>
            Create New Booking
          </Typography>
          <Stack spacing={2}>
            {/* HOTEL DROPDOWN */}
            <TextField
              select
              label="Select Hotel"
              value={formData.hotelName}
              onChange={(e) =>
                setFormData({ ...formData, hotelName: e.target.value })
              }
            >
              {hotels.map((h) => (
                <MenuItem key={h._id} value={h.name}>
                  {h.name}
                </MenuItem>
              ))}
            </TextField>

            {/* CUSTOMER DROPDOWN */}
            <TextField
              select
              label="Select Customer"
              value={formData.customerName}
              onChange={(e) =>
                setFormData({ ...formData, customerName: e.target.value })
              }
            >
              {customers.map((c) => (
                <MenuItem key={c._id} value={c.name}>
                  {c.name}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              label="Amount"
              type="number"
              value={formData.amount}
              onChange={(e) =>
                setFormData({ ...formData, amount: e.target.value })
              }
            />

            <TextField
              type="date"
              value={formData.date}
              onChange={(e) =>
                setFormData({ ...formData, date: e.target.value })
              }
            />

            <Button
              variant="contained"
              onClick={handleSave}
              fullWidth
              sx={{ py: 1.5 }}
            >
              Confirm Booking
            </Button>
          </Stack>
        </Box>
      </Modal>
      <ToastContainer position="bottom-right" />
    </Box>
  );
};

export default AdminBookings;
