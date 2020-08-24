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
		/*
		 * Customer cus = new Customer(); JSONObject obj; try { obj = (JSONObject) new
		 * JSONObject(request);
		 * 
		 * Address add = new Address((Integer)
		 * obj.getJSONObject("address").getInt("doorno"), (Integer)
		 * obj.getJSONObject("address").getInt("floor"), (String)
		 * obj.getJSONObject("address").getString("street"), (String)
		 * obj.getJSONObject("address").getString("apartmentname"), (String)
		 * obj.getJSONObject("address").getString("area"), (String)
		 * obj.getJSONObject("address").getString("city"), (String)
		 * obj.getJSONObject("address").getString("state"));
		 * 
		 * Address updatedadd = addrepo.save(add);
		 * 
		 * cus.setName((String) obj.get("name").toString());
		 * cus.setAddressid(updatedadd.getId()); cus.setContact((String)
		 * obj.get("contact").toString());
		 * cus.setSupplierid(Long.parseLong(obj.get("supplierid").toString())); } catch
		 * (Exception e) { System.out.println(" exception thrown ");
		 * System.out.println(e); } if (Objects.nonNull(cus)) { return repo.save(cus); }
		 * else return null;
		 */
		return service.addCustomer(request);
	}

	@GetMapping("/v1/customer/{id}")
	public Customer getCustomerById(@PathVariable(value = "id") Long Id) {
		return service.getCustomerById(Id);
	}

	@PutMapping("/v1/customer/{id}")
	public Customer updateCustomerData(@PathVariable(value = "id") Long Id, @Valid @RequestBody Customer Details) {

		/*
		 * Customer customer = (repo.findById(Id)).get();
		 * 
		 * customer.setAddressid(Details.getAddressid());
		 * customer.setContact(Details.getContact());
		 * customer.setName(Details.getName());
		 * 
		 * Customer updateddetails = repo.save(customer); return updateddetails;
		 */
		return service.updateCustomerData(Id, Details);
	}

	@PostMapping("/v1/placeorder")
	public Boolean placeOrder(@RequestBody String request) {
		/*
		 * try { JSONObject obj = new JSONObject(request); Long customerid =
		 * Long.parseLong(obj.get("customerid").toString()); Long supplierid =
		 * Long.parseLong(obj.get("supplierid").toString()); Integer qty =
		 * Integer.parseInt(obj.get("quantity").toString()); Optional<Customer> op =
		 * repo.findById(customerid); if (op.isPresent()) { OrderDetails order = new
		 * OrderDetails(customerid, supplierid, qty, new Date()); orderrepo.save(order);
		 * } else { System.out.println(" Invalid customer "); } } catch (Exception e) {
		 * System.out.println(" exception thrown "); System.out.println(e); } return 1;
		 */
		System.out.println("placeOrder Request " + request);
		return service.placeOrder(request);
	}

	@PutMapping("/v1/cancelorder/{id}/bycustomer")
	public Boolean cancelOrder(@PathVariable(value = "id") Long orderId) {
		System.out.println("cancel order Request " + orderId);

		return service.cancelOrder(orderId);
	}

}
