package com.duanWebChat.WebChatApplication.service;

import java.nio.charset.StandardCharsets;
import java.util.Base64;
import java.util.Date;
import java.util.HashMap;

import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import com.duanWebChat.WebChatApplication.entity.user.User;

import java.util.function.Function;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts; 


@Component
public class JWTUtils {
	private SecretKey secretKey;
	private static final long EXPIRATION_TIME = 86400000; //24 hours
	
	public JWTUtils() {
        String secreteString = "843567893696976453275974432697R634976R738467TR678T34865R6834R8763T478378637664538745673865783678548735687R3";
        byte[] keyBytes = Base64.getDecoder().decode(secreteString.getBytes(StandardCharsets.UTF_8));
        this.secretKey = new SecretKeySpec(keyBytes, "HmacSHA256");
	}
	
	public String generateToken(User user) {
		return Jwts.builder()
				.subject(user.getEmail())
				.issuedAt(new Date(System.currentTimeMillis()))
				.expiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
				.signWith(secretKey)
				.compact();
	}
	
	public String generateRefreshToken(HashMap<String, Object> claims, User user) {
		return Jwts.builder()
				.claims(claims)
				.subject(user.getEmail())
				.issuedAt(new Date(System.currentTimeMillis()))
				.expiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
				.signWith(secretKey)
				.compact();
	}
	
	public <T> T extractClaims(String token, Function<Claims, T> claimsTFunction) {
		return claimsTFunction.apply(Jwts.parser().verifyWith(secretKey).build().parseSignedClaims(token).getPayload());
	}
	
	public String extractUsername(String token) {
		return extractClaims(token, Claims::getSubject);
	}
	
	public boolean inTokenValid(String token, UserDetails userDetails) {
		final String username = extractUsername(token);
		return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
	}
	
	public boolean isTokenExpired(String token) {
		return extractClaims(token, Claims::getExpiration).before(new Date());
	}
	
	
}
