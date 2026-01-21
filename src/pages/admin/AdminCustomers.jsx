import React, { useState, useEffect } from "react";
import api from "../../api/axios";
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
  IconButton,
  TextField,
  InputAdornment,
  CircularProgress,
  Stack,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import DeleteIcon from "@mui/icons-material/Delete";
import toast from "react-hot-toast";

const AdminCustomers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const fetchUsers = () => {
    setLoading(true);
    api
      .get("/Users")
      .then((res) => {
        setUsers(res.data.Data || res.data || []);
      })
      .catch((err) => {
        console.log("User fetch error:", err);
        toast.error("Failed to load users");
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await api.delete(`/Users/₹{id}`);
        toast.success("User deleted successfully");
        fetchUsers();
      } catch (err) {
        toast.error("Failed to delete user");
      }
    }
  };

  const filteredUsers = users.filter(
    (u) =>
      u.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email?.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <Box sx={{ p: { xs: 1.5, sm: 3 }, bgcolor: "#f8fafc", minHeight: "100vh" }}>
      {/* HEADER SECTION - Title and Search stack on mobile */}
      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={2}
        justifyContent="space-between"
        alignItems={{ xs: "flex-start", md: "center" }}
        mb={4}
      >
        <Typography
          variant={isMobile ? "h5" : "h4"}
          fontWeight={800}
          color="#1e293b"
        >
          Registered Customers
        </Typography>

        <TextField
          size="small"
          placeholder="Search by name or email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{
            bgcolor: "white",
            borderRadius: 2,
            width: { xs: "100%", md: 350 },
            boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="action" />
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      {/* TABLE SECTION */}
      <TableContainer
        component={Paper}
        sx={{
          borderRadius: 3,
          boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)",
          overflowX: "auto", // Mobile par scroll enable karne ke liye
        }}
      >
        {loading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              py: 10,
            }}
          >
            <CircularProgress />
          </Box>
        ) : (
          <Table sx={{ minWidth: isMobile ? 600 : "100%" }}>
            <TableHead sx={{ bgcolor: "#f1f5f9" }}>
              <TableRow>
                <TableCell sx={{ fontWeight: 700, color: "#475569" }}>
                  User Details
                </TableCell>
                <TableCell sx={{ fontWeight: 700, color: "#475569" }}>
                  Email Address
                </TableCell>
                <TableCell sx={{ fontWeight: 700, color: "#475569" }}>
                  Status
                </TableCell>
                <TableCell
                  sx={{ fontWeight: 700, color: "#475569" }}
                  align="right"
                >
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <TableRow
                    key={user._id}
                    hover
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell>
                      <Stack direction="row" alignItems="center" spacing={2}>
                        <Avatar
                          sx={{
                            bgcolor: "primary.main",
                            width: 36,
                            height: 36,
                            fontSize: "0.9rem",
                            fontWeight: 700,
                          }}
                        >
                          {user.name?.charAt(0).toUpperCase() || "U"}
                        </Avatar>
                        <Typography
                          variant="body2"
                          fontWeight={600}
                          color="#1e293b"
                        >
                          {user.name || "Unknown User"}
                        </Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" color="text.secondary">
                        {user.email}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Box
                        component="span"
                        sx={{
                          bgcolor: "#dcfce7",
                          color: "#15803d",
                          px: 1.5,
                          py: 0.5,
                          borderRadius: "12px",
                          fontSize: "0.75rem",
                          fontWeight: 800,
                          textTransform: "uppercase",
                        }}
                      >
                        Active
                      </Box>
                    </TableCell>
                    <TableCell align="right">
                      <IconButton
                        onClick={() => handleDelete(user._id)}
                        color="error"
                        size="small"
                        sx={{
                          bgcolor: "#fee2e2",
                          "&:hover": { bgcolor: "#fecaca" },
                          transition: "0.2s",
                        }}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} align="center" sx={{ py: 8 }}>
                    <Typography color="text.secondary">
                      No customers found with that name or email.
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        )}
      </TableContainer>
    </Box>
  );
};

export default AdminCustomers;
