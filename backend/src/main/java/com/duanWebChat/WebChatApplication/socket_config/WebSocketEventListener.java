package com.duanWebChat.WebChatApplication.socket_config;


import org.springframework.context.event.EventListener;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.SessionConnectEvent;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;
import org.springframework.web.socket.messaging.SessionSubscribeEvent;

@Component

public class WebSocketEventListener {

	@EventListener
	private void handleSessionConnected(SessionConnectEvent event) {

		System.out.println("connect");
	}

	@EventListener
	private void handleSessionDisconnect(SessionDisconnectEvent event) {
		System.out.println("disconnect");
	}

	@EventListener
	public void handleSessionSubscribeEvent(SessionSubscribeEvent event) {
		StompHeaderAccessor headerAccessor = StompHeaderAccessor.wrap(event.getMessage());
		String destination = headerAccessor.getDestination();
		String sessionId = headerAccessor.getSessionId();

		if (destination != null && destination.startsWith("/user/")) {
			System.out.println(" subscribed to " + destination + " with sessionId " + sessionId);
		}
	}
}
