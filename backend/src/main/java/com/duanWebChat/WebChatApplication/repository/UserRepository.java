package com.duanWebChat.WebChatApplication.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import com.duanWebChat.WebChatApplication.entity.user.RelationshipType;
import com.duanWebChat.WebChatApplication.entity.user.Relationships;
import com.duanWebChat.WebChatApplication.entity.user.User;
import com.duanWebChat.WebChatApplication.entity.user.UserDetailImpl;

@Repository
public interface UserRepository extends MongoRepository<User, Long> {
	Optional<User> findByEmail(String email);

	@Query("{ 'id': { '$nin': ?0 } }")
	List<User> findUsersNotInRelationships(List<Long> relationshipIds);

	@Query("{ 'relationships': { '$elemMatch': { 'id': ?0, 'type': 'FRIEND' } } }")
	List<User> getUsersInRelationship(Long userId);

	@Query("{ 'relationships': { '$elemMatch': { 'id': ?0, 'type': 'AWAIT' } } }")
	List<User> findUsersWithPendingRequests(Long userId);

	@Query("{ 'relationships': { '$elemMatch': { 'id': ?0, 'type': 'PENDING' } } }")
	List<User> findUsersWithAwaitRequests(Long userId);


	@Query("{ 'relationships': { '$elemMatch': { 'id': ?0, 'type': 'FRIEND' } } }")
	List<User> findFriendsNotInGroup(Long userId);

}
