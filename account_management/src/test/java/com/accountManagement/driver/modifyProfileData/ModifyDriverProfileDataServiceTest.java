package com.accountManagement.driver.modifyProfileData;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertThat;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import com.accountManagement.exceptions.UnknownMatchException;
import com.accountManagement.model.ChangedProfiles;
import com.accountManagement.model.JwtUser;
import com.accountManagement.repositories.ProfilesDriverRepository;

@RunWith(SpringRunner.class)
@SpringBootTest
public class ModifyDriverProfileDataServiceTest {

	@Autowired
	private ModifyDriverProfileDataService service;
	
	@Autowired
	private ProfilesDriverRepository repo;
	
	@Before
	public void init() {
		JwtUser.setUserName("Alexandru");
	}
	
	@Test(expected = UnknownMatchException.class)
	public void modifyDataTest() {
		
		ChangedProfiles chg = new ChangedProfiles();
		chg.setPhone_number("075347632");
		
		assertThat(service.changeProfileDataObj("Alexandru", chg),is("Informatiile de profil au fost modificate cu succes"));
		assertEquals(repo.findById("Alexandru").get().getPhone_number(),"075347632");
	   
		//Aici testul va trece daca se va arunca o exceptie
		assertEquals(service.changeProfileDataObj("InexistentEmail", chg),"Informatiile de profil au fost modificate cu succes");

	}
}
