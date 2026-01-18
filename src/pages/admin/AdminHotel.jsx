import React, { useEffect, useState } from "react";
import axios from "axios";
import { Formik, Form, Field, validateYupSchema } from "formik"; // Formik import
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import StarIcon from "@mui/icons-material/Star";
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
  TextField,
} from "@mui/material";
import toast from "react-hot-toast"; // Ya react-toastify jo bhi tum use kar rahe ho
import api from "../../api/axios";
import * as Yup from "yup";

const AdminHotel = () => {
  const [list, setList] = useState([]);
  const [editData, setEditData] = useState(null); // Edit ke liye object
  const [openModal, setOpenModal] = useState(false);
  const [search, setSearch] = useState("");

  const validationSchema = Yup.object({
    name: Yup.string().required("Hotel name is required"),
    location: Yup.string().required("Location is required"),
    price: Yup.number().positive().required("Price is required"),
  });

  // Endpoint aur Token constant
  const API_URL = "https://generateapi.techsnack.online/api/HotelDatas";
  const TOKEN = "ngXSnLPrB0vbLvNA"; // Tumhari nayi key

  // Initial Values for Formik
  const initialValues = {
    name: "",
    location: "",
    price: "",
    status: "Available",
    image: null,
  };

  useEffect(() => {
    getData();
  }, []);

  // 1. GET DATA
  const getData = () => {
    console.log("Fetching data from:", "/HotelDatas");
    // Ab direct 'api' use karo, ye headers khud bhejega
    api
      .get("/HotelDatas")
      .then((res) => {
        console.log("GET Response:", res.data);
        setList(res.data.Data || []);
      })
      .catch((err) => {
        console.log("GET Error:", err.response?.data || err.message);
      });
  };

  // 2. SUBMIT HANDLE (Formik Logic)
  const handleSubmit = (values, { resetForm }) => {
    const toastId = toast.loading("Processing...");

    // 1. FormData banayein
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("location", values.location);
    formData.append("price", values.price);
    formData.append("status", values.status);
    formData.append("category", values.category);

    // Image logic
    if (values.image instanceof File) {
      formData.append("image", values.image);
    }

    const url = editData
      ? `/HotelDatas/${editData._id}?Authorization=${TOKEN}`
      : `/HotelDatas?Authorization=${TOKEN}`;

    api({
      method: editData ? "patch" : "post",
      url: url,
      data: formData,
      // Note: Yahan Content-Type set MAT karna, Axios automatically boundary set karega
    })
      .then(() => {
        toast.success(editData ? "Updated!" : "Added!", { id: toastId });
        finalize(resetForm);
      })
      .catch((err) => {
        console.error("Error Response:", err.response?.data);
        // Agar abhi bhi mismatch aaye toh check karein dashboard mein key reset toh nahi hui
        toast.error(err.response?.data?.Message || "Key Mismatch", {
          id: toastId,
        });
      });
  };

  const finalize = (resetForm) => {
    setEditData(null);
    setOpenModal(false);
    getData();
    if (resetForm) resetForm();
  };

  // 3. EDIT & DELETE ACTIONS
  const handleEdit = (item) => {
    setEditData(item);
    setOpenModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this hotel?")) {
      // API instance use kar rahe hain toh sirf endpoint chahiye, poora URL nahi
      api
        .delete(`/HotelDatas/${id}`)
        .then(() => {
          toast.success("Deleted Successfully!");
          getData(); // List refresh karo
        })
        .catch((err) => {
          console.log("Delete Error:", err.response?.data);
          toast.error("Delete Failed");
        });
    }
  };
  return (
    <Box sx={{ p: 3 }}>
      {/* Header Section */}
      <Stack direction="row" justifyContent="space-between" mb={4}>
        <Typography variant="h4" fontWeight={800}>
          Manage Hotels
        </Typography>
        <Stack direction="row" spacing={2}>
          <TextField
            size="small"
            placeholder="Search..."
            onChange={(e) => setSearch(e.target.value)}
          />
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => {
              setEditData(null);
              setOpenModal(true);
            }}
          >
            Add Hotel
          </Button>
        </Stack>
      </Stack>

      {/* Table Section */}
      <TableContainer component={Paper} sx={{ borderRadius: 3 }}>
        <Table>
          <TableHead sx={{ bgcolor: "#f8fafc" }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 700 }}>Hotel Name</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Location</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Price</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Image</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Category</TableCell>
              <TableCell align="right" sx={{ fontWeight: 700 }}>
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {list
              .filter((i) =>
                i.name?.toLowerCase().includes(search.toLowerCase()),
              )
              .map((row) => (
                <TableRow key={row._id} hover>
                  <TableCell>
                    <Typography fontWeight={600}>{row.name}</Typography>
                  </TableCell>
                  <TableCell>{row.location}</TableCell>
                  <TableCell>$ {row.price}</TableCell>
                  <TableCell>
                    {row.image && (
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
                    )}
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="caption"
                      sx={{
                        bgcolor: "#f1f5f9",
                        px: 1.5,
                        py: 0.5,
                        borderRadius: "20px",
                        textTransform: "capitalize",
                      }}
                    >
                      {row.category || "N/A"}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Stack
                      direction="row"
                      spacing={1.5}
                      justifyContent="flex-end"
                    >
                      {/* EDIT BUTTON */}
                      <IconButton
                        onClick={() => handleEdit(row)}
                        sx={{
                          bgcolor: "#e0f2fe", // Very light blue
                          color: "#0284c7", // Dark blue
                          borderRadius: "10px", // Thoda square-round mix
                          "&:hover": {
                            bgcolor: "#0284c7",
                            color: "#fff",
                            transform: "translateY(-2px)",
                          },
                          transition: "all 0.3s ease",
                        }}
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>

                      {/* DELETE BUTTON */}
                      <IconButton
                        onClick={() => handleDelete(row._id)}
                        sx={{
                          bgcolor: "#fee2e2", // Very light red
                          color: "#ef4444", // Dark red
                          borderRadius: "10px",
                          "&:hover": {
                            bgcolor: "#ef4444",
                            color: "#fff",
                            transform: "translateY(-2px)",
                          },
                          transition: "all 0.3s ease",
                        }}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Formik Modal */}
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
            {editData ? "Update Hotel" : "Add Hotel"}
          </Typography>

          <Formik
            initialValues={editData || initialValues}
            validationSchema={validationSchema} // <-- Ye add kiya
            enableReinitialize={true}
            onSubmit={handleSubmit}
          >
            {(
              { setFieldValue, values, errors, touched, handleChange }, // errors aur touched nikaala
            ) => (
              <Form>
                <Stack spacing={2}>
                  <Field
                    as={TextField}
                    name="name"
                    label="Hotel Name"
                    fullWidth
                    size="small"
                    // Validation UI:
                    error={touched.name && !!errors.name}
                    helperText={touched.name && errors.name}
                  />
                  <Field
                    as={TextField}
                    name="location"
                    label="Location"
                    fullWidth
                    size="small"
                    error={touched.location && !!errors.location}
                    helperText={touched.location && errors.location}
                  />
                  <Field
                    as={TextField}
                    name="price"
                    label="Price"
                    type="number"
                    fullWidth
                    size="small"
                    error={touched.price && !!errors.price}
                    helperText={touched.price && errors.price}
                  />
                  <TextField
                    select
                    label="Select Mood/Category"
                    name="category"
                    // Formik ke values aur handleChange use karo, formData nahi!
                    value={values.category}
                    onChange={handleChange}
                    fullWidth
                    size="small"
                    error={touched.category && !!errors.category}
                    helperText={touched.category && errors.category}
                    SelectProps={{ native: true }}
                  >
                    <option value="">Select Mood</option>
                    <option value="nature">Nature</option>
                    <option value="urban">Urban</option>
                    <option value="ocean">Ocean</option>
                    <option value="romantic">Romantic</option>
                    <option value="royal">Royal</option>
                  </TextField>

                  {/* Image Preview - Ye thoda mast feature hai */}
                  <Box
                    sx={{ border: "1px dashed #ccc", p: 1, borderRadius: 1 }}
                  >
                    <Typography variant="caption" display="block" mb={1}>
                      Hotel Image
                    </Typography>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) =>
                        setFieldValue("image", e.currentTarget.files[0])
                      }
                    />
                    {/* Nayi select ki hui photo ka preview */}
                    {values.image && typeof values.image !== "string" && (
                      <img
                        src={URL.createObjectURL(values.image)}
                        alt="preview"
                        style={{
                          width: "100px",
                          marginTop: "10px",
                          borderRadius: "4px",
                        }}
                      />
                    )}
                  </Box>

                  <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    sx={{ mt: 2, py: 1.5, fontWeight: "bold" }}
                  >
                    {editData ? "Update Hotel Details" : "Save New Hotel"}
                  </Button>
                </Stack>
              </Form>
            )}
          </Formik>
        </Box>
      </Modal>
    </Box>
  );
};

export default AdminHotel;
