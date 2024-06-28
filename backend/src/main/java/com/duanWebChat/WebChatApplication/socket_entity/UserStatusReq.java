package com.duanWebChat.WebChatApplication.socket_entity;

import com.duanWebChat.WebChatApplication.entity.groupchat.ConnectStatus;

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
public class UserStatusReq {
	Long groupId;
	Long id;
	ConnectStatus status;
}
