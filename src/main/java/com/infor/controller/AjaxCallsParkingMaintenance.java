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
import com.infor.models.InforParking;
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
	public List<InforParking> deleteparking(@RequestBody MaintenanceDTO deleteparking){
		MaintenanceDTO returnDTO  = rt.postForObject(ParkingMaintenanceEndpoints.DELETE_PARKING, deleteparking, MaintenanceDTO.class);
		return returnDTO.getInforParkings();
	}
}
