package com.infor.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import com.infor.dto.UserMaintenanceDTO;
import com.infor.models.AjaxResponseBody;
import com.infor.models.InforRoles;
import com.infor.security.UserConfigurable;

@RestController
public class AjaxCallsMaintenance {
	
	@Autowired
	private RestTemplate rt;

	private static final String GET_ROLES_URI = "http://maintenance-service/getroles";
	private final static String REGISTER_USER = "http://maintenance-service/registeruserservice";
	private final static String GET_USERINFO = "http://maintenance-service/getuserinfo";
	private final static String MODIFY_USER = "http://maintenance-service/modifyuser";
	
	@GetMapping("/getroles")
	public List<InforRoles> getRoles(){
		UserMaintenanceDTO dto = rt.getForObject(GET_ROLES_URI, UserMaintenanceDTO.class);
		return dto.getInforRoles();
	}
	
	@PostMapping(value = "/registerhere")
	public AjaxResponseBody registerHere(@RequestBody UserMaintenanceDTO registerform){
		return rt.postForObject(REGISTER_USER, registerform, AjaxResponseBody.class);
	}
	
	@GetMapping(value = "/currentuserinfo")
	public UserMaintenanceDTO getCurrentUserInfo(Authentication authentication){
		UserConfigurable userdetails = (UserConfigurable) authentication.getPrincipal();
		UserMaintenanceDTO dto = new UserMaintenanceDTO();
		dto.setUsername(userdetails.getUsername());
		return rt.postForObject(GET_USERINFO, dto, UserMaintenanceDTO.class);
	}
	
	@PostMapping(value = "/modifyaccount")
	public AjaxResponseBody modifyAccount(@RequestBody UserMaintenanceDTO modifyform){
		System.out.println(modifyform.toString());
		return rt.postForObject(MODIFY_USER, modifyform, AjaxResponseBody.class);
	
	}
}