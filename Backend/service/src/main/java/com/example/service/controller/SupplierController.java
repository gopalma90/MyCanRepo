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
		/*
		 * Supplier sup = new Supplier(); JSONObject obj; try { obj = (JSONObject) new
		 * JSONObject(request);
		 * 
		 * Address add = new Address((Integer)
		 * obj.getJSONObject("address").getInt("doorno"), (Integer)
		 * obj.getJSONObject("address").getInt("floor"), (String)
		 * obj.getJSONObject("address").getString("street"), (String)
		 * obj.getJSONObject("address").getString("apartmentname"), (String)
		 * obj.getJSONObject("address").getString("area"), (String)
		 * obj.getJSONObject("address").getString("city"), (String)
		 * obj.getJSONObject("address").getString("state"));
		 * 
		 * Address updatedadd = addrepo.save(add);
		 * 
		 * sup.setName((String) obj.get("name").toString()); sup.setShopname((String)
		 * obj.get("shopname").toString()); sup.setAddressid(updatedadd.getId());
		 * sup.setContact((String) obj.get("contact").toString()); } catch (Exception e)
		 * { System.out.println(" exception thrown "); System.out.println(e); } if
		 * (Objects.nonNull(sup)) { return repo.save(sup); } else return null;
		 */
	}

	@GetMapping("/v1/suppliers")
	public List<Supplier> getAllSuppliers() {
		return service.getAllSuppliers();
	}

	@GetMapping("/v1/supplier/{id}")
	public Supplier getSupplierById(@PathVariable(value = "id") Long Id) {

		return service.getSupplierById(Id);
	}

	/*
	 * @GetMapping("/v1/supplier/{id}/getpendingorders") public List<OrderDetails>
	 * getSupplierOrders(@PathVariable(value = "id") Long Id) { List<OrderDetails>
	 * res = orderrepo.findSupplierOrders( Id );
	 * 
	 * return res; }
	 */

	@PutMapping("/v1/supplier/{id}")
	public Supplier updatesupplierData(@PathVariable(value = "id") Long Id, @Valid @RequestBody Supplier Details) {
		/*
		 * Supplier supplier = (repo.findById(Id)).get();
		 * supplier.setAddressid(Details.getAddressid());
		 * supplier.setContact(Details.getContact());
		 * supplier.setName(Details.getName());
		 * supplier.setShopname(Details.getShopname());
		 * 
		 * Supplier updateddetails = repo.save(supplier); return updateddetails;
		 */
		return service.updatesupplierData(Id, Details);
	}

	@PostMapping("/v1/supplier/{id}/candelivered")
	public Boolean updateCanDelivered(@PathVariable(value = "id") Long supplierId, @RequestBody String Request) {
		System.out.println(" UpdateCanDelivered for Supplierid " + supplierId + " Request body " + Request);
		/*
		 * JSONObject obj; Boolean res = false; try { obj = (JSONObject) new
		 * JSONObject(Request); JSONObject order = obj.getJSONObject("orders");
		 * 
		 * Double cost = 40.00 * (int) order.getLong("quantity"); try {
		 * 
		 * if (pendingpaymentrepo.getCustomerPaymentPending((Long)
		 * order.getLong("customerid")) > 0) { Double balance =
		 * pendingpaymentrepo.getCutomerBalance((Long) order.getLong("customerid"));
		 * balance += cost;
		 * 
		 * pendingpaymentrepo.updatePendingPayment((Long) order.getLong("customerid"),
		 * balance, new Date()); res = true; } else { PendingPayments paymentpending =
		 * new PendingPayments((Long) order.getLong("customerid"), supplierId, cost);
		 * pendingpaymentrepo.save(paymentpending); res = true; } if (res) {
		 * orderrepo.updateDeliveryStatus((Long) order.getLong("id"), new Date(), 1); }
		 * 
		 * } catch (Exception e) { System.out.println(" DB update failed " + e); res =
		 * false; } } catch (Exception e) {
		 * System.out.print("Got exception in updating delivery status " + e); res =
		 * false; } return res;
		 */
		return service.updateCanDelivered(supplierId, Request);
	}

	@PostMapping("/v1/supplier/{id}/paidforcan")
	public Boolean updateCanDeliveredWithPayment(@PathVariable(value = "id") Long supplierId,
			@RequestBody String Request) {
		System.out.println(" UpdateCanDeliveredWithPayment for Supplierid " + supplierId + " Request body " + Request);
		/*
		 * JSONObject obj; Boolean res = false; try { obj = (JSONObject) new
		 * JSONObject(Request); JSONObject order = obj.getJSONObject("orders"); // ToDo:
		 * update paymentHistory repo and grab the id to update in order id
		 * orderrepo.updateDeliveryStatus((Long) order.getLong("id"), new Date(), 1);
		 * res = true; } catch (Exception e) {
		 * System.out.print("Got exception in dismissing order " + e); } return res;
		 * 
		 */
		return service.updateCanDeliveredWithPayment(supplierId, Request);
	}

	@PutMapping("/v1/supplier/{id}/dismissorder")
	public Boolean canOrderRejected(@PathVariable(value = "id") Long supplierId, @RequestBody String Request) {
		System.out.println(" canOrderRejected for Supplierid " + supplierId + " Request body " + Request);

		/*
		 * JSONObject obj; Boolean res = false; try { obj = (JSONObject) new
		 * JSONObject(Request); JSONObject order = obj.getJSONObject("orders");
		 * 
		 * orderrepo.updateDeliveryStatus((Long) order.getLong("id"), new Date(), 0);
		 * res = true; } catch (Exception e) {
		 * System.out.print("Got exception in dismissing order " + e); } return res;
		 */
		return service.canOrderRejected(supplierId, Request);
	}

	@GetMapping("/v1/supplier/{id}/getpendingorders")
	public ResponseEntity<List<CustomerOrders>> getSupplierOrders(@PathVariable(value = "id") Long supplierId) {
		System.out.println(" getSupplierOrders for Supplierid " + supplierId);

		/*
		 * List<OrderDetails> res = orderrepo.findSupplierOrders(Id);
		 * 
		 * List<CustomerOrders> response = new ArrayList<CustomerOrders>(); for (int i =
		 * 0; i < res.size(); i++) { OrderDetails temp = res.get(i); Customer cus =
		 * customerrepo.getCustomerdata(temp.getCustomerid()); Address addr =
		 * addrepo.getAddressOfCustomer(cus.getAddressid()); // response.put(i + 1, new
		 * CustomerOrders(cus, addr, temp)); response.add(new CustomerOrders(cus, addr,
		 * temp)); } return ResponseEntity.status(HttpStatus.OK).body(response);
		 */
		List<CustomerOrders> response = service.getSupplierOrders(supplierId);

		return ResponseEntity.status(HttpStatus.OK).body(response);

	}

	@GetMapping("/v1/supplier/{id}/getpendingpayments")
	public ResponseEntity<List<PendingMoneyResponse>> getSupplierPendingPayments(
			@PathVariable(value = "id") Long supplierId) {

		System.out.println(" getSupplierPendingPayments for Supplierid " + supplierId);

		List<PendingMoneyResponse> resp = service.getSupplierPendingPayments(supplierId);
		/*
		 * List<PendingPayments> res = pendingpaymentrepo.findSuppliersData(supplierId);
		 * for (int i = 0; i < res.size(); i++) { Customer cus =
		 * customerrepo.getCustomerdata(res.get(i).getCustomerid()); Address addr =
		 * addrepo.getAddressOfCustomer(cus.getAddressid());
		 * 
		 * resp.add(new PendingMoneyResponse(cus, addr, res.get(i).getAmount()));
		 * 
		 * }
		 */
		return ResponseEntity.status(HttpStatus.OK).body(resp);
	}

}
