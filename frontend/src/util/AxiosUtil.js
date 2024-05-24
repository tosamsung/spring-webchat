import axios from "axios";
import { Navigate } from "react-router-dom";
const api = axios.create({
  withCredentials: true,
  baseURL: "http://localhost:8080",
});
api.interceptors.response.use(
  async (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; 

      try {
        // Gọi API refresh token
        const response = await axios.post(
          `http://localhost:8080/auth/refreshToken`,
          {},
          { withCredentials: true }
        );


        return api(originalRequest);
      } catch (error) {
        console.log("Refresh token hết hạn, yêu cầu đăng nhập lại.");
       
      }
    }

    // Nếu không phải lỗi 401 hoặc refresh token thất bại
    return Promise.reject(error);
  }
);
export default api;
