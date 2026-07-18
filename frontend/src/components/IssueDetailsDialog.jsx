import { useEffect, useState } from "react";
import API from "../api/axios";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Divider,
  TextField,
  Button,
  Paper,
  Chip,
  Box,
  Stack,
} from "@mui/material";

function IssueDetailsDialog({
  open,
  close,
  issue,
}) {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");

  useEffect(() => {
    if (open && issue?._id) {
      fetchComments();
    }
  }, [open, issue]);

  const fetchComments = async () => {
    try {
      const response = await API.get(`/comments/${issue._id}`);
      setComments(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const addComment = async () => {
    if (!comment.trim()) return;

    try {
      await API.post(`/comments/${issue._id}`, {
        comment,
      });

      setComment("");
      fetchComments();
    } catch (error) {
      console.log(error);
    }
  };

  if (!issue) return null;

  return (
    <Dialog
      open={open}
      onClose={close}
      fullWidth
      maxWidth="md"
    >
      <DialogTitle sx={{ fontWeight: "bold" }}>
        Issue Details
      </DialogTitle>

      <DialogContent>

        <Typography
          variant="h5"
          fontWeight="bold"
          gutterBottom
        >
          {issue.title}
        </Typography>

        <Typography
          color="text.secondary"
          sx={{ mb: 3 }}
        >
          {issue.description}
        </Typography>

        <Stack
          direction="row"
          spacing={1}
          sx={{ mb: 3 }}
        >
          <Chip
            label={issue.priority}
            color={
              issue.priority === "High"
                ? "error"
                : issue.priority === "Medium"
                ? "warning"
                : "success"
            }
          />

          <Chip
            label={issue.status}
            color={
              issue.status === "Closed"
                ? "success"
                : issue.status === "In Progress"
                ? "warning"
                : "primary"
            }
          />
        </Stack>

        <Paper
          variant="outlined"
          sx={{
            p: 2,
            mb: 3,
          }}
        >
          <Typography>
  <strong>Assigned To:</strong>{" "}
  {issue.assignedTo.name}
</Typography>

          <Typography sx={{ mt: 1 }}>
            <strong>Created By:</strong>{" "}
            {issue.createdBy?.name}
          </Typography>

          <Typography sx={{ mt: 1 }}>
            <strong>Created On:</strong>{" "}
            {new Date(issue.createdAt).toLocaleString()}
          </Typography>
        </Paper>

        <Divider sx={{ mb: 3 }} />

        <Typography
          variant="h6"
          gutterBottom
        >
          Comments ({comments.length})
        </Typography>

        {comments.length === 0 ? (
          <Paper
            variant="outlined"
            sx={{
              p: 2,
              textAlign: "center",
              mb: 3,
            }}
          >
            <Typography color="text.secondary">
              No comments yet.
            </Typography>
          </Paper>
        ) : (
          comments.map((item) => (
            <Paper
              key={item._id}
              elevation={1}
              sx={{
                p: 2,
                mb: 2,
              }}
            >
              <Typography
                fontWeight="bold"
              >
                {item.userId?.name}
              </Typography>

              <Typography sx={{ mt: 1 }}>
                {item.comment}
              </Typography>

              <Typography
                variant="caption"
                color="text.secondary"
              >
                {new Date(item.createdAt).toLocaleString()}
              </Typography>
            </Paper>
          ))
        )}

        <Divider sx={{ my: 3 }} />

        <Typography
          variant="h6"
          gutterBottom
        >
          Add Comment
        </Typography>

        <TextField
          fullWidth
          multiline
          rows={3}
          label="Write your comment"
          value={comment}
          onChange={(e) =>
            setComment(e.target.value)
          }
        />

        <Box
  sx={{
    display: "flex",
    justifyContent: "flex-end",
    gap: 2,
    mt: 2,
  }}
>
  <Button
    variant="outlined"
    color="secondary"
    onClick={close}
  >
    Close
  </Button>

  <Button
    variant="contained"
    onClick={addComment}
  >
    Add Comment
  </Button>
</Box>

      </DialogContent>
    </Dialog>
  );
}

export default IssueDetailsDialog;