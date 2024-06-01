// const { over } = require("stompjs");
import { over } from "stompjs";
import SockJS from "sockjs-client";
export default class SocketService {
  static BASE_URL_SOCKET = "localhost:8080";
  static stompClient = null;
  static ConnectWs = (userName) => {
    let Sock = new SockJS("http://localhost:8080/ws");
    this.stompClient = over(Sock);
    this.stompClient.connect({}, this.onConnected(userName), this.onError);

  };
  static onConnected = (userName) => {
    // this.stompClient.subscribe("/chatroom/public", this.receiveMessage);

    this.stompClient.subscribe(
      "/user/" + userName + "/private",
      this.onPrivateMessage
    );
  };
  static onError = (error) => {
    console.log(error);
  };
  static receiveMessage = (payload) => {
    // let data = JSON.parse(payload.body);
    // if (this.privateChat.has(data.id)) {
    //   this.privateChat.get(data.id).push(data);
    // } else {
    //   let list = [];
    //   list.push(data);
    //   this.privateChat.set(data.id, list);
    // }
  };
  static onPrivateMessage = (payload) => {
    console.log(payload);
    // var payloadData = JSON.parse(payload.body);
    // if (privateChats.get(payloadData.senderName)) {
    //   privateChats.get(payloadData.senderName).push(payloadData);
    //   setPrivateChats(new Map(privateChats));
    // } else {
    //   let list = [];
    //   list.push(payloadData);
    //   privateChats.set(payloadData.senderName, list);
    //   setPrivateChats(new Map(privateChats));
    // }
  };
}
