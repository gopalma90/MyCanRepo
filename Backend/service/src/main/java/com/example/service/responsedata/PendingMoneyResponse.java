package com.example.service.responsedata;

import com.example.service.model.Address;
import com.example.service.model.Customer;

public class PendingMoneyResponse {
	private Customer customer;
	private Address addr;

	private Double amount;

	public PendingMoneyResponse(Customer customer, Address addr, Double amount) {
		super();
		this.customer = customer;
		this.addr = addr;
		this.amount = amount;
	}

	public Customer getCustomer() {
		return customer;
	}

	public void setCustomer(Customer customer) {
		this.customer = customer;
	}

	public Address getAddr() {
		return addr;
	}

	public void setAddr(Address addr) {
		this.addr = addr;
	}

	public Double getAmount() {
		return amount;
	}

	public void setAmount(Double amount) {
		this.amount = amount;
	}

}
