package com.duanWebChat.WebChatApplication.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.duanWebChat.WebChatApplication.entity.message.Message;
import com.duanWebChat.WebChatApplication.service.MessageService;

@RestController
@RequestMapping("/message")
public class MessageController {
	@Autowired
	MessageService messageService;
	 @GetMapping("/{groupId}")
	    public ResponseEntity<List<Message>> getGroupMessages(@PathVariable Long groupId) {
	        List<Message> messages = messageService.findMessagesByGroupId(groupId);
	        return ResponseEntity.ok(messages);
	    }
}
