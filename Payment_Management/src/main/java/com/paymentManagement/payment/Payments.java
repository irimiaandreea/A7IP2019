package com.paymentManagement.payment;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="payments")
public class Payments {


	public enum Currency {
	        EUR, USD;
	    }
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
@Column(name="id")
	private int id;
	@Column(name="charge_id")
	private String chargeId;
	@Column(name="amount")
	private int amount;
	@Column(name="currency")
	private com.paymentManagement.payment.ChargeRequest.Currency currency;
	@Column(name="status")
	private String status;
	@Column(name="balance_tranzaction_id")
	private String balanceTransactionId;
	
	public double getAmount() {
		return amount;
	}
	
	public Payments() {
		
	}
	
	   public Payments(int amount, com.paymentManagement.payment.ChargeRequest.Currency curency, String status, String charge_id, String balance_transaction_id) {
		super();
		this.amount = amount;
		this.currency = curency;
		this.status = status;
		this.chargeId = charge_id;
		this.balanceTransactionId = balance_transaction_id;
	}
	
	public void setAmount(int amount) {
		this.amount = amount;
	}
	public com.paymentManagement.payment.ChargeRequest.Currency getCurrency() {
		return currency;
	}
	public void setCurrency(com.paymentManagement.payment.ChargeRequest.Currency currency2) {
		this.currency = currency2;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public String getChargeId() {
		return chargeId;
	}
	public void setChargeId(String charge_id) {
		this.chargeId = charge_id;
	}
	public String getBalanceTransactionId() {
		return balanceTransactionId;
	}
	public void setBalanceTransactionId(String balance_transaction_id) {
		this.balanceTransactionId = balance_transaction_id;
	}
	
}
