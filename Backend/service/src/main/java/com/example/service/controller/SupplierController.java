package com.example.service.controller;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.service.model.Supplier;
import com.example.service.responsedata.CustomerOrders;
import com.example.service.responsedata.PendingMoneyResponse;
import com.example.service.services.SupplierServices;

@RestController
@RequestMapping("/api")
public class SupplierController {

	@Autowired
	SupplierServices service;

	@PostMapping("/v1/supplier")
	public Supplier addSupplier(@RequestBody String request) {

		System.out.println("Add suppplier " + request);
		return service.addSupplier(request);
	}

	@GetMapping("/v1/suppliers")
	public List<Supplier> getAllSuppliers() {
		return service.getAllSuppliers();
	}

	@GetMapping("/v1/supplier/{id}")
	public Supplier getSupplierById(@PathVariable(value = "id") Long Id) {

		return service.getSupplierById(Id);
	}

	@PutMapping("/v1/supplier/{id}")
	public Supplier updatesupplierData(@PathVariable(value = "id") Long Id, @Valid @RequestBody Supplier Details) {

		return service.updatesupplierData(Id, Details);
	}

	@PostMapping("/v1/supplier/{id}/candelivered")
	public Boolean updateCanDelivered(@PathVariable(value = "id") Long supplierId, @RequestBody String Request) {
		System.out.println(" UpdateCanDelivered for Supplierid " + supplierId + " Request body " + Request);
		return service.updateCanDelivered(supplierId, Request);
	}

	@PostMapping("/v1/supplier/{id}/paidforcan")
	public Boolean updateCanDeliveredWithPayment(@PathVariable(value = "id") Long supplierId,
			@RequestBody String Request) {
		System.out.println(" UpdateCanDeliveredWithPayment for Supplierid " + supplierId + " Request body " + Request);
		return service.updateCanDeliveredWithPayment(supplierId, Request);
	}

	@PutMapping("/v1/supplier/{id}/dismissorder")
	public Boolean canOrderRejected(@PathVariable(value = "id") Long supplierId, @RequestBody String Request) {
		System.out.println(" canOrderRejected for Supplierid " + supplierId + " Request body " + Request);

		return service.canOrderRejected(supplierId, Request);
	}

	@GetMapping("/v1/supplier/{id}/getpendingorders")
	public ResponseEntity<List<CustomerOrders>> getSupplierOrders(@PathVariable(value = "id") Long supplierId) {
		System.out.println(" getSupplierOrders for Supplierid " + supplierId);

		List<CustomerOrders> response = service.getSupplierOrders(supplierId);

		return ResponseEntity.status(HttpStatus.OK).body(response);

	}

	@GetMapping("/v1/supplier/{id}/getpendingpayments")
	public ResponseEntity<List<PendingMoneyResponse>> getSupplierPendingPayments(
			@PathVariable(value = "id") Long supplierId) {

		System.out.println(" getSupplierPendingPayments for Supplierid " + supplierId);

		List<PendingMoneyResponse> resp = service.getSupplierPendingPayments(supplierId);
		return ResponseEntity.status(HttpStatus.OK).body(resp);
	}

	@PutMapping("/v1/supplier/{id}/updatemoneysettled")
	public Boolean supplierMoneySettled(@PathVariable(value = "id") Long supplierId, @RequestBody String Request) {

		System.out.println(" supplierMoneySettled with supplierId " + supplierId + " request " + Request);
		return service.supplierMoneySettled(supplierId, Request);
	}
}
