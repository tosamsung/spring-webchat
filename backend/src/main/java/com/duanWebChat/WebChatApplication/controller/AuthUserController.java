package com.duanWebChat.WebChatApplication.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
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
import com.duanWebChat.WebChatApplication.service.UserService;
import com.duanWebChat.WebChatApplication.service.UsersManagementService;
import com.duanWebChat.WebChatApplication.util.CookieUtil;
import com.duanWebChat.WebChatApplication.util.JWTUtils;

import io.jsonwebtoken.ExpiredJwtException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@RestController
@RequestMapping("/auth")
public class AuthUserController {

	@Autowired
	private UsersManagementService usersManagementService;

	@Autowired
	private UserDetailsService detailsService;

	@Autowired
	private UserService userService;

	@Autowired
	JWTUtils jwtUtils;

	@PostMapping("/register")
	public ResponseEntity<ReqRes> register(@RequestBody ReqRes reqRes) {
		return ResponseEntity.ok(usersManagementService.register(reqRes));
	}

	@PostMapping("/refreshToken")
	public ReqRes refreshToken(HttpServletRequest request, HttpServletResponse response) {
		String refreshToken = CookieUtil.getCookieValueByName(request, "refreshToken");
		if (refreshToken != null && !refreshToken.isBlank()) {
			try {
				String newAccessToken = refreshAccessToken(refreshToken);
				ResponseCookie newAccessTokenCookie = ResponseCookie.from("accessToken", newAccessToken).httpOnly(true)
						.secure(false).path("/").maxAge(900).build();
				response.addHeader(HttpHeaders.SET_COOKIE, newAccessTokenCookie.toString());
				System.out.println("toke moi " + newAccessToken);
				response.setStatus(HttpServletResponse.SC_OK);
				return new ReqRes(200, "", "Refresh successs");
			} catch (ExpiredJwtException eJwt) {
				// TODO: handle exception
				System.out.println("refresh token hết hạn");
				response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
				return new ReqRes(401, "Refresh token expired", "");
			}
		} else {
			System.out.println("refresh token trống");
			response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
			return new ReqRes(401, "Refresh token is empty", "");
		}
	}

	@PostMapping("/login")
	public UserDto login(@RequestBody ReqRes reqRes, HttpServletResponse response, HttpServletRequest request) {
		ReqRes result = usersManagementService.login(reqRes);
		ResponseCookie cookie1 = ResponseCookie.from("accessToken", result.getToken()).httpOnly(true).secure(true)
				.path("/").maxAge(604800).sameSite("None").build();
		ResponseCookie cookie2 = ResponseCookie.from("refreshToken", result.getRefreshToken()).httpOnly(true)
				.secure(true).path("/").maxAge(604800).sameSite("None").build();
		response.addHeader(HttpHeaders.SET_COOKIE, cookie1.toString());
		response.addHeader(HttpHeaders.SET_COOKIE, cookie2.toString());

		return result.getUserDto();
	}

	@PostMapping("/logout")
	public ResponseEntity<ReqRes> logout(HttpServletResponse response) {
		ResponseCookie expiredAccessTokenCookie = ResponseCookie.from("accessToken", "").httpOnly(true).secure(true)
				.path("/").maxAge(0).build();

		ResponseCookie expiredRefreshTokenCookie = ResponseCookie.from("refreshToken", "").httpOnly(true).secure(true)
				.path("/").maxAge(0).build();

		response.addHeader(HttpHeaders.SET_COOKIE, expiredAccessTokenCookie.toString());
		response.addHeader(HttpHeaders.SET_COOKIE, expiredRefreshTokenCookie.toString());

		return ResponseEntity.ok(new ReqRes(200, "", "Logout success"));
	}

	@PostMapping("/user")
	public UserDto getUserByToken(HttpServletRequest request) {

		String token = CookieUtil.getCookieValueByName(request, "accessToken");

		System.out.println("toke dc lay : " + token);
		if (token == null) {
			return null;
		}
		String email = jwtUtils.extractUsername(token);
		User user = userService.findByEmail(email);

		return new UserDto(user);
	}

	public String refreshAccessToken(String refreshToken) {
		if (refreshToken == null || refreshToken.isBlank()) {
			return null;
		}
		try {
			String userEmail = jwtUtils.extractUsername(refreshToken);
			UserDetails userDetails = detailsService.loadUserByUsername(userEmail);
			if (jwtUtils.isTokenValid(refreshToken, userDetails)) {
				String newAccessToken = jwtUtils.generateAccessToken(userDetails.getUsername());
				return newAccessToken;
			} else {
				return null;
			}
		} catch (ExpiredJwtException e) {
			throw e;
		}
	}

}
