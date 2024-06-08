package com.duanWebChat.WebChatApplication.socket_config;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketTransportRegistration;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {
    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry.addEndpoint("/ws").setAllowedOriginPatterns("*").withSockJS();
    }

    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry) {
        registry.setApplicationDestinationPrefixes("/app");
        registry.enableSimpleBroker("/chatroom","/user");
        registry.setUserDestinationPrefix("/user");
    }

	@Override
	public void configureWebSocketTransport(WebSocketTransportRegistration registration) {
		// TODO Auto-generated method stub
		   registration.setMessageSizeLimit(15 * 1024 * 1024); // 15MB
		    registration.setSendTimeLimit(20 * 10000); // 20 giây
		    registration.setSendBufferSizeLimit(3 * 1024 * 1024); // 3MB
	}
    
}
