package com.duanWebChat.WebChatApplication.service;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import com.duanWebChat.WebChatApplication.entity.groupchat.ConnectStatus;
import com.duanWebChat.WebChatApplication.entity.groupchat.GroupChat;
import com.duanWebChat.WebChatApplication.entity.user.RelationshipType;
import com.duanWebChat.WebChatApplication.entity.user.Relationships;
import com.duanWebChat.WebChatApplication.entity.user.User;
import com.duanWebChat.WebChatApplication.repository.GroupChatRepository;
import com.duanWebChat.WebChatApplication.repository.UserRepository;

@Service
public class SocketService {

	@Autowired
	GroupChatRepository groupChatRepository;

	@Autowired
	UserService userService;
	@Autowired
	private SimpMessagingTemplate simpMessagingTemplate;
	
	private final Set<String> onlineUsers = new HashSet<>();

	public void handleUserOnline(String email) {
		User user = userService.findByUsername(email);
		System.out.println(onlineUsers.toString());
//		User user = userService.findByEmail(email);
//		System.out.println(email);
		if(user!=null) {
			List<Relationships> list = user.getRelationships().stream()
					.filter(relationship -> RelationshipType.FRIEND.equals(relationship.getType()))
					.collect(Collectors.toList());
			for (Relationships relationships : list) {
//				System.out.println(relationships.getName());
				if (onlineUsers.contains(relationships.getName())) {
					GroupChat groupChat = groupChatRepository.findPrivateGroupChatsWithMembers(user.getId(),
							relationships.getId());
					groupChat.getMembers().get(0).setStatus(ConnectStatus.ONLINE);
					groupChat.getMembers().get(1).setStatus(ConnectStatus.ONLINE);
					simpMessagingTemplate.convertAndSendToUser(user.getUserName(), "/user-status", groupChat);
					simpMessagingTemplate.convertAndSendToUser(relationships.getName(), "/user-status", groupChat);
					break;
				}

			}

			userConnected(user.getUserName());

		}

	}
	public void handleUserOffline(String email) {
		User user = userService.findByEmail(email);
		if(user!=null) {
			List<Relationships> list = user.getRelationships().stream()
					.filter(relationship -> RelationshipType.FRIEND.equals(relationship.getType()))
					.collect(Collectors.toList());
			for (Relationships relationships : list) {
				if (onlineUsers.contains(relationships.getName())) {
					GroupChat groupChat = groupChatRepository.findPrivateGroupChatsWithMembers(user.getId(),
							relationships.getId());
					groupChat.getMembers().get(0).setStatus(ConnectStatus.OFFLINE);
					groupChat.getMembers().get(1).setStatus(ConnectStatus.OFFLINE);
					simpMessagingTemplate.convertAndSendToUser(user.getUserName(), "/user-status", groupChat);
					simpMessagingTemplate.convertAndSendToUser(relationships.getName(), "/user-status", groupChat);
					break;
				}

			}

			userDisconnected(email);
			userService.updateLasTimeActive(user);

		}

	}
	public void userConnected(String userName) {
		onlineUsers.add(userName);

	}

	public void userDisconnected(String userName) {
		onlineUsers.remove(userName);
	}



	public boolean isOnline(String userName) {
		return onlineUsers.contains(userName);
	}
}
