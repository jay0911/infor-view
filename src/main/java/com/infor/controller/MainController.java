package com.infor.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import com.infor.models.InforUser;

@Controller
public class MainController {
	
	@GetMapping("/homepagepublic")
	public String homepagepublic(){		
		return "pages/homepagepublic";
	}
	
	@GetMapping("/login")
	public String log(Model model){	
		model.addAttribute("customer",new InforUser());
		return "pages/login";
	}
}
