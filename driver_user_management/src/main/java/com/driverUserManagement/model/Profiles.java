package com.driverUserManagement.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "profile_data")
public class Profiles {

	@Id
	@Column(name = "username")
	String username;

	@Column(name = "email")
	String email;
	@Column(name = "phone_number")
	String phone_number;
	@Column(name = "country")
	String country;
	@Column(name = "photo")
	String photo;
	
	public Profiles() {

	}

	public Profiles(Profiles profile) {
		this.username = profile.username;
		this.email = profile.email;
		this.phone_number = profile.phone_number;
		this.country = profile.country;
		this.photo = profile.photo;

	}

	public Profiles(String username, String email, String phone_number, String country, String photo) {
		this.username = username;
		this.email = email;
		this.phone_number = phone_number;
		this.country = country;
		this.photo = photo;

	}
	// public Profiles(String username2, ChangedProfiles changedProfile,Profiles
	// profile) {
	// this.username=username2;
	// if(changedProfile.getAddress1()!= null) this.address1 =
	// changedProfile.getAddress1();
	// if(changedProfile.getAddress2()!= null) this.address2 =
	// changedProfile.getAddress2();
	// if(changedProfile.getAddress3()!= null) this.address3 =
	// changedProfile.getAddress3();
	// if(changedProfile.getAddress4()!= null) this.address4 =
	// changedProfile.getAddress4();
	// if(changedProfile.getAddress5()!= null) this.address5 =
	// changedProfile.getAddress5();
	// if(this.address1== null) this.address1=profile.address1;
	// if(this.address2== null) this.address2=profile.address2;
	// if(this.address3== null) this.address3=profile.address3;
	// if(this.address4== null) this.address4=profile.address4;
	// if(this.address5== null) this.address5=profile.address5;

	// }

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
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

	

}
