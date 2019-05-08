package com.packages.model;


import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="packages")
public class PackagesSenderHistory {

	public PackagesSenderHistory(Integer id, String emailSender, String emailDriver, String senderAdress,
			String receiverAdress, float kilograms, String phoneNumberSender,
			String phoneNumberReceiver, int pin, String status, String receiverName, int length, int width,
			int height) {
		super();
		this.id = id;
		this.emailSender = emailSender;
		this.emailDriver = emailDriver;
		this.senderAdress = senderAdress;
		this.receiverAdress = receiverAdress;
		this.kilograms = kilograms;
		this.phoneNumberSender = phoneNumberSender;
		this.phoneNumberReceiver = phoneNumberReceiver;
		this.pin = pin;
		this.status = status;
		this.receiverName = receiverName;
		this.length = length;
		this.width = width;
		this.height = height;
	}

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
@Column(name="id")
	Integer id;
@Column(name="email_sender")
	String emailSender;
@Column(name="emailDriver")
	String emailDriver;
@Column(name="sender_address")
String senderAdress;
@Column(name="receiver_address")
String receiverAdress;
@Column(name="kilograms")
float kilograms;
@Column(name="phone_number_sender")
String phoneNumberSender;
@Column(name="phone_number_receiver")
	String phoneNumberReceiver;
@Column(name="pin")
	int pin;
@Column(name="status")
	String status;
@Column(name="receiver_name")
String receiverName;
@Column(name="lenght")
int length;
@Column(name="width")
int width;
@Column(name="height")
int height;
		
	public PackagesSenderHistory() { }

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getEmailSender() {
		return emailSender;
	}

	public void setEmailSender(String emailSender) {
		this.emailSender = emailSender;
	}

	public String getEmailDriver() {
		return emailDriver;
	}

	public void setEmailDriver(String emailDriver) {
		this.emailDriver = emailDriver;
	}

	public String getSenderAdress() {
		return senderAdress;
	}

	public void setSenderAdress(String sender_adress) {
		this.senderAdress = sender_adress;
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


	public String getPhoneNumberReceiver() {
		return phoneNumberReceiver;
	}

	public void setPhoneNumberReceiver(String phoneNumberReceiver) {
		this.phoneNumberReceiver = phoneNumberReceiver;
	}

	public int getPin() {
		return pin;
	}

	public void setPin(int pin) {
		this.pin = pin;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
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

	public String getPhoneNumberSender() {
		return phoneNumberSender;
	}

	public void setPhoneNumberSender(String phoneNumberSender) {
		this.phoneNumberSender = phoneNumberSender;
	}
}

