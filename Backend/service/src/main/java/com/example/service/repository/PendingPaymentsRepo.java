package com.example.service.repository;

import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import com.example.service.model.PendingPayments;

public interface PendingPaymentsRepo extends JpaRepository<PendingPayments, Long> {

	@Transactional
	@Modifying(clearAutomatically = true)
	@Query(value = "update pendingpayments set amount=?2, updated_at=?3 WHERE customerid=?1", nativeQuery = true)
	public void updatePendingPayment(Long customerid, Double Balance, Date dates);

	@Query(value = "select amount from pendingpayments where customerid=?1", nativeQuery = true)
	public Double getCutomerBalance(Long customerid);

	@Query(value = "select count(*) from pendingpayments where customerid=?1", nativeQuery = true)
	public Integer getCustomerPaymentPending(Long customerid);

	@Query(value = "select * from pendingpayments where supplierid=?1 and is_paid=false", nativeQuery = true)
	public List<PendingPayments> findSuppliersPendingAmount(Long supplierId);

}
