package com.duanWebChat.WebChatApplication.dto;

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
	private List<Friend> friendship;
	private User user;
	private List<User> listUser;
}
