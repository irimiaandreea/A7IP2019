package com.accountManagement.resetPassword;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.stereotype.Service;

import com.accountManagement.exceptions.UnknownMatchException;
import com.accountManagement.model.JwtUser;
import com.accountManagement.model.ResetPassword;
import com.accountManagement.model.Users;
import com.accountManagement.repositories.UsersRepository;

@Service
public class ResetPasswordServices {
	@Autowired
	public UsersRepository userRepository;
	
	public String setNewPassword(ResetPassword resetPasswordUser)
	{
		if(!userRepository.existsById(resetPasswordUser.getEmail())) throw new UnknownMatchException ("Adresa de email nu este inregistrata");
        if(!BCrypt.checkpw(resetPasswordUser.getOldPassword() , userRepository.getOne(resetPasswordUser.getEmail()) .getPassword()))
        	throw new UnknownMatchException  ("Eroare: Parola data nu este corecta");
		if( !JwtUser.getUserName().equals(resetPasswordUser.getEmail()) ) throw new UnknownMatchException ("Nu sunteti autorizat sa schimbati parola altui utilizator");
        
			Users user = new Users();
			user.setEmail(resetPasswordUser.getEmail());
			 user.setPassword(BCrypt.hashpw(resetPasswordUser.getNewPassword(), BCrypt.gensalt()));
			userRepository.save(user);
			return "Resetarea parolei s-a efectuat cu success";
		    
			
		
	
	}

}
