package com.accountManagement.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="login_data")
public class Users {
	
	@Id
	@Column(name="email")
	private String email;
	@Column(name="password")
	private String password;
	
	public Users() {
		
	}
	
	public Users(String email, String password) {
		this.email=email;
		this.password=password;	
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
	
	

}
