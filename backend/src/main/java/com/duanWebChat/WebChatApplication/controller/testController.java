package com.duanWebChat.WebChatApplication.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.duanWebChat.WebChatApplication.entity.groupchat.ContentType;
import com.duanWebChat.WebChatApplication.entity.message.Message;
import com.duanWebChat.WebChatApplication.entity.message.MessageStatus;
import com.duanWebChat.WebChatApplication.entity.message.UserInteract;
import com.duanWebChat.WebChatApplication.entity.theme.Theme;
import com.duanWebChat.WebChatApplication.repository.MessageRepository;
import com.duanWebChat.WebChatApplication.repository.ThemeRepository;



@RestController
@RequestMapping("/test")
public class testController {
	@Autowired
	private ThemeRepository themeRepository;
	@Autowired
	private MessageRepository messRepo;

	@PostMapping("/theme")
	public Theme createTheme(@RequestBody Theme theme) {
		return themeRepository.save(theme);
	}
	@GetMapping("/testCreateMess")
	public void testCreateMess() {
        // Tạo danh sách UserInteract
        List<UserInteract> userInteracts = new ArrayList<>();
        userInteracts.add(new UserInteract("user1.jpg", "User 1", "icon1.png"));
        userInteracts.add(new UserInteract("user2.jpg", "User 2", "icon2.png"));
        userInteracts.add(new UserInteract("user3.jpg", "User 3", "icon3.png"));

        // Tạo các message test
        Message message1 = new Message(1, 1, 1, "Hello", ContentType.TEXT, MessageStatus.SENT, userInteracts);
        Message message2 = new Message(2, 1, 2, "How are you?", ContentType.TEXT, MessageStatus.DELIVERED, userInteracts);
        Message message3 = new Message(3, 1, 3, "Check out this image", ContentType.IMAGE, MessageStatus.SEEN, userInteracts);
        Message message4 = new Message(4, 2, 1, "Watch this video", ContentType.VIDEO, MessageStatus.PENDING, userInteracts);
        
        messRepo.save(message1);
        messRepo.save(message2);
        messRepo.save(message3);
        messRepo.save(message4);
        
	}
	@GetMapping("/testFindAll")
	public List<Message> findAll(){
		return messRepo.findAll();
	}
}
