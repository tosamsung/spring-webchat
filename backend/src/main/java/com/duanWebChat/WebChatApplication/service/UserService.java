package com.duanWebChat.WebChatApplication.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.duanWebChat.WebChatApplication.dto.ReqRes;
import com.duanWebChat.WebChatApplication.dto.UserDto;
import com.duanWebChat.WebChatApplication.entity.user.ConnectStatus;
import com.duanWebChat.WebChatApplication.entity.user.Relationships;
import com.duanWebChat.WebChatApplication.entity.user.User;
import com.duanWebChat.WebChatApplication.repository.UserRepository;

@Service
public class UserService {
	@Autowired
	private UserRepository userRepository;

	public List<UserDto> findAll() {
		List<User> list = userRepository.findAll();
		return list.stream().map(UserDto::new).collect(Collectors.toList());
	}

	public UserDto updateUser(UserDto UserDto) {

		try {
			User user = userRepository.findById(UserDto.getId())
					.orElseThrow(() -> new UsernameNotFoundException("User not found"));
			user.setFirstName(UserDto.getFirstName());
			user.setLastName(UserDto.getLastName());
			user.setUserName(UserDto.getUserName());
			user.setImage(UserDto.getImage());
			user.setPhone(UserDto.getPhone());
			user.setBirthDate(UserDto.getBirthDate());
			user.setGender(UserDto.getGender());
			userRepository.save(user);
			return new UserDto(user);
		} catch (Exception e) {
			throw e;
		}
		
	}

	public User findByEmail(String email) {
		User user = userRepository.findByEmail(email).orElseThrow();
		return user;
	}

	public UserDto setUserOnline(Long id) {
		User user = userRepository.findById(id).orElseThrow(() -> new UsernameNotFoundException("User not found"));
		user.setConnectStatus(ConnectStatus.ONLINE);
		userRepository.save(user);
		return new UserDto(user);
	}

	public UserDto setUserOffline(Long id) {
		User user = userRepository.findById(id).orElseThrow(() -> new UsernameNotFoundException("User not found"));
		user.setConnectStatus(ConnectStatus.OFFLINE);
		userRepository.save(user);
		return new UserDto(user);
	}


}
