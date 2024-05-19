package com.duanWebChat.WebChatApplication.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.duanWebChat.WebChatApplication.dto.ReqRes;
import com.duanWebChat.WebChatApplication.service.UsersManagementService;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;

@RestController
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class UserController {

	@Autowired
	private UsersManagementService usersManagementService;
	
	@PostMapping("/auth/register")
	public ResponseEntity<ReqRes> register(@RequestBody ReqRes reqRes){
		return ResponseEntity.ok(usersManagementService.register(reqRes));
	}
	
	@PostMapping("/auth/login")
	public ResponseEntity<ReqRes> login(@RequestBody ReqRes reqRes, HttpServletResponse response){
		ReqRes result=usersManagementService.login(reqRes);
		ResponseCookie cookie1 = ResponseCookie.from("accessToken", result.getToken())
                .httpOnly(true)
                .secure(false)
                .path("/")
                .maxAge(900)
                .build();
		ResponseCookie cookie2 = ResponseCookie.from("refreshToken", result.getRefreshToken())
                .httpOnly(true)
                .secure(false)
                .path("/")
                .maxAge(518400)
                .build();
        response.addHeader(HttpHeaders.SET_COOKIE, cookie1.toString());
        response.addHeader(HttpHeaders.SET_COOKIE, cookie2.toString());

//		 Cookie cookie = new Cookie("token", result.getRefreshToken());
//         cookie.setHttpOnly(true);
//         cookie.setSecure(true); // Chỉ sử dụng trên HTTPS
//         cookie.setPath("/");
//         cookie.setPath("");
//         cookie.setMaxAge(7 * 24 * 60 * 60); // 7 ngày
//        
//         response.addCookie(cookie);

		return ResponseEntity.ok(new ReqRes(200,"","Login success"));
	}
}
