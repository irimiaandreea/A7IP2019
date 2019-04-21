package com.driverUserManagement.model;

import javax.persistence.Column;

public class ChangedProfiles {
	String email;
	String phone_number;
	String country;
	String photo;
	
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
	public String getCountry() {
		return country;
	}
	public void setCountry(String country) {
		this.country = country;
	}
	public String getPhoto() {
		return photo;
	}
	public void setPhoto(String photo) {
		this.photo = photo;
	}
	
	public ChangedProfiles(String email, String phone_number, String country, String photo) {
		super();
		this.email = email;
		this.phone_number = phone_number;
		this.country = country;
		this.photo = photo;
		
	}


	
	

}
