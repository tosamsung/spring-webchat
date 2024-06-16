 package com.duanWebChat.WebChatApplication.entity.user;


import com.duanWebChat.WebChatApplication.entity.groupchat.ConnectStatus;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@ToString
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Relationships {
	private Long id;
	private String name;
	private String image;
	private RelationshipType type;
	private ConnectStatus connectStatus;

	public Relationships(User user) {
		this.id = user.getId();
		this.name = user.getUserName();
		this.image = user.getImage();
	}

}
