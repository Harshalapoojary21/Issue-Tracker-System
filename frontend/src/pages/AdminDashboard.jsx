import {
  useEffect,
  useState
} from "react";

import {
  useNavigate
} from "react-router-dom";

import API from "../api/axios";

import Navbar from "../components/Navbar";
import StatsCard from "../components/StatsCard";
import AssignModal from "../components/AssignModal";
import IssueDetailsDialog from "../components/IssueDetailsDialog";
import "../styles/dashboard.css";

function AdminDashboard() {

  const navigate = useNavigate();

  const [stats, setStats] = useState({
    total: 0,
    open: 0,
    inProgress: 0,
    closed: 0
  });

  const [issues, setIssues] = useState([]);

  const [loading, setLoading] = useState(true);

  const [selectedIssue, setSelectedIssue] = useState(null);

  const [search, setSearch] = useState("");

  const [detailsOpen, setDetailsOpen] = useState(false);
const [selectedIssueDetails, setSelectedIssueDetails] = useState(null);
  useEffect(() => {
    fetchDashboard();
    fetchIssues();
  }, []);

  // ---------------- Dashboard ----------------

  const fetchDashboard = async () => {

    try {

      const response = await API.get("/dashboard");

      setStats(response.data.data);

    }
    catch (error) {

      console.log(error);

    }

  };

  // ---------------- Issues ----------------

  const fetchIssues = async () => {

    try {

      setLoading(true);

      const response = await API.get("/issues");

      setIssues(response.data.data);

    }
    catch (error) {

      console.log(error);

    }
    finally {

      setLoading(false);

    }

  };

  // ---------------- Delete ----------------

  const handleDelete = async (id) => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this issue?"
    );

    if (!confirmDelete) return;

    try {

      await API.delete(`/issues/${id}`);

      fetchIssues();

      fetchDashboard();

    }
    catch (error) {

      console.log(error);

    }

  };

  return (

    <>

      <Navbar />

      <div className="dashboard-container">

        {/* Header */}

        <div className="dashboard-header">

          <div>

            <h1>
              Admin Dashboard
            </h1>

            <p>
              Manage all project issues
            </p>

          </div>

          <button
            className="add-btn"
            onClick={() => navigate("/admin/create-issue")}
          >
            + Create Issue
          </button>

        </div>

        {/* Dashboard Cards */}

        <div className="stats-container">

          <StatsCard
            title="Total Issues"
            value={stats.total}
            icon="assignment"
          />

          <StatsCard
            title="Open"
            value={stats.open}
            icon="error"
          />

          <StatsCard
            title="In Progress"
            value={stats.inProgress}
            icon="pending"
          />

          <StatsCard
            title="Closed"
            value={stats.closed}
            icon="check_circle"
          />

        </div>

        {/* Search */}

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "30px",
            marginBottom: "20px"
          }}
        >

          <input
            type="text"
            placeholder="Search Issue..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width: "300px",
              padding: "10px",
              borderRadius: "8px",
              border: "1px solid #ddd"
            }}
          />

        </div>

        {/* Issues */}

        <div className="issue-table">

          <h2>
            All Issues
          </h2>

          {

            loading ?

              (

                <div
                  style={{
                    textAlign: "center",
                    padding: "40px"
                  }}
                >

                  <div className="loader"></div>

                  <p>
                    Loading Issues...
                  </p>

                </div>

              )

              :

              issues.length === 0 ?

                (

                  <p>
                    No Issues Found
                  </p>

                )

                :

                (

                  <table>

                    <thead>

                      <tr>

                        <th>Title</th>

                        <th>Priority</th>

                        <th>Status</th>

                        <th>Assigned To</th>

                        <th>Created By</th>

                        <th>Created</th>

                        <th>Actions</th>

                      </tr>

                    </thead>

                    <tbody>

                      {

                        issues

                          .filter((issue) =>

                            issue.title
                              .toLowerCase()
                              .includes(
                                search.toLowerCase()
                              )

                          )

                          .map((issue) => (

                            <tr
                              key={issue._id}
                            >

                              <td>

                                <strong>
                                  {issue.title}
                                </strong>

                              </td>

                              <td>

                                {issue.priority}

                              </td>

                              <td>

                                <span
                                  className={`status
                                  ${issue.status === "Open"
                                      ? "open"
                                      : issue.status === "Closed"
                                        ? "closed"
                                        : "progress"
                                    }`}
                                >

                                  {issue.status}

                                </span>

                              </td>

                              <td>

                                {

                                  issue.assignedTo

                                    ?

                                    issue.assignedTo.name

                                    :

                                    "Not Assigned"

                                }

                              </td>

                              <td>

                                {

                                  issue.createdBy

                                    ?

                                    issue.createdBy.name

                                    :

                                    "-"

                                }

                              </td>

                              <td>

                                {

                                  new Date(
                                    issue.createdAt
                                  ).toLocaleDateString()

                                }

                              </td>

                              <td>

                               <div
  style={{
    display: "flex",
    gap: "10px",
    flexWrap: "wrap",
  }}
>
  <button
    className="view-btn"
    onClick={() => {
      setSelectedIssueDetails(issue);
      setDetailsOpen(true);
    }}
  >
    View
  </button>

  <button
    className="assign-btn"
    onClick={() => setSelectedIssue(issue._id)}
  >
    {issue.assignedTo ? "Reassign" : "Assign"}
  </button>

  <button
    className="edit-btn"
    onClick={() =>
      navigate(`/admin/edit-issue/${issue._id}`)
    }
  >
    Edit
  </button>

  <button
    className="delete-btn"
    onClick={() => handleDelete(issue._id)}
  >
    Delete
  </button>
</div>
                              </td>

                            </tr>

                          ))

                      }

                    </tbody>

                  </table>

                )

          }

        </div>

      </div>

 {selectedIssue && (
  <AssignModal
    issueId={selectedIssue}
    close={() => {
      setSelectedIssue(null);
    }}
    refresh={() => {
      fetchIssues();
      fetchDashboard();
    }}
  />
)}

<IssueDetailsDialog
  open={detailsOpen}
  close={() => {
    setDetailsOpen(false);
    setSelectedIssueDetails(null);
  }}
  issue={selectedIssueDetails}
/>

    </>

  );

}

export default AdminDashboard;