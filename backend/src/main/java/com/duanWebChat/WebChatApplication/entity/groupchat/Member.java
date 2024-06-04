package com.duanWebChat.WebChatApplication.entity.groupchat;

import java.util.Date;

import com.duanWebChat.WebChatApplication.entity.user.User;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Member {
	private Long id;
	private String userName;
	private GroupRole groupRole;
	private String image;
	private Date joinDate;
	public Member(User user) {
		this.id=user.getId();
		this.userName = user.getUserName();
		this.image = user.getImage();
	}
}
