package com.accountManagement.sender.getProfileData;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.accountManagement.model.ProfilesSender;




@RestController
public class GetSenderProfileDataController {
	@Autowired
	GetSenderProfileDataService profilesService;
	
	 @RequestMapping("/accountManagement/getProfileInformation/sender/{username}")
		public ProfilesSender getProfile(@PathVariable String username ) {
			return profilesService.getProfile(username);
		}
	

}
