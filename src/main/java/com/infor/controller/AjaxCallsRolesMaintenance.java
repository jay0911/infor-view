package com.infor.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import com.infor.dto.MaintenanceDTO;
import com.infor.endpoints.RolesMaintenanceEndpoints;
import com.infor.models.AjaxResponseBody;
import com.infor.models.InforRoles;
@RestController
public class AjaxCallsRolesMaintenance {
	@Autowired
	private RestTemplate rt;

	@GetMapping("/getroles")
	public List<InforRoles> getRoles(){
		MaintenanceDTO dto = rt.getForObject(RolesMaintenanceEndpoints.GET_ROLES_URI, MaintenanceDTO.class);
		return dto.getInforRoles();
	}
	
	@PostMapping(value = "/deleterole")
	public AjaxResponseBody deleteRole(@RequestBody MaintenanceDTO deleteFORM){
		return rt.postForObject(RolesMaintenanceEndpoints.DELETE_ROLE, deleteFORM, AjaxResponseBody.class);
	}
	
	@PostMapping(value = "/saverole")
	public AjaxResponseBody saverole(@RequestBody MaintenanceDTO saveform){
		return rt.postForObject(RolesMaintenanceEndpoints.SAVE_ROLE, saveform, AjaxResponseBody.class);
	}
}
