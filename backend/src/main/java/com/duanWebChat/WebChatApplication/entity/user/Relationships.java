 package com.duanWebChat.WebChatApplication.entity.user;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

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


}
