import React, { useState, useEffect } from "react";
import api from "../../api/axios";
import { toast, ToastContainer } from "react-toastify";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import StarIcon from "@mui/icons-material/Star";
import {
  Box,
  Typography,
  Button,
  TextField,
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
  Chip,
} from "@mui/material";

const AdminHotel = () => {
  const [list, setList] = useState([]);
  const [editId, setEditId] = useState(null);
  const [search, setSearch] = useState("");
  const [openModal, setOpenModal] = useState(false);

  const initialValues = {
    name: "",
    loc: "",
    rate: "",
    price: "",
    status: true,
  };
  const [formData, setFormData] = useState(initialValues);

  useEffect(() => {
    getData();
  }, []);

  // 1. GET DATA (API se hotels lana)
  const getData = () => {
    api
      .get("/hotels")
      .then((res) => {
        console.log("Api data: ", res.data.Data);
        setList(res.data.Data);
      })
      .catch((err) => console.log("Fetch Error:", err));
  };

  const handleSubmit = () => {
    const payload = {
      name: formData.name,
      loc: formData.loc,
      rate: Number(formData.rate),
      price: Number(formData.price),
      status: formData.status,
    };

    if (editId != null) {
      // 2. Sirf payload bhejo, pura formData nahi (kyunki formData mein _id hota hai)
      api
        .patch(`/hotels/${editId}`, payload)
        .then(() => {
          toast.success("Hotel updated successfully!");
          finalize();
        })
        .catch((err) => {
          console.log("Patch Error Details:", err.response?.data);
          toast.error("Update failed: Key mismatch or Server Error");
        });
    } else {
      api
        .post("/hotels", payload)
        .then(() => {
          toast.success("Hotel added successfully!");
          finalize();
        })
        .catch(() => toast.error("Add failed"));
    }
  };

  const finalize = () => {
    setEditId(null);
    setFormData(initialValues);
    setOpenModal(false);
    getData();
  };

  // 3. EDIT & DELETE
  const editBtn = (item) => {
    setEditId(item._id); // TechSnack _id use karta hai
    setFormData(item);
    setOpenModal(true);
  };

  const deleteBtn = (id) => {
    if (window.confirm("Are you sure?")) {
      api
        .delete(`/hotels/${id}`)
        .then(() => {
          toast.success("Hotel deleted!");
          getData();
        })
        .catch(() => toast.error("Delete failed"));
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mb={4}
      >
        <Typography variant="h4" fontWeight={800} color="#1e293b">
          Manage Hotels
        </Typography>
        <Stack direction="row" spacing={2}>
          <TextField
            placeholder="Search hotels..."
            size="small"
            onChange={(e) => setSearch(e.target.value)}
            sx={{ bgcolor: "white", borderRadius: 1 }}
          />
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => {
              setEditId(null);
              setFormData(initialValues);
              setOpenModal(true);
            }}
            sx={{ borderRadius: 2 }}
          >
            Add Hotel
          </Button>
        </Stack>
      </Stack>

      <TableContainer
        component={Paper}
        sx={{ borderRadius: 3, boxShadow: "0 4px 20px rgba(0,0,0,0.05)" }}
      >
        <Table>
          <TableHead sx={{ bgcolor: "#f8fafc" }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 700 }}>Hotel Name</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Location</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Rating</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Status</TableCell>
              <TableCell align="right" sx={{ fontWeight: 700 }}>
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {list
              .filter((i) =>
                i.name?.toLowerCase().includes(search.toLowerCase())
              )
              .map((row) => (
                <TableRow key={row._id} hover>
                  <TableCell>
                    <Typography fontWeight={600}>{row.name}</Typography>
                  </TableCell>
                  <TableCell>{row.loc}</TableCell>
                  <TableCell>
                    <Stack direction="row" alignItems="center" spacing={0.5}>
                      <StarIcon sx={{ color: "#f59e0b", fontSize: 18 }} />
                      <Typography variant="body2">{row.rate}</Typography>
                    </Stack>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={row.status ? "Active" : "Inactive"}
                      color={row.status ? "success" : "default"}
                      size="small"
                    />
                  </TableCell>
                  <TableCell align="right">
                    <IconButton onClick={() => editBtn(row)} color="primary">
                      <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton
                      onClick={() => deleteBtn(row._id)}
                      color="error"
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* MODAL FOR ADD/EDIT */}
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            borderRadius: 4,
            p: 4,
            boxShadow: 24,
          }}
        >
          <Typography variant="h6" fontWeight={700} mb={3}>
            {editId ? "Update Hotel" : "Register New Hotel"}
          </Typography>
          <Stack spacing={2.5}>
            <TextField
              label="Hotel Name"
              fullWidth
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
            <TextField
              label="Location"
              fullWidth
              value={formData.loc}
              onChange={(e) =>
                setFormData({ ...formData, loc: e.target.value })
              }
            />
            <TextField
              label="Rating"
              type="number"
              fullWidth
              value={formData.rate}
              onChange={(e) =>
                setFormData({ ...formData, rate: e.target.value })
              }
            />
            <TextField
              label="Price per Night"
              type="number"
              fullWidth
              value={formData.price}
              onChange={(e) =>
                setFormData({ ...formData, price: e.target.value })
              }
            />
            <Button
              variant="contained"
              size="large"
              onClick={handleSubmit}
              fullWidth
              sx={{ mt: 2, borderRadius: 2 }}
            >
              {editId ? "Update Details" : "Save Hotel"}
            </Button>
          </Stack>
        </Box>
      </Modal>
      <ToastContainer position="bottom-right" />
    </Box>
  );
};

export default AdminHotel;
