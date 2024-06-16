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

	@EventListener
	private void handleSessionConnected(SessionConnectEvent event) {
		StompHeaderAccessor headerAccessor = StompHeaderAccessor.wrap(event.getMessage());
		String email = headerAccessor.getUser().getName();
		System.out.println("connect");
//	        System.out.println(headerAccessor.toString());
	}

	@EventListener
	private void handleSessionDisconnect(SessionDisconnectEvent event) {
		System.out.println("disconnect");
	}

	@EventListener
	public void handleSessionSubscribeEvent(SessionSubscribeEvent event) {
//		StompHeaderAccessor headerAccessor = StompHeaderAccessor.wrap(event.getMessage());
//		String destination = headerAccessor.getDestination();
//		String sessionId = headerAccessor.getSessionId();
//		String[] parts = destination.split("/");
//		String username = parts[2];
//		if (destination != null && destination.startsWith("/user/")) {
//
//			System.out.println("User " + username + " with session ID " + sessionId + " subscribed to " + destination);
//
//		}
	}
}
