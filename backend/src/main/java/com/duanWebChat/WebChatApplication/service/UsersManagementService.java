package com.duanWebChat.WebChatApplication.service;

import java.util.Date;
import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.duanWebChat.WebChatApplication.dto.user.UserSignIn;
import com.duanWebChat.WebChatApplication.dto.user.UserSignUp;
import com.duanWebChat.WebChatApplication.entity.user.User;
import com.duanWebChat.WebChatApplication.entity.user.UserDetailImpl;
import com.duanWebChat.WebChatApplication.entity.user.UserStatus;
import com.duanWebChat.WebChatApplication.repository.UserRepository;
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

	public UserSignUp register(UserSignUp registrationRequest) {
		UserSignUp resp = new UserSignUp();
		User user = new User();
		user.setId(sequenceGeneratorService.generateSequence(User.SEQUENCE_NAME));
		user.setFirstName(registrationRequest.getFirstName());
		user.setLastName(registrationRequest.getLastName());
		user.setUserName(registrationRequest.getUserName());
		user.setEmail(registrationRequest.getEmail());
		user.setPassword(passwordEncoder.encode(registrationRequest.getPassword()));
		user.setBirthDate(registrationRequest.getBirthDate());

		user.setUserStatus(UserStatus.ACTIVE);
		user.setGender(registrationRequest.getGender());
		user.setCreateDate(new Date());

		User userResult = userRepository.save(user);

		return resp;
	}

	public UserSignIn login(UserSignIn loginRequest) {
		UserSignIn response = new UserSignIn();
		authenticationManager.authenticate(
				new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));
		User user = userRepository.findByEmail(loginRequest.getEmail()).orElseThrow();
		String jwt = jwtUtils.generateToken(user);
		String refreshToken = jwtUtils.generateRefreshToken(new HashMap<>(), user);
		response.setToken(jwt);
		response.setRefreshToken(refreshToken);
		response.setExpirationTime("24Hrs");

		return response;
	}
}
