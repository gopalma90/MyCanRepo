CREATE TABLE IF NOT EXISTS supplier (
  id BIGINT NOT NULL AUTO_INCREMENT,
  addressid BIGINT ,
  contact  VARCHAR(255) UNI,
  created_at  DATETIME  NOT NULL,
  name VARCHAR(255),
  shopname VARCHAR(255),
  updated_at DATETIME,
  PRIMARY KEY ( id )
);

CREATE TABLE IF NOT EXISTS customer (
  id BIGINT NOT NULL AUTO_INCREMENT,
  addressid BIGINT ,
  contact  VARCHAR(255) UNI,
  created_at  DATETIME  NOT NULL,
  name VARCHAR(255),
  shopname VARCHAR(255),
  updated_at DATETIME,
  PRIMARY KEY ( id )
);



CREATE TABLE IF NOT EXISTS address (
  id BIGINT NOT NULL AUTO_INCREMENT,
  state VARCHAR(255),
  aptname VARCHAR(255),
  city VARCHAR(255),
  area VARCHAR(255),
  created_at  DATETIME  NOT NULL,
  doorno VARCHAR(255),
  floorno VARCHAR(255),
  street VARCHAR(255),
  updated_at DATETIME,
  PRIMARY KEY ( id )
);


CREATE TABLE IF NOT EXISTS orderdetails (
  id BIGINT NOT NULL AUTO_INCREMENT,
  created_at  DATETIME  NOT NULL,
  customerid BIGINT, 
  deliverydate DATETIME,
  iscustomercancelled INT,
  isdelivered INT,
  issuppliercancelled INT,
  orderdate DATETIME,
  quantity INT,
  supplierid BIGINT,
  updated_at DATETIME,
  PRIMARY KEY ( id )
);



CREATE TABLE IF NOT EXISTS pendingpayments (
  id BIGINT NOT NULL AUTO_INCREMENT,
  created_at  DATETIME  NOT NULL,
  amount DOUBLE, 
  is_paid BIT(1),
  order_id BIGINT, 
  customerid BIGINT,
  supplierid BIGINT,
  updated_at DATETIME,
  PRIMARY KEY ( id )
);


CREATE TABLE IF NOT EXISTS pendingcans (
  id BIGINT NOT NULL AUTO_INCREMENT,
  updated_at DATETIME,
  customerid BIGINT, 
  quantity INT,
  supplierid BIGINT,
  PRIMARY KEY ( id )
);


