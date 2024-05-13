	package com.duanWebChat.WebChatApplication.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.duanWebChat.WebChatApplication.dto.ReqRes;
import com.duanWebChat.WebChatApplication.service.UsersManagementService;

@RestController
public class UserController {

	@Autowired
	private UsersManagementService usersManagementService;
	
	@PostMapping("/auth/register")
	public ResponseEntity<ReqRes> register(@RequestBody ReqRes reqRes){
		return ResponseEntity.ok(usersManagementService.register(reqRes));
	}
	
	@PostMapping("/auth/login")
	public ResponseEntity<ReqRes> login(@RequestBody ReqRes reqRes){
		return ResponseEntity.ok(usersManagementService.login(reqRes));
	}
}
