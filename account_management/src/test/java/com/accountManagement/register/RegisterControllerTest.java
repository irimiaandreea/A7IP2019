package com.accountManagement.register;

import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.Before;
import org.junit.Ignore;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import com.accountManagement.model.RegisterDetails;
import com.accountManagement.repositories.ProfilesDriverRepository;
import com.accountManagement.repositories.ProfilesSenderRepository;
import com.accountManagement.repositories.UsersRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.Gson;

@RunWith(SpringRunner.class)
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
	
	@SuppressWarnings("deprecation")
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
	
	@Ignore
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