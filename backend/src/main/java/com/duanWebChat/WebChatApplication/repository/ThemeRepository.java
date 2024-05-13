package com.duanWebChat.WebChatApplication.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.duanWebChat.WebChatApplication.entity.theme.Theme;


public interface ThemeRepository extends MongoRepository<Theme, Long>{

}
