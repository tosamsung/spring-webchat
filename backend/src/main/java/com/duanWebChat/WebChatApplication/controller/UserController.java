package com.duanWebChat.WebChatApplication.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.duanWebChat.WebChatApplication.dto.ReqRes;
import com.duanWebChat.WebChatApplication.dto.UserDto;
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
	public List<UserDto> findAll(){
		return userService.findAll();
	}
	@PutMapping("/addFriend")
	public ReqRes addFriend(@RequestParam("idUser1") Long idUser1,@RequestParam("idUser2") Long idUser2 ) {
//         userService.addFriend(idUser1, idUser2); sai
         return new ReqRes(200, "", "Add friend success");

	}
}
