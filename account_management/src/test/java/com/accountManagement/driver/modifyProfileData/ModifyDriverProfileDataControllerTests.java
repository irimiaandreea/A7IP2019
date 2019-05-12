package com.accountManagement.driver.modifyProfileData;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import com.accountManagement.driver.getProfileData.GetDriverProfileDataController;
import com.accountManagement.driver.getProfileData.GetDriverProfileDataService;
import com.accountManagement.driver.modifyProfileData.ModifyDriverProfileDataController;
import com.accountManagement.driver.modifyProfileData.ModifyDriverProfileDataService;
import com.accountManagement.model.ChangedProfiles;
import com.accountManagement.model.ProfilesSender;
import com.accountManagement.repositories.ProfilesDriverRepository;
import com.accountManagement.repositories.ProfilesSenderRepository;
import com.accountManagement.repositories.UsersRepository;
import com.fasterxml.jackson.databind.ObjectMapper;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringBootTest
public class ModifyDriverProfileDataControllerTests 
{
private MockMvc mockMvc;
	
	@Mock
	private ModifyDriverProfileDataService service;
	
	@Mock
	private UsersRepository userRepo;
	
	@Mock
	private ProfilesSenderRepository senderRepo;
	
	@Mock
	private ProfilesDriverRepository driverRepo;
	
	@InjectMocks
	private ModifyDriverProfileDataController controller;

	@Before
    public void init(){
        MockitoAnnotations.initMocks(this);
        mockMvc = MockMvcBuilders
                .standaloneSetup(controller)
                .build();
    }
	
	/*
	 * NestedServletException
	@Test
	public void changeProfileData_Test_Succes() throws Exception
	{
		ObjectMapper mapper = new ObjectMapper();
		ProfilesSender sender = new ProfilesSender("Cosmin","123456789",null,null,null,null,null);
		
		ChangedProfiles senderUpdated = new ChangedProfiles(null,"123456987",null,null,null,null,null,null,null);
		
		String response = "Informatiile de profil au fost modificate cu succes";
		
		when(service.changeProfileDataObj(sender.getEmail(), senderUpdated)).thenReturn(response);
		
		mockMvc.perform(put("/accountManagement/modifyProfileInformation/driver/Cosmin")
				.contentType(MediaType.APPLICATION_JSON_UTF8)
				.content(mapper.writeValueAsString(senderUpdated)))
		.andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE));
	}*/
	

}
