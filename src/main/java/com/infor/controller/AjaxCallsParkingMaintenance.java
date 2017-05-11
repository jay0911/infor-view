package com.infor.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import com.infor.dto.MaintenanceDTO;
import com.infor.endpoints.ParkingMaintenanceEndpoints;
import com.infor.models.AjaxResponseBody;
import com.infor.models.InforParking;
import com.infor.models.InforUser;
import com.infor.utils.InstantationUtil;

@RestController
public class AjaxCallsParkingMaintenance {
	@Autowired
	private RestTemplate rt;
	
	@GetMapping(value = "/getallparking")
	public List<InforParking> getallParking(){
		MaintenanceDTO returnDTO  = rt.postForObject(ParkingMaintenanceEndpoints.GET_PARKINGS, InstantationUtil.createDTOinstance(), MaintenanceDTO.class);
		return returnDTO.getInforParkings();
	}
	
	@PostMapping(value = "/deleteparking")
	public AjaxResponseBody deleteparking(@RequestBody MaintenanceDTO deleteparking){
		return rt.postForObject(ParkingMaintenanceEndpoints.DELETE_PARKING, deleteparking, AjaxResponseBody.class);	
	}
	
	@PostMapping(value = "/saveparking")
	public AjaxResponseBody saveparking(@RequestBody MaintenanceDTO saveparking){
		return rt.postForObject(ParkingMaintenanceEndpoints.SAVE_PARKING, saveparking, AjaxResponseBody.class);
		
	}
	
	@PostMapping("/selectParkingUsers")
	public List<InforUser> selectParkingUsers(@RequestBody MaintenanceDTO dto){
		MaintenanceDTO returnDTO  = rt.postForObject(ParkingMaintenanceEndpoints.SELECT_PARKINGUSERS, dto, MaintenanceDTO.class);
		return returnDTO.getInforUsers();
	}
	
	@PostMapping("/editparking")
	public AjaxResponseBody editparking(@RequestBody MaintenanceDTO[] dto){
		return rt.postForObject(ParkingMaintenanceEndpoints.EDIT_PARKING, dto, AjaxResponseBody.class);
	}
}
