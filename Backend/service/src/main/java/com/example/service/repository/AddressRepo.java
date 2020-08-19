package com.example.service.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.example.service.model.Address;

public interface AddressRepo extends JpaRepository<Address, Long> {

	@Query(value="SELECT * FROM address where id = ?1",nativeQuery=true)
	Address getAddressOfCustomer(Long addressid);

}
