package com.paymentManagement.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.paymentManagement.payment.Payments;

public interface PaymentsRepository extends JpaRepository<Payments,Integer>{

}