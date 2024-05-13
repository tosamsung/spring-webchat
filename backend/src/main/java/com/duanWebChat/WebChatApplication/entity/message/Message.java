package com.duanWebChat.WebChatApplication.entity.message;

import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.mapping.Document;

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
	private String content;
	private ContentType type;
	private MessageStatus messageStatus;
	private List<UserInteract>listInteract;
	
	public Message(Long groupId, Long senderId, String content, ContentType type, MessageStatus messageStatus,
			List<UserInteract> listInteract) {
		super();
		this.groupId =  groupId;
		this.senderId = senderId;
		this.content = content;
		this.type = type;
		this.messageStatus = messageStatus;
		this.listInteract = listInteract;
	}
	
	public Message(int groupId, int senderId, String content, ContentType type, MessageStatus messageStatus,
			List<UserInteract> listInteract) {
		super();
		this.groupId = (long) groupId;
		this.senderId = (long) senderId;
		this.content = content;
		this.type = type;
		this.messageStatus = messageStatus;
		this.listInteract = listInteract;
	}
	
}
