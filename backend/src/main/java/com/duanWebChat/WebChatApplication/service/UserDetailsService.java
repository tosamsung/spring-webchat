package com.duanWebChat.WebChatApplication.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.duanWebChat.WebChatApplication.entity.user.User;
import com.duanWebChat.WebChatApplication.entity.user.UserDetailImpl;
import com.duanWebChat.WebChatApplication.repository.UserRepository;


@Service
public class UserDetailsService implements org.springframework.security.core.userdetails.UserDetailsService{
	
	@Autowired
	private UserRepository userRepository;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
//		User user = userRepository.findByEmail(username).get();
//		UserDetailImpl userDetail = new UserDetailImpl();
//		userDetail.setUser(user);
//		return userDetail;
		
		User user = userRepository.findByEmail(username).orElseThrow(() -> new UsernameNotFoundException("User not found with username: " + username));
	    return new UserDetailImpl(user);
	}
	
	
}
