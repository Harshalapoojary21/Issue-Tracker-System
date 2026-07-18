import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import API from "../api/axios";

import UpdateStatusDialog from "../components/UpdateStatusDialog";
import IssueDetailsDialog from "../components/IssueDetailsDialog";

import {
  Typography,
  Paper,
  Chip,
  Button,
  CircularProgress,
  Box,
  Stack
} from "@mui/material";

import "../styles/userDashboard.css";

function UserDashboard() {

  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);

  // Update Status Dialog
  const [dialogOpen, setDialogOpen] = useState(false);

  // Issue Details Dialog
  const [detailsOpen, setDetailsOpen] = useState(false);

  // Selected Issue
  const [selectedIssue, setSelectedIssue] = useState(null);

  useEffect(() => {
    fetchIssues();
  }, []);

  const fetchIssues = async () => {

    try {

      const response = await API.get("/issues");
     console.log(response.data.data[0]);
      setIssues(response.data.data);

      
    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }

  };

  const statusColor = (status) => {

    switch (status) {

      case "Open":
        return "error";

      case "In Progress":
        return "warning";

      case "Closed":
        return "success";

      default:
        return "default";

    }

  };

  const priorityColor = (priority) => {

    switch (priority) {

      case "High":
        return "error";

      case "Medium":
        return "warning";

      case "Low":
        return "success";

      default:
        return "default";

    }

  };

  return (

    <>

      <Navbar />

      <div className="user-dashboard">

        <Typography
          variant="h4"
          className="dashboard-title"
        >
          My Assigned Issues
        </Typography>

        <Typography
          className="dashboard-subtitle"
        >
          View and manage your assigned issues.
        </Typography>

        {

          loading ?

          (

            <Box className="loader">

              <CircularProgress />

            </Box>

          )

          :

          issues.length === 0 ?

          (

            <Paper className="empty-card">

              <Typography variant="h6">

                No Issues Assigned

              </Typography>

              <Typography>

                You currently have no assigned issues.

              </Typography>

            </Paper>

          )

          :

          issues.map((issue) => (

            <Paper
              className="issue-card"
              elevation={3}
              key={issue._id}
            >

              <Typography variant="h6">

                {issue.title}

              </Typography>

              <Typography className="description">

                {issue.description}

              </Typography>

              <div className="chip-container">

                <Chip
                  label={issue.priority}
                  color={priorityColor(issue.priority)}
                />

                <Chip
                  label={issue.status}
                  color={statusColor(issue.status)}
                />

              </div>

              <Typography className="assigned-by">

                Created By :
                <strong> {issue.createdBy?.name}</strong>

              </Typography>

              <Stack
                direction="row"
                spacing={2}
                sx={{ mt: 2 }}
              >

                <Button

                  variant="contained"

                  onClick={() => {

                    setSelectedIssue(issue);

                    setDialogOpen(true);

                  }}

                >

                  Update Status

                </Button>

                <Button

                  variant="outlined"

                  onClick={() => {

                    setSelectedIssue(issue);

                    setDetailsOpen(true);

                  }}

                >

                  View Details

                </Button>

              </Stack>

            </Paper>

          ))

        }

      </div>

      {/* Update Status Dialog */}

      <UpdateStatusDialog

        open={dialogOpen}

        close={() => setDialogOpen(false)}

        issue={selectedIssue}

        refresh={fetchIssues}

      />

      {/* Issue Details Dialog */}

      <IssueDetailsDialog

        open={detailsOpen}

        close={() => setDetailsOpen(false)}

        issue={selectedIssue}

      />

    </>

  );

}

export default UserDashboard;