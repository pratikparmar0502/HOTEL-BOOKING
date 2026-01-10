import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Chip,
} from "@mui/material";
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
} from "@mui/icons-material";

const AdminHotel = () => {
  const [hotels, setHotels] = useState([
    {
      id: 1,
      name: "Grand Hyatt",
      loc: "Mumbai",
      status: "Active",
      price: "₹12,000",
    },
    {
      id: 2,
      name: "Taj Palace",
      loc: "Delhi",
      status: "Active",
      price: "₹25,000",
    },
  ]);

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
        <Typography variant="h4" fontWeight={800}>
          Manage Hotels
        </Typography>
        <Button variant="contained" startIcon={<AddIcon />}>
          Add New Hotel
        </Button>
      </Box>

      <TableContainer component={Paper} sx={{ borderRadius: "16px" }}>
        <Table>
          <TableHead sx={{ bgcolor: "#f8fafc" }}>
            <TableRow>
              <TableCell>Hotel Name</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Price/Night</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {hotels.map((h) => (
              <TableRow key={h.id}>
                <TableCell>
                  <strong>{h.name}</strong>
                </TableCell>
                <TableCell>{h.loc}</TableCell>
                <TableCell>{h.price}</TableCell>
                <TableCell>
                  <Chip label={h.status} color="success" size="small" />
                </TableCell>
                <TableCell align="right">
                  <IconButton color="primary">
                    <EditIcon />
                  </IconButton>
                  <IconButton color="error">
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default AdminHotel;
