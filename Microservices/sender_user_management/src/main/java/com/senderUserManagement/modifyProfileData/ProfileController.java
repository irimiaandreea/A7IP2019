package com.senderUserManagement.modifyProfileData;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.senderUserManagement.model.ChangedProfileForm;
import com.senderUserManagement.model.ProfileForm;

@RestController
public class ProfileController {

	@Autowired
	ProfileServiceModifyProfile profiles;

	 

	 
	 @RequestMapping(method=RequestMethod.PUT,value="/senderUserManagement/modifyProfileInformation/{username}")
	  public String changeProfileData(@PathVariable String username, @RequestBody ChangedProfileForm profile) {
		  return profiles.changeProfileDataObj(username,profile);
	  }
}
