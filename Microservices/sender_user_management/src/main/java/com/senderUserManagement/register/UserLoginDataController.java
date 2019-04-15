package com.senderUserManagement.register;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.senderUserManagement.model.Users;


@RestController
public class UserLoginDataController 
{
	@Autowired
	private UserLoginDataService userLoginDataService;
	
	
	@PostMapping("/register")
	public String registerUser(@RequestBody Users user)
	{
		return userLoginDataService.addUser(user);
	}
}
