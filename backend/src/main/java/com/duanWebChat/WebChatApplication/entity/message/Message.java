package com.duanWebChat.WebChatApplication.entity.message;

import java.util.Date;
import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.mapping.Document;

import com.duanWebChat.WebChatApplication.dto.UserDto;
import com.duanWebChat.WebChatApplication.entity.groupchat.ContentType;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;



@Document(collection = "Messages")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Message {
	@Transient
	public static final String SEQUENCE_NAME="message_sequence";
	@Id
	private Long id;
	private Long groupId;
	private Long senderId;
	private String message;
	private ContentType type;
	private MessageStatus messageStatus;
	private Date sendDate;
	
}
