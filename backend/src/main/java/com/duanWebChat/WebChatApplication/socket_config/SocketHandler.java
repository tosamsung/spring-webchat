package com.duanWebChat.WebChatApplication.socket_config;

import java.io.IOException;
import java.nio.ByteBuffer;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.concurrent.CopyOnWriteArrayList;
import java.util.stream.Collectors;


import org.springframework.stereotype.Component;
import org.springframework.web.socket.BinaryMessage;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.AbstractWebSocketHandler;

import com.duanWebChat.WebChatApplication.dto.UserDto;
import com.duanWebChat.WebChatApplication.entity.message.Message;
import com.duanWebChat.WebChatApplication.entity.user.ConnectStatus;
import com.nimbusds.jose.shaded.gson.Gson;

import jakarta.websocket.EncodeException;

@Component
public class SocketHandler extends AbstractWebSocketHandler {
    static List<WebSocketSession> sessions = new CopyOnWriteArrayList<>();
    private static Map<String, UserDto> users = new HashMap<>();
    Message m = null;

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
         System.out.println("Connection establish");
    	UserDto user = (UserDto) session.getAttributes().get("log");
        // String username = session.getUri().toString().split("/")[4];

        user.setConnectStatus(ConnectStatus.ONLINE);
        users.put(session.getId(), user);
        sessions.add(session);
        // System.out.println(session.getHandshakeHeaders().get("sec-websocket-key")+"connect");
        ConnectBroadcast();
        System.out.println(users.toString());
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        // System.out.println("Connection closed");
        sessions.remove(session);
        UserDto user = (UserDto) session.getAttributes().get("log");
        user.setConnectStatus(ConnectStatus.OFFLINE);
        users.remove(session.getId());
        ConnectBroadcast();
        disconnectBroadcast(user);
        System.out.println(users.toString());

    }

    @Override
	public void handleMessage(WebSocketSession session, WebSocketMessage<?> message) throws Exception {
    	if (message instanceof TextMessage) {
            m = new Gson().fromJson((String) message.getPayload(), Message.class);
            sendMessageToOneUser(m);
		}else if (message instanceof BinaryMessage) {
			ByteBuffer b = (ByteBuffer) message.getPayload();
			sendByteToOneUser(m, b.array());
		}
    	
	}

    private static void sendMessageToOneUser(Message message) throws IOException,
            EncodeException {
        for (WebSocketSession endpoint : sessions) {
            synchronized (endpoint) {
                if (endpoint.getId().equals(getSessionId(message.getToUser()))) {
                    endpoint.sendMessage(new TextMessage(new Gson().toJson(message)));
                }
                
            }
        }
    }
    private static void sendByteToOneUser(Message message, byte[] b) throws IOException, EncodeException {
		for (WebSocketSession endpoint : sessions) {
			synchronized (endpoint) {
				if (endpoint.getId().equals(getSessionId(message.getToUser()))) {
					endpoint.sendMessage(new BinaryMessage(b));
				}
				
			}
		}
	}

    private static String getSessionId(UserDto to) {
        Map<String, UserDto> map = users.entrySet().stream()
                .filter((u) -> u.getValue().getId() == to.getId())
                .collect(Collectors.toMap(Entry::getKey, Entry::getValue));
        for (var entry : map.entrySet()) {
            return entry.getKey();
        }
        return null;
    }

    @Override
    public void handleTransportError(WebSocketSession session, Throwable exception) throws Exception {
        // TODO Auto-generated method stub
        System.out.println(exception);
        super.handleTransportError(session, exception);
    }

    private static void ConnectBroadcast() throws IOException, EncodeException {
        for (String sessionId : users.keySet()) {
            Gson gson = new Gson();
            String json = gson.toJson(users.get(sessionId));
            for (WebSocketSession endpoint : sessions) {
                synchronized (endpoint) {

                    endpoint.sendMessage(new TextMessage(json));
                }
            }

        }

    }

    private static void disconnectBroadcast(UserDto user) throws IOException, EncodeException {

        Gson gson = new Gson();
        String json = gson.toJson(user);
        for (WebSocketSession endpoint : sessions) {
            synchronized (endpoint) {

                endpoint.sendMessage(new TextMessage(json));
            }
        }

    }


}
