import api from "../util/AxiosUtil";
class FriendService {


  static async getAllNotFriend(userId) {
    try {
      const respone = await api.post(`user/non-relationships/${userId}`);
      return respone.data;
    } catch (error) {
      throw error;
    }
  }

  static async getAllFriend(userId) {
    try {
      const respone = await api.post(`user/relationships/${userId}`);
      return respone.data;
    } catch (error) {
      throw error;
    }
  }

  static async getRequestFriend(userId) {
    try {
      const respone = await api.post(
        `user/relationshipsRequestFriends/${userId}`
      );
      return respone.data;
    } catch (error) {
      throw error;
    }
  }

  static async getSentRequest(userId) {
    try {
      const respone = await api.post(`user/invitation-sent/${userId}`);
      return respone.data;
    } catch (error) {
      throw error;
    }
  }

  static async sendFriendRequest(fromUserId, toUserId) {
    try {
      const response = await api.post(
        `user/requestFriend/${fromUserId}/${toUserId}`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static async acceptFriend(fromUserId, toUserId) {
    try {
      const respone = await api.post(
        `user/acceptFriend/${fromUserId}/${toUserId}`
      );
      return respone.data;
    } catch (error) {
      throw error;
    }
  }

  static async deleteFriend(fromUserId, toUserId) {
    try {
      const respone = await api.post(
        `user/deleteFriend/${fromUserId}/${toUserId}`
      );
      return respone.data;
    } catch (error) {
      throw error;
    }
  }

  // static async rejectFriend(fromUserId, toUserId) {
  //   try {
  //     const respone = await api.post(
  //       `user/rejectFriend/${fromUserId}/${toUserId}`
  //     );
  //     return respone.data;
  //   } catch (error) {
  //     throw error;
  //   }
  // }

  // static async CancleRequest(fromUserId, toUserId) {
  //   try {
  //     const respone = await api.post(
  //       `user/cancelFriend/${fromUserId}/${toUserId}`
  //     );
  //     return respone.data;
  //   } catch (error) {
  //     throw error;
  //   }
  // }
}
export default FriendService;
