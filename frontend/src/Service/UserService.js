import axios from "axios";
import api from "../util/AxiosUtil";

class UserService {
  static BASE_URL = "http://localhost:8080";

  static async updateUser(userData) {
    try {
      const response = await api.put(
        `/user/update`,
        userData,
      );
    } catch (error) {}
  }
  // static async addFriend(){
  //   try {
  //     const user = await api.put(`/auth/user`);
  //     return user.data;
  //   } catch (error) {
  //     throw error
  //   }
  // }
  static async getUser() {
    try {
      const user = await api.post(`/auth/user`);
      return user.data;
    } catch (error) {
      throw error
    }
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

  static async register(userData, token) {
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


  //end
}

export default UserService;
