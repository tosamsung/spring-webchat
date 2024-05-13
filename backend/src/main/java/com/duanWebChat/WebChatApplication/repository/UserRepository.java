package com.duanWebChat.WebChatApplication.repository;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.duanWebChat.WebChatApplication.entity.user.User;
import com.duanWebChat.WebChatApplication.entity.user.UserDetailImpl;


public interface UserRepository extends MongoRepository<User, String>{
	
	Optional<User> findByEmail(String email);
}
