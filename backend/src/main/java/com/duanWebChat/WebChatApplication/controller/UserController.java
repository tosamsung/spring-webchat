package com.duanWebChat.WebChatApplication.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.duanWebChat.WebChatApplication.dto.ReqRes;
import com.duanWebChat.WebChatApplication.dto.UserDto;
import com.duanWebChat.WebChatApplication.entity.user.Relationships;
import com.duanWebChat.WebChatApplication.entity.user.User;
import com.duanWebChat.WebChatApplication.service.UserService;

@RestController
@RequestMapping("/user")
public class UserController {

	@Autowired
	private UserService userService;

	@PutMapping("/update")
	public UserDto updateUser(@RequestBody UserDto useDto) {
		System.out.println("1");
		System.out.println(useDto.toString());
		return userService.updateUser(useDto);
	}

	@GetMapping("/findAll")
	public List<UserDto> findAll() {
		return userService.findAll();
	}
//	@PutMapping("/addFriend")
//	public ReqRes addFriend(@RequestParam("idUser1") Long idUser1,@RequestParam("idUser2") Long idUser2 ) {
////         userService.addFriend(idUser1, idUser2); sai
//         return new ReqRes(200, "", "Add friend success");
//
//	}

	@PostMapping("/requestFriend/{fromUserId}/{toUserId}")
	public String sendFriend(@PathVariable Long fromUserId, @PathVariable Long toUserId) {
		userService.sendFriendRequest(fromUserId, toUserId);
		return "Friend request sent";
	}

	@PostMapping("/acceptFriend/{fromUserId}/{toUserId}")
	public String acceptFriend(@PathVariable Long fromUserId, @PathVariable Long toUserId) {
		userService.acceptFriendRequest(fromUserId, toUserId);
		return "Friend request accepted";
	}

	@PostMapping("/rejectFriend/{fromUserId}/{toUserId}")
	public String rejectFriend(@PathVariable Long fromUserId, @PathVariable Long toUserId) {
		userService.deleteFriend(fromUserId, toUserId);
		return "Friend request rejected";
	}

	@PostMapping("/cancelFriend/{fromUserId}/{toUserId}")
	public String cancelFriend(@PathVariable Long fromUserId, @PathVariable Long toUserId) {
		userService.deleteFriend(fromUserId, toUserId);
		return "Friend request cancel";
	}

	@PostMapping("/deleteFriend/{fromUserId}/{toUserId}")
	public String deleteFriend(@PathVariable Long fromUserId, @PathVariable Long toUserId) {
		userService.deleteFriend(fromUserId, toUserId);
		return "Friend request Delete";
	}

	@PostMapping("/non-relationships/{userId}")
	public List<User> getUsersNotInRelationship(@PathVariable Long userId) {
		return userService.getUsersNotInRelationship(userId);
	}
	
	@PostMapping("/relationships/{userId}")
	public List<User> getUserInRelationship(@PathVariable Long userId){
		return userService.getUsersInRelationship(userId);
	}
	@PostMapping("/relationshipsRequestFriends/{userId}")
	 public List<User> getPendingRequestUsers(@PathVariable Long userId) {
        return userService.getPendingRequestUsers(userId);
    }
	
	@PostMapping("invitation-sent/{userId}")
	public List<User> getPendingAwaitUsers(@PathVariable Long userId){
		return userService.getAwaitRequestUsers(userId);
	}
}
