package com.accountManagement.login;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.stereotype.Service;

import com.accountManagement.exceptions.UnknownMatchException;
import com.accountManagement.model.Users;
import com.accountManagement.repositories.UsersRepository;

@Service
public class LoginService {

	@Autowired
	private UsersRepository usersRepository;
	JwtGenerator jwtGenerator;

	public LoginService(JwtGenerator jwtGenerator) {
		this.jwtGenerator=jwtGenerator;
	}

	public String setUsersObj(Users users) {
		
		if(!usersRepository.existsById(users.getEmail())) throw new UnknownMatchException ("Adresa de email nu este inregistrata in baza de date");
		
		if(!BCrypt.checkpw(users.getPassword(), usersRepository.getOne(users.getEmail()).getPassword()))
			   throw new UnknownMatchException("Parola nu este valida");
		
		return jwtGenerator.generate(users);
	}
}
