package com.driverUserManagement.register;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.driverUserManagement.model.Profiles;
import com.driverUserManagement.model.RegisterDetails;
import com.driverUserManagement.model.Users;


@RestController
public class RegisterController 
{
	@Autowired
	private RegisterService userLoginDataService;
	
	
	@PostMapping("/register")
	public String registerUser(@RequestBody RegisterDetails user)
	{
		return userLoginDataService.addUser(user);
	}
}
