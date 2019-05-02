package com.accountManagement.login;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.accountManagement.model.Users;


@RestController
public class LoginController {

	@Autowired
	LoginService usersService;
	
	 @RequestMapping(method=RequestMethod.POST,value="/login")
	 @ResponseBody
	 public ResponseEntity<String> setUsersObj(@RequestBody Users users) {
		 return ResponseEntity.ok(usersService.setUsersObj(users));
	 }	 
	
}
