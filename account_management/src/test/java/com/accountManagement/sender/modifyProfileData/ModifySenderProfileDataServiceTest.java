package com.accountManagement.sender.modifyProfileData;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNull;
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
import com.accountManagement.repositories.ProfilesSenderRepository;

@RunWith(SpringRunner.class)
@SpringBootTest
public class ModifySenderProfileDataServiceTest {

	@Autowired
	private ModifySenderProfileDataService service;
	
	@Autowired
	private ProfilesSenderRepository repo;
	
	@Before
	public void init() {
		JwtUser.setUserName("Alexandru");
	}
	
	@Test(expected = UnknownMatchException.class)
	public void modifyDataTest() {
		
		ChangedProfiles chg = new ChangedProfiles();
		chg.setPhone_number("075347111");
		chg.setAddress1("Str. Lt. Stoicescu Nr. 14");
		
		assertThat(service.changeProfileDataObj("Alexandru", chg),is("Informatiile de profil au fost modificate cu succes"));
		assertEquals(repo.findById("Alexandru").get().getPhone_number(),"075347111");
	    assertEquals(repo.findById("Alexandru").get().getAddress1(),"Str. Lt. Stoicescu Nr. 14");
		  assertNull(repo.findById("Alexandru").get().getAddress2());

	   
		//Aici testul va trece daca se va arunca o exceptie
		assertEquals(service.changeProfileDataObj("InexistentEmail", chg),"Informatiile de profil au fost modificate cu succes");

	}
}
