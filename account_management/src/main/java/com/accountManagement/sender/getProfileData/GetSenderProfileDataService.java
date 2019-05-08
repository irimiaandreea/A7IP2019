package com.accountManagement.sender.getProfileData;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.accountManagement.exceptions.UnknownMatchException;
import com.accountManagement.model.JwtUser;
import com.accountManagement.model.ProfilesSender;
import com.accountManagement.repositories.ProfilesSenderRepository;




@Service
public class GetSenderProfileDataService {

	@Autowired
	private ProfilesSenderRepository profilesRepository;

	public ProfilesSender getProfile(String username) {
		
        if(!profilesRepository.existsById(username)) throw new UnknownMatchException("Adresa de email invalida");
		
        
		if(!JwtUser.getUserName().equals(username)) throw new UnknownMatchException("Nu sunteti autorizat sa vedeti informatiile de profil ale altui utilizator");
		
		return profilesRepository.findById(username).get();
	}

}
