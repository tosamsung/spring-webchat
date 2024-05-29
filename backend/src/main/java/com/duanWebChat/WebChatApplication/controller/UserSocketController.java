package com.duanWebChat.WebChatApplication.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

import com.duanWebChat.WebChatApplication.dto.UserDto;
import com.duanWebChat.WebChatApplication.service.UserService;

@Controller
public class UserSocketController {
	@Autowired
	UserService userService;

//	@MessageMapping("/user.addUser")
//	@SendTo("/user/topic")
//	public UserDto addUserSocket(@Payload UserDto userDto) {
//		
//	}
	@MessageMapping("/user.disconnect")
	@SendTo("/user/topic")
	public UserDto disconnect(@Payload UserDto userDto) {
		return userService.setUserOffline(userDto.getId());

	}
}
