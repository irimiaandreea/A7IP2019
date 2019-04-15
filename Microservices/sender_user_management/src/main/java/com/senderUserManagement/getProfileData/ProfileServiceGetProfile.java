package com.senderUserManagement.getProfileData;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.senderUserManagement.model.JwtUser;
import com.senderUserManagement.model.ProfileForm;


@Service
public class ProfileServiceGetProfile {

	@Autowired
	private ProfilesRepositoryGetProfile profilesRepository;
	
	public List<ProfileForm> getProfiles() {
		return profilesRepository.findAll();
	}

	public Optional<ProfileForm> getProfile(String username) throws IOException {
		if(JwtUser.getUserName().equals(username)) {
		return profilesRepository.findById(username);
		}
		else throw new IOException("Invalid username");
	}

}
