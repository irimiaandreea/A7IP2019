package com.accountManagement.register;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.stereotype.Service;

import com.accountManagement.exceptions.UnknownMatchException;
import com.accountManagement.model.ProfilesDriver;
import com.accountManagement.model.ProfilesSender;
import com.accountManagement.model.RegisterDetails;
import com.accountManagement.model.Users;
import com.accountManagement.repositories.ProfilesDriverRepository;
import com.accountManagement.repositories.ProfilesSenderRepository;
import com.accountManagement.repositories.UsersRepository;


@Service
public class RegisterService {

	public boolean isPasswordStrong(RegisterDetails user)
	{
        if(user.getPassword().length()<=20 && user.getPassword().length()>=4)
        {
        	 user.setPassword(BCrypt.hashpw(user.getPassword(), BCrypt.gensalt())); 
             return true;
        }
        return false;    
	}
	
	@Autowired
	private UsersRepository usersRepository;
	@Autowired
	private ProfilesSenderRepository profilesSenderRepository;
	@Autowired
	private ProfilesDriverRepository profilesDriverRepository;
	

	public String addUser(RegisterDetails newUser) 
	{	
	
		if(!isPasswordStrong(newUser)) throw new UnknownMatchException ("Parola nu este sigura. Introduceti o parola care are intre 4 si 20 de caractere");
		
		if(usersRepository.existsById(newUser.getEmail())) throw new UnknownMatchException ("Adresa de email a fost folosita deja pentru inregistrare");
		
		if (profilesSenderRepository.existsById(newUser.getEmail()))
			throw new UnknownMatchException  ("Eroare: Adresa de email a fost inregistrata in informatiile de profil pentru senderi");

		if( profilesDriverRepository.existsById(newUser.getEmail()))
			throw new UnknownMatchException  ("Eroare: Adresa de email a fost inregistrata in informatiile de profil pentru driveri");

		
			Users user = new Users(newUser.getEmail(),newUser.getPassword());
			ProfilesSender senderProfile = new ProfilesSender(newUser.getEmail(),newUser.getPhone_number()
					,null,null,null,null,null);
			ProfilesDriver driverProfile = new ProfilesDriver(newUser.getEmail(),newUser.getPhone_number());
				profilesSenderRepository.save(senderProfile);
				profilesDriverRepository.save(driverProfile);
				usersRepository.save(user);
				return "Inregistrarea a avut loc cu success";
	}

}
