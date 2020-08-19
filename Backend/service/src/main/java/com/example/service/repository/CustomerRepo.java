package com.example.service.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.example.service.model.Customer;

public interface CustomerRepo extends JpaRepository<Customer, Long> {

	@Query(value="SELECT * FROM customer where id = ?1",nativeQuery=true)
	public Customer getCustomerdata(Long customerid);

}
