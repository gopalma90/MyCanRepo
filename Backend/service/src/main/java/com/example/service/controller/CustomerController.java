package com.example.service.controller;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.service.model.Customer;
import com.example.service.services.CustomerServices;

@RestController
@RequestMapping("/api")
public class CustomerController {

	@Autowired
	CustomerServices service;

	@GetMapping("/v1/customers")
	public List<Customer> getAllCustomers() {
		return service.getAllCustomers();
	}

	@PostMapping("/v1/customer")
	public Customer addCustomer(@RequestBody String request) {
		System.out.println("Addcustomer Request " + request);
		return service.addCustomer(request);
	}

	@GetMapping("/v1/customer/{id}")
	public Customer getCustomerById(@PathVariable(value = "id") Long Id) {
		return service.getCustomerById(Id);
	}

	@PutMapping("/v1/customer/{id}")
	public Customer updateCustomerData(@PathVariable(value = "id") Long Id, @Valid @RequestBody Customer Details) {

		return service.updateCustomerData(Id, Details);
	}

	@PostMapping("/v1/placeorder")
	public Boolean placeOrder(@RequestBody String request) {

		System.out.println("placeOrder Request " + request);
		return service.placeOrder(request);
	}

	@PutMapping("/v1/cancelorder/{id}/bycustomer")
	public Boolean cancelOrder(@PathVariable(value = "id") Long orderId) {
		System.out.println("cancel order Request " + orderId);

		return service.cancelOrder(orderId);
	}

}
