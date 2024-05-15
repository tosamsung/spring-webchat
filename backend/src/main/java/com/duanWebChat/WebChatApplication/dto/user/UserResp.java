package com.duanWebChat.WebChatApplication.dto.user;



import lombok.Data;

@Data
public class UserResp {
	private int statusCode;
	private String error;
	private String message;
}
