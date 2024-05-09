package com.duanWebChat.WebChatApplication.entity.groupchat;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Member {
	private Integer id;
	private String name;
	private String image;
	private Date joinDate;
}
