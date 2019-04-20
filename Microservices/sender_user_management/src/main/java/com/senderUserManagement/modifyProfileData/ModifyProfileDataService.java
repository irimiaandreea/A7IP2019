package com.senderUserManagement.modifyProfileData;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.senderUserManagement.model.ChangedProfiles;
import com.senderUserManagement.model.JwtUser;
import com.senderUserManagement.model.Profiles;
import com.senderUserManagement.repositories.ProfilesRepository;


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
		//Profiles profile = new Profiles(username,changedProfile,profileRepo.findById(username).get());
			//profileRepo.save(profile);
			return "Success";
		}
		return "Invalid data";
	}
	
	
}
