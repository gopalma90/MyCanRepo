package com.example.service.controller;


import com.example.service.model.Address;
import com.example.service.model.Customer;
import com.example.service.model.OrderDetails;
import com.example.service.repository.AddressRepo;
import com.example.service.repository.CustomerRepo;
import com.example.service.repository.OrderDetailsRepo;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import javax.validation.Valid;

import java.util.Date;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
	


@RestController
@RequestMapping("/api")
public class CustomerController {
	

    @Autowired
    CustomerRepo repo;
    
    @Autowired
    AddressRepo addrepo;
    
    @Autowired
    OrderDetailsRepo orderrepo;
    
    @GetMapping("/v1/customers")
    public List<Customer> getAllCustomers() {
        return repo.findAll();
    }
    
    @PostMapping("/v1/customer")
    public Customer addCustomer(@RequestBody String request) {
    	Customer cus = new Customer();
    	JSONObject obj;
    	try {
    		obj = (JSONObject) new JSONObject(request);

    		Address add = new Address( (Integer) obj.getJSONObject("address").getInt("doorno") , (Integer)obj.getJSONObject("address").getInt("floor"),(String)obj.getJSONObject("address").getString("street"), (String)obj.getJSONObject("address").getString("apartmentname"),
    				(String)obj.getJSONObject("address").getString("area"), (String)obj.getJSONObject("address").getString("city"), (String)obj.getJSONObject("address").getString("state") );
    		
    		Address updatedadd = addrepo.save(add);
    		
    		cus.setName( (String) obj.get("name").toString() ) ;
    		cus.setAddressid(updatedadd.getId() );
    		cus.setContact( (String) obj.get("contact").toString() ) ;
    		cus.setSupplierid( Long.parseLong( obj.get("supplierid").toString() ) );
       	}
    	catch ( Exception e) {
    		System.out.println( " exception thrown " );
    		System.out.println( e );
    	}
    	if ( Objects.nonNull(cus) ) {
    		return repo.save(cus);
    	}
    	else return null;   
    }
    
    @GetMapping("/v1/customer/{id}")
    public Customer getCustomerById(@PathVariable(value = "id") Long Id) {
    	/*  return Optional.ofNullable(Id) // Optional<String>
    	            .flatMap(CustomerRepo::findById) // Optional<BasketModel>
    	            .map(Customer::new)        // b -> new BasketDTO(b)
    	            .orElseGet(Customer::new);
                //.orElseThrow(() -> new ResourceNotFoundException("Note", "id", noteId)); */
    	Optional<Customer> op  = repo.findById(Id);
    	return op.get ();
    }
    
    @PutMapping("/v1/customer/{id}")
    public Customer updateCustomerData(@PathVariable(value = "id") Long Id,
                                            @Valid @RequestBody Customer Details) {

        Customer customer = (repo.findById(Id) ).get();
                

        customer.setAddressid(Details.getAddressid());
        customer.setContact(Details.getContact());
        customer.setName(Details.getName());
        
        Customer updateddetails = repo.save(customer);
        return updateddetails;
    }
    
    @PostMapping("/v1/placeorder") 
    public Integer placeOrder ( @RequestBody String request ) {
    	try {
    		JSONObject obj =  new JSONObject(request);
    		 Long customerid = Long.parseLong( obj.get("customerid").toString()  );
    		 Long supplierid = Long.parseLong( obj.get("supplierid").toString()  );
    		 Integer qty = Integer.parseInt( obj.get("quantity").toString()  );
    		 Optional<Customer> op  = repo.findById(customerid) ;
    		 if ( op.isPresent() ) {
    			 OrderDetails order = new OrderDetails (  customerid, supplierid, qty , new Date() ) ;
    			 orderrepo.save(order);
    		 }
    		 else {
    			 System.out.println(" Invalid customer ");
    		 }
    	}
    	catch (Exception e) {
    		System.out.println( " exception thrown " );
    		System.out.println( e );
    	}
    	return 1;
    }
}
