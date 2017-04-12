package com.infor.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import com.infor.dto.UserMaintenanceDTO;
import com.infor.models.InforRoles;

@RestController
public class AjaxCallsMaintenance {
	
	@Autowired
	private RestTemplate rt;

	private static final String GET_ROLES_URI = "http://maintenance-service/getroles";
	
	@GetMapping("/getroles")
	public List<InforRoles> getRoles(){
		UserMaintenanceDTO dto = rt.getForObject(GET_ROLES_URI, UserMaintenanceDTO.class);
		return dto.getInforRoles();
	}
}
