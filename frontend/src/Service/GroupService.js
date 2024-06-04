import axios from "axios";
import api from "../util/AxiosUtil";

class GroupService {
  static BASE_URL = "http://localhost:8080";
  static async getUser() {
    try {
      const user = await api.post(`/auth/user`);
      return user.data;
    } catch (error) {
      throw error
    }
  }


  //end
}

export default GroupService;
