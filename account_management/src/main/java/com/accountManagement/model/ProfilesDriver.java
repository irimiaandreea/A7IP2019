package com.accountManagement.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "profile_data_sender")
public class ProfilesDriver {
	
	@Id
	@Column(name = "email")
	private String email;
	@Column(name = "phone_number")
	private String phone_number;
	
	public ProfilesDriver() {

	}

	public ProfilesDriver(ProfilesDriver profile) {
		this.email = profile.email;
		this.phone_number = profile.phone_number;
	}
	public ProfilesDriver(String email, String phone_number) {
		this.email = email;
		this.phone_number = phone_number;
	}

	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getPhone_number() {
		return phone_number;
	}
	public void setPhone_number(String phone_number) {
		this.phone_number = phone_number;
	}
	
}
