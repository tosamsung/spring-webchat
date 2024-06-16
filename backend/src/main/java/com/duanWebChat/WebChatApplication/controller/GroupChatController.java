package com.duanWebChat.WebChatApplication.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.duanWebChat.WebChatApplication.dto.ReqRes;
import com.duanWebChat.WebChatApplication.entity.groupchat.GroupChat;
import com.duanWebChat.WebChatApplication.service.GroupChatService;

@RestController
@RequestMapping("/group")
public class GroupChatController {
	@Autowired
	GroupChatService groupChatService;

	@GetMapping("/testGroup")
	public ResponseEntity<ReqRes> tesGroup() {
		groupChatService.createPrivateChat(3L, 4L);
		groupChatService.createPrivateChat(4L, 5L);
		groupChatService.createPrivateChat(3L, 5L);
		groupChatService.createPrivateChat(3L, 6L);
		return ResponseEntity.ok(new ReqRes(200, "", "create success"));
	}

	@PostMapping("/createGroupChat")
	public GroupChat createGroup(@RequestParam("idUser1") Long idUser1) {

		return groupChatService.createGroupChat(idUser1);
	}

	@PostMapping("/createPrivateChat")
	public GroupChat createPrivate(@RequestParam("idUser1") Long idUser1, @RequestParam("idUser2") Long idUser2) {

		return groupChatService.createPrivateChat(idUser1, idUser2);
	}

	@GetMapping("/groupchats/user/{userId}")
	public List<GroupChat> getGroupChatsByUserId(@PathVariable Long userId) {
		return groupChatService.findGroupChatsByUserId(userId);
	}
	@GetMapping("/groupchats/user")
	public List<GroupChat> getGroupChatsByMembername(@RequestParam("username") String name) {
		return groupChatService.findGroupChatsByMemberName(name);
	}
	@GetMapping("/private/user/{userId}")
    public List<GroupChat> getPrivateGroupChatsByUserId(@PathVariable Long userId) {
        return groupChatService.findPrivateChatByUserId(userId);
    }
}
