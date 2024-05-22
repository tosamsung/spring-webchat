package com.duanWebChat.WebChatApplication.service;

import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.duanWebChat.WebChatApplication.dto.ReqRes;
import com.duanWebChat.WebChatApplication.entity.user.User;
import com.duanWebChat.WebChatApplication.entity.user.UserDetailImpl;
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
			user.setImage(registrationRequest.getImage());
			user.setEmail(registrationRequest.getEmail());
			user.setPhone(registrationRequest.getPhone());
			user.setPassword(passwordEncoder.encode(registrationRequest.getPassword()));
			user.setBirthDate(registrationRequest.getBirthDate());
			
			user.setUserStatus(registrationRequest.getUserStatus());
			user.setLastTimeActive(registrationRequest.getLastTimeActive());
			user.setGender(registrationRequest.getGender());
			user.setCreateDate(registrationRequest.getCreateDate());
			user.setFriendship(registrationRequest.getFriendship());
			
			User userResult = userRepository.save(user);
			
			if(userResult.getId() != null) {
				resp.setUser(userResult);
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
		ReqRes response = new ReqRes();
		try {
			authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));
			var user = userRepository.findByEmail(loginRequest.getEmail()).orElseThrow();
			var jwt = jwtUtils.generateAccessToken(user); 
			var refreshToken = jwtUtils.generateRefreshToken(new HashMap<>(), user);
			response.setStatusCode(200);
			response.setToken(jwt);
			response.setEmail(user.getEmail());
			response.setRefreshToken(refreshToken);
			response.setExpirationTime("24Hrs");
			response.setMessage("successfuly login in");
		} catch (Exception e) {
			response.setStatusCode(500);
			response.setMessage(e.getMessage());
		}
		return response;
	}
	
	 public ReqRes updateUser(User user, ReqRes registrationRequest) {
	        ReqRes response = new ReqRes();
	        try {

	            user.setFirstName(registrationRequest.getFirstName());
				user.setLastName(registrationRequest.getLastName());
				user.setUserName(registrationRequest.getUserName());
				user.setImage(registrationRequest.getImage());
				user.setPhone(registrationRequest.getPhone());
				user.setBirthDate(registrationRequest.getBirthDate());
				user.setGender(registrationRequest.getGender());

	            userRepository.save(user);
	            response.setStatusCode(200);
	            response.setMessage("User updated successfully");
	            response.setUser(user);
	        } catch (Exception e) {
	            response.setStatusCode(500);
	            response.setMessage(e.getMessage());
	        }
	        return response;
	    }
}
