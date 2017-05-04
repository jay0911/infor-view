package com.infor.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import com.infor.dto.MaintenanceDTO;
import com.infor.endpoints.UserMaintenanceEndpoints;
import com.infor.models.AjaxResponseBody;
import com.infor.security.SecurityHelper;
import com.infor.utils.InstantationUtil;

@RestController
public class AjaxCallsUserMaintenance {
	
	@Autowired
	private RestTemplate rt;
	
	@PostMapping(value = "/registerhere")
	public AjaxResponseBody registerHere(@RequestBody MaintenanceDTO registerform){
		return rt.postForObject(UserMaintenanceEndpoints.REGISTER_USER, registerform, AjaxResponseBody.class);
	}
	
	@GetMapping(value = "/currentuserinfo")
	public MaintenanceDTO getCurrentUserInfo(Authentication authentication){
		MaintenanceDTO dto = InstantationUtil.createDTOinstance();
		dto.setUsername(SecurityHelper.getUserDetails(authentication).getUsername());
		return rt.postForObject(UserMaintenanceEndpoints.GET_USERINFO, dto, MaintenanceDTO.class);
	}
	
	@PostMapping(value = "/modifyaccount")
	public AjaxResponseBody modifyAccount(@RequestBody MaintenanceDTO modifyform){
		System.out.println(modifyform.toString());
		return rt.postForObject(UserMaintenanceEndpoints.MODIFY_USER, modifyform, AjaxResponseBody.class);
	}
	
	@GetMapping(value = "/getusers")
	public MaintenanceDTO getusers(){
		return rt.postForObject(UserMaintenanceEndpoints.GET_USERS,InstantationUtil.createDTOinstance(), MaintenanceDTO.class);
	}
	
	@GetMapping(value = "/getallavailuserforparking")
	public MaintenanceDTO getallavailuserforparking(){
		return rt.postForObject(UserMaintenanceEndpoints.GET_INFORPARKINGUSERS,InstantationUtil.createDTOinstance(), MaintenanceDTO.class);
	}

}
