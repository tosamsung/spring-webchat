package com.duanWebChat.WebChatApplication.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

//	@ExceptionHandler(value = RuntimeException.class)
//	ErrorResponse handlingRunTimeException(RuntimeException exception){
//		return new ErrorResponse(HttpStatus.BAD_REQUEST, exception.getMessage());
//	}
	@ExceptionHandler(value = NotFoundException.class)
	ErrorResponse handlerNotFoundException(NotFoundException exception){
		return new ErrorResponse(HttpStatus.BAD_REQUEST, exception.getMessage());
	}

}
	