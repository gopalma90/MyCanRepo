package com.example.service.responsedata;

import com.example.service.model.Address;
import com.example.service.model.Customer;

public class PendingCanResponse {
	private Customer customer;
	private Address addr;

	private Integer quantity;

	public PendingCanResponse(Customer customer, Address addr, Integer quantity) {
		super();
		this.customer = customer;
		this.addr = addr;
		this.quantity = quantity;
	}

	public PendingCanResponse() {
		super();
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

	public Integer getQuantity() {
		return quantity;
	}

	public void setQuantity(Integer quantity) {
		this.quantity = quantity;
	}

}
