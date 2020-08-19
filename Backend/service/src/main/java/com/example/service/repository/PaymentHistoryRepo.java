package com.example.service.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.service.model.PaymentHistory;

public interface PaymentHistoryRepo extends JpaRepository<PaymentHistory, Long> {

}
