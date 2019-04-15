package com.senderUserManagement.getProfileData;

import org.springframework.data.jpa.repository.JpaRepository;

import com.senderUserManagement.model.ProfileForm;



public interface ProfilesRepositoryGetProfile extends JpaRepository<ProfileForm,String>{

}
