// const { over } = require("stompjs");
import { over } from "stompjs";
import SockJS from "sockjs-client";
class SocketService {
  static privateChat = new Map();
  static BASE_URL_SOCKET = "http://localhost:8080";
  static stompClient = null;
  static ConnectWs = (userid) => {
    let Sock = new SockJS(this.BASE_URL_SOCKET + "/ws");
    this.stompClient = over(Sock);
    this.stompClient.connect({}, onConnected(userid), onError);
  };
  onConnected = (userid) => {
    this.stompClient.subscribe(
      "/user/" + userid + "/private",
      receivePrivateMessage
    );
  };
  onError = (error) => {
    console.log(error);
  };
  receivePrivateMessage = (payload) => {
    let data = JSON.parse(payload.body);
    if (this.privateChat.has(data.id)) {
      this.privateChat.get(data.id).push(data);
    } else {
      let list = [];
      list.push(data);
      this.privateChat.set(data.id, list);
    }
  };
}
