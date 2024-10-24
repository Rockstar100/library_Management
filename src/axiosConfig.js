import axios from "axios";

// Create an Axios instance with default settings
const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api", // Replace with your backend URL
});

// You can add interceptors here if needed

export default axiosInstance;
