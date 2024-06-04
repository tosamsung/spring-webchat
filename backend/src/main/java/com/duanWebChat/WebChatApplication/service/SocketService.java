package com.duanWebChat.WebChatApplication.service;

import java.util.List;

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
import com.duanWebChat.WebChatApplication.entity.user.User;
import com.duanWebChat.WebChatApplication.repository.GroupChatRepository;
import com.duanWebChat.WebChatApplication.repository.MessageRepository;
import com.duanWebChat.WebChatApplication.repository.UserRepository;

@Service
public class SocketService {

	@Autowired
	GroupChatRepository groupChatRepository;
	@Autowired
	private MessageRepository messageRepository;
	@Autowired
	UserRepository userRepository;


	public SocketRes findGroupChatsByUserName(String userName) {
//		User user=userRepository.findByUserName(userName).orElseThrow(() -> new UsernameNotFoundException("User not found"));
		List<GroupChat> list = groupChatRepository.findByMemberName(userName);
		SocketRes res = new SocketRes();
		res.setAction(SocketResAction.FIND_LIST_GROUPCHAT);
		res.setData(list);
		return res;
	}
	public SocketRes findMessagesByGroupId(Long id) {
		List<Message> list=messageRepository.findByGroupId(id);		
		SocketRes res = new SocketRes();
		res.setAction(SocketResAction.FIND_MESSAGE_BY_GROUPID);
		res.setData(list);
		return res;
	}


}
