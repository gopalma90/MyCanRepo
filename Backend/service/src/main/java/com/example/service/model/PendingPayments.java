package com.example.service.model;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.NotNull;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name = "pendingpayments")
@JsonIgnoreProperties(value = { "createdAt", "updatedAt" }, allowGetters = true)
@EntityListeners(AuditingEntityListener.class)
public class PendingPayments {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@NotNull
	private Long customerid;

	@NotNull
	private Long supplierid;

	@NotNull
	private Long orderId;

	private Double amount;

	private Boolean isPaid;

	@Column(nullable = false, updatable = false)
	@Temporal(TemporalType.TIMESTAMP)
	@CreatedDate
	private Date createdAt;

	@Column(updatable = true)
	@Temporal(TemporalType.TIMESTAMP)
	@LastModifiedDate
	private Date updatedAt;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Long getCustomerid() {
		return customerid;
	}

	public void setCustomerid(Long customerid) {
		this.customerid = customerid;
	}

	public Double getAmount() {
		return amount;
	}

	public void setAmount(Double amount) {
		this.amount = amount;
	}

	public Date getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(Date createdAt) {
		this.createdAt = createdAt;
	}

	public Date getUpdatedAt() {
		return updatedAt;
	}

	public void setUpdatedAt(Date updatedAt) {
		this.updatedAt = updatedAt;
	}

	public PendingPayments() {
		super();
	}

	public PendingPayments(@NotNull Long customerid, @NotNull Long supplierid, Double amount, @NotNull Long orderid) {
		super();
		this.orderId = orderid;
		this.customerid = customerid;
		this.supplierid = supplierid;
		this.amount = amount;
		this.isPaid = false;
	}

	public PendingPayments(@NotNull Long customerid, @NotNull Long supplierid, Double amount, @NotNull Long orderid,
			Boolean ispaid) {
		super();
		this.orderId = orderid;
		this.isPaid = ispaid;
		this.customerid = customerid;
		this.supplierid = supplierid;
		this.amount = amount;
	}

}
