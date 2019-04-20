package com.senderUserManagement.register;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.senderUserManagement.model.Users;
import com.senderUserManagement.repositories.UsersRepository;


@Service
public class RegisterService {

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
	private UsersRepository usersRepository;
	
	public String addUser(Users user) 
	{
		if(  isPasswordStrong(user) && 
				!usersRepository.existsById(user.getUsername()))
		{
				usersRepository.save(user);
				return "Succes";
		}
		return "Invalid data";
	}

}
