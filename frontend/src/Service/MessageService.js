import api from "../util/AxiosUtil";

class MessageService {
  static async getMessageByGroupId(groupId) {
    try {
      const res = await api.get(`/message/${groupId}`);
      return res.data;
    } catch (error) {
      throw error
    }
  }


  //end
}

export default MessageService;
