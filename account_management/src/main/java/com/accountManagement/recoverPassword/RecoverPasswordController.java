package com.accountManagement.recoverPassword;


import javax.mail.MessagingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.accountManagement.model.Users;

import java.util.Random;

@RestController
public class RecoverPasswordController {
	
	@Autowired
	private ResetPasswordService smtpMailSender;
	private PasswordGenerator newPassword;

	@RequestMapping("/passwordRecovery/{email}")
	public void sendMail(@PathVariable String email) throws MessagingException {
		String password = "";
		Random r = new Random();
		int low = 6;
		int high = 15;
		int result = r.nextInt(high-low) + low;
		password=newPassword.generatePassword(result);
		smtpMailSender.send(email, "Your iUber password", "Parola ta este "+password ,password);		
		
		
	}
	

}