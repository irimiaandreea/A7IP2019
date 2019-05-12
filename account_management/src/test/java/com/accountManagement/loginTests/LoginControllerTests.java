package com.accountManagement.loginTests;

import static org.hamcrest.CoreMatchers.*;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.verifyNoMoreInteractions;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import org.hibernate.annotations.Any;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.mockito.ArgumentMatchers.*;

import com.accountManagement.driver.getProfileData.GetDriverProfileDataController;
import com.accountManagement.driver.getProfileData.GetDriverProfileDataService;
import com.accountManagement.exceptions.UnknownMatchException;
import com.accountManagement.login.LoginController;
import com.accountManagement.login.LoginService;
import com.accountManagement.model.ProfilesDriver;
import com.accountManagement.model.RegisterDetails;
import com.accountManagement.model.Users;
import com.accountManagement.register.RegisterController;
import com.accountManagement.register.RegisterService;
import com.accountManagement.repositories.ProfilesDriverRepository;
import com.accountManagement.repositories.ProfilesSenderRepository;
import com.accountManagement.repositories.UsersRepository;
import com.fasterxml.jackson.databind.ObjectMapper;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringBootTest
public class LoginControllerTests{
	
	private MockMvc mockMvc;
	
	@Mock
	private LoginService service;
	
	@Mock
	private UsersRepository userRepo;
	
	@Mock
	private ProfilesSenderRepository senderRepo;
	
	@Mock
	private ProfilesDriverRepository driverRepo;
	
	@InjectMocks
	private LoginController controller;
    
	@Before
    public void init(){
        MockitoAnnotations.initMocks(this);
        mockMvc = MockMvcBuilders
                .standaloneSetup(controller)
                .build();
    }
	
	@Test
	public void login_Test_Succes() throws Exception
	{
		Users user = new Users("Cosmin","12345");
		
		ObjectMapper mapper = new ObjectMapper();
		
		when(service.setUsersObj(user)).thenReturn("succes");
		
		mockMvc.perform(post("/login")
				.contentType(MediaType.APPLICATION_JSON)
				.content(mapper.writeValueAsString(user)))
		.andExpect(status().isOk());
//		.andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE));
		verify(service).setUsersObj((org.mockito.Matchers.refEq(user)));
	}
	
	@Test
	public void login_Test_404() throws Exception
	{
//		Users user = new Users("newUserNotFound","1313131");
		ObjectMapper mapper = new ObjectMapper();
		Object object =null;
//		when(service.setUsersObj(user)).thenThrow(
//				new UnknownMatchException("Parola nu este valida"));
		
		mockMvc.perform(post("/login")
				.contentType(MediaType.APPLICATION_JSON)
				.content(mapper.writeValueAsString(object)))
		.andExpect(status().isBadRequest());
		
		//verify(service).setUsersObj((org.mockito.Matchers.refEq(user)));
	}
	

}
