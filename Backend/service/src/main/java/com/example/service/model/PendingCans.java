package com.example.service.model;

import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name = "pendingcans")
@JsonIgnoreProperties(value = { "createdAt", "updatedAt" }, allowGetters = true)
@EntityListeners(AuditingEntityListener.class)
public class PendingCans {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@NotNull
	private Long customerId;

	@NotNull
	private Long supplierId;

	private Integer pendingCanQuantity;

	public PendingCans() {

	}

	public PendingCans(@NotNull Long customerId, @NotNull Long supplierId, Integer pendingCanQuantity) {
		super();
		this.customerId = customerId;
		this.supplierId = supplierId;
		this.pendingCanQuantity = pendingCanQuantity;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Long getCustomerId() {
		return customerId;
	}

	public void setCustomerId(Long customerId) {
		this.customerId = customerId;
	}

	public Long getSupplierId() {
		return supplierId;
	}

	public void setSupplierId(Long supplierId) {
		this.supplierId = supplierId;
	}

	public Integer getPendingCanQuantity() {
		return pendingCanQuantity;
	}

	public void setPendingCanQuantity(Integer pendingCanQuantity) {
		this.pendingCanQuantity = pendingCanQuantity;
	}

}
