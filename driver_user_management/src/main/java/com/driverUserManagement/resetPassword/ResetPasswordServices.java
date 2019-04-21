package com.driverUserManagement.resetPassword;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.driverUserManagement.model.JwtUser;
import com.driverUserManagement.model.ResetPassword;
import com.driverUserManagement.model.Users;
import com.driverUserManagement.repositories.*;

@Service
public class ResetPasswordServices {
	@Autowired
	public UsersRepository userRepository;
	
	public String setNewPassword(ResetPassword resetPasswordUser)
	{
		Users user = new Users();
		if (userRepository.existsById(resetPasswordUser.getUsername()) && userRepository.existsByPassword(resetPasswordUser.getOldPassword())
				&& JwtUser.getUserName().equals(resetPasswordUser.username)
				&& JwtUser.getRole().equals("driver"))
		{
			
			user.setPassword(resetPasswordUser.getNewPassword());
			user.setUsername(resetPasswordUser.getUsername());
			userRepository.save(user);
			return "Succes";
		    
			
		}
		else
			return "Fail";
	
	}

}
