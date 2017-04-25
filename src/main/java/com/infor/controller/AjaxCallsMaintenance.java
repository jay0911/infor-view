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
import com.infor.models.InforCar;
import com.infor.models.InforParking;
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
	
	private final static String DELETE_ROLE = "http://maintenance-service/deleterole";
	private final static String SAVE_ROLE = "http://maintenance-service/saverole";
	
	private final static String GET_CARS = "http://maintenance-service/selectcar";
	private final static String SAVE_CARS = "http://maintenance-service/savecar";
	private final static String DELETE_CARS = "http://maintenance-service/deletecar";
	private final static String EDIT_CARS = "http://maintenance-service/editcar";
	
	private final static String GET_PARKINGS = "http://maintenance-service/selectparking";
	
	/**
	 * gets the user details of current user logged in
	 * @param authentication
	 * @return
	 */
	private UserConfigurable getUserDetails(Authentication authentication){
		return (UserConfigurable) authentication.getPrincipal();
	}
	
	/**
	 * creates dto instance
	 * @return
	 */
	private UserMaintenanceDTO createDTOinstance(){
		return new UserMaintenanceDTO();
	}
	
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
		UserMaintenanceDTO dto = createDTOinstance();
		dto.setUsername(getUserDetails(authentication).getUsername());
		return rt.postForObject(GET_USERINFO, dto, UserMaintenanceDTO.class);
	}
	
	@PostMapping(value = "/modifyaccount")
	public AjaxResponseBody modifyAccount(@RequestBody UserMaintenanceDTO modifyform){
		System.out.println(modifyform.toString());
		return rt.postForObject(MODIFY_USER, modifyform, AjaxResponseBody.class);
	}
	
	@PostMapping(value = "/deleterole")
	public AjaxResponseBody deleteRole(@RequestBody UserMaintenanceDTO deleteFORM){
		return rt.postForObject(DELETE_ROLE, deleteFORM, AjaxResponseBody.class);
	}
	
	@PostMapping(value = "/saverole")
	public AjaxResponseBody saverole(@RequestBody UserMaintenanceDTO saveform){
		return rt.postForObject(SAVE_ROLE, saveform, AjaxResponseBody.class);
	}
	
	@PostMapping(value = "/addcar")
	public AjaxResponseBody addcar(@RequestBody UserMaintenanceDTO savecar,Authentication authentication){
		savecar.setUserid(getUserDetails(authentication).getUserid());
		return rt.postForObject(SAVE_CARS, savecar, AjaxResponseBody.class);
	}
	
	@GetMapping(value = "/getcarowned")
	public List<InforCar> getcarowned(Authentication authentication){
		UserMaintenanceDTO dto = createDTOinstance();
		dto.setUserid(getUserDetails(authentication).getUserid());
		UserMaintenanceDTO returnDTO  = rt.postForObject(GET_CARS,dto, UserMaintenanceDTO.class);
		return returnDTO.getInforCars();
	}
	
	@PostMapping(value = "/deletecar")
	public AjaxResponseBody deletecar(@RequestBody UserMaintenanceDTO deletecar){
		return rt.postForObject(DELETE_CARS, deletecar, AjaxResponseBody.class);
	}
	
	@PostMapping(value = "/editcar")
	public AjaxResponseBody editcar(@RequestBody UserMaintenanceDTO editcar){
		return rt.postForObject(EDIT_CARS, editcar, AjaxResponseBody.class);
	}
	
	@GetMapping(value = "/getallparking")
	public List<InforParking> getallParking(){
		UserMaintenanceDTO returnDTO  = rt.postForObject(GET_PARKINGS, createDTOinstance(), UserMaintenanceDTO.class);
		return returnDTO.getInforParkings();
	}
}
