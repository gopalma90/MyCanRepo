package com.example.service.services;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.service.model.Address;
import com.example.service.model.Customer;
import com.example.service.model.OrderDetails;
import com.example.service.repository.AddressRepo;
import com.example.service.repository.CustomerRepo;
import com.example.service.repository.OrderDetailsRepo;
import com.example.service.responsedata.CustomerOrders;

@Service
public class CustomerServices {

	@Autowired
	CustomerRepo cusrepo;

	@Autowired
	AddressRepo addrepo;

	@Autowired
	OrderDetailsRepo orderrepo;

	public List<Customer> getAllCustomers() {
		return cusrepo.findAll();
	}

	@Transactional
	public Customer addCustomer(String request) {
		Customer res = new Customer();
		JSONObject obj;
		try {
			obj = (JSONObject) new JSONObject(request);

			Address add = new Address((Integer) obj.getJSONObject("address").getInt("doorno"),
					(Integer) obj.getJSONObject("address").getInt("floor"),
					(String) obj.getJSONObject("address").getString("street"),
					(String) obj.getJSONObject("address").getString("apartmentname"),
					(String) obj.getJSONObject("address").getString("area"),
					(String) obj.getJSONObject("address").getString("city"),
					(String) obj.getJSONObject("address").getString("state"));

			Address updatedadd = addrepo.save(add);

			if (Objects.nonNull(updatedadd)) {

				Customer cus = new Customer(updatedadd.getId(), (String) obj.get("contact").toString(),
						(String) obj.get("name").toString(), Long.parseLong(obj.get("supplierid").toString()));

				res = cusrepo.save(cus);
			} else
				res = null;

		} catch (Exception e) {
			System.out.println(" exception thrown ");
			System.out.println(e);
			res = null;
		}
		System.out.println("addCustomer  response " + res);
		return res;
	}

	public Customer getCustomerById(Long Id) {
		Optional<Customer> op = cusrepo.findById(Id);
		return op.get();
	}

	@Transactional
	public Customer updateCustomerData(Long Id, Customer Details) {

		Customer customer = (cusrepo.findById(Id)).get();

		customer.setAddressid(Details.getAddressid());
		customer.setContact(Details.getContact());
		customer.setName(Details.getName());

		Customer updateddetails = cusrepo.save(customer);
		return updateddetails;
	}

	@Transactional
	public Boolean placeOrder(String request) {
		Boolean res = false;
		try {
			JSONObject obj = new JSONObject(request);
			Long customerid = Long.parseLong(obj.get("customerid").toString());
			Long supplierid = Long.parseLong(obj.get("supplierid").toString());
			Integer qty = Integer.parseInt(obj.get("quantity").toString());
			Optional<Customer> op = cusrepo.findById(customerid);
			if (op.isPresent()) {
				OrderDetails order = new OrderDetails(customerid, supplierid, qty, new Date());
				orderrepo.save(order);
				res = true;
			} else {
				System.out.println(" Invalid customer ");

			}
		} catch (Exception e) {
			System.out.println(" exception thrown  at place order");
			System.out.println(e);
		}
		System.out.println("Placeorder  response " + res);

		return res;
	}

	@Transactional
	public List<CustomerOrders> getCustomerOrders(Long Id) {

		List<CustomerOrders> response = new ArrayList<CustomerOrders>();

		try {
			List<OrderDetails> res = orderrepo.findCustomerOrders(Id);

			for (int i = 0; i < res.size(); i++) {
				OrderDetails temp = res.get(i);
				response.add(new CustomerOrders(null, null, temp));
			}
		} catch (Exception e) {
			System.out.println(" getSupplierOrders Exception " + e);
			return null;
		}
		System.out.println(" getSupplierOrders response for supplierid " + Id + " is = " + response);

		return response;
	}

	@Transactional
	public Boolean cancelOrder(Long orderId) {
		Boolean res = false;
		try {
			orderrepo.cancelOrderByCustomer(orderId);
			res = true;
		} catch (Exception e) {
			System.out.println(" exception from cancel order " + e);
		}
		return res;
	}

}
