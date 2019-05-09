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
public class ProfilesDriverRepositoryTests 
{
	@Autowired
	ProfilesDriverRepository driverRepo;
	
	@Test
	public void existsById_Test()
	{
		ProfilesDriver driver = new ProfilesDriver("Cosmin","123456789");
		ProfilesDriver testDriver = driverRepo.findById("Cosmin").get();
	
		assertEquals(testDriver.getEmail(),driver.getEmail());
		assertEquals(testDriver.getPhone_number(),driver.getPhone_number());
	
		ProfilesDriver userTest = new ProfilesDriver("anInexistentUser","paroal23");
		
		assertEquals(driverRepo.findById(userTest.getEmail()),Optional.empty());
	}
	
	@Test
	public void save_Test()
	{
		ProfilesDriver driver = new ProfilesDriver("Gigel","123456789");
		driverRepo.save(driver);
		ProfilesDriver testDriver = driverRepo.findById("Gigel").get();
		
		assertEquals(testDriver.getEmail(),driver.getEmail());
		assertEquals(testDriver.getPhone_number(),driver.getPhone_number());
	}
}
