package com.example.service.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.service.model.PendingPayments;

public interface PendingPaymentsRepo extends JpaRepository<PendingPayments, Long> {

}
