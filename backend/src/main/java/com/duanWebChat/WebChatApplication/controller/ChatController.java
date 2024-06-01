package com.duanWebChat.WebChatApplication.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

import com.duanWebChat.WebChatApplication.entity.message.Message;


@Controller
public class ChatController {

	@Autowired
	private SimpMessagingTemplate simpMessagingTemplate;
	
    private static Map<String,String> users=new HashMap<String,String>() ;

	
	@MessageMapping("/message")
	@SendTo("/chatroom/public")
	public Map<String,String> receiveMessage(@Payload Message message) {
//		System.out.println("recei : "+message.toString());
		users.put(message.getSenderUserName(), "");
		return users;
	}

	@MessageMapping("/private-message")
	public Message recMessage(@Payload Message message) {
		simpMessagingTemplate.convertAndSendToUser(message.getToUser().getUserName(), "/private", message);
		System.out.println("private");
		return message;
	}
}
