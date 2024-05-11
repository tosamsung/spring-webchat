package com.duanWebChat.WebChatApplication.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.duanWebChat.WebChatApplication.entity.message.Message;

public interface MessageRepository extends MongoRepository<Message, Long>{

}
