package com.driverUserManagement.modifyProfileData;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.driverUserManagement.repositories.ProfilesRepository;
import com.driverUserManagement.model.ChangedProfiles;
import com.driverUserManagement.model.JwtUser;
import com.driverUserManagement.model.Profiles;


@Service
public class ModifyProfileDataService {

	@Autowired
	private ProfilesRepository profileRepo; 

	
	public List<Profiles> getProfiles1() {
		return profileRepo.findAll();
	}

	public Optional<Profiles> getProfile(String username) {
		if(JwtUser.getUserName().equals(username))
		return profileRepo.findById(username);
		return null;
	}

	public String changeProfileDataObj(String username, ChangedProfiles changedProfile) {

		if(profileRepo.existsById(username) && JwtUser.getUserName().equals(username) && JwtUser.getRole().equals("sender")) {
		 Profiles profile = new Profiles(profileRepo.findById(username).get());
		 
		 
		 if(changedProfile.getPhone_number()!= null)
		 {
			 profile.setPhone_number(changedProfile.getPhone_number());
		 }
		 if(changedProfile.getEmail()!= null)
		 {
			 profile.setEmail(changedProfile.getEmail());
		 }
		 if(changedProfile.getCountry()!= null)
		 {
			 profile.setCountry(changedProfile.getCountry());
		 }
		 if(changedProfile.getPhoto()!= null)
		 {
			 profile.setPhoto(changedProfile.getPhoto());
		 }
			profileRepo.save(profile);

			return "Success";
		}
		return "Invalid data";
	}
	
	
}
