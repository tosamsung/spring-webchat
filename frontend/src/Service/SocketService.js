// const { over } = require("stompjs");
import { over } from "stompjs";
import SockJS from "sockjs-client";
export default class SocketService {
  static BASE_URL_SOCKET = "localhost:8080";
  static stompClient = null;
  static ConnectWs = (userid) => {
     this.stompClient = new WebSocket("ws://" + this.BASE_URL_SOCKET + "/chat/" + userid);
     console.log("ws://" + this.BASE_URL_SOCKET + "/chat/" + userid);
    // this.stompClient = over(Sock);
    // this.stompClient.connect({},this.onConnected(userid),this.onError);
  };
  static onConnected = (userid) => {
   
  };
  static onError = (error) => {
    console.log(error);
  };
  static receiveMessage = (payload) => {
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
