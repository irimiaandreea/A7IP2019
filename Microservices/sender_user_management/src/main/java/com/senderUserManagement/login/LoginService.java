package com.senderUserManagement.login;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.senderUserManagement.model.Users;
import com.senderUserManagement.repositories.UsersRepository;

@Service
public class LoginService {

	@Autowired
	private UsersRepository usersRepository;
	JwtGenerator jwtGenerator;

	public LoginService(JwtGenerator jwtGenerator) {
		this.jwtGenerator=jwtGenerator;
	}
	public List<Users> getUsers() {
		return usersRepository.findAll();
	}
	
	

	public String setUsersObj(Users users) {
		if(usersRepository.existsById(users.getUsername()) && 
				usersRepository.getOne(users.getUsername()).getPassword().equals(users.getPassword()))
		   {
		       return jwtGenerator.generate(users);
		   }
		 return "Date invalide";
	}
	
	
	
}
