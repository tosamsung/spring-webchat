package com.duanWebChat.WebChatApplication.dto;

import java.util.List;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class SocketRes {
	
	private SocketResAction action;
    private List<?> data;

	public enum SocketResAction {
		FIND_LIST_GROUPCHAT,	
		FIND_MESSAGE_BY_GROUPID,	
	}
}
