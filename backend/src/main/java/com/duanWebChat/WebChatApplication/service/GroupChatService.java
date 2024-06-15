package com.duanWebChat.WebChatApplication.service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.duanWebChat.WebChatApplication.entity.groupchat.GroupChat;
import com.duanWebChat.WebChatApplication.entity.groupchat.GroupChatType;
import com.duanWebChat.WebChatApplication.entity.groupchat.GroupRole;
import com.duanWebChat.WebChatApplication.entity.groupchat.GroupSetting;
import com.duanWebChat.WebChatApplication.entity.groupchat.Member;
import com.duanWebChat.WebChatApplication.entity.user.User;
import com.duanWebChat.WebChatApplication.repository.GroupChatRepository;
import com.duanWebChat.WebChatApplication.repository.UserRepository;
import com.duanWebChat.WebChatApplication.util.SequenceGeneratorService;

@Service
public class GroupChatService {

	@Autowired
	GroupChatRepository groupChatRepository;
	@Autowired
	UserRepository userRepository;
	@Autowired
	private SequenceGeneratorService sequenceGeneratorService;

	public List<GroupChat> findGroupChatsByUserId(Long userId) {
		return groupChatRepository.findByUserId(userId);
	}

	public GroupChat findGroupChatsById(Long id) {
		return groupChatRepository.findById(id).orElseThrow();
	}

	public GroupChat createGroupChat(Long idLeader, String groupName, String groupImage) {
		GroupChat groupChat = new GroupChat();

		GroupSetting groupSetting = new GroupSetting();
		groupSetting.setName(groupName);
		groupSetting.setImage(groupImage);

		User user = userRepository.findById(idLeader)
				.orElseThrow(() -> new UsernameNotFoundException("User not found"));
		Member member = new Member(user);
		member.setJoinDate(new Date());
		member.setGroupRole(GroupRole.LEADER);

		groupChat.setId(sequenceGeneratorService.generateSequence(GroupChat.SEQUENCE_NAME));
		groupChat.setGroupChatType(GroupChatType.GROUP);
		groupChat.setSetting(groupSetting);
		groupChat.setMembers(new ArrayList<Member>());
		groupChat.getMembers().add(member);
		groupChat.setCreateDate(new Date());
		GroupChat result = groupChatRepository.save(groupChat);

		return result;
	}

	public GroupChat createPrivateChat(Long idUser1, Long idUser2) {
		GroupChat groupChat = new GroupChat();
		GroupSetting groupSetting = new GroupSetting();

		User user1 = userRepository.findById(idUser1)
				.orElseThrow(() -> new UsernameNotFoundException("User not found"));
		User user2 = userRepository.findById(idUser2)
				.orElseThrow(() -> new UsernameNotFoundException("User not found"));

		Member member1 = new Member(user1);
		member1.setJoinDate(new Date());
		member1.setGroupRole(GroupRole.LEADER);

		Member member2 = new Member(user2);
		member2.setJoinDate(new Date());
		member2.setGroupRole(GroupRole.LEADER);

		groupChat.setId(sequenceGeneratorService.generateSequence(GroupChat.SEQUENCE_NAME));
		groupChat.setGroupChatType(GroupChatType.PRIVATE);
		groupChat.setSetting(groupSetting);
		groupChat.setMembers(new ArrayList<Member>());
		groupChat.getMembers().add(member1);
		groupChat.getMembers().add(member2);
		groupChat.setCreateDate(new Date());
		GroupChat result = groupChatRepository.save(groupChat);

		return result;
	}

	public GroupChat addMemberToGroupChat(Long groupId, Member newMember) {
		Optional<GroupChat> optionalGroupChat = groupChatRepository.findById(groupId);

		if (optionalGroupChat.isPresent()) {
			GroupChat groupChat = optionalGroupChat.get();
			groupChat.getMembers().add(newMember);
			return groupChatRepository.save(groupChat);
		}
		throw new RuntimeException("Group not found");
	}

	public List<User> getFriendsNotInGroupChat(Long userId, Long groupId) {
		// Lấy danh sách bạn bè của user
		List<User> friends = userRepository.getUsersInRelationship(userId);

		// Lấy danh sách thành viên của nhóm chat
		Optional<GroupChat> groupChat = groupChatRepository.findById(groupId);
		if (!groupChat.isPresent()) {
			return friends; // Nếu không có nhóm chat, trả về toàn bộ bạn bè
		}

		List<Member> groupMembers = groupChat.get().getMembers();
		Set<Long> groupMemberIds = groupMembers.stream().map(Member::getId).collect(Collectors.toSet());

		// Lọc bạn bè không nằm trong nhóm chat
		return friends.stream().filter(friend -> !groupMemberIds.contains(friend.getId())).collect(Collectors.toList());
	}
	
	public List<User> getFriendsInGroupChat(Long userId, Long groupId) {
		// Lấy danh sách bạn bè của user
		List<User> friends = userRepository.getUsersInRelationship(userId);

		// Lấy danh sách thành viên của nhóm chat
		Optional<GroupChat> groupChat = groupChatRepository.findById(groupId);
		if (!groupChat.isPresent()) {
			return friends; // Nếu không có nhóm chat, trả về toàn bộ bạn bè
		}

		List<Member> groupMembers = groupChat.get().getMembers();
		Set<Long> groupMemberIds = groupMembers.stream().map(Member::getId).collect(Collectors.toSet());

		// Lọc bạn bè không nằm trong nhóm chat
		return friends.stream().filter(friend -> groupMemberIds.contains(friend.getId())).collect(Collectors.toList());
	}
	
	public List<User> getNonFriendMembersInGroupChat(Long userId, Long groupId) {
	    // Lấy danh sách bạn bè của user
	    List<User> friends = userRepository.getUsersInRelationship(userId);

	    // Lấy danh sách thành viên của nhóm chat
	    Optional<GroupChat> groupChat = groupChatRepository.findById(groupId);
	    if (!groupChat.isPresent()) {
	        return Collections.emptyList(); // Nếu không có nhóm chat, trả về danh sách rỗng
	    }

	    List<Member> groupMembers = groupChat.get().getMembers();
	    Set<Long> friendIds = friends.stream().map(User::getId).collect(Collectors.toSet());

	    // Lọc thành viên không nằm trong danh sách bạn bè
	    return groupMembers.stream()
                .filter(member -> !friendIds.contains(member.getId()))
                .map(member -> userRepository.findById(member.getId())
                    .orElse(null)) // Lấy thông tin đầy đủ từ userRepository
                .filter(user -> user != null) // Lọc những người dùng không tìm thấy
                .collect(Collectors.toList());
	}

	
}
