import React, { useState, useEffect } from "react";
import api from "../../api/axios";
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
import toast from "react-hot-toast";

const AdminHotel = () => {
  const [list, setList] = useState([]);
  const [editId, setEditId] = useState(null);
  const [search, setSearch] = useState("");
  const [openModal, setOpenModal] = useState(false);

  // POSTMAN ki key "location" hai, toh hum yahan bhi wahi rakhenge taaki confusion na ho
  const initialValues = {
    name: "",
    location: "",
    rate: "",
    price: "",
    status: true,
    imageFile: null, // File ke liye extra field
  };
  const [formData, setFormData] = useState(initialValues);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    api
      .get("/HotelsData") // Pehle /Hotels tha
      .then((res) => setList(res.data.Data || []))
      .catch((err) => console.log("Fetch Error:", err));
  };

  const handleSubmit = () => {
    const formDataObj = new FormData();
    formDataObj.append("name", formData.name);
    formDataObj.append("location", formData.location);
    formDataObj.append("price", formData.price);
    formDataObj.append("rate", formData.rate);
    formDataObj.append("status", formData.status);
    formDataObj.append("Authorization", "ngXSnLPrB0vbLvNA");

    if (formData.imageFile) {
      formDataObj.append("image", formData.imageFile);
    }

    // Sahi endpoint: /HotelsData
    const url = editId ? `/HotelsData/${editId}` : "/HotelsData";

    api[editId ? "patch" : "post"](url, formDataObj)
      .then(() => {
        toast.success("Success!");
        finalize();
      })
      .catch((err) => toast.error("Key mismatch on HotelsData"));
  };

  const finalize = () => {
    setEditId(null);
    setFormData(initialValues);
    setOpenModal(false);
    getData();
  };

  const editBtn = (item) => {
    setEditId(item._id);
    setFormData({ ...item, location: item.location });
    setOpenModal(true);
  };

  const deleteBtn = (id) => {
    if (window.confirm("Are you sure?")) {
      api
        .delete(`/Hotels/${id}`)
        .then(() => {
          toast.success("Deleted Successfully!");
          getData();
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        })
        .catch(() => toast.error("Delete failed"));
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Stack direction="row" justifyContent="space-between" mb={4}>
        <Typography variant="h4" fontWeight={800}>
          Manage Hotels
        </Typography>
        <Stack direction="row" spacing={2}>
          <TextField
            placeholder="Search..."
            size="small"
            onChange={(e) => setSearch(e.target.value)}
          />
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => {
              setEditId(null);
              setFormData(initialValues);
              setOpenModal(true);
            }}
          >
            Add Hotel
          </Button>
        </Stack>
      </Stack>

      <TableContainer component={Paper} sx={{ borderRadius: 3 }}>
        <Table>
          <TableHead sx={{ bgcolor: "#f8fafc" }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 700 }}>Hotel Name</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Location</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Price</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Rating</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Image</TableCell>
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
                  <TableCell>{row.location || row.loc}</TableCell>
                  <TableCell>₹{row.price}</TableCell>
                  <TableCell>
                    <Stack direction="row" alignItems="center" spacing={0.5}>
                      <StarIcon sx={{ color: "#f59e0b", fontSize: 18 }} />
                      <Typography>{row.rate}</Typography>
                    </Stack>
                  </TableCell>
                  <TableCell>
                    {row.image ? (
                      <Box
                        component="img"
                        src={row.image}
                        alt={row.name}
                        sx={{
                          width: 50,
                          height: 50,
                          borderRadius: "8px",
                          objectFit: "cover",
                        }}
                      />
                    ) : (
                      <Typography variant="caption">No Image</Typography>
                    )}
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
          }}
        >
          <Typography variant="h6" fontWeight={700} mb={3}>
            {editId ? "Update Hotel" : "Add Hotel"}
          </Typography>
          <Stack spacing={2}>
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
              value={formData.location}
              onChange={(e) =>
                setFormData({ ...formData, location: e.target.value })
              }
            />
            <TextField
              label="Price"
              type="number"
              fullWidth
              value={formData.price}
              onChange={(e) =>
                setFormData({ ...formData, price: e.target.value })
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

            <Typography variant="caption">Upload Hotel Image</Typography>
            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                setFormData({ ...formData, imageFile: e.target.files[0] })
              }
            />

            <Button
              variant="contained"
              size="large"
              onClick={handleSubmit}
              fullWidth
              sx={{ mt: 2 }}
            >
              {editId ? "Update" : "Save"}
            </Button>
          </Stack>
        </Box>
      </Modal>
    </Box>
  );
};

export default AdminHotel;
