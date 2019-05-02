package com.accountManagement.driver.modifyProfileData;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.accountManagement.model.ChangedProfiles;


@RestController
public class ModifyDriverProfileDataController {

	@Autowired
	ModifyDriverProfileDataService profiles;
	 
	 @RequestMapping(method=RequestMethod.PUT,value="/accountManagement/modifyProfileInformation/driver/{username}")
	  public String changeProfileData(@PathVariable String username, @RequestBody ChangedProfiles profile) {
		  return profiles.changeProfileDataObj(username,profile);
	  }
}
