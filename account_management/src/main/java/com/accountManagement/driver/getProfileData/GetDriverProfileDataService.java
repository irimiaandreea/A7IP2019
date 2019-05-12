package com.accountManagement.driver.getProfileData;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.accountManagement.exceptions.UnknownMatchException;
import com.accountManagement.model.JwtUser;
import com.accountManagement.model.ProfilesDriver;
import com.accountManagement.repositories.ProfilesDriverRepository;


@Service
public class GetDriverProfileDataService {

	@Autowired
	private ProfilesDriverRepository profilesRepository;
	

	public ProfilesDriver getProfile(String username) throws UnknownMatchException {
		
		if(!profilesRepository.existsById(username)) throw new UnknownMatchException("Adresa de email invalida");
		
		if(!JwtUser.getUserName().equals(username)) throw new UnknownMatchException("Nu sunteti autorizat sa vedeti informatiile de profil al altui utilizator");
		
		return profilesRepository.findById(username).get();
	}
	
	

}
