package com.senderUserManagement.model;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="packages_history")

public class CmdHistory {

	@Id
	@GeneratedValue
	@Column(name="id")
	Integer id;
@Column(name="username")
	String username;
@Column(name="status")
	String status;
@Column(name="placed")
	String placed;
@Column(name="sent")
	String sent;
@Column(name="distance")
	Integer distance;
@Column(name="from")
	String from;
@Column(name="to")
	String to;
@Column(name="price")
	Integer price;
	
		
		public CmdHistory() { }
		
		public CmdHistory(String username, String status, String placed, String sent, Integer distance, String from,
				String to, Integer price) {
			super();
			this.username = username;
			this.status = status;
			this.placed = placed;
			this.sent = sent;
			this.distance = distance;
			this.from = from;
			this.to = to;
			this.price = price;
		}
	
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public String getPlaced() {
		return placed;
	}
	public void setPlaced(String placed) {
		this.placed = placed;
	}
	public String getSent() {
		return sent;
	}
	public void setSent(String sent) {
		this.sent = sent;
	}
	public Integer getDistance() {
		return distance;
	}
	public void setDistance(Integer distance) {
		this.distance = distance;
	}
	public String getFrom() {
		return from;
	}
	public void setFrom(String from) {
		this.from = from;
	}
	public String getTo() {
		return to;
	}
	public void setTo(String to) {
		this.to = to;
	}
	public Integer getPrice() {
		return price;
	}
	public void setPrice(Integer price) {
		this.price = price;
	}



	
}
