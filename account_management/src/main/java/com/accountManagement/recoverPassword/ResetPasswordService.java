package com.accountManagement.recoverPassword;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.stereotype.Component;

import com.accountManagement.exceptions.UnknownMatchException;
import com.accountManagement.model.Users;
import com.accountManagement.repositories.UsersRepository;

@Component
public class ResetPasswordService {
	
	@Autowired
	private JavaMailSender javaMailSender;
	@Autowired
	private UsersRepository userRepository;
	
	
	public void send(String to, String subject, String body,String newPassword) throws MessagingException {
		if(!userRepository.existsById(to)) throw new UnknownMatchException ("Adresa de email nu este inregistrata");
		{
		    Users user=new Users();
			user.setPassword(newPassword);
			user.setPassword(BCrypt.hashpw(user.getPassword(), BCrypt.gensalt()));
			user.setEmail(to);
			userRepository.save(user);
			
			
		}
		MimeMessage message = javaMailSender.createMimeMessage();
		MimeMessageHelper helper;
		
		helper = new MimeMessageHelper(message, true);										  
		helper.setSubject(subject);
		helper.setTo(to);
		helper.setText(body, true); 
	
		
		javaMailSender.send(message);
		
		
	}

}