package com.accountManagement.sender.modifyProfileData;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.accountManagement.exceptions.UnknownMatchException;
import com.accountManagement.model.ChangedProfiles;
import com.accountManagement.model.JwtUser;
import com.accountManagement.model.ProfilesSender;
import com.accountManagement.repositories.ProfilesSenderRepository;


@Service
public class ModifySenderProfileDataService {

	@Autowired
	private ProfilesSenderRepository profileRepo; 


	public String changeProfileDataObj(String username, ChangedProfiles changedProfile) {

		if(!profileRepo.existsById(username) ) throw new UnknownMatchException ("Adresa de email nu exista in baza de date");
		
		//if(!JwtUser.getUserName().equals(username)) throw new UnknownMatchException ("Nu sunteti autorizat sa folositi schimabati informatiile de profil al altui utilizator");

		 ProfilesSender profile = new ProfilesSender();
		profile=profileRepo.findById(username).get();
		 if(changedProfile.getAddress1() != null)
		 {
			 profile.setAddress1(changedProfile.getAddress1());
		 }
		 if(changedProfile.getAddress2()!= null)
		 {
			 profile.setAddress2(changedProfile.getAddress2());
		 }
		 if(changedProfile.getAddress3()!= null)
		 {
			 profile.setAddress3(changedProfile.getAddress3());
		 }
		 if(changedProfile.getAddress4()!= null)
		 {
			 profile.setAddress4(changedProfile.getAddress4());
		 }
		 if(changedProfile.getAddress5()!= null)
		 {
			 profile.setAddress5(changedProfile.getAddress5());
		 }
		 
		 if(changedProfile.getPhone_number()!= null)
		 {
			 profile.setPhone_number(changedProfile.getPhone_number());
		 }
		
			profileRepo.save(profile);

			return "Informatiile de profil au fost modificate cu succes";
	}
	
	
}
