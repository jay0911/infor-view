package com.infor.controller;


import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.infor.dto.TransactionDTO;
import com.infor.endpoints.TransactionsEndpoints;
import com.infor.models.AjaxResponseBody;
import com.infor.models.Email;
import com.infor.models.InforTransaction;
import com.infor.security.UserConfigurable;


@RestController
public class AjaxCallsTransactions extends AjaxCallsCommon{
	
	@GetMapping("/checkregisteredforparking")
	public TransactionDTO checkregisteredforparking(){
		UserConfigurable userDetails = (UserConfigurable) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		InforTransaction it = new InforTransaction();
		System.out.println(userDetails.getUserid());
		it.setUserid(userDetails.getUserid());
		return rt.postForObject(TransactionsEndpoints.CHECK_IF_REGISTERED_FOR_PARKING,it, TransactionDTO.class);
	}
	
	@PostMapping("/timein")
	public AjaxResponseBody timein(@RequestBody InforTransaction it){
		return rt.postForObject(TransactionsEndpoints.BEGIN_TRANSACTION,it, AjaxResponseBody.class);
	}
	
	@PostMapping("/timeout")
	public AjaxResponseBody timeout(@RequestBody InforTransaction it){
		return rt.postForObject(TransactionsEndpoints.END_TRANSACTION,it, AjaxResponseBody.class);
	}
	
	@PostMapping("/sendemail")
	public AjaxResponseBody timeout(@RequestBody Email email){
		return rt.postForObject(TransactionsEndpoints.SENDMAIL,email, AjaxResponseBody.class);
	}
}
