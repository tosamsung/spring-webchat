package com.duanWebChat.WebChatApplication.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.duanWebChat.WebChatApplication.entity.message.Message;

public interface MessageRepository extends MongoRepository<Message, Long>{
    List<Message> findByGroupId(Long groupId);

}
