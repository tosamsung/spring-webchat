import axios from "axios";
import Cookies from "js-cookie";

class UserService {
  static BASE_URL = "http://localhost:8080";

  static async login(email, password) {
    try {
      const response = await axios.post(`${UserService.BASE_URL}/auth/login`, {
        email,
        password,
      });
      console.log(response.data);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static async register(userData, token) {
    try {
      const response = await axios.post(
        `${UserService.BASE_URL}/auth/register`,
        userData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static logout() {
    // localStorage.removeItem("token");
    Cookies.remove("token");
  }

  static isAuthenticated() {
    const token = localStorage.getItem("token");
    return !!token;
  }

  //end
}

export default UserService;
