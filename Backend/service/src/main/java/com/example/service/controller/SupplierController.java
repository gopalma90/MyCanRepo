package com.example.service.controller;


import com.example.service.model.Address;
import com.example.service.model.Customer;
import com.example.service.model.OrderDetails;
import com.example.service.repository.OrderDetailsRepo;
import com.example.service.model.Supplier;
import com.example.service.repository.AddressRepo;
import com.example.service.repository.CustomerRepo;
import com.example.service.repository.SupplierRepo;
import com.example.service.responsedata.CustomerOrders;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import javax.validation.Valid;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import org.json.*; 
  

@RestController
@RequestMapping("/api")
public class SupplierController {

    @Autowired
    SupplierRepo repo;
    @Autowired
    AddressRepo  addrepo;
    @Autowired
    OrderDetailsRepo orderrepo;
    @Autowired
    CustomerRepo customerrepo;
    
    @PostMapping("/v1/supplier")
    public Supplier addSupplier( @RequestBody String request) {
    	System.out.println( "inside post method \n");
    	
    	Supplier sup = new Supplier();
    	JSONObject obj;
    	try {
    		obj = (JSONObject) new JSONObject(request);

    		Address add = new Address( (Integer) obj.getJSONObject("address").getInt("doorno") , (Integer)obj.getJSONObject("address").getInt("floor"),(String)obj.getJSONObject("address").getString("street"), (String)obj.getJSONObject("address").getString("apartmentname"),
    				(String)obj.getJSONObject("address").getString("area"), (String)obj.getJSONObject("address").getString("city"), (String)obj.getJSONObject("address").getString("state") );
    		
    		Address updatedadd = addrepo.save(add);
    		
    		sup.setName( (String) obj.get("name").toString() ) ;
    		sup.setShopname( (String) obj.get("shopname").toString() ) ;
    		sup.setAddressid(updatedadd.getId() );
    		sup.setContact( (String) obj.get("contact").toString() ) ;
       	}
    	catch ( Exception e) {
    		System.out.println( " exception thrown " );
    		System.out.println( e );
    	}
    	if ( Objects.nonNull(sup) ) {
    		return repo.save(sup);
    	}
    	else return null;
    }
    
    @GetMapping("/v1/suppliers")
    public List<Supplier> getAllSuppliers() {
        return repo.findAll();
    }
    
    @GetMapping("/v1/supplier/{id}")
    public Supplier getSupplierById(@PathVariable(value = "id") Long Id) {
    	/*  return Optional.ofNullable(Id) // Optional<String>
    	            .flatMap(SupplierRepo::findById) // Optional<BasketModel>
    	            .map(Supplier::new)        // b -> new BasketDTO(b)
    	            .orElseGet(Supplier::new);
                //.orElseThrow(() -> new ResourceNotFoundException("Note", "id", noteId)); */
    	Optional<Supplier> op  = repo.findById(Id);
    	
    	return op.get ();
    }
    
	/*
	 * @GetMapping("/v1/supplier/{id}/getpendingorders")
	 * public List<OrderDetails> getSupplierOrders(@PathVariable(value = "id") Long
	 * Id) { List<OrderDetails> res = orderrepo.findSupplierOrders( Id );
	 * 
	 * return res; }
	 */
    @GetMapping("/v1/supplier/{id}/getpendingorders")
    public ResponseEntity<List<CustomerOrders> > getSupplierOrders(@PathVariable(value = "id") Long Id) {
    	List<OrderDetails> res = orderrepo.findSupplierOrders( Id );
    	Iterator<OrderDetails> it = res.iterator();
    	List<CustomerOrders> response  =  new ArrayList<CustomerOrders> ();
    	for (int i = 0; i < res.size(); i++) {
    		OrderDetails temp= res.get(i);
    		Customer cus = customerrepo.getCustomerdata( temp.getCustomerid() );
    		Address addr = addrepo.getAddressOfCustomer ( cus.getAddressid() );
    		response.add(new CustomerOrders ( cus, addr, temp ));
    	}
    	
    	return ResponseEntity.status(HttpStatus.OK) 
    			.body(response);
    }
    
    @PutMapping("/v1/supplier/{id}")
    public Supplier updatesupplierData(@PathVariable(value = "id") Long Id,
                                            @Valid @RequestBody Supplier Details) {

        Supplier supplier = (repo.findById(Id) ).get();
        supplier.setAddressid(Details.getAddressid());
        supplier.setContact(Details.getContact());
        supplier.setName(Details.getName());
        supplier.setShopname(Details.getShopname());
        
        Supplier updateddetails = repo.save(supplier);
        return updateddetails;
    }
}
