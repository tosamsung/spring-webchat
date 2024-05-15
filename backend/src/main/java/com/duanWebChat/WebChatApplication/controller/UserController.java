package com.duanWebChat.WebChatApplication.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.duanWebChat.WebChatApplication.dto.user.UserResp;
import com.duanWebChat.WebChatApplication.dto.user.UserSignIn;
import com.duanWebChat.WebChatApplication.dto.user.UserSignUp;
import com.duanWebChat.WebChatApplication.service.UsersManagementService;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;

@RestController
public class UserController {

	@Autowired
	private UsersManagementService usersManagementService;

	@PostMapping("/auth/register")
	public ResponseEntity<UserSignUp> register(@RequestBody UserSignUp reqRes) {
		return ResponseEntity.ok(usersManagementService.register(reqRes));
	}

	@PostMapping("/auth/login")
	public ResponseEntity<UserResp> login(@RequestBody UserSignIn reqRes, HttpServletResponse response) {
		UserSignIn result = usersManagementService.login(reqRes);

		Cookie accessTokenCookie = new Cookie("token", result.getToken());
		accessTokenCookie.setHttpOnly(true);
		accessTokenCookie.setSecure(true);
		accessTokenCookie.setPath("/");
		accessTokenCookie.setMaxAge(60 * 60); // (1 giờ)
		Cookie refreshTokenCookie = new Cookie("refreshToken", result.getRefreshToken());
		refreshTokenCookie.setHttpOnly(true);
		refreshTokenCookie.setSecure(true);
		refreshTokenCookie.setPath("/");
		refreshTokenCookie.setMaxAge(7 * 24 * 60 * 60); // (7 ngày)

		response.addCookie(accessTokenCookie);
		response.addCookie(refreshTokenCookie);

		return ResponseEntity.ok(result);
	}
}
