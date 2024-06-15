package com.duanWebChat.WebChatApplication.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.duanWebChat.WebChatApplication.dto.ReqRes;
import com.duanWebChat.WebChatApplication.entity.groupchat.GroupChat;
import com.duanWebChat.WebChatApplication.entity.groupchat.Member;
import com.duanWebChat.WebChatApplication.entity.user.User;
import com.duanWebChat.WebChatApplication.service.GroupChatService;

@RestController
@RequestMapping("/group")
public class GroupChatController {
	@Autowired
	GroupChatService groupChatService;

	@GetMapping("/testGroup")
	public ResponseEntity<ReqRes> tesGroup() {
		groupChatService.createPrivateChat(2L, 8L);

		return ResponseEntity.ok(new ReqRes(200, "", "create success"));
	}
	
	@GetMapping("/members-in-group-not-friend")
	public ResponseEntity<List<User>> getFriendsInGroupNotFriend(@RequestParam Long userId, @RequestParam Long groupId) {
		List<User> friendsInGroup = groupChatService.getNonFriendMembersInGroupChat(userId, groupId);
		return new ResponseEntity<>(friendsInGroup, HttpStatus.OK);
	}
	
	@GetMapping("/members-in-group")
	public ResponseEntity<List<User>> getFriendsInGroup(@RequestParam Long userId, @RequestParam Long groupId) {
		List<User> friendsInGroup = groupChatService.getFriendsInGroupChat(userId, groupId);
		return new ResponseEntity<>(friendsInGroup, HttpStatus.OK);
	}

	@GetMapping("/members-not-in-group")
	public ResponseEntity<List<User>> getFriendsNotInGroup(@RequestParam Long userId, @RequestParam Long groupId) {
		List<User> friendsNotInGroup = groupChatService.getFriendsNotInGroupChat(userId, groupId);
		return new ResponseEntity<>(friendsNotInGroup, HttpStatus.OK);
	}

	@PostMapping("/addMember/{groupId}")
	public ResponseEntity<GroupChat> addMember(@PathVariable("groupId") Long groupId, @RequestBody Member newMember) {
		GroupChat groupChat = groupChatService.addMemberToGroupChat(groupId, newMember);
		return ResponseEntity.ok(groupChat);
	}

	@PostMapping("/createGroupChat")
	public GroupChat createGroup(@RequestParam("idUser1") Long idUser1, @RequestParam("groupName") String groupName,
			@RequestParam("groupImage") String groupImage) {
		return groupChatService.createGroupChat(idUser1, groupName, groupImage);
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
}
