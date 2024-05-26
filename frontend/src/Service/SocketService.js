const { over } = require("stompjs");

class SocketService{
    static BASE_URL_SOCKET = "http://localhost:8080";
    static stompClient=null;
    static ConnectWs=()=>{
        let Sock=new SockJS(this.BASE_URL_SOCKET+"/ws")
        this.stompClient=over(Sock)
        this.stompClient.connect({},onConnected,onError)
    }
    static onConnected=()=>{

    }
    static onError=(error)=>{
        console.log(error);
    }

}