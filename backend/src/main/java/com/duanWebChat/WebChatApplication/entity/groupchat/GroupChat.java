package com.duanWebChat.WebChatApplication.entity.groupchat;

import java.util.Date;
import java.util.List;
import java.util.Map;

import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Document(collection = "GroupsChat")
@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class GroupChat {
	@Transient
	public static final String SEQUENCE_NAME="groupchat_sequence";
	@Id
	private Long id;
	private GroupChatType groupChatType;
	private GroupSetting setting;
	private List<Member>members;
	private Date createDate;
}
