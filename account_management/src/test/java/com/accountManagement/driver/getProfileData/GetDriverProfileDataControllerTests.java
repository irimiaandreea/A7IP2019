package com.accountManagement.driver.getProfileData;

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
import com.accountManagement.model.ProfilesDriver;
import com.accountManagement.model.RegisterDetails;
import com.accountManagement.register.RegisterController;
import com.accountManagement.register.RegisterService;
import com.accountManagement.repositories.ProfilesDriverRepository;
import com.accountManagement.repositories.ProfilesSenderRepository;
import com.accountManagement.repositories.UsersRepository;
import com.fasterxml.jackson.databind.ObjectMapper;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringBootTest
public class GetDriverProfileDataControllerTests {
	
	private MockMvc mockMvc;
	
	@Mock
	private GetDriverProfileDataService service;
	
	@Mock
	private UsersRepository userRepo;
	
	@Mock
	private ProfilesSenderRepository senderRepo;
	
	@Mock
	private ProfilesDriverRepository driverRepo;
	
	@InjectMocks
	private GetDriverProfileDataController controller;
    
	@Before
    public void init(){
        MockitoAnnotations.initMocks(this);
        mockMvc = MockMvcBuilders
                .standaloneSetup(controller)
                .build();
    }
	
	
	@Test
	public void getProfile_Test_Succes() throws Exception
	{

		ProfilesDriver driver = new ProfilesDriver("Cosmin","123456789");
		
		when(service.getProfile(driver.getEmail())).thenReturn(driver);
		
		mockMvc.perform(get("/accountManagement/getProfileInformation/driver/Cosmin"))
		.andExpect(status().isOk())
		.andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8))
		.andExpect(jsonPath("$.email", is(driver.getEmail())))
		.andExpect(jsonPath("$.phone_number",is(driver.getPhone_number())));
		
		verify(service).getProfile(driver.getEmail());
	}
	
	@Test
	public void getProfile_Test_404() throws Exception
	{
		ProfilesDriver driver = new ProfilesDriver("notInDatabase","123456789");
		
		when(service.getProfile(driver.getEmail())).thenThrow(new UnknownMatchException("Adresa de email invalida"));
		
		mockMvc.perform(get("/accountManagement/getProfileInformation/driver/notInDatabase"))
		.andExpect(status().isNotFound());
		
		verify(service).getProfile(driver.getEmail());
	}
	
	
}
