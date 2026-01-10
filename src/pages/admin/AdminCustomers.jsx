import React, { useState } from "react";
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
  Stack,
  IconButton,
} from "@mui/material";
import {
  Mail as MailIcon,
  Phone as PhoneIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";

const AdminCustomers = () => {
  const [customers] = useState([
    {
      id: 1,
      name: "Rahul Sharma",
      email: "rahul@example.com",
      phone: "+91 98765 43210",
      totalBookings: 5,
    },
    {
      id: 2,
      name: "Sneha Gupta",
      email: "sneha@example.com",
      phone: "+91 87654 32109",
      totalBookings: 2,
    },
    {
      id: 3,
      name: "Amit Kumar",
      email: "amit@example.com",
      phone: "+91 76543 21098",
      totalBookings: 8,
    },
  ]);

  return (
    <Box>
      <Typography variant="h4" fontWeight={800} mb={3}>
        Our Customers
      </Typography>

      <TableContainer
        component={Paper}
        sx={{ borderRadius: "16px", boxShadow: "0 4px 20px rgba(0,0,0,0.05)" }}
      >
        <Table>
          <TableHead sx={{ bgcolor: "#f8fafc" }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 700 }}>Customer</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Email</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Phone</TableCell>
              <TableCell sx={{ fontWeight: 700 }} align="center">
                Total Bookings
              </TableCell>
              <TableCell sx={{ fontWeight: 700 }} align="right">
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {customers.map((user) => (
              <TableRow key={user.id} hover>
                <TableCell>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Avatar sx={{ bgcolor: "primary.main" }}>
                      {user.name[0]}
                    </Avatar>
                    <Typography fontWeight={600}>{user.name}</Typography>
                  </Stack>
                </TableCell>
                <TableCell>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <MailIcon fontSize="small" color="action" />
                    <Typography variant="body2">{user.email}</Typography>
                  </Stack>
                </TableCell>
                <TableCell>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <PhoneIcon fontSize="small" color="action" />
                    <Typography variant="body2">{user.phone}</Typography>
                  </Stack>
                </TableCell>
                <TableCell align="center">{user.totalBookings}</TableCell>
                <TableCell align="right">
                  <IconButton color="error">
                    <DeleteIcon fontSize="small" />
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

export default AdminCustomers;
