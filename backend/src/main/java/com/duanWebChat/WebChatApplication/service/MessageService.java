package com.duanWebChat.WebChatApplication.service;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.duanWebChat.WebChatApplication.entity.message.Message;
import com.duanWebChat.WebChatApplication.entity.user.User;
import com.duanWebChat.WebChatApplication.repository.MessageRepository;
import com.duanWebChat.WebChatApplication.util.SequenceGeneratorService;

@Service
public class MessageService {
	@Autowired
	private MessageRepository messageRepository;
	@Autowired
	private SequenceGeneratorService sequenceGeneratorService;
	public void createMessage(Message message) {
		if(message.getId()==null) {
			message.setId(sequenceGeneratorService.generateSequence(User.SEQUENCE_NAME));
		}
		message.setSendDate(new Date());
		messageRepository.save(message);
	}
	public List<Message> findMessagesByGroupId(Long id){
		return messageRepository.findByGroupId(id);
	}
}
