package com.accountManagement.model;

public class RegisterDetails {

	String email;
	String password;
	String phone_number;
	
	public RegisterDetails(String email,String password,String phone_number)
	{
		this.email=email;
		this.password=password;
		this.phone_number=phone_number;
	}
	public RegisterDetails(RegisterDetails userDetails)
	{
		this.email=userDetails.email;
		this.password=userDetails.password;
		this.phone_number=userDetails.phone_number;
	}
	
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getPhone_number() {
		return phone_number;
	}
	public void setPhone_number(String phone_number) {
		this.phone_number = phone_number;
	}
	
}
