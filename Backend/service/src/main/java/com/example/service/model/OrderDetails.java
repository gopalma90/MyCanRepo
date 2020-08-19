package com.example.service.model;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Past;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.util.Date;


@Entity
@Table(name = "orderdetails")
@JsonIgnoreProperties(value = {"createdAt", "updatedAt"}, 
        allowGetters = true)
@EntityListeners(AuditingEntityListener.class)
public class OrderDetails {

	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
	
	@NotNull
	private Long customerid ;

	@NotNull
	private Integer quantity ;
	
	@NotNull
	private Long supplierid;
	
	@Past
    @Temporal(TemporalType.TIMESTAMP)
	private Date orderdate;

	private Date deliverydate;
	
	private Integer isdelivered;
	
    @Column(nullable = false, updatable = false)
    @Temporal(TemporalType.TIMESTAMP)
    @CreatedDate
    private Date createdAt;


    @Column(nullable = false)
    @Temporal(TemporalType.TIMESTAMP)
    @LastModifiedDate
    private Date updatedAt;

    
	public OrderDetails(@NotBlank Long customerid,@NotBlank Long supplierid,  @NotBlank Integer quantity, @NotBlank Date orderdate) {
		super();
		this.customerid = customerid;
		this.supplierid = supplierid;
		this.quantity = quantity;
		this.orderdate = orderdate;
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
