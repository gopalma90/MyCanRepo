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

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name = "customer")
@JsonIgnoreProperties(value = { "createdAt", "updatedAt" }, allowGetters = true)
@EntityListeners(AuditingEntityListener.class)
public class Customer {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@NotNull
	private Long addressid;

	@NotBlank
	@Column(unique = true)
	private String contact;

	@NotBlank
	private String name;

	@NotNull
	private Long supplierid;

	@Column(nullable = false, updatable = false)
	@Temporal(TemporalType.TIMESTAMP)
	@CreatedDate
	private Date createdAt;

	@Column(nullable = false)
	@Temporal(TemporalType.TIMESTAMP)
	@LastModifiedDate
	private Date updatedAt;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Long getAddressid() {
		return addressid;
	}

	public void setAddressid(Long addressid) {
		this.addressid = addressid;
	}

	public String getContact() {
		return contact;
	}

	public void setContact(String contact) {
		this.contact = contact;
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

	public Customer() {
		super();
	}

	public Long getSupplierid() {
		return supplierid;
	}

	public void setSupplierid(Long supplierid) {
		this.supplierid = supplierid;
	}

	public Customer(@NotNull Long addressid, @NotBlank String contact, @NotBlank String name,
			@NotBlank Long supplierid) {
		super();
		this.addressid = addressid;
		this.contact = contact;
		this.name = name;
		this.supplierid = supplierid;
	}

}
