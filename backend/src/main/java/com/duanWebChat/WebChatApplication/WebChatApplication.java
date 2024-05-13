package com.duanWebChat.WebChatApplication;

import java.util.Arrays;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication(exclude = {
        org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration.class}
        )
@ComponentScan
public class WebChatApplication {

	public static void main(String[] args) {
		SpringApplication.run(WebChatApplication.class, args);
//		ApplicationContext context= (ApplicationContext) SpringApplication.run(WebChatApplication.class, args);
//		String[] beanNames = context.getBeanDefinitionNames();
//        Arrays.stream(beanNames).forEach(System.out::println);
	}
	
}
