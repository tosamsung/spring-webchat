package com.duanWebChat.WebChatApplication.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.duanWebChat.WebChatApplication.dto.ReqRes;
import com.duanWebChat.WebChatApplication.dto.UserDto;
import com.duanWebChat.WebChatApplication.entity.user.Friend;
import com.duanWebChat.WebChatApplication.entity.user.User;
import com.duanWebChat.WebChatApplication.repository.UserRepository;

@Service
public class UserService {
	@Autowired
	private UserRepository userRepository;

	public UserDto updateUser(User user, ReqRes registrationRequest) {
		try {
			user.setFirstName(registrationRequest.getFirstName());
			user.setLastName(registrationRequest.getLastName());
			user.setUserName(registrationRequest.getUserName());
			user.setImage(registrationRequest.getImage());
			user.setPhone(registrationRequest.getPhone());
			user.setBirthDate(registrationRequest.getBirthDate());
			user.setGender(registrationRequest.getGender());

			userRepository.save(user);
		} catch (Exception e) {
			throw e;
		}
		return new UserDto(user);
	}

	public User findByEmail(String email) {
		User user = userRepository.findByEmail(email).orElseThrow();
		return user;
	}

	public void addFriend(Long idUser1, Long idUser2) {
		User user1 = userRepository.findById(idUser1)
				.orElseThrow(() -> new UsernameNotFoundException("User not found"));
		User user2 = userRepository.findById(idUser2)
				.orElseThrow(() -> new UsernameNotFoundException("User not found"));
		if (user1.getFriendship().containsKey(user2.getId()) || user2.getFriendship().containsKey(user1.getId())) {
			 throw new IllegalStateException("Users are already friends");
		}
		if(user1.getFriendship().size()<=200 || user2.getFriendship().size()<=200) {
			 throw new IllegalStateException("Max friends are 200");
		}
		user1.getFriendship().put(idUser2, new Friend(user2));
		user2.getFriendship().put(idUser1, new Friend(user1));
		userRepository.save(user1);
		userRepository.save(user2);
		
	}
}
