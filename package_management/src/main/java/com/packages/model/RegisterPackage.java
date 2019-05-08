package com.packages.model;

public class RegisterPackage {


	public RegisterPackage(String emailSender, String senderAdress, String receiverAdress, float kilograms, int length,
			int width, int height, String phoneNumberSender, String phoneNumberReceiver, String receiverName) {
		super();
		this.emailSender = emailSender;
		this.senderAdress = senderAdress;
		this.receiverAdress = receiverAdress;
		this.kilograms = kilograms;
		this.length = length;
		this.width = width;
		this.height = height;
		this.phoneNumberSender = phoneNumberSender;
		this.phoneNumberReceiver = phoneNumberReceiver;
		this.receiverName = receiverName;
	}
	private String emailSender;
	private String senderAdress;
	private String receiverAdress;
	private float kilograms;
	int length;
	int width;
	int height;
	private String phoneNumberSender;
	private String phoneNumberReceiver;
	private String receiverName;
	
	public RegisterPackage() {
		
	}
	public String getEmailSender() {
		return emailSender;
	}
	public void setEmailSender(String emailSender) {
		this.emailSender = emailSender;
	}
	public String getSenderAdress() {
		return senderAdress;
	}
	public void setSenderAdress(String senderAdress) {
		this.senderAdress = senderAdress;
	}
	public String getReceiverAdress() {
		return receiverAdress;
	}
	public void setReceiverAdress(String receiverAdress) {
		this.receiverAdress = receiverAdress;
	}
	public int getLength() {
		return length;
	}
	public void setLength(int length) {
		this.length = length;
	}
	public int getWidth() {
		return width;
	}
	public void setWidth(int width) {
		this.width = width;
	}
	public int getHeight() {
		return height;
	}
	public void setHeight(int height) {
		this.height = height;
	}
	public String getPhoneNumberSender() {
		return phoneNumberSender;
	}
	public void setPhoneNumberSender(String phoneNumberSender) {
		this.phoneNumberSender = phoneNumberSender;
	}
	public String getPhoneNumberReceiver() {
		return phoneNumberReceiver;
	}
	public void setPhoneNumberReceiver(String phoneNumberReceiver) {
		this.phoneNumberReceiver = phoneNumberReceiver;
	}
	public float getKilograms() {
		return kilograms;
	}
	public void setKilograms(float kilograms) {
		this.kilograms = kilograms;
	}
	public String getReceiverName() {
		return receiverName;
	}
	public void setReceiverName(String receiverName) {
		this.receiverName = receiverName;
	}

}
