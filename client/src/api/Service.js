import axios from "axios";

const apiUrl = "https://full-stack-kanban-board-production.up.railway.app";

const api = axios.create({
  baseURL: apiUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


export const authService = {
  signup: (data) => api.post("/auth/signup", data),
  login: (data) => api.post("/auth/login", data),
  forgotPassword: (data) => api.post("/auth/forgot", data),
  resetPassword: (data) => api.post("/auth/reset", data),
};

export const taskService = {
  getTasks: () => api.get("/api/task/getTasks"),
  createTask: (data) => api.post("/api/task/createTask", data),
  updateTask: (id, data) => api.put(`/api/task/updateTask/${id}`, data),
  deleteTask: (id) => api.delete(`/api/task/deleteTask/${id}`),
};

export default { authService, taskService };
