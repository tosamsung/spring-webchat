import axios from "axios";
const refreshToken = async () => {
  try {
    const response = await axios.post(
      `http://localhost:8080/auth/refreshToken`,
      {},
      { withCredentials: true }
    );
    return response.data; // Giả sử rằng token mới được trả về ở đây
  } catch (error) {
    console.error("Failed to refresh token", error);
    throw error;
  }
};

const api = axios.create({
  withCredentials: true,
  baseURL: "http://localhost:8080",
});


api.interceptors.response.use(
  async (response) => {
    if(response.data.statusCode===401){
      await refreshToken();
      return api(response.config)
    }
    // console.log(response);
    return response;
  },
   (error) => {
    // if (error.response.status === 401 ) {
    //   try {
    //     const tokenData = await refreshToken();
    //     return api(error.config);
    //   } catch (refreshError) {
    //     return Promise.reject(refreshError);
    //   }
    // }

    return Promise.reject(error);
  }
);
export default api;
