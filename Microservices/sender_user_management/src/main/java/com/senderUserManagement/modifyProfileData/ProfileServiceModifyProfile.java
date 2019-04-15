package com.senderUserManagement.modifyProfileData;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import com.senderUserManagement.model.ChangedProfileForm;
import com.senderUserManagement.model.JwtUser;
import com.senderUserManagement.model.ProfileForm;


@Service
public class ProfileServiceModifyProfile {

	@Autowired
	private ProfileRepositoryModifyProfile profileRepo; 

	
	public List<ProfileForm> getProfiles1() {
		return profileRepo.findAll();
	}

	public Optional<ProfileForm> getProfile(String username) {
		if(JwtUser.getUserName().equals(username))
		return profileRepo.findById(username);
		return null;
	}

	public String changeProfileDataObj(String username, ChangedProfileForm changedProfile) {

		if(profileRepo.existsById(username) && JwtUser.getUserName().equals(username) && JwtUser.getRole().equals("sender")) {
			ProfileForm profile = new ProfileForm(username,changedProfile,profileRepo.findById(username).get());
			profileRepo.save(profile);
			return "Success";
		}
		return "Invalid data";
	}
	
	
}
