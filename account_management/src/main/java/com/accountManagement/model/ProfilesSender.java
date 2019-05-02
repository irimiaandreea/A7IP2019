package com.accountManagement.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "profile_data_sender")
public class ProfilesSender {

	@Id
	@Column(name = "email")
	private String email;
	@Column(name = "phone_number")
	private String phone_number;
	@Column(name = "address1")
	private String address1;
	@Column(name = "address2")
	private String address2;
	@Column(name = "address3")
	private String address3;
	@Column(name = "address4")
	private String address4;
	@Column(name = "address5")
	private String address5;

	public ProfilesSender() {

	}

	public ProfilesSender(ProfilesSender profile) {
		this.email = profile.email;
		this.phone_number = profile.phone_number;
		this.address1 = profile.address1;
		this.address2 = profile.address2;
		this.address3 = profile.address3;
		this.address4 = profile.address4;
		this.address5 = profile.address5;

	}

	public ProfilesSender(String email, String phone_number,String address1,
			String address2, String address3, String address4, String address5) {
		this.email = email;
		this.phone_number = phone_number;
		this.address1 = address1;
		this.address2 = address2;
	}

	public String getAddress1() {
		return address1;
	}

	public void setAddress1(String address1) {
		this.address1 = address1;
	}

	public String getAddress2() {
		return address2;
	}

	public void setAddress2(String address2) {
		this.address2 = address2;
	}

	public String getAddress3() {
		return address3;
	}

	public void setAddress3(String address3) {
		this.address3 = address3;
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

	public String getAddress4() {
		return address4;
	}

	public void setAddress4(String address4) {
		this.address4 = address4;
	}

	public String getAddress5() {
		return address5;
	}

	public void setAddress5(String address5) {
		this.address5 = address5;
	}

}
