package com.duanWebChat.WebChatApplication.socket_config;

import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicInteger;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.messaging.SessionConnectEvent;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;
import org.springframework.web.socket.messaging.SessionSubscribeEvent;

import com.duanWebChat.WebChatApplication.service.SocketService;

@Component
public class WebSocketEventListener {
	@Autowired
	private SimpMessagingTemplate simpMessagingTemplate;

	@Autowired
	private SocketService socketService;
	
	private final AtomicInteger activeConnections = new AtomicInteger(0);

	@EventListener
	private void handleSessionConnected(SessionConnectEvent event) {
        activeConnections.incrementAndGet();

		System.out.println("connect");
	}

	@EventListener
	private void handleSessionDisconnect(SessionDisconnectEvent event) {
        activeConnections.decrementAndGet();

		System.out.println("disconnect");
	}

	@EventListener
	public void handleSessionSubscribeEvent(SessionSubscribeEvent event) {
		StompHeaderAccessor headerAccessor = StompHeaderAccessor.wrap(event.getMessage());
		String destination = headerAccessor.getDestination();
		String sessionId = headerAccessor.getSessionId();
		String[] parts = destination.split("/");
		String username = parts[2];
		if (destination != null && destination.startsWith("/user/")) {
			simpMessagingTemplate.convertAndSendToUser(username, "/private",
					socketService.findGroupChatsByUserName(username));
			System.out.println(activeConnections.get());
//			System.out.println(" subscribed to " + destination + " with sessionId " + sessionId);
		}
	}
}
