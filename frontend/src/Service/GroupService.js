import api from "../util/AxiosUtil";

class GroupService {
  static async addMember(groupId, newMember) {
    try {
      const response = await api.post(`/group/addMember/${groupId}`, newMember);
      return response.data;
    } catch (error) {
      throw error;
       }
  }

  static async getGroupChatsByMembername(username) {
    try {
      const res = await api.get(`/group/groupchats/user?username=${username}`);
      return res.data;
    } catch (error) {
      throw error
    }
  }

  static async getMembersNotIngroup(userId, groupId) {
    try {
      const response = await api.get("group/members-not-in-group", {
        params: {
          userId: userId,
          groupId: groupId,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static async getMembersInGroup(userId, groupId) {
    try {
      const response = await api.get("/group/members-in-group", {
        params: {
          userId: userId,
          groupId: groupId,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static async getMembersInGroupNotFriend(userId, groupId) {
    try {
      const response = await api.get("/group/members-in-group-not-friend", {
        params: {
          userId: userId,
          groupId: groupId,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static async createGroupChat(formData) {
    try {
      const response = await api.post("/group/createGroupChat", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  //end
}

export default GroupService;
