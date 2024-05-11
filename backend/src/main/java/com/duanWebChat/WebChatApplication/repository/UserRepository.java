package com.duanWebChat.WebChatApplication.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.duanWebChat.WebChatApplication.entity.user.User;


public interface UserRepository extends MongoRepository<User, Long>{

}
