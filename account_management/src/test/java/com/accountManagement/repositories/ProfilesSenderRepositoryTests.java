package com.accountManagement.repositories;
import static org.junit.Assert.assertEquals;

import java.util.Optional;

import org.junit.Test;
import org.junit.runner.RunWith;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase.Replace;
import org.springframework.test.context.junit4.SpringRunner;

import com.accountManagement.model.ProfilesDriver;
import com.accountManagement.model.ProfilesSender;
import com.accountManagement.model.Users;

@RunWith(SpringRunner.class)
@DataJpaTest
@ActiveProfiles("")
@AutoConfigureTestDatabase(replace=Replace.NONE)
public class ProfilesSenderRepositoryTests 
{
	//Before running these tests:
		//Run as -> Run Configurations-> Select JUnit4 as Test Runner
	@Autowired
	ProfilesSenderRepository senderRepo;

	@Test
	public void existsById_Test()
	{
		ProfilesSender sender = new ProfilesSender("Cosmin","123456789",null,null,null,null,null);
		ProfilesSender testSender = senderRepo.findById("Cosmin").get();
		
		assertEquals(testSender.getEmail(),sender.getEmail());
		assertEquals(testSender.getPhone_number(),sender.getPhone_number());
		
		ProfilesSender userTest = new ProfilesSender("anInexistentUser","1234567",null,null,null,null,null);
		
		assertEquals(senderRepo.findById(userTest.getEmail()),Optional.empty());
	}
	
	@Test
	public void save_Test()
	{
		ProfilesSender sender = new ProfilesSender("Gigel","123456789",null,null,null,null,null);
		senderRepo.save(sender);
		ProfilesSender testSender = senderRepo.findById("Gigel").get();
		assertEquals(testSender.getEmail(),sender.getEmail());
		assertEquals(testSender.getPhone_number(),sender.getPhone_number());
	}
}
