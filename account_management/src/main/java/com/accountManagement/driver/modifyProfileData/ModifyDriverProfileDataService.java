package com.accountManagement.driver.modifyProfileData;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.accountManagement.exceptions.UnknownMatchException;
import com.accountManagement.model.ChangedProfiles;
import com.accountManagement.model.JwtUser;
import com.accountManagement.model.ProfilesSender;
import com.accountManagement.repositories.ProfilesSenderRepository;


@Service
public class ModifyDriverProfileDataService {

	@Autowired
	private ProfilesSenderRepository profileRepo; 

	public List<ProfilesSender> getProfiles1() {
		return profileRepo.findAll();
	}

	public String changeProfileDataObj(String username, ChangedProfiles changedProfile) {

		if(!profileRepo.existsById(username) ) throw new UnknownMatchException ("Adresa de email nu exista in baza de date");
		if(!JwtUser.getUserName().equals(username)) throw new UnknownMatchException ("Nu sunteti autorizat sa schimabati informatiile de profil al altui utilizator");
		
		 ProfilesSender profile = new ProfilesSender(profileRepo.findById(username).get());
		 
		 if(changedProfile.getPhone_number()!= null)
		 {
			 profile.setPhone_number(changedProfile.getPhone_number());
		 }

			profileRepo.save(profile);

			return "Informatiile de profil au fost modificate cu succes";
	}
	
	
}
