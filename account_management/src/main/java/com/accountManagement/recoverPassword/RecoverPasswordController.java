package com.accountManagement.recoverPassword;

import javax.mail.MessagingException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
public class RecoverPasswordController {
	
	@Autowired
	private  ResetPasswordService smtpMailSender;

	@RequestMapping("/passwordRecovery")
	public void sendMail() throws MessagingException {
		
		String password="";
		
		
		
		smtpMailSender.send("zornet.samp@gmail.com", "Your new iUber password", "Parola ta schimbata este: ");
		
	}
	

}