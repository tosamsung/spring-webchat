package com.duanWebChat.WebChatApplication.config;

import java.io.IOException;
import java.util.Enumeration;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.duanWebChat.WebChatApplication.util.JWTUtils;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class JWTAuthFilter extends OncePerRequestFilter {

	@Autowired
	private JWTUtils jwtUtils;

	@Autowired
	private UserDetailsService detailsService;

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {
		
		// Lấy token từ cookie
		String accessToken = getAccessTokeFromCookie(request);
		if (accessToken == null || accessToken.isBlank()) {
			filterChain.doFilter(request, response);
			return;
		}
		
		String userEmail = jwtUtils.extractUsername(accessToken);

		if (userEmail != null && SecurityContextHolder.getContext().getAuthentication() == null) {
			UserDetails userDetails = detailsService.loadUserByUsername(userEmail);
			if (jwtUtils.isTokenUserNameValid(accessToken, userDetails)) {
				if (jwtUtils.isTokenExpired(accessToken)) {
					String refreshToken = getRefreshTokeFromCookie(request);
					if (refreshToken != null) {
						String newAccessToken = refreshAccessToken(refreshToken);
						if (newAccessToken != null) {
							ResponseCookie cookie1 = ResponseCookie.from("accessToken",newAccessToken)
					                .httpOnly(true)
					                .secure(false)
					                .path("/")
					                .maxAge(900)
					                .build();
					        response.addHeader(HttpHeaders.SET_COOKIE, cookie1.toString());
						}else {
							filterChain.doFilter(request, response);
							return;
						}
					}
				}
				SecurityContext securityContext = SecurityContextHolder.createEmptyContext();
				UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(userDetails, null,
						userDetails.getAuthorities());
				token.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
				securityContext.setAuthentication(token);
				SecurityContextHolder.setContext(securityContext);

			}
		}
		filterChain.doFilter(request, response);
	}

	private String getAccessTokeFromCookie(HttpServletRequest request) {
		if (request.getCookies() != null) {
			for (Cookie cookie : request.getCookies()) {
				if (cookie.getName().equals("accessToken")) {
					return cookie.getValue();
				}
			}
		}
		return null;
	}

	private String getRefreshTokeFromCookie(HttpServletRequest request) {
		if (request.getCookies() != null) {
			for (Cookie cookie : request.getCookies()) {
				if (cookie.getName().equals("refreshToken")) {
					return cookie.getValue();
				}
			}
		}
		return null;
	}

	public String refreshAccessToken(String refreshToken) {
		if (refreshToken == null || refreshToken.isBlank()) {
			return null;
		}
		try {
			String userEmail = jwtUtils.extractUsername(refreshToken);
			UserDetails userDetails = detailsService.loadUserByUsername(userEmail);
			if (jwtUtils.isTokenValid(refreshToken, userDetails)) {
				String newAccessToken = jwtUtils.generateAccessToken(userDetails.getUsername());
				return newAccessToken;
			} else {
				return null;
			}
		} catch (Exception e) {
			return null;
		}
	}

}
