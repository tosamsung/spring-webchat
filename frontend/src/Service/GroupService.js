import axios from "axios";
import api from "../util/AxiosUtil";

class GroupService {
  static async getGroupChatsByMembername(username) {
    try {
      const res = await api.get(`/group/groupchats/user?username=${username}`);
      return res.data;
    } catch (error) {
      throw error
    }
  }


  //end
}

export default GroupService;
