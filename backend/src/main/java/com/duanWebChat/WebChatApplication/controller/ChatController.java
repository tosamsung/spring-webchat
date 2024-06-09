package com.duanWebChat.WebChatApplication.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

import com.duanWebChat.WebChatApplication.dto.ReqSocket;
import com.duanWebChat.WebChatApplication.dto.SocketRes;
import com.duanWebChat.WebChatApplication.entity.groupchat.GroupChat;
import com.duanWebChat.WebChatApplication.entity.groupchat.Member;
import com.duanWebChat.WebChatApplication.entity.message.Message;
import com.duanWebChat.WebChatApplication.service.GroupChatService;
import com.duanWebChat.WebChatApplication.service.MessageService;
import com.duanWebChat.WebChatApplication.service.SocketService;

@Controller
public class ChatController {

	@Autowired
	private SimpMessagingTemplate simpMessagingTemplate;

	@Autowired
	private GroupChatService groupChatSerivce;

	@Autowired
	private MessageService messageService;

	@Autowired
	private SocketService socketService;

//    private static Map<String,String> users=new HashMap<String,String>() ;

	@MessageMapping("/message")
	@SendTo("/chatroom/public")
	public Map<String, String> receiveMessage(@Payload Message message) {
//		System.out.println("recei : "+message.toString());
//		GroupChat group=groupChatSerivce.findGroupChatsById(message.getGroupId());
//		List<Member> listMem=group.getMembers();
//		for (Member member : listMem) {
//			users.put(message.getSenderUserName(), "");
//		}
//		
		return null;
	}

	@MessageMapping("/private-message")
	public Message recMessage(@Payload Message message) {
		GroupChat group = groupChatSerivce.findGroupChatsById(message.getGroupId());
		List<Member> listMem = group.getMembers();
		for (Member member : listMem) {
//			if (member.getId() != message.getSenderId()) {
				simpMessagingTemplate.convertAndSendToUser(member.getUserName(), "/private", message);
//			}
		}
		messageService.createMessage(message);
		return message;
	}

	@MessageMapping("/getMessages")
	public SocketRes getmessages(@Payload ReqSocket req) {
		simpMessagingTemplate.convertAndSendToUser(req.getUserName(), "/private",
				socketService.findMessagesByGroupId(req.getGroupId()));
		return socketService.findMessagesByGroupId(req.getGroupId());
	}
}
