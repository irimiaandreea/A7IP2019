package com.accountManagement.resetPasswordTests;

import static org.hamcrest.CoreMatchers.*;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.verifyNoMoreInteractions;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
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
import com.accountManagement.model.ProfilesDriver;
import com.accountManagement.model.RegisterDetails;
import com.accountManagement.model.ResetPassword;
import com.accountManagement.model.Users;
import com.accountManagement.recoverPassword.ResetPasswordService;
import com.accountManagement.register.RegisterController;
import com.accountManagement.register.RegisterService;
import com.accountManagement.repositories.ProfilesDriverRepository;
import com.accountManagement.repositories.ProfilesSenderRepository;
import com.accountManagement.repositories.UsersRepository;
import com.accountManagement.resetPassword.ResetPasswordController;
import com.accountManagement.resetPassword.ResetPasswordServices;
import com.fasterxml.jackson.databind.ObjectMapper;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringBootTest
public class ResetPasswordControllerTests {
	
	private MockMvc mockMvc;
	
	@Mock
	private ResetPasswordServices service;
	
	@Mock
	private UsersRepository userRepo;
	
	@Mock
	private ProfilesSenderRepository senderRepo;
	
	@Mock
	private ProfilesDriverRepository driverRepo;
	
	@InjectMocks
	private ResetPasswordController controller;
    
	@Before
    public void init(){
        MockitoAnnotations.initMocks(this);
        mockMvc = MockMvcBuilders
                .standaloneSetup(controller)
                .build();
    }
	
	
	@Test
	public void setNewPassword_Test_Succes() throws Exception
	{
		ObjectMapper mapper = new ObjectMapper();
		Users user = new Users("Cosmin","12345");
		ResetPassword reset = new ResetPassword();
		reset.setEmail("Cosmin");
		reset.setNewPassword("newPass");
		reset.setOldPassword("12345");
		when(service.setNewPassword(reset)).thenReturn("Succes");
		
		mockMvc.perform(put("/accountManagement/resetPassword")
				.contentType(MediaType.APPLICATION_JSON_UTF8)
				.content(mapper.writeValueAsString(reset)))
		.andExpect(status().isOk());
		
		verify(service).setNewPassword((org.mockito.Matchers.refEq(reset)));
				
	}
	@Test
	public void setNewPassword_Test_404() throws Exception
	{
		ObjectMapper mapper = new ObjectMapper();
		Users user = new Users("Cosmin","12345");
		ResetPassword reset = new ResetPassword();
		reset.setEmail("Cosmin");
		reset.setNewPassword("newPass");
		reset.setOldPassword("12345");
		//when(service.setNewPassword(reset)).thenThrow(new UnknownMatchException("Fail"));
		
		Object object = null;
		mockMvc.perform(put("/accountManagement/resetPassword")
				.contentType(MediaType.APPLICATION_JSON_UTF8)
				.content(mapper.writeValueAsString(object)))
		.andExpect(status().isBadRequest());
		
	}
	
	
}
