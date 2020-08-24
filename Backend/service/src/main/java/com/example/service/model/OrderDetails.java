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
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Past;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name = "orderdetails")
@JsonIgnoreProperties(value = { "createdAt", "updatedAt" }, allowGetters = true)
@EntityListeners(AuditingEntityListener.class)
public class OrderDetails {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@NotNull
	private Long customerid;

	@NotNull
	private Integer quantity;

	@NotNull
	private Long supplierid;

	@Past
	@Temporal(TemporalType.TIMESTAMP)
	private Date orderdate;

	@Temporal(TemporalType.TIMESTAMP)
	private Date deliverydate;

	private Integer isdelivered;

	private Integer iscustomercancelled;

	private Integer issuppliercancelled;

	@Column(nullable = false, updatable = false)
	@Temporal(TemporalType.TIMESTAMP)
	@CreatedDate
	private Date createdAt;

	@Column(nullable = false)
	@Temporal(TemporalType.TIMESTAMP)
	@LastModifiedDate
	private Date updatedAt;

	public OrderDetails(@NotBlank Long customerid, @NotBlank Long supplierid, @NotBlank Integer quantity,
			@NotBlank Date orderdate) {
		super();
		this.customerid = customerid;
		this.supplierid = supplierid;
		this.quantity = quantity;
		this.orderdate = orderdate;
		this.isdelivered = 0;
		this.iscustomercancelled = 0;
		this.issuppliercancelled = 0;
	}

	public OrderDetails() {
		super();
	}

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

	public Integer getQuantity() {
		return quantity;
	}

	public void setQuantity(Integer quantity) {
		this.quantity = quantity;
	}

	public Date getOrderdate() {
		return orderdate;
	}

	public void setOrderdate(Date orderdate) {
		this.orderdate = orderdate;
	}

	public Date getDeliverydate() {
		return deliverydate;
	}

	public void setDeliverydate(Date deliverydate) {
		this.deliverydate = deliverydate;
	}

	public Integer getIsdelivered() {
		return isdelivered;
	}

	public void setIsdelivered(Integer isdelivered) {
		this.isdelivered = isdelivered;
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

}
