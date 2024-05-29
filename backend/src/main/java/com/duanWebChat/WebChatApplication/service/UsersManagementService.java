package com.duanWebChat.WebChatApplication.service;

import java.util.Date;

import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.duanWebChat.WebChatApplication.dto.ReqRes;
import com.duanWebChat.WebChatApplication.dto.UserDto;
import com.duanWebChat.WebChatApplication.entity.user.ConnectStatus;
import com.duanWebChat.WebChatApplication.entity.user.User;
import com.duanWebChat.WebChatApplication.entity.user.UserDetailImpl;
import com.duanWebChat.WebChatApplication.entity.user.UserStatus;
import com.duanWebChat.WebChatApplication.repository.UserRepository;
import com.duanWebChat.WebChatApplication.util.JWTUtils;
import com.duanWebChat.WebChatApplication.util.SequenceGeneratorService;
import com.nimbusds.jwt.JWT;

@Service
public class UsersManagementService {
	@Autowired
	private UserRepository userRepository;
	@Autowired
	private JWTUtils jwtUtils;
	@Autowired
	private AuthenticationManager authenticationManager;
	@Autowired
	private PasswordEncoder passwordEncoder;
	@Autowired
	private SequenceGeneratorService sequenceGeneratorService;

	public ReqRes register(ReqRes registrationRequest) {
		ReqRes resp = new ReqRes();
		try {
			User user = new User();
			user.setId(sequenceGeneratorService.generateSequence(User.SEQUENCE_NAME));
			user.setFirstName(registrationRequest.getFirstName());
			user.setLastName(registrationRequest.getLastName());
			user.setUserName(registrationRequest.getUserName());
			user.setImage("https://cellphones.com.vn/sforum/wp-content/uploads/2023/10/avatar-trang-4.jpg");
			user.setConnectStatus(ConnectStatus.OFFLINE);
			user.setEmail(registrationRequest.getEmail());
			user.setPhone(registrationRequest.getPhone());
			user.setPassword(passwordEncoder.encode(registrationRequest.getPassword()));
			user.setBirthDate(registrationRequest.getBirthDate());

			user.setUserStatus(UserStatus.ACTIVE);
			user.setGender(registrationRequest.getGender());
			user.setCreateDate(new Date());

			User userResult = userRepository.save(user);

			if (userResult.getId() != null) {
				resp.setMessage("User saves successfuly");
				resp.setStatusCode(200);
			}
		} catch (Exception e) {
			throw new RuntimeException("Failed to register user: " + e.getMessage());
		}
		return resp;
	}

	public ReqRes login(ReqRes loginRequest) {
		ReqRes response = new ReqRes();
		try {
			authenticationManager.authenticate(
					new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));
			var user = userRepository.findByEmail(loginRequest.getEmail()).orElseThrow();
			var jwt = jwtUtils.generateAccessToken(user);
			var refreshToken = jwtUtils.generateRefreshToken(new HashMap<>(), user);
			response.setUserDto(new UserDto(user));
			response.setStatusCode(200);
			response.setToken(jwt);
			response.setEmail(user.getEmail());
			response.setRefreshToken(refreshToken);
			response.setExpirationTime("24Hrs");
			response.setMessage("successfuly login in");
		} catch (Exception e) {
			throw new RuntimeException("Failed to login user: " + e.getMessage());
		}
		return response;
	}

}
