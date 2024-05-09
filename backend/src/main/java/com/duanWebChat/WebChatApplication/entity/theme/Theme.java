package com.duanWebChat.WebChatApplication.entity.theme;


import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Document(collection = "Themes")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Theme {
	@Id
	private Integer id;
	private String name;
	private String image;


}
