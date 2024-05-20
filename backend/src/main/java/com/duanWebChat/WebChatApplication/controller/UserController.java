package com.duanWebChat.WebChatApplication.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.duanWebChat.WebChatApplication.dto.ReqRes;
import com.duanWebChat.WebChatApplication.dto.UserDto;
import com.duanWebChat.WebChatApplication.entity.user.User;
import com.duanWebChat.WebChatApplication.repository.UserRepository;
import com.duanWebChat.WebChatApplication.service.UsersManagementService;
import com.duanWebChat.WebChatApplication.util.JWTUtils;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@RestController
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class UserController {

	@Autowired
	private UsersManagementService usersManagementService;

	@Autowired
	JWTUtils jwtUtils;

	@Autowired
	UserRepository userRepository;

	@PostMapping("/auth/register")
	public ResponseEntity<ReqRes> register(@RequestBody ReqRes reqRes) {
		return ResponseEntity.ok(usersManagementService.register(reqRes));
	}

	@PostMapping("/auth/login")
	public ResponseEntity<ReqRes> login(@RequestBody ReqRes reqRes, HttpServletResponse response,
			HttpServletRequest request) {
		ReqRes result = usersManagementService.login(reqRes);
		ResponseCookie cookie1 = ResponseCookie.from("accessToken", result.getToken()).httpOnly(true).secure(true)
				.path("/").maxAge(900).sameSite("None").build();
		ResponseCookie cookie2 = ResponseCookie.from("refreshToken", result.getRefreshToken()).httpOnly(true)
				.secure(true).path("/").maxAge(518400).sameSite("None").build();
		response.addHeader(HttpHeaders.SET_COOKIE, cookie1.toString());
		response.addHeader(HttpHeaders.SET_COOKIE, cookie2.toString());

		ResponseCookie email = ResponseCookie.from("email", result.getEmail()).httpOnly(true).secure(true)
				.path("/").maxAge(51400).sameSite("None").build();
		
		response.addHeader(HttpHeaders.SET_COOKIE, email.toString());

		return ResponseEntity.ok(new ReqRes(200, "", "Login success"));
	}

	@PostMapping("/auth/logout")
	public ResponseEntity<ReqRes> logout(HttpServletResponse response) {
		ResponseCookie expiredAccessTokenCookie = ResponseCookie.from("accessToken", "").httpOnly(true).secure(true)
				.path("/").maxAge(0).build();

		ResponseCookie expiredRefreshTokenCookie = ResponseCookie.from("refreshToken", "").httpOnly(true).secure(true)
				.path("/").maxAge(0).build();

		response.addHeader(HttpHeaders.SET_COOKIE, expiredAccessTokenCookie.toString());
		response.addHeader(HttpHeaders.SET_COOKIE, expiredRefreshTokenCookie.toString());

		return ResponseEntity.ok(new ReqRes(200, "", "Logout success"));
	}

	@PostMapping("/auth/user")
	public UserDto getUserByToken(HttpServletRequest request) {

		String token = null;
		if (request.getCookies() != null) {
			for (Cookie cookie : request.getCookies()) {
				if (cookie.getName().equals("accessToken")) {
					token = cookie.getValue();
				}
			}

		}
		if (token == null) {
			return null;
		}
		String email = jwtUtils.extractUsername(token);
		User user = userRepository.findByEmail(email).get();

		return new UserDto(user);
	}

	@PutMapping("/auth/update")
	public ResponseEntity<ReqRes> updateUser(@RequestBody ReqRes reqRes, HttpServletRequest request) {
		String email = null;
		if (request.getCookies() != null) {
			for (Cookie cookie : request.getCookies()) {
				if (cookie.getName().equals("email")) {
					email = cookie.getValue();
				}
			}
		}
		
		User user = userRepository.findByEmail(email).orElseThrow();

		ReqRes response = usersManagementService.updateUser(user, reqRes);
		return ResponseEntity.status(response.getStatusCode()).body(response);
	}

}
