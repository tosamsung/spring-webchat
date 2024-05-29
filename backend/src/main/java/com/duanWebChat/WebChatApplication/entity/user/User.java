package com.duanWebChat.WebChatApplication.entity.user;

import java.util.Date;
import java.util.Map;

import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Document(collection = "Users")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class User {
	@Transient
	public static final String SEQUENCE_NAME="user_sequence";
	@Id
	private Long id;
	private String lastName;
	private String firstName;
	private String userName;
	private String image;
	private String email;
	private String phone;
	private String password;
	private Date birthDate;
	private UserStatus userStatus;
	private ConnectStatus connectStatus;
	private Date lastTimeActive;
	private Gender gender;
	private Date createDate;
	private Map<Long,Friend> friendship;

}
