package com.accountManagement.driver.getProfileData;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.accountManagement.model.ProfilesDriver;

@RestController
public class GetDriverProfileDataController {
	@Autowired
	GetDriverProfileDataService profilesService;

	
	 @RequestMapping("/accountManagement/getProfileInformation/driver/{username}")
		public ResponseEntity<ProfilesDriver> getProfile(@PathVariable String username )  {
		 return ResponseEntity.ok(profilesService.getProfile(username));
		}
	 
	
	 
}
