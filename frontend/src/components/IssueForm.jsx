import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createIssue, getUsers } from "../services/issueService";

function IssueForm() {
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
      const res = await getUsers();
      setUsers(res.data.data);
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

    try {
      await createIssue(issue);

      alert("Issue Created Successfully");

      navigate("/admin");
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-xl shadow-lg p-8"
    >
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Create New Issue
      </h2>

      {/* Title */}

      <div className="mb-5">
        <label className="block mb-2 font-medium">
          Issue Title
        </label>

        <input
          type="text"
          name="title"
          value={issue.title}
          onChange={handleChange}
          placeholder="Enter issue title"
          className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
          required
        />
      </div>

      {/* Description */}

      <div className="mb-5">
        <label className="block mb-2 font-medium">
          Description
        </label>

        <textarea
          name="description"
          value={issue.description}
          onChange={handleChange}
          rows="5"
          placeholder="Describe the issue"
          className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
          required
        />
      </div>

      {/* Priority + Status */}

      <div className="grid md:grid-cols-2 gap-6 mb-5">

        <div>
          <label className="block mb-2 font-medium">
            Priority
          </label>

          <select
            name="priority"
            value={issue.priority}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-3"
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>

        <div>
          <label className="block mb-2 font-medium">
            Status
          </label>

          <select
            name="status"
            value={issue.status}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-3"
          >
            <option value="Open">Open</option>
            <option value="In Progress">In Progress</option>
            <option value="Closed">Closed</option>
          </select>
        </div>

      </div>

      {/* Assign User */}

      <div className="mb-6">
        <label className="block mb-2 font-medium">
          Assign To
        </label>

        <select
          name="assignedTo"
          value={issue.assignedTo}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg px-4 py-3"
        >
          <option value="">Select User</option>

          {users.map((user) => (
            <option
              key={user._id}
              value={user._id}
            >
              {user.name}
            </option>
          ))}
        </select>
      </div>

      {/* Button */}

      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition"
      >
        Create Issue
      </button>

    </form>
  );
}

export default IssueForm;