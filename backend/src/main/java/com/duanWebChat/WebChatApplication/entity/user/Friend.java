 package com.duanWebChat.WebChatApplication.entity.user;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Friend {
	private String name;
	private String image;
	public Friend(User user) {
		super();
		this.name = user.getUserName();
		this.image = user.getImage();
	}
	
	
}
