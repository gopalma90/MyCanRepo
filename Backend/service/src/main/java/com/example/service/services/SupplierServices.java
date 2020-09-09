package com.example.service.services;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.service.model.Address;
import com.example.service.model.Customer;
import com.example.service.model.OrderDetails;
import com.example.service.model.PendingCans;
import com.example.service.model.PendingPayments;
import com.example.service.model.Supplier;
import com.example.service.repository.AddressRepo;
import com.example.service.repository.CustomerRepo;
import com.example.service.repository.OrderDetailsRepo;
import com.example.service.repository.PendingCansRepo;
import com.example.service.repository.PendingPaymentsRepo;
import com.example.service.repository.SupplierRepo;
import com.example.service.responsedata.CustomerOrders;
import com.example.service.responsedata.PendingCanResponse;
import com.example.service.responsedata.PendingMoneyResponse;

@Service
public class SupplierServices {

	@Autowired
	SupplierRepo suprepo;
	@Autowired
	AddressRepo addrepo;
	@Autowired
	OrderDetailsRepo orderrepo;
	@Autowired
	CustomerRepo customerrepo;
	@Autowired
	PendingPaymentsRepo pendingpaymentrepo;
	@Autowired
	PendingCansRepo pendingcansrepo;

	@Transactional
	public Supplier addSupplier(String request) {

		Supplier res = new Supplier();
		JSONObject obj;

		try {
			obj = (JSONObject) new JSONObject(request);
			JSONObject addressobj = obj.getJSONObject("address");

			String floor = addressobj.has("floorno") ? addressobj.getString("floorno") : " ";
			String apartmentname = addressobj.has("apartmentname") ? addressobj.getString("apartmentname") : " ";
			String state = addressobj.has("state") ? addressobj.getString("state") : " ";

			Address add = new Address((String) obj.getJSONObject("address").getString("doorno"), (String) floor,
					(String) obj.getJSONObject("address").getString("street"), (String) apartmentname,
					(String) obj.getJSONObject("address").getString("area"),
					(String) obj.getJSONObject("address").getString("city"), (String) state);

			Address updatedadd = addrepo.save(add);

			if (Objects.nonNull(updatedadd)) {
				Supplier sup = new Supplier((String) obj.get("name").toString(),
						(String) obj.get("shopname").toString(), updatedadd.getId(),
						(String) obj.get("contact").toString());

				res = suprepo.save(sup);
			} else
				res = null;
		} catch (Exception e) {
			System.out.println(" exception thrown ");
			System.out.println(e);
			res = null;
		}
		System.out.println(" Addsupplier response " + res);
		return res;
	}

	public List<Supplier> getAllSuppliers() {
		return suprepo.findAll();
	}

	public Supplier getSupplierById(Long Id) {

		Optional<Supplier> op = suprepo.findById(Id);

		return op.get();
	}

	@Transactional
	public Supplier updatesupplierData(Long Id, Supplier Details) {

		Supplier supplier = (suprepo.findById(Id)).get();
		try {
			if (Objects.nonNull(supplier)) {
				supplier.setAddressid(Details.getAddressid());
				supplier.setContact(Details.getContact());
				supplier.setName(Details.getName());
				supplier.setShopname(Details.getShopname());

				return suprepo.save(supplier);
			}
		} catch (Exception e) {
			System.out.println(" Updatesupplierdata exception " + e);
		}
		return null;
	}

	@Transactional
	public Boolean updateCanDelivered(Long supplierId, String Request) {

		JSONObject obj;
		Boolean res = false;
		try {
			obj = (JSONObject) new JSONObject(Request);
			JSONObject order = obj.getJSONObject("orders");

			Double cost = 40.00 * (int) order.getLong("quantity");
			try {

				PendingPayments paymentpending = new PendingPayments((Long) order.getLong("customerid"), supplierId,
						cost, (Long) order.getLong("id"));
				pendingpaymentrepo.save(paymentpending);

				orderrepo.updateDeliveryStatus((Long) order.getLong("id"), new Date(), 1);
				res = true;
			} catch (Exception e) {
				System.out.println(" DB update failed " + e);
				res = false;
			}
		} catch (Exception e) {
			System.out.print("Got exception in updating delivery status " + e);
			res = false;
		}

		System.out.println(" updateCanDelivered response for supplierid " + supplierId + " is = " + res);
		return res;
	}

	@Transactional
	public Boolean updateCanDeliveredWithPayment(Long supplierId, String Request) {

		JSONObject obj;
		Boolean res = false;
		try {
			obj = (JSONObject) new JSONObject(Request);
			JSONObject order = obj.getJSONObject("orders");
			Double cost = 40.00 * (int) order.getLong("quantity");
			PendingPayments paymentpending = new PendingPayments((Long) order.getLong("customerid"), supplierId, cost,
					(Long) order.getLong("id"), true);
			pendingpaymentrepo.save(paymentpending);
			orderrepo.updateDeliveryStatus((Long) order.getLong("id"), new Date(), 1);
			res = true;
		} catch (Exception e) {
			System.out.print("Got exception in dismissing order " + e);
		}
		System.out.println(" updateCanDeliveredWithPayment response for supplierid " + supplierId + " is = " + res);

		return res;

	}

