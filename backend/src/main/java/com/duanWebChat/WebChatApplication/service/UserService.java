package com.duanWebChat.WebChatApplication.service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.duanWebChat.WebChatApplication.dto.UserDto;
import com.duanWebChat.WebChatApplication.entity.user.RelationshipType;
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

	public User findByid(Long id) {

		return userRepository.findById(id).orElse(null);
	}
	public User findByUsername(String username) {

		return userRepository.findByUserName(username);
	}

	public void updateLasTimeActive(User user) {
		user.setLastTimeActive(new Date());
		userRepository.save(user);
	}

	public void updateLasTimeActive(Long id) {
		User user = userRepository.findById(id).orElse(null);
		if (user != null) {
			user.setLastTimeActive(new Date());
			userRepository.save(user);
		}

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
		User user = userRepository.findByEmail(email).orElse(null);
		return user;
	}

	public List<Relationships> getRelationshipsByType(RelationshipType type, User user) {
		if (user != null) {
			return user.getRelationships().stream().filter(relationship -> type.equals(relationship.getType()))
					.collect(Collectors.toList());
		}
		return Collections.emptyList();
	}

	public List<Relationships> getRelationshipsByType(RelationshipType type, Long id) {
		User user = userRepository.findById(id).orElse(null);
		if (user != null) {
			return user.getRelationships().stream().filter(relationship -> type.equals(relationship.getType()))
					.collect(Collectors.toList());
		}
		return Collections.emptyList();
	}

	public List<Relationships> getRelationshipsByType(RelationshipType type, String email) {
		User user = userRepository.findByEmail(email).orElse(null);
		if (user != null) {
			return user.getRelationships().stream().filter(relationship -> type.equals(relationship.getType()))
					.collect(Collectors.toList());
		}
		return Collections.emptyList();
	}

	public void sendFriendRequest(Long fromUserId, Long toUserId) {
		User fromUser = userRepository.findById(fromUserId)
				.orElseThrow(() -> new UsernameNotFoundException("User not found"));
		User toUser = userRepository.findById(toUserId)
				.orElseThrow(() -> new UsernameNotFoundException("User not found"));

		Relationships relationships = new Relationships(toUser);
		relationships.setType(RelationshipType.AWAIT);

		if (fromUser.getRelationships() == null) {
			fromUser.setRelationships(new ArrayList<>());
		}

		fromUser.getRelationships().add(relationships);

		Relationships relationships2 = new Relationships(fromUser);
		relationships2.setType(RelationshipType.PENDING);

		if (toUser.getRelationships() == null) {
			toUser.setRelationships(new ArrayList<>());
		}

		toUser.getRelationships().add(relationships2);

		userRepository.save(fromUser);
		userRepository.save(toUser);
	}

	public void acceptFriendRequest(long fromUserId, long toUserId) {
		User fromUser = userRepository.findById(fromUserId)
				.orElseThrow(() -> new UsernameNotFoundException("User not found"));
		User toUser = userRepository.findById(toUserId)
				.orElseThrow(() -> new UsernameNotFoundException("User not found"));

		List<Relationships> relationshipsFrom = fromUser.getRelationships();
		List<Relationships> relationshipsTo = toUser.getRelationships();
		for (Relationships relationships : relationshipsFrom) {
			if (relationships.getId() == toUser.getId()) {
				relationships.setType(RelationshipType.FRIEND);
				fromUser.setRelationships(relationshipsFrom);
				break;
			}
		}
		for (Relationships relationships : relationshipsTo) {
			if (relationships.getId() == fromUser.getId()) {
				relationships.setType(RelationshipType.FRIEND);
				toUser.setRelationships(relationshipsTo);
				break;
			}
		}

		userRepository.save(fromUser);
		userRepository.save(toUser);

	}

//	public void rejectFriend(Long fromUserId, Long toUserId) {
//		User toUser = userRepository.findById(toUserId)
//				.orElseThrow(() -> new UsernameNotFoundException("User not found"));
//		Optional<Relationships> toRelationShip = toUser.getRelationships().stream()
//				.filter(r-> r.getId().equals(fromUserId)).findFirst();
//		toRelationShip.ifPresent(toUser.getRelationships()::remove);
//		userRepository.save(toUser);
//	}
//
//	public void cancelFriendRequest(Long fromUserId, Long toUserId) {
//		User fromUser = userRepository.findById(fromUserId)
//				.orElseThrow(() -> new UsernameNotFoundException("User not found"));
//		Optional<Relationships> fromRelationship = fromUser.getRelationships().stream()
//				.filter(r -> r.getId().equals(toUserId)).findFirst();
//		fromRelationship.ifPresent(fromUser.getRelationships()::remove);
//		userRepository.save(fromUser);
//	}

	public void deleteFriend(Long fromUserId, Long toUserId) {
		User fromUser = userRepository.findById(fromUserId)
				.orElseThrow(() -> new UsernameNotFoundException("User not found"));
		User toUser = userRepository.findById(toUserId)
				.orElseThrow(() -> new UsernameNotFoundException("User not found"));

		// Remove relationship from fromUser
		Optional<Relationships> fromRelationship = fromUser.getRelationships().stream()
				.filter(r -> r.getId().equals(toUserId)).findFirst();
		fromRelationship.ifPresent(fromUser.getRelationships()::remove);

		// Remove relationship from toUser
		Optional<Relationships> toRelationship = toUser.getRelationships().stream()
				.filter(r -> r.getId().equals(fromUserId)).findFirst();
		toRelationship.ifPresent(toUser.getRelationships()::remove);

		userRepository.save(fromUser);
		userRepository.save(toUser);
	}

	public List<User> getUsersNotInRelationship(Long userId) {
		User user = userRepository.findById(userId).orElseThrow();
		List<Long> relationshipUserIds = user.getRelationships().stream().map(Relationships::getId)
				.collect(Collectors.toList());
		relationshipUserIds.add(userId);
		return userRepository.findUsersNotInRelationships(relationshipUserIds);
	}

	public List<User> getUsersInRelationship(Long userId) {
		return userRepository.getUsersInRelationship(userId);
	}

	// cach1
//	public List<User> getPendingRequestUsers(Long userId) {
//		User user = userRepository.findById(userId).orElseThrow(() -> new UsernameNotFoundException("User not found"));
//
//		List<Long> pendingUserIds = user.getRelationships().stream()
//				.filter(relationship -> relationship.getType() == RelationshipType.PENDING).map(Relationships::getId)
//				.collect(Collectors.toList());
//
//		return userRepository.findAllById(pendingUserIds);
//	}

	// cach2
	public List<User> getPendingRequestUsers(Long userId) {
		return userRepository.findUsersWithPendingRequests(userId);
	}

	public List<User> getAwaitRequestUsers(Long userId) {
		return userRepository.findUsersWithAwaitRequests(userId);
	}
}
