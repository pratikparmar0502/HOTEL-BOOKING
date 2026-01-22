import React, { useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
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
  MenuItem, // Added MenuItem
  useTheme,
  Skeleton,
  useMediaQuery,
} from "@mui/material";
import toast from "react-hot-toast";
import api from "../../api/axios";
import * as Yup from "yup";

const AdminHotel = () => {
  const [list, setList] = useState([]);
  const [editData, setEditData] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const validationSchema = Yup.object({
    name: Yup.string().required("Hotel name is required"),
    location: Yup.string().required("Location is required"),
    price: Yup.number().positive().required("Price is required"),
    category: Yup.string().required("Category is required"), // Added validation for category
  });

  const TOKEN = "ngXSnLPrB0vbLvNA";
  const initialValues = {
    name: "",
    location: "",
    price: "",
    status: "Available",
    image: null,
    category: "",
  };

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    setLoading(true); // Fetch shuru hote hi true
    api
      .get("/HotelDatas")
      .then((res) => {
        setList(res.data.Data || []);
        setLoading(false); // Data milne par false
      })
      .catch((err) => {
        console.log("GET Error:", err.message);
        setLoading(false); // Error aaye tab bhi false taaki skeleton hate
      });
  };

  const displayPrice = (p) => Number(p || 0) * 90;

  const handleSubmit = (values, { resetForm }) => {
    const toastId = toast.loading("Processing...");
    const formData = new FormData();

    Object.keys(values).forEach((key) => {
      if (key === "image") {
        if (values[key] instanceof File) formData.append(key, values[key]);
      } else {
        formData.append(key, values[key] || "");
      }
    });

    const url = editData
      ? `/HotelDatas/${editData._id}?Authorization=${TOKEN}`
      : `/HotelDatas?Authorization=${TOKEN}`;

    api({ method: editData ? "patch" : "post", url, data: formData })
      .then(() => {
        toast.success(editData ? "Updated!" : "Added!", { id: toastId });
        finalize(resetForm);
      })
      .catch((err) => toast.error("Action Failed", { id: toastId }));
  };

  const finalize = (resetForm) => {
    setEditData(null);
    setOpenModal(false);
    getData();
    if (resetForm) resetForm();
  };

  const handleEdit = (item) => {
    setEditData(item);
    setOpenModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Delete this hotel?")) {
      api.delete(`/HotelDatas/${id}`).then(() => {
        toast.success("Deleted!");
        getData();
      });
    }
  };

  return (
    <Box sx={{ width: "100%", overflowX: "hidden" }}>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={2}
        justifyContent="space-between"
        alignItems={{ xs: "flex-start", sm: "center" }}
        mb={4}
      >
        <Typography variant={isMobile ? "h5" : "h4"} fontWeight={800}>
          Manage Hotels
        </Typography>
        <Stack
          direction="row"
          spacing={1}
          sx={{ width: { xs: "100%", sm: "auto" } }}
        >
          <TextField
            fullWidth={isMobile}
            size="small"
            placeholder="Search Hotels..."
            onChange={(e) => setSearch(e.target.value)}
            sx={{ bgcolor: "white", borderRadius: "8px" }}
          />
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => {
              setEditData(null);
              setOpenModal(true);
            }}
            sx={{ whiteSpace: "nowrap", px: { xs: 2, md: 3 } }}
          >
            Add
          </Button>
        </Stack>
      </Stack>

      <TableContainer
        component={Paper}
        sx={{
          borderRadius: "16px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
          overflowX: "auto",
        }}
      >
        <Table sx={{ minWidth: 700 }}>
          <TableHead sx={{ bgcolor: "#f8fafc" }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 700 }}>Hotel Image</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Hotel Name</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Location</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Price</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Category</TableCell>
              <TableCell align="right" sx={{ fontWeight: 700 }}>
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading
              ? [...Array(5)].map((_, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <Skeleton
                        variant="rectangular"
                        width={50}
                        height={50}
                        sx={{ borderRadius: "10px" }}
                      />
                    </TableCell>
                    <TableCell>
                      <Skeleton variant="text" width="80%" height={25} />
                    </TableCell>
                    <TableCell>
                      <Skeleton variant="text" width="60%" />
                    </TableCell>
                    <TableCell>
                      <Skeleton variant="text" width="40%" />
                    </TableCell>
                    <TableCell>
                      <Skeleton variant="rounded" width={80} height={25} />
                    </TableCell>
                    <TableCell align="right">
                      <Stack
                        direction="row"
                        spacing={1}
                        justifyContent="flex-end"
                      >
                        <Skeleton variant="circular" width={30} height={30} />
                        <Skeleton variant="circular" width={30} height={30} />
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))
              : list
                  .filter((i) =>
                    i.name?.toLowerCase().includes(search.toLowerCase()),
                  )
                  .map((row) => (
                    <TableRow key={row._id} hover>
                      <TableCell>
                        <Box
                          component="img"
                          src={row.image}
                          sx={{
                            width: 50,
                            height: 50,
                            borderRadius: "10px",
                            objectFit: "cover",
                          }}
                        />
                      </TableCell>
                      <TableCell>
                        <Typography fontWeight={600} variant="body2">
                          {row.name}
                        </Typography>
                      </TableCell>
                      <TableCell>{row.location}</TableCell>
                      <TableCell sx={{ fontWeight: 700 }}>
                        ₹ {displayPrice(row.price).toLocaleString("en-IN")}
                      </TableCell>
                      <TableCell>
                        <Box
                          sx={{
                            px: 1.5,
                            py: 0.5,
                            bgcolor: "#f1f5f9",
                            borderRadius: "12px",
                            display: "inline-block",
                            fontSize: "12px",
                            fontWeight: 600,
                          }}
                        >
                          {row.category || "N/A"}
                        </Box>
                      </TableCell>
                      <TableCell align="right">
                        <Stack
                          direction="row"
                          spacing={1}
                          justifyContent="flex-end"
                        >
                          <IconButton
                            size="small"
                            onClick={() => handleEdit(row)}
                            sx={{
                              bgcolor: "#e0f2fe",
                              color: "#0284c7",
                              borderRadius: "8px",
                            }}
                          >
                            <EditIcon fontSize="small" />
                          </IconButton>
                          <IconButton
                            size="small"
                            onClick={() => handleDelete(row._id)}
                            sx={{
                              bgcolor: "#fee2e2",
                              color: "#ef4444",
                              borderRadius: "8px",
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

      <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          p: 2,
        }}
      >
        <Box
          sx={{
            width: { xs: "100%", sm: 450 },
            maxHeight: "90vh",
            overflowY: "auto",
            bgcolor: "background.paper",
            borderRadius: "24px",
            p: { xs: 3, md: 4 },
            position: "relative",
            outline: "none",
          }}
        >
          <Typography variant="h6" fontWeight={800} mb={3}>
            {editData ? "Edit Hotel Details" : "Register New Hotel"}
          </Typography>

          <Formik
            initialValues={editData || initialValues}
            validationSchema={validationSchema}
            enableReinitialize
            onSubmit={handleSubmit}
          >
            {({ setFieldValue, values, errors, touched, handleChange }) => (
              <Form>
                <Stack spacing={2.5}>
                  <Field
                    as={TextField}
                    name="name"
                    label="Hotel Name"
                    fullWidth
                    size="small"
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
                    label="Base Price ($)" // Label simple rakhein
                    type="number"
                    fullWidth
                    size="small"
                    // Helper text se user ko clarity milegi
                    helperText="Enter amount in USD. It will be converted to INR (Rate: 1$ = ₹90) for customers."
                    error={touched.price && !!errors.price}
                  />
                  {/* FIXED CATEGORY SELECT SECTION */}
                  <TextField
                    select
                    label="Category (Mood)"
                    name="category"
                    value={values.category}
                    onChange={handleChange}
                    fullWidth
                    size="small"
                    error={touched.category && !!errors.category}
                    helperText={touched.category && errors.category}
                  >
                    <MenuItem value="" disabled>
                      Select Mood
                    </MenuItem>
                    {["nature", "urban", "ocean", "romantic", "royal"].map(
                      (opt) => (
                        <MenuItem key={opt} value={opt}>
                          {opt.toUpperCase()}
                        </MenuItem>
                      ),
                    )}
                  </TextField>

                  <Box
                    sx={{
                      border: "2px dashed",
                      borderColor: "#e2e8f0",
                      p: 2,
                      borderRadius: "12px",
                      textAlign: "center",
                    }}
                  >
                    <input
                      type="file"
                      accept="image/*"
                      id="hotel-img"
                      style={{ display: "none" }}
                      onChange={(e) =>
                        setFieldValue("image", e.currentTarget.files[0])
                      }
                    />
                    <label htmlFor="hotel-img">
                      <Button
                        component="span"
                        variant="outlined"
                        size="small"
                        sx={{ mb: 1 }}
                      >
                        Upload Image
                      </Button>
                    </label>
                    {values.image && (
                      <Box mt={1}>
                        <img
                          src={
                            typeof values.image === "string"
                              ? values.image
                              : URL.createObjectURL(values.image)
                          }
                          alt="preview"
                          style={{
                            width: "100%",
                            height: "120px",
                            objectFit: "cover",
                            borderRadius: "8px",
                          }}
                        />
                      </Box>
                    )}
                  </Box>

                  <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    sx={{
                      py: 1.5,
                      borderRadius: "12px",
                      fontWeight: "bold",
                      fontSize: "16px",
                    }}
                  >
                    {editData ? "Update Hotel" : "Add Hotel"}
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
