package com.packages.model;

public class PackagesDriverHistory {


Integer id;
String senderAdress;
String receiverAdress;
float kilograms;
String phoneNumberSender;
String phoneNumberReceiver;
String receiverName;
int length;
int width;
int height;

public PackagesDriverHistory() {
	
}

public PackagesDriverHistory(Integer id, String senderAdress, String receiverAdress, float kilograms,
		String phoneNumberSender, String phoneNumberReceiver, String receiverName, int length, int width,
		int height) {
	super();
	this.id = id;
	this.senderAdress = senderAdress;
	this.receiverAdress = receiverAdress;
	this.kilograms = kilograms;
	this.phoneNumberSender = phoneNumberSender;
	this.phoneNumberReceiver = phoneNumberReceiver;
	this.receiverName = receiverName;
	this.length = length;
	this.width = width;
	this.height = height;
}

public PackagesDriverHistory(PackagesSenderHistory  test) {
	this.id = test.getId();
	this.senderAdress = test.getSenderAdress();
	this.receiverAdress = test.getReceiverAdress();
	this.kilograms = test.getKilograms();
	this.phoneNumberSender = test.getPhoneNumberSender();
	this.phoneNumberReceiver = test.getPhoneNumberReceiver();
	this.receiverName = test.getReceiverName();
	this.length = test.getLength();
	this.width = test.getWidth();
	this.height = test.getHeight();
}


public Integer getId() {
	return id;
}
public void setId(Integer id) {
	this.id = id;
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
public float getKilograms() {
	return kilograms;
}
public void setKilograms(float kilograms) {
	this.kilograms = kilograms;
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
public String getReceiverName() {
	return receiverName;
}
public void setReceiverName(String receiverName) {
	this.receiverName = receiverName;
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

}
