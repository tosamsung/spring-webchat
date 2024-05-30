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

import com.duanWebChat.WebChatApplication.util.CookieUtil;
import com.duanWebChat.WebChatApplication.util.JWTUtils;

import io.jsonwebtoken.ExpiredJwtException;
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
		System.out.println("jwt filter");
		// Lấy access token từ cookie
		String requestURI = request.getRequestURI();
		System.out.println(requestURI);
		if (requestURI.equals("/auth/refreshToken") || requestURI.equals("/auth/logout")
				|| requestURI.equals("/auth/login") || requestURI.equals("/auth/register")) {
			filterChain.doFilter(request, response);
			return;
		}
		String accessToken = CookieUtil.getCookieValueByName(request, "accessToken");
		if (accessToken == null || accessToken.isBlank()) {
			System.out.println("Access token not found");
			response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
			response.setContentType("application/json");
			response.setCharacterEncoding("UTF-8");
			response.getWriter().write("{\"statusCode\": 401 ," + "\"error\": \"Access token expired\"}");

			return;
		}

		try {
			String userEmail = jwtUtils.extractUsername(accessToken);
			if (userEmail != null && SecurityContextHolder.getContext().getAuthentication() == null) {
				UserDetails userDetails = detailsService.loadUserByUsername(userEmail);
				if (jwtUtils.isTokenValid(accessToken, userDetails)) {
					UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
							userDetails, null, userDetails.getAuthorities());
					authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
					SecurityContextHolder.getContext().setAuthentication(authentication);
				}
			}
			filterChain.doFilter(request, response);
			return;
		} catch (ExpiredJwtException e) {
			System.out.println("Access token hết hạn");
			response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
			response.setContentType("application/json");
			response.setCharacterEncoding("UTF-8");
			response.getWriter().write("{\"statusCode\": 401 ," + "\"error\": \"Access token expired\"}");
			return;
		}

	}

}
