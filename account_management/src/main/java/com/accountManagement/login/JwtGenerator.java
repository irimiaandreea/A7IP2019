package com.accountManagement.login;

import org.springframework.stereotype.Component;

import com.accountManagement.model.Users;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

@Component
public class JwtGenerator {

	public String generate(Users users) {
		Claims claims = Jwts.claims();
		claims.put("email",users.getEmail());
		return Jwts.builder()
				.setClaims(claims)
				.signWith(SignatureAlgorithm.HS512, "iUber")
				.compact();
	}
}
