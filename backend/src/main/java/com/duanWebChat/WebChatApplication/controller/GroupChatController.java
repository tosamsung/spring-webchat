package com.duanWebChat.WebChatApplication.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.duanWebChat.WebChatApplication.entity.groupchat.GroupChat;
import com.duanWebChat.WebChatApplication.service.GroupChatService;

@RestController
@RequestMapping("/group")
public class GroupChatController {
	@Autowired
	GroupChatService groupChatService;
	
	@GetMapping("/createGroupChat")
	public GroupChat createGroup( @RequestParam("idUser1") Long idUser1) {
		
		return groupChatService.createGroupChat(idUser1);
	}
	@GetMapping("/createPrivateChat")
	public GroupChat createPrivate(@RequestParam("idUser1") Long idUser1,@RequestParam("idUser2") Long idUser2 ) {
		
		return groupChatService.createPrivateChat(idUser1,idUser2);
	}
}
