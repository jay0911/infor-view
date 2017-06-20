package com.infor.controller;

import java.util.List;

import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.infor.dto.MaintenanceDTO;
import com.infor.endpoints.CarsMaintenanceEndpoints;
import com.infor.models.AjaxResponseBody;
import com.infor.models.InforCar;
import com.infor.security.SecurityHelper;
import com.infor.utils.InstantationUtil;
@RestController
public class AjaxCallsCarMaintenance extends AjaxCallsCommon{
	
	@PostMapping(value = "/addcar")
	public AjaxResponseBody addcar(@RequestBody MaintenanceDTO savecar,Authentication authentication){
		savecar.setUserid(SecurityHelper.getUserDetails(authentication).getUserid());
		return rt.postForObject(CarsMaintenanceEndpoints.SAVE_CARS, savecar, AjaxResponseBody.class);
	}
	
	@GetMapping(value = "/getcarowned")
	public List<InforCar> getcarowned(Authentication authentication){
		MaintenanceDTO dto = InstantationUtil.createDTOinstance();
		dto.setUserid(SecurityHelper.getUserDetails(authentication).getUserid());
		MaintenanceDTO returnDTO  = rt.postForObject(CarsMaintenanceEndpoints.GET_CARS,dto, MaintenanceDTO.class);
		return returnDTO.getInforCars();
	}
	
	@PostMapping(value = "/deletecar")
	public AjaxResponseBody deletecar(@RequestBody MaintenanceDTO deletecar){
		return rt.postForObject(CarsMaintenanceEndpoints.DELETE_CARS, deletecar, AjaxResponseBody.class);
	}
	
	@PostMapping(value = "/editcar")
	public AjaxResponseBody editcar(@RequestBody MaintenanceDTO editcar){
		return rt.postForObject(CarsMaintenanceEndpoints.EDIT_CARS, editcar, AjaxResponseBody.class);
	}
}
