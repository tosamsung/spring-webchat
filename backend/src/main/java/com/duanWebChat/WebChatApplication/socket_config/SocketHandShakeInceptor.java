package com.duanWebChat.WebChatApplication.socket_config;

import java.util.Map;


import org.springframework.http.server.ServerHttpRequest;
import org.springframework.http.server.ServerHttpResponse;
import org.springframework.http.server.ServletServerHttpRequest;
import org.springframework.lang.Nullable;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.server.HandshakeInterceptor;

import com.duanWebChat.WebChatApplication.dto.UserDto;

import jakarta.servlet.http.HttpSession;

@Component
public class SocketHandShakeInceptor implements HandshakeInterceptor{

    @Override
    public void afterHandshake(ServerHttpRequest arg0, ServerHttpResponse arg1, WebSocketHandler arg2,
            @Nullable Exception arg3) {
        // TODO Auto-generated method stub
        
    }

    @Override
    public boolean beforeHandshake(ServerHttpRequest request, ServerHttpResponse response, WebSocketHandler wsHandler,
            Map<String, Object> attributes) throws Exception {
        ServletServerHttpRequest httpRequest = (ServletServerHttpRequest) request;
        HttpSession session = httpRequest.getServletRequest().getSession();
        System.out.println("before handshake");
        if((UserDto)session.getAttribute("user") == null) {
        	return false;
        }
        attributes.put("log", (UserDto)session.getAttribute("user"));
        System.out.println("Before=================");
        return true;
    }
    
}
