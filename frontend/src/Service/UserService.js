import axios from "axios";
import api from "../util/AxiosUtil";

class UserService {
  static BASE_URL = "http://localhost:8080";

  static async updateUser(userData) {
    try {
      const response = await axios.put(
        `${UserService.BASE_URL}/auth/update`,
        userData,
        { withCredentials: true }
      );
    } catch (error) {}
  }

  static async getUser() {
    const response = await api.post(`/auth/user`).catch((error) => {
      // console.log(error);
    });
    return response.data;
  }

  static async login(email, password) {
    try {
      const response = await api.post(`/auth/login`, {
        email,
        password,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static async register(userData) {
    try {
      const response = await axios.post(
        `${UserService.BASE_URL}/auth/register`,
        userData
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static async logout() {
    try {
      const response = await axios.post(
        `http://localhost:8080/auth/logout`,
        {},
        { withCredentials: true }
      );
      console.log(response.data);
    } catch (error) {}
  }

  static isAuthenticated() {
    const token = localStorage.getItem("token");
    return !!token;
  }

  //end
}

export default UserService;