	@Transactional
	public Boolean canOrderRejected(Long supplierId, String Request) {
		JSONObject obj;
		Boolean res = false;
		try {
			obj = (JSONObject) new JSONObject(Request);
			JSONObject order = obj.getJSONObject("orders");
			orderrepo.cancelOrderBySupplier((Long) order.getLong("id"));
			res = true;
		} catch (Exception e) {
			System.out.print("Got exception in dismissing order " + e);
		}
		System.out.println(" canOrderRejected response for supplierid " + supplierId + " is = " + res);

		return res;
	}

	@Transactional
	public List<CustomerOrders> getSupplierOrders(Long Id) {

		List<CustomerOrders> response = new ArrayList<CustomerOrders>();

		try {
			List<OrderDetails> res = orderrepo.findSupplierOrders(Id);

			for (int i = 0; i < res.size(); i++) {
				OrderDetails temp = res.get(i);
				Customer cus = customerrepo.getCustomerdata(temp.getCustomerid());
				Address addr = addrepo.getAddressOfCustomer(cus.getAddressid());
				response.add(new CustomerOrders(cus, addr, temp));
			}
		} catch (Exception e) {
			System.out.println(" getSupplierOrders Exception " + e);
			return null;
		}
		System.out.println(" getSupplierOrders response for supplierid " + Id + " is = " + response);

		return response;
	}

	@Transactional
	public List<PendingMoneyResponse> getSupplierPendingPayments(Long supplierId) {

		List<PendingMoneyResponse> resp = new ArrayList<PendingMoneyResponse>();
		HashMap<Long, Double> custbalance = new HashMap<Long, Double>();
		try {
			List<PendingPayments> res = pendingpaymentrepo.findSuppliersPendingAmount(supplierId);
			for (int i = 0; i < res.size(); i++) {

				if (custbalance.containsKey(res.get(i).getCustomerid())) {
					Double bal = custbalance.get(res.get(i).getCustomerid());
					bal += res.get(i).getAmount();
					custbalance.put(res.get(i).getCustomerid(), bal);
				} else {
					custbalance.put(res.get(i).getCustomerid(), res.get(i).getAmount());
				}
			}

			for (Map.Entry<Long, Double> customerdata : custbalance.entrySet()) {
				Customer cus = customerrepo.getCustomerdata((Long) customerdata.getKey());
				Address addr = addrepo.getAddressOfCustomer(cus.getAddressid());

				resp.add(new PendingMoneyResponse(cus, addr, (Double) customerdata.getValue()));
			}
		} catch (Exception e) {
			System.out.println(" getsSupplierPendingPayments exception" + e);
		}
		System.out.println(" getSupplierPendingPayments response for supplierid " + supplierId + " is = " + resp);

		return resp;
	}

	@Transactional
	public Boolean supplierMoneySettled(Long supplierId, String Request) {
		Boolean resp = false;
		try {
			JSONObject obj = (JSONObject) new JSONObject(Request);
			JSONObject customer = obj.getJSONObject("customer");
			pendingpaymentrepo.updateMoneySettled(supplierId, customer.getLong("id"));
			resp = true;
		} catch (Exception e) {
			System.out.println(" exception at supplierMoneySettled" + e);
		}
		System.out.println(" supplierMoneySettled response for supplierid " + supplierId + " is = " + resp);

		return resp;
	}

	@Transactional
	public Boolean updateCustomerPendingCans(Long supplierId, String Request) {
		Boolean returnVal = false;
		try {
			JSONObject obj = (JSONObject) new JSONObject(Request);

			JSONObject customer = obj.getJSONObject("customer");
			Long customerId = customer.getLong("id");
			JSONObject pendingCans = obj.getJSONObject("pendingcans");
			Integer quantity = pendingCans.getInt("quantity");

			PendingCans data = pendingcansrepo.getExistingCustomerData(customerId, supplierId);
			if (data != null) {
				System.out.println("data not null");
				pendingcansrepo.updateExistingCustomerData(customerId, supplierId, quantity);
				returnVal = true;
			} else {
				pendingcansrepo.save(new PendingCans(customerId, supplierId, quantity));
				returnVal = true;
			}

		} catch (Exception e) {
			System.out.println(" exception at updateCustomerPendingcans" + e);
		}
		System.out.println(" updateCustomerPendingcans response for supplierid " + supplierId + " is = " + returnVal);

		return returnVal;
	}

	public List<PendingCanResponse> getAllPendingCans(Long supplierId) {
		List<PendingCanResponse> pendingCanResponse = new ArrayList<PendingCanResponse>();

		try {
			List<PendingCans> pendingcans = pendingcansrepo.getAllPendingcans(supplierId);

			for (int i = 0; i < pendingcans.size(); i++) {
				Customer cus = customerrepo.getCustomerdata(pendingcans.get(i).getCustomerId());
				Address addr = addrepo.getAddressOfCustomer(cus.getAddressid());
				pendingCanResponse.add(new PendingCanResponse(cus, addr, pendingcans.get(i).getPendingCanQuantity()));
			}
		} catch (Exception e) {
			System.out.println(" exception at getTotalPendingcans" + e);
		}

		System.out.println(" getTotalPendingCans response for supplierid " + supplierId);

		return pendingCanResponse;
	}

}
