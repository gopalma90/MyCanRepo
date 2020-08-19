package com.example.service.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.example.service.model.OrderDetails;

public interface OrderDetailsRepo extends JpaRepository<OrderDetails, Long> {

	@Query(value="SELECT * FROM orderdetails where supplierid = ?1 AND isdelivered is NULL",nativeQuery=true)
	public List<OrderDetails> findSupplierOrders (Long suppplierid);
		

}
