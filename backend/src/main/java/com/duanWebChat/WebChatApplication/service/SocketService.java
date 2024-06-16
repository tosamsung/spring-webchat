package com.duanWebChat.WebChatApplication.service;

import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.duanWebChat.WebChatApplication.dto.SocketRes;
import com.duanWebChat.WebChatApplication.dto.SocketRes.SocketResAction;
import com.duanWebChat.WebChatApplication.entity.groupchat.GroupChat;
import com.duanWebChat.WebChatApplication.entity.message.Message;
import com.duanWebChat.WebChatApplication.entity.user.RelationshipType;
import com.duanWebChat.WebChatApplication.entity.user.Relationships;
import com.duanWebChat.WebChatApplication.entity.user.User;
import com.duanWebChat.WebChatApplication.repository.GroupChatRepository;
import com.duanWebChat.WebChatApplication.repository.MessageRepository;
import com.duanWebChat.WebChatApplication.repository.UserRepository;

@Service
public class SocketService {

	@Autowired
	GroupChatRepository groupChatRepository;

	@Autowired
	UserService userService;
	private final Map<String, Boolean> userInSocket = new ConcurrentHashMap<>();

	
	
	
	
	public void userConnected(String email) {
		userInSocket.put(email, true);
	}

	public void userDisconnected(String email) {
		userInSocket.remove(email);
	}

	public List<Relationships> getFriends(String email) {
		return userService.getRelationshipsByType(RelationshipType.FRIEND, email);
	}

	public boolean isOnline(String email) {
		return userInSocket.containsKey(email);
	}
}
