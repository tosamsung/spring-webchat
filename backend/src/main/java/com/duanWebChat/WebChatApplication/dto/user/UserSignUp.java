package com.duanWebChat.WebChatApplication.dto.user;

import java.util.Date; 

import com.duanWebChat.WebChatApplication.entity.user.Gender;

import com.duanWebChat.WebChatApplication.entity.user.UserStatus;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;

import lombok.Data;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonIgnoreProperties(ignoreUnknown = true)
public class UserSignUp {

	private String lastName;
	private String firstName;
	private String userName;
	private String email;
	private String password;
	private Date birthDate;
	private UserStatus userStatus;
	private Gender gender;
	private Date createDate;
}
