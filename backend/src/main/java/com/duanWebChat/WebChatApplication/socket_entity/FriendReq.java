package com.duanWebChat.WebChatApplication.socket_entity;


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
public class FriendReq {
	Long senderId;
	Long receiverId;
}
