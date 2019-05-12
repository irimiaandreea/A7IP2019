package com.accountManagement.register;

import static org.junit.Assert.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.when;

import org.assertj.core.api.Assertions.*;
import org.junit.Test;
import org.junit.jupiter.api.Assertions;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import com.accountManagement.exceptions.UnknownMatchException;
import com.accountManagement.model.ProfilesDriver;
import com.accountManagement.model.ProfilesSender;
import com.accountManagement.model.RegisterDetails;
import com.accountManagement.model.Users;
import com.accountManagement.register.RegisterService;
import com.accountManagement.repositories.ProfilesDriverRepository;
import com.accountManagement.repositories.ProfilesSenderRepository;
import com.accountManagement.repositories.UsersRepository;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringBootTest
public class RegisterServiceTest 
{

	@Autowired
	RegisterService service;
	
	@Mock
	private UsersRepository repo;
	
	@Mock
	private ProfilesDriverRepository driverRepo;
	
	@Mock
	private ProfilesSenderRepository senderRepo;
	
	
	
	@Test
	public void isPasswordStrong_Test()
	{
		RegisterDetails user = new RegisterDetails("username@gmail.com","low","12345");
		
		assertEquals(service.isPasswordStrong(user),false);
	
		user.setPassword("aStrongPassword");
		
		assertEquals(service.isPasswordStrong(user),true);
	}
	
	@Test
	public void addUser_Test_Succes()
	{
		//change user everytime tests are run
		RegisterDetails user = new RegisterDetails("userInexisten501@gmail.com","strongP","12345");
		
		when(repo.existsById(user.getEmail())).thenReturn(false);
		when(driverRepo.existsById(user.getEmail())).thenReturn(false);
		when(senderRepo.existsById(user.getEmail())).thenReturn(false);
		
		ProfilesSender senderObject = null;
		ProfilesDriver driverObject = null;
		Users userObject = null;
		
		when(senderRepo.save(senderObject)).thenReturn(senderObject);		
		when(driverRepo.save(driverObject)).thenReturn(driverObject);
		when(repo.save(userObject)).thenReturn(userObject);
		
		assertEquals(service.addUser(user),"Inregistrarea a avut loc cu success");
	}

	@Test
	public void addUser_Test_Failure_UsersRepository_Throws_Exception() 
	{
		RegisterDetails user = new RegisterDetails("username@gmail.com","strongP","12345");
		
		ProfilesSender senderObject = null;
		ProfilesDriver driverObject = null;
		Users userObject = null;

		when(senderRepo.save(senderObject)).thenReturn(senderObject);		
		when(driverRepo.save(driverObject)).thenReturn(driverObject);
		when(repo.save(userObject)).thenReturn(userObject);
		
		
		when(repo.existsById(user.getEmail())).thenThrow(
				new UnknownMatchException("Adresa de email a fost folosita deja pentru inregistrare"));
		when(driverRepo.existsById(user.getEmail())).thenReturn(false);
		when(senderRepo.existsById(user.getEmail())).thenReturn(false);

		Assertions.assertThrows(UnknownMatchException.class, () ->{
			service.addUser(user);
		});
	}
	
	@Test
	public void addUser_Test_Failure_SenderRepository_Throws_Exception() 
	{
		RegisterDetails user = new RegisterDetails("username@gmail.com","strongP","12345");
		
		ProfilesSender senderObject = null;
		ProfilesDriver driverObject = null;
		Users userObject = null;

		when(senderRepo.save(senderObject)).thenReturn(senderObject);		
		when(driverRepo.save(driverObject)).thenReturn(driverObject);
		when(repo.save(userObject)).thenReturn(userObject);
		
		
		when(driverRepo.existsById(user.getEmail())).thenThrow(
				new UnknownMatchException("Exception"));
		when(repo.existsById(user.getEmail())).thenReturn(false);
		when(senderRepo.existsById(user.getEmail())).thenReturn(false);

		Assertions.assertThrows(UnknownMatchException.class, () ->{
			service.addUser(user);
		});
	}
	
	@Test
	public void addUser_Test_Failure_DriverRepository_Throws_Exception() 
	{
		RegisterDetails user = new RegisterDetails("username@gmail.com","strongP","12345");
		
		ProfilesSender senderObject = null;
		ProfilesDriver driverObject = null;
		Users userObject = null;

		when(senderRepo.save(senderObject)).thenReturn(senderObject);		
		when(driverRepo.save(driverObject)).thenReturn(driverObject);
		when(repo.save(userObject)).thenReturn(userObject);
		
		
		when(senderRepo.existsById(user.getEmail())).thenThrow(
				new UnknownMatchException("Exception"));
		when(repo.existsById(user.getEmail())).thenReturn(false);
		when(driverRepo.existsById(user.getEmail())).thenReturn(false);

		Assertions.assertThrows(UnknownMatchException.class, () ->{
			service.addUser(user);
		});
	}
}
