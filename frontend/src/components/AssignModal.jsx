import { useEffect, useState } from "react";
import API from "../api/axios";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
} from "@mui/material";

function AssignModal({ issueId, close, refresh }) {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await API.get("/users");
      setUsers(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const assignIssue = async () => {
    if (!selectedUser) {
      alert("Please select a user.");
      return;
    }

    try {
      await API.put(`/issues/${issueId}/assign`, {
        userId: selectedUser,
      });

      alert("Issue assigned successfully");

      refresh();
      close();
    } catch (error) {
      console.log(error);
      alert("Unable to assign issue");
    }
  };

  return (
    <Dialog
      open={true}
      onClose={close}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle>Assign Issue</DialogTitle>

      <DialogContent>

        <Typography
          color="text.secondary"
          sx={{ mb: 2 }}
        >
          Select a user to assign this issue.
        </Typography>

        <FormControl fullWidth>
          <InputLabel>User</InputLabel>

          <Select
            value={selectedUser}
            label="User"
            onChange={(e) =>
              setSelectedUser(e.target.value)
            }
          >
            {users.map((user) => (
              <MenuItem
                key={user._id}
                value={user._id}
              >
                {user.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

      </DialogContent>

      <DialogActions>

        <Button onClick={close}>
          Cancel
        </Button>

        <Button
          variant="contained"
          onClick={assignIssue}
        >
          Assign
        </Button>

      </DialogActions>
    </Dialog>
  );
}

export default AssignModal;