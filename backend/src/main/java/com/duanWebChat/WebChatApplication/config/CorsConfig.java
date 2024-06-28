package com.duanWebChat.WebChatApplication.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig implements WebMvcConfigurer{

	@Override
	public void addCorsMappings(CorsRegistry registry) {
		// TODO Auto-generated method stub
		 registry.addMapping("/**")
         .allowedOrigins("http://localhost:3000") // Đổi thành tên miền frontend 
         .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
         .allowCredentials(true) // Cho phép gửi thông tin xác thực
         .allowedHeaders("*");
	}
	
}
