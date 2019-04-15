package com.senderUserManagement.register;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.senderUserManagement.model.Users;


@Service
public class UserLoginDataService {

	private boolean isPasswordStrong(Users user)
	{
        if(user.getPassword().length()<=20 && user.getPassword().length()>=4)
        {
        	 //user.setPassword(BCrypt.hashpw(user.getPassword(), BCrypt.gensalt())); 
             return true;
        }
        return false;
        
	}
	
	@Autowired
	private UserLoginDataRepository userLoginDataRepository;
	
	public String addUser(Users user) 
	{
		if(  user.getRole().equals("sender") && isPasswordStrong(user) && 
				!userLoginDataRepository.existsById(user.getUsername()))
		{
				userLoginDataRepository.save(user);
				return "Succes";
		}
		return "Invalid data";
	}

}
