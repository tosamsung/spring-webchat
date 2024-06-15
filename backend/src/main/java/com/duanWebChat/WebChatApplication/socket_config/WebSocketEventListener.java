package com.duanWebChat.WebChatApplication.socket_config;

import java.util.concurrent.atomic.AtomicInteger;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.SessionConnectEvent;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;
import org.springframework.web.socket.messaging.SessionSubscribeEvent;


@Component
public class WebSocketEventListener {
	@Autowired
	private SimpMessagingTemplate simpMessagingTemplate;


	
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

            System.out.println("User " + username + " with session ID " + sessionId + " subscribed to " + destination);

//			System.out.println(" subscribed to " + destination + " with sessionId " + sessionId);
		}
	}
}
