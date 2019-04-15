package com.senderUserManagement.getProfileData;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.senderUserManagement.model.ProfileForm;


@RestController
public class ProfilesController {
	@Autowired
	ProfileServiceGetProfile profilesService;
	
	@RequestMapping("/senderUserManagement/getProfileInformation/all")
	public List<ProfileForm> getProfileService(){
		return profilesService.getProfiles();
	}
	
	 @RequestMapping("/senderUserManagement/getProfileInformation/{username}")
		public Optional<ProfileForm> getProfile(@PathVariable String username ) throws IOException  {
			return profilesService.getProfile(username);
		}
	

}
