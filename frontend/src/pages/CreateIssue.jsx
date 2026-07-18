import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import Navbar from "../components/Navbar";

import {
  Container,
  Paper,
  Typography,
  TextField,
  MenuItem,
  Button,
  Box,
  Stack,
} from "@mui/material";

function CreateIssue() {
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);

  const [issue, setIssue] = useState({
    title: "",
    description: "",
    priority: "Medium",
    status: "Open",
    assignedTo: "",
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await API.get("/users");
      setUsers(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setIssue({
      ...issue,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !issue.title.trim() ||
      !issue.description.trim() ||
      !issue.assignedTo
    ) {
      alert("Please fill all required fields");
      return;
    }

    try {
      await API.post("/issues", issue);

      alert("Issue Created Successfully");

      navigate("/admin");
    } catch (error) {
      console.log(error);
      alert("Unable to create issue");
    }
  };

  return (
    <>
      <Navbar />

      <Container maxWidth="md" sx={{ mt: 5, mb: 5 }}>
        <Paper
          elevation={4}
          sx={{
            p: 4,
            borderRadius: 3,
          }}
        >
          <Typography variant="h4" fontWeight="bold">
            Create Issue
          </Typography>

          <Typography
            sx={{
              color: "gray",
              mb: 4,
            }}
          >
            Create and assign a new issue.
          </Typography>

          <Box
            component="form"
            onSubmit={handleSubmit}
          >
            <Stack spacing={3}>
              <TextField
                label="Issue Title"
                name="title"
                value={issue.title}
                onChange={handleChange}
                fullWidth
                required
              />

              <TextField
                label="Description"
                name="description"
                value={issue.description}
                onChange={handleChange}
                multiline
                rows={4}
                fullWidth
                required
              />

              <Stack
                direction={{
                  xs: "column",
                  sm: "row",
                }}
                spacing={2}
              >
                <TextField
                  select
                  label="Priority"
                  name="priority"
                  value={issue.priority}
                  onChange={handleChange}
                  fullWidth
                >
                  <MenuItem value="Low">Low</MenuItem>
                  <MenuItem value="Medium">Medium</MenuItem>
                  <MenuItem value="High">High</MenuItem>
                </TextField>

                <TextField
                  select
                  label="Status"
                  name="status"
                  value={issue.status}
                  onChange={handleChange}
                  fullWidth
                >
                  <MenuItem value="Open">
                    Open
                  </MenuItem>

                  <MenuItem value="In Progress">
                    In Progress
                  </MenuItem>

                  <MenuItem value="Closed">
                    Closed
                  </MenuItem>
                </TextField>
              </Stack>

              <TextField
                select
                label="Assign User"
                name="assignedTo"
                value={issue.assignedTo}
                onChange={handleChange}
                fullWidth
                required
              >
                {users.map((user) => (
                  <MenuItem
                    key={user._id}
                    value={user._id}
                  >
                    {user.name}
                  </MenuItem>
                ))}
              </TextField>

              <Stack
                direction="row"
                spacing={2}
                justifyContent="flex-end"
              >
                <Button
                  variant="outlined"
                  onClick={() => navigate("/admin")}
                >
                  Cancel
                </Button>

                <Button
                  type="submit"
                  variant="contained"
                >
                  Create Issue
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Paper>
      </Container>
    </>
  );
}

export default CreateIssue;