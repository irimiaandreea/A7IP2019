package com.senderUserManagement.modifyProfileData;

import org.springframework.data.jpa.repository.JpaRepository;

import com.senderUserManagement.model.ProfileForm;

public interface ProfileRepositoryModifyProfile extends JpaRepository<ProfileForm,String> {

}
