import { useState, useEffect } from "react";
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

import API from "../api/axios";

function UpdateStatusDialog({
  open,
  close,
  issue,
  refresh,
}) {
  const [status, setStatus] = useState("");

  useEffect(() => {
    if (issue) {
      setStatus(issue.status);
    }
  }, [issue]);

  const handleUpdate = async () => {
    try {
      await API.put(`/issues/${issue._id}`, {
        status,
      });

      refresh();
      close();
    } catch (error) {
      console.log(error);
      alert("Unable to update status");
    }
  };

  if (!issue) return null;

  return (
    <Dialog
      open={open}
      onClose={close}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle>
        Update Issue Status
      </DialogTitle>

      <DialogContent>

        <Typography
          sx={{ mb: 2 }}
          color="text.secondary"
        >
          Update the current issue status.
        </Typography>

        <FormControl fullWidth>
          <InputLabel>Status</InputLabel>

          <Select
            value={status}
            label="Status"
            onChange={(e) =>
              setStatus(e.target.value)
            }
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
          </Select>
        </FormControl>

      </DialogContent>

      <DialogActions>

        <Button
          onClick={close}
        >
          Cancel
        </Button>

        <Button
          variant="contained"
          onClick={handleUpdate}
        >
          Update Status
        </Button>

      </DialogActions>

    </Dialog>
  );
}

export default UpdateStatusDialog;