import React, { useState, useEffect } from "react";
import api from "../../api/axios"; // Aapka axios instance
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Avatar,
} from "@mui/material";

const AdminCustomers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Postman: GET /api/Users fetch karna
    api
      .get("/Users")
      .then((res) => {
        // TechSnack API aksar data 'Data' field mein bhejti hai
        setUsers(res.data.Data || res.data || []);
      })
      .catch((err) => console.log("User fetch error:", err));
  }, []);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" fontWeight={800} mb={3}>
        Registered Customers
      </Typography>

      <TableContainer
        component={Paper}
        sx={{ borderRadius: 3, boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
      >
        <Table>
          <TableHead sx={{ bgcolor: "#f8fafc" }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 700 }}>User</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Email</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user._id} hover>
                <TableCell
                  sx={{ display: "flex", alignItems: "center", gap: 2 }}
                >
                  <Avatar sx={{ bgcolor: "primary.main" }}>
                    {user.name?.charAt(0)}
                  </Avatar>
                  <Typography fontWeight={600}>{user.name}</Typography>
                </TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <Typography variant="body2" color="success.main">
                    Active
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default AdminCustomers;
