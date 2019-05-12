package com.accountManagement.repositories;
import static org.junit.Assert.assertEquals;

import java.util.Optional;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import com.accountManagement.model.ProfilesSender;
import com.accountManagement.repositories.ProfilesSenderRepository;

@RunWith(SpringRunner.class)
@SpringBootTest
public class ProfilesSenderRepositoryTests 
{
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
