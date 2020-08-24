package com.example.service.repository;

import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import com.example.service.model.OrderDetails;

public interface OrderDetailsRepo extends JpaRepository<OrderDetails, Long> {

	@Query(value = "SELECT * FROM orderdetails where supplierid = ?1 AND isdelivered=0 AND iscustomercancelled=0 AND issuppliercancelled=0", nativeQuery = true)
	public List<OrderDetails> findSupplierOrders(Long suppplierid);

	@Transactional
	@Modifying(clearAutomatically = true)
	@Query(value = "update orderdetails set isdelivered=?3, deliverydate=?2 where id=?1", nativeQuery = true)
	public Integer updateDeliveryStatus(Long orderid, Date date, Integer isdelivered);

	@Query(value = "SELECT * FROM orderdetails where customerid = ?1 AND isdelivered=0 AND iscustomercancelled=0 AND issuppliercancelled=0", nativeQuery = true)
	public List<OrderDetails> findCustomerOrders(Long customerid);

	@Transactional
	@Modifying(clearAutomatically = true)
	@Query(value = "update orderdetails set iscustomercancelled=1 where id=?1", nativeQuery = true)
	public void cancelOrderByCustomer(Long orderId);

	@Transactional
	@Modifying(clearAutomatically = true)
	@Query(value = "update orderdetails set issuppliercancelled=1 where id=?1", nativeQuery = true)
	public void cancelOrderBySupplier(Long orderId);

}
