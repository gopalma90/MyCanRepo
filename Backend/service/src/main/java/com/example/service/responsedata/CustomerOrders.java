package com.example.service.responsedata;

import com.example.service.model.Address;
import com.example.service.model.Customer;
import com.example.service.model.OrderDetails;

public class CustomerOrders {
	private Customer customer;
	private Address addr;
	private OrderDetails orders;
	
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

	public OrderDetails getOrders() {
		return orders;
	}

	public void setOrders(OrderDetails orders) {
		this.orders = orders;
	}

	public CustomerOrders(Customer customer, Address addr, OrderDetails orders) {
		super();
		this.customer = customer;
		this.addr = addr;
		this.orders = orders;
	}
}
