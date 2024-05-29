package com.duanWebChat.WebChatApplication.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.duanWebChat.WebChatApplication.entity.groupchat.GroupChat;

public interface GroupChatRepository extends MongoRepository<GroupChat, Long>{

}
