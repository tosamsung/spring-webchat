package com.duanWebChat.WebChatApplication;

import java.util.Arrays;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan
public class WebChatApplication {

	public static void main(String[] args) {
		SpringApplication.run(WebChatApplication.class, args);
//		ApplicationContext context= (ApplicationContext) SpringApplication.run(WebChatApplication.class, args);
//		String[] beanNames = context.getBeanDefinitionNames();
//        Arrays.stream(beanNames).forEach(System.out::println);
	}
	
}
