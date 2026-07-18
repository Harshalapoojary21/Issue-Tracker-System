import API from "../api/axios";

export const getIssues = () => API.get("/issues");

export const getIssueById = (id) =>
  API.get(`/issues/${id}`);

export const createIssue = (data) =>
  API.post("/issues", data);

export const updateIssue = (id, data) =>
  API.put(`/issues/${id}`, data);

export const deleteIssue = (id) =>
  API.delete(`/issues/${id}`);

export const getUsers = () =>
  API.get("/users");