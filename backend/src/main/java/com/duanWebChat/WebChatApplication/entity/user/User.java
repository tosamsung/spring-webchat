package com.duanWebChat.WebChatApplication.entity.user;

import java.util.Date;
import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;



@Document(collection  = "Users")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class User {
	@Id
	private Integer id;
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

}
