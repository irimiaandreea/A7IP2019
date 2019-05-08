package com.packages.model;

public class ModifyPackageInformation {

	private int id;
	private String status;

	public ModifyPackageInformation() {	
	}

	public ModifyPackageInformation(int id,String status) {
		super();
		this.id=id;
		this.status = status;
	}
	public ModifyPackageInformation(String status) {
		super();
		this.id=0;
		this.status = status;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public int getId() {
		return this.id;
	}	
}
