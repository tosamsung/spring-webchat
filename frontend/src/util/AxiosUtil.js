import axios from "axios";
const refreshToken = async () => {
  try {
    const response = await axios.post(
      `http://localhost:8080/auth/refreshToken`,
      {},
      { withCredentials: true }
    );
    console.log(response.data);
  } catch (error) {}
};
const api = axios.create({
  withCredentials: true,
  baseURL: "http://localhost:8080",
});
// api.interceptors.response.use(response => {
//   return response;
// }, async error => {
//   // console.log(error.response.data);
//  if (error.response.status === 401) {
//   await refreshToken()
//   console.log("het han");
//   return axios(error.config);
//  }
// });
let lastRequest = null;
api.interceptors.request.use(
  (config) => {
    // Lưu request hiện tại vào biến lastRequest
    lastRequest = config;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
api.interceptors.response.use(
  async (response) => {
    if (response.data.statusCode === 401) {
      await refreshToken();
      console.log("het han");
      const originalRequest = lastRequest;
      lastRequest = null; // Đặt lại lastRequest để tránh việc thực hiện lại request khi có response tiếp theo
      return axios(originalRequest);
    }
    return response;
  },
  (error) => {}
);
export default api;
