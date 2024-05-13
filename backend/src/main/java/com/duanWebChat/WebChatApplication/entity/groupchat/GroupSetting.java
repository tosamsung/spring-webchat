package com.duanWebChat.WebChatApplication.entity.groupchat;


import com.duanWebChat.WebChatApplication.entity.theme.Theme;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class GroupSetting {
	private String image;
	private Theme theme;
	private String name;
	private Long groupleader;

}
