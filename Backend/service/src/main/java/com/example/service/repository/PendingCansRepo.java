package com.example.service.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import com.example.service.model.PendingCans;

public interface PendingCansRepo extends JpaRepository<PendingCans, Long> {

	@Query(value = "select * from pendingcans where customer_id=?1 and supplier_id=?2", nativeQuery = true)
	public PendingCans getExistingCustomerData(Long customerId, Long supplierId);

	@Transactional
	@Modifying(clearAutomatically = true)
	@Query(value = "update pendingcans set pending_can_quantity=?3 WHERE customer_id=?1 and supplier_id=?2", nativeQuery = true)
	public void updateExistingCustomerData(Long customerId, Long supplierId, Integer quantity);

	@Query(value = "select * from pendingcans where supplier_id=?1", nativeQuery = true)
	public List<PendingCans> getAllPendingcans(Long supplierId);

}
