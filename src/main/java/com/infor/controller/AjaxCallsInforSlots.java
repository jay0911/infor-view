package com.infor.controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.infor.dto.SlotsDTO;
import com.infor.endpoints.SlotsEndpoints;

@RestController
public class AjaxCallsInforSlots extends AjaxCallsCommon{

	@GetMapping("/public/getUnassignedSlots")
	public SlotsDTO getUnassignedSlots(){
		return rt.getForObject(SlotsEndpoints.GET_UNASSIGNEDSLOTS, SlotsDTO.class);
	}
	
	@GetMapping("/public/getAssignedSlots")
	public SlotsDTO getAssignedSlots(){
		return rt.getForObject(SlotsEndpoints.GET_ASSIGNEDSLOTS, SlotsDTO.class);
	}
	
	/*
	 * get all slots via result of @getUnassignedSlots and @getAssignedSlots
	 */
	@GetMapping("/public/getAllSlots")
	public SlotsDTO getAllSlots(){
		return rt.getForObject(SlotsEndpoints.GET_ALLSLOTS, SlotsDTO.class);
	}
	
	@GetMapping("/public/getAvailSlot")
	public SlotsDTO getAvailSlot(){
		return rt.getForObject(SlotsEndpoints.GET_AVAILSLOTS, SlotsDTO.class);
	}
	
	@GetMapping("/public/getUnAvailSlot")
	public SlotsDTO getUnAvailSlot(){
		return rt.getForObject(SlotsEndpoints.GET_UNAVAILSLOTS, SlotsDTO.class);
	}
}
