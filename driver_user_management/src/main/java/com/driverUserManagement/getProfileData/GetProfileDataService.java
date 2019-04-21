package com.driverUserManagement.getProfileData;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.driverUserManagement.model.JwtUser;
import com.driverUserManagement.model.Profiles;
import com.driverUserManagement.repositories.ProfilesRepository;


@Service
public class GetProfileDataService {

	@Autowired
	private ProfilesRepository profilesRepository;
	
	public List<Profiles> getProfiles() {
		return profilesRepository.findAll();
	}

	public Optional<Profiles> getProfile(String username) throws IOException {
		if(JwtUser.getUserName().equals(username)&&JwtUser.getRole().equals("driver")) {
		return profilesRepository.findById(username);
		}
		else throw new IOException("Invalid username");
	}

}
