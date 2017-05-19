package com.infor.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import com.infor.endpoints.TransactionsEndpoints;
import com.infor.models.AjaxResponseBody;
import com.infor.models.InforTransaction;
import com.infor.security.UserConfigurable;


@RestController
public class AjaxCallsTransactions {
	@Autowired
	private RestTemplate rt;
	
	@GetMapping("/checkregisteredforparking")
	public AjaxResponseBody checkregisteredforparking(){
		UserConfigurable userDetails = (UserConfigurable) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		InforTransaction it = new InforTransaction();
		System.out.println(userDetails.getUserid());
		it.setUserid(userDetails.getUserid());
		return rt.postForObject(TransactionsEndpoints.CHECK_IF_REGISTERED_FOR_PARKING,it, AjaxResponseBody.class);
	}
}
