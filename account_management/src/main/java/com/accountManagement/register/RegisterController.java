package com.accountManagement.register;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.accountManagement.model.RegisterDetails;

@RestController
public class RegisterController 
{
	@Autowired
	private RegisterService userLoginDataService;
	
	
	@PostMapping("/register")
	public ResponseEntity<String> registerUser(@RequestBody RegisterDetails user)
	{
	 return ResponseEntity.ok(userLoginDataService.addUser(user));
	}
}
