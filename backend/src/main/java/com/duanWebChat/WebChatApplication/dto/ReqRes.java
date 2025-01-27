package com.duanWebChat.WebChatApplication.dto;

import java.util.Date; 
import java.util.List;

import com.duanWebChat.WebChatApplication.entity.user.Relationships;
import com.duanWebChat.WebChatApplication.entity.user.Gender;
import com.duanWebChat.WebChatApplication.entity.user.User;
import com.duanWebChat.WebChatApplication.entity.user.UserDetailImpl;
import com.duanWebChat.WebChatApplication.entity.user.UserStatus;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonIgnoreProperties(ignoreUnknown = true)
public class ReqRes {

	private int statusCode;
	private String error;
	private String message;
	private String token;
	private String refreshToken;
	private String expirationTime;
	private String lastName;
	private String firstName;
	private String userName;
	private String image;
	private String email;
	private String phone;
	private String password;
	private Date birthDate;
	private UserStatus userStatus;
	private Date lastTimeActive;
	private Gender gender;
	private Date createDate;
	private List<Relationships> friendship;
	private UserDto userDto;
	private List<User> listUser;
	public ReqRes(int statusCode, String error, String message) {
		super();
		this.statusCode = statusCode;
		this.error = error;
		this.message = message;
	}
	
	
}
