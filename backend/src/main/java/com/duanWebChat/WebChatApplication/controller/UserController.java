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

	@CrossOrigin(origins = "http://localhost:3000/", allowCredentials = "true")
	@PostMapping("/auth/login")
	public ResponseEntity<ReqRes> login(@RequestBody ReqRes reqRes, HttpServletResponse response) {
		ReqRes result = usersManagementService.login(reqRes);
		ResponseCookie cookie1 = ResponseCookie.from("accessToken", result.getToken()).httpOnly(true).secure(false)
				.path("/").maxAge(900).sameSite("None").build();
		ResponseCookie cookie2 = ResponseCookie.from("refreshToken", result.getRefreshToken()).httpOnly(true)
				.secure(false).path("/").maxAge(518400).sameSite("None").build();
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

		return ResponseEntity.ok(new ReqRes(200, "", "Login success"));
	}

	@PostMapping("/auth/logout")
	public ResponseEntity<ReqRes> logout(HttpServletResponse response) {
		ResponseCookie expiredAccessTokenCookie = ResponseCookie.from("accessToken", "").httpOnly(true).secure(false)
				.path("/").maxAge(0).build();

		ResponseCookie expiredRefreshTokenCookie = ResponseCookie.from("refreshToken", "").httpOnly(true).secure(false)
				.path("/").maxAge(0).build();

		response.addHeader(HttpHeaders.SET_COOKIE, expiredAccessTokenCookie.toString());
		response.addHeader(HttpHeaders.SET_COOKIE, expiredRefreshTokenCookie.toString());

		return ResponseEntity.ok(new ReqRes(200, "", "Logout success"));
	}

	@CrossOrigin(origins = "http://localhost:3000/", allowCredentials = "true")
	@PostMapping("/auth/user")
	public UserDto getUserByToken(HttpServletRequest request) {

		String token = null;

		if (request.getCookies() != null) {
			for (Cookie cookie : request.getCookies()) {
				if (cookie.getName().equals("accessToken")) {
					token = cookie.getValue();
				}
				System.out.println(cookie.getName() + ": " + cookie.getValue());
			}
			
		}
		if (token == null) {
			return null;
		}
		String email = jwtUtils.extractUsername(token);
		User user = userRepository.findByEmail(email).get();

		return new UserDto(user);
	}

}
