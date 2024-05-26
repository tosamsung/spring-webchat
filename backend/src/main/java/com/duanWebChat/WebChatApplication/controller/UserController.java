package com.duanWebChat.WebChatApplication.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.duanWebChat.WebChatApplication.dto.ReqRes;
import com.duanWebChat.WebChatApplication.dto.UserDto;
import com.duanWebChat.WebChatApplication.entity.user.User;
import com.duanWebChat.WebChatApplication.repository.UserRepository;
import com.duanWebChat.WebChatApplication.service.UserService;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/user")
public class UserController {

	@Autowired
	private UserService userService;

	
//	@PutMapping("/update")
//	public UserDto updateUser(@RequestBody ReqRes reqRes, HttpServletRequest request) {
////		????
//	}
//	@PutMapping("/addFriend")
//	public Reqres addFriend(@RequestParam Long userId1, @RequestParam Long userId2) {
//        return userService.addFriend(userId1, userId2);
//
//	}
}
