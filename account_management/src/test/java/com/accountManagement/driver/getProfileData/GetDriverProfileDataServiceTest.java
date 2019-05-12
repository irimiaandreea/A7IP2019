package com.accountManagement.driver.getProfileData;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNull;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import com.accountManagement.exceptions.UnknownMatchException;
import com.accountManagement.model.JwtUser;
import com.accountManagement.model.ProfilesDriver;
import com.accountManagement.repositories.ProfilesDriverRepository;

@RunWith(SpringRunner.class)
@SpringBootTest
public class GetDriverProfileDataServiceTest {

	@Autowired
	private GetDriverProfileDataController service;
	
	@Autowired
	private ProfilesDriverRepository repo;
	
	@Before
	public void init() {
		JwtUser.setUserName("Alexandru");
	}
	
	@Test
	public void afisare() {
	    System.out.println(repo.findById("Alexandru").get().getPhone_number());	
		System.out.println(service.getProfile("Alexandru").getBody().getPhone_number());
	}
	
	@Test(expected = UnknownMatchException.class)
	public void getTest() {

		ProfilesDriver driver1 = new ProfilesDriver();
		driver1 = repo.findById("Alexandru").get();
		
		ProfilesDriver driver2 = new ProfilesDriver();
		driver2 = service.getProfile("Alexandru").getBody();
		
		assertEquals(driver1.getEmail(),driver2.getEmail());
		assertEquals(driver1.getPhone_number(),driver2.getPhone_number());
		
		ProfilesDriver driver3 = new ProfilesDriver();
		driver1 = service.getProfile("InexistentEmail").getBody();
		
		//se va arunca o exceptie dar testul se asteapta la aceasta
		assertNull(driver3.getPhone_number());
	
	}
}
