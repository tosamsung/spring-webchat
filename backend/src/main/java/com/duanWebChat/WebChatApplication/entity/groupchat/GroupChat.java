package com.duanWebChat.WebChatApplication.entity.groupchat;

import java.util.Date;
import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Document(collection = "GroupsChat")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class GroupChat {
	@Id
	private Long id;
	private GroupChatType groupChatType;
	private GroupSetting setting;
	private List<Member>listMembers;
	private Date createDate;
	
	
}
