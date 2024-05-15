package com.duanWebChat.WebChatApplication.dto.user;

import java.util.Date; 
import java.util.List;

import com.duanWebChat.WebChatApplication.entity.user.Friend;
import com.duanWebChat.WebChatApplication.entity.user.Gender;
import com.duanWebChat.WebChatApplication.entity.user.User;
import com.duanWebChat.WebChatApplication.entity.user.UserDetailImpl;
import com.duanWebChat.WebChatApplication.entity.user.UserStatus;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;

import lombok.Data;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonIgnoreProperties(ignoreUnknown = true)
public class UserSignIn {

	private String token;
	private String refreshToken;
	private String expirationTime;
	private String email;
	private String password;
}
