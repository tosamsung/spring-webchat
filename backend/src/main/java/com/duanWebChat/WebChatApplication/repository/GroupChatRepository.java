package com.duanWebChat.WebChatApplication.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import com.duanWebChat.WebChatApplication.entity.groupchat.GroupChat;
import com.duanWebChat.WebChatApplication.entity.groupchat.GroupChatType;

public interface GroupChatRepository extends MongoRepository<GroupChat, Long> {
	@Query("{ 'Members.?0': { $exists: true } }")
	List<GroupChat> findByUserId(Long userId);

	@Query("{ 'Members.userName': ?0 }")
	List<GroupChat> findByMemberName(String memberName);

	@Query("{ 'groupChatType': ?0, 'members._id': ?1 }")
	List<GroupChat> findByGroupChatTypeAndMemberId(GroupChatType groupChatType, Long memberId);

}
