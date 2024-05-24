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
import com.duanWebChat.WebChatApplication.entity.user.User;
import com.duanWebChat.WebChatApplication.entity.user.UserStatus;
import com.duanWebChat.WebChatApplication.repository.UserRepository;
import com.duanWebChat.WebChatApplication.util.JWTUtils;
import com.duanWebChat.WebChatApplication.util.SequenceGeneratorService;

import jakarta.servlet.http.HttpServletResponse;

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
			user.setImage(registrationRequest.getImage());
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
			resp.setStatusCode(500);
			resp.setError(e.getMessage());
		}
		return resp;
	}

	public ReqRes login(ReqRes loginRequest) {
		ReqRes reqRes = new ReqRes();
		try {
			authenticationManager.authenticate(
					new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));
			User user = userRepository.findByEmail(loginRequest.getEmail()).orElseThrow();
			UserDto userDto = new UserDto(user);
			String accessToken = jwtUtils.generateAccessToken(user);
			String refreshToken = jwtUtils.generateRefreshToken(new HashMap<>(), user);
			reqRes.setUserDto(userDto);
			reqRes.setStatusCode(200);
			reqRes.setToken(accessToken);
			reqRes.setEmail(user.getEmail());
			reqRes.setRefreshToken(refreshToken);
			reqRes.setMessage("successfuly login in");
		} catch (Exception e) {
			throw new UsernameNotFoundException("User not found");
		}
		return reqRes;
	}

	public UserDto updateUser(User user, ReqRes registrationRequest) {
		try {
			user.setFirstName(registrationRequest.getFirstName());
			user.setLastName(registrationRequest.getLastName());
			user.setUserName(registrationRequest.getUserName());
			user.setImage(registrationRequest.getImage());
			user.setPhone(registrationRequest.getPhone());
			user.setBirthDate(registrationRequest.getBirthDate());
			user.setGender(registrationRequest.getGender());

			userRepository.save(user);
		} catch (Exception e) {
			throw e;
		}
		return new UserDto(user);
	}

}
