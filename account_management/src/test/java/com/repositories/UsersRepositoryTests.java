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
public class UsersRepositoryTests
{
	@Autowired
	UsersRepository repo;
	
	@Test
	public void existsById_Test() throws Exception
	{
		
		Users user = new Users("Cosmin","12345");
		Users testUser = repo.findById("Cosmin").get();
		
		assertEquals(testUser.getEmail(),user.getEmail());
		assertEquals(BCrypt.checkpw(user.getPassword(),testUser.getPassword()),true); 
	
		Users userTest = new Users("anInexistentUser","paroal23");
		
		assertEquals(repo.findById(userTest.getEmail()),Optional.empty());
	}

	@Test
	public void save_Test() throws Exception
	{
		Users user = new Users("Gigel","12345");
		repo.save(user);
		Users testUser = repo.findById("Gigel").get();
		assertEquals(testUser.getEmail(),user.getEmail());
	}
	
	@Test
	public void existsByPassword_Test() throws Exception
	{
		Users user = new Users("Cosmin","12345");
		Users testUser = repo.findById(user.getEmail()).get();
		
		boolean exists = repo.existsByPassword(testUser.getPassword());
		
		assertEquals(true,exists);
		
		//returns false because password is stored as hash, not plain text
		boolean exists2 = repo.existsByPassword(user.getPassword());
		
		assertEquals(false,exists2);
		
	}

}