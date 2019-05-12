package com.accountManagement.register;

import static org.hamcrest.CoreMatchers.*;

import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.verifyNoMoreInteractions;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import org.hibernate.annotations.Any;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.mockito.ArgumentMatchers.*;

import com.accountManagement.model.RegisterDetails;
import com.accountManagement.register.RegisterController;
import com.accountManagement.register.RegisterService;
import com.accountManagement.repositories.ProfilesDriverRepository;
import com.accountManagement.repositories.ProfilesSenderRepository;
import com.accountManagement.repositories.UsersRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.Gson;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringBootTest
public class RegisterControllerTest 
{
	@Autowired
	private MockMvc mockMvc;
	
	@Mock
	private RegisterService service;
	
	@Mock
	private UsersRepository userRepo;
	
	@Mock
	private ProfilesSenderRepository senderRepo;
	
	@Mock
	private ProfilesDriverRepository driverRepo;
	
	@InjectMocks
	private RegisterController controller;
    
	@Before
    public void init(){
        MockitoAnnotations.initMocks(this);
        mockMvc = MockMvcBuilders
                .standaloneSetup(controller)
                .build();
    }
	
	@Test
	public void Controller_Test_Succes() throws Exception
	{
		ObjectMapper mapper = new ObjectMapper();
		Gson gson = new Gson();
		final RegisterDetails user = new RegisterDetails("user@gmail.com","password","0761234567");

		when(service.addUser(user)).thenReturn("Succes");
		
		mockMvc.perform(post("/register")
				.contentType(MediaType.APPLICATION_JSON)
				.content(gson.toJson(user)))
		.andExpect(status().isOk());
		
		//verify(service).addUser((org.mockito.Matchers.refEq(user)));
	}
	
	@Test
	public void Controller_Test_Failure() throws Exception
	{
		ObjectMapper mapper = new ObjectMapper();
		Gson gson = new Gson();
		final RegisterDetails user = new RegisterDetails("user@gmail.com","password","0761234567");

		Object object= null;
		when(service.addUser(user)).thenReturn("Succes");
		
		mockMvc.perform(post("/register")
				.contentType(MediaType.APPLICATION_JSON)
				.content(gson.toJson(user)))
		.andExpect(status().isBadRequest());
		
	}
}