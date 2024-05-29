package com.duanWebChat.WebChatApplication.dto;

import java.util.Date;
import java.util.List;
import java.util.Map;

import org.springframework.data.annotation.Id;

import com.duanWebChat.WebChatApplication.entity.user.ConnectStatus;
import com.duanWebChat.WebChatApplication.entity.user.Friend;
import com.duanWebChat.WebChatApplication.entity.user.Gender;
import com.duanWebChat.WebChatApplication.entity.user.User;
import com.duanWebChat.WebChatApplication.entity.user.UserStatus;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserDto {
    @Id
    private Long id;
    private String lastName;
    private String firstName;
    private String userName;
    private String image;
    private String email;
    private String phone;
    private Date birthDate;
    private UserStatus userStatus;
	private ConnectStatus connectStatus;

    private Date lastTimeActive;
    private Gender gender;
    private Date createDate;
	private Map<Long,Friend> friendship;

    // Constructor to map User entity to UserDto
    public UserDto(User user) {
        this.id = user.getId();
        this.lastName = user.getLastName();
        this.firstName = user.getFirstName();
        this.userName = user.getUserName();
        this.image = user.getImage();
        this.email = user.getEmail();
        this.phone = user.getPhone();
        this.birthDate = user.getBirthDate();
        this.userStatus = user.getUserStatus();
        this.lastTimeActive = user.getLastTimeActive();
        this.gender = user.getGender();
        this.createDate = user.getCreateDate();
        this.friendship = user.getFriendship();
    }
}
