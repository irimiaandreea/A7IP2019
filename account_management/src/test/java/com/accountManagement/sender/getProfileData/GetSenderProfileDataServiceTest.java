package com.accountManagement.sender.getProfileData;

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
import com.accountManagement.model.ProfilesSender;
import com.accountManagement.repositories.ProfilesSenderRepository;

@RunWith(SpringRunner.class)
@SpringBootTest
public class GetSenderProfileDataServiceTest {

	@Autowired
	private GetSenderProfileDataController service;
	
	@Autowired
	private ProfilesSenderRepository repo;
	
	@Before
	public void init() {
		JwtUser.setUserName("Alexandru");
	}
	
	@Test
	public void afisare() {
	    System.out.println(repo.findById("Alexandru").get().getPhone_number());	
		System.out.println(service.getProfile("Alexandru").getEmail());
	}
	
	@Test(expected = UnknownMatchException.class)
	public void getTest() {
		ProfilesSender sender1 = new ProfilesSender();
		sender1 = repo.findById("Alexandru").get();
		
		ProfilesSender sender2 = new ProfilesSender();
		sender2 = service.getProfile("Alexandru");
		
		assertEquals(sender1.getEmail(),sender2.getEmail());
		assertEquals(sender1.getPhone_number(),sender2.getPhone_number());
		
		ProfilesSender sender3 = new ProfilesSender();
		sender1 = service.getProfile("InexistentEmail");
		
		//se va arunca o exceptie dar testul se asteapta la aceasta
		assertNull(sender3.getPhone_number());
	}
}
