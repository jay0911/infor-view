package com.infor.controller;

import java.util.Set;

import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.context.SecurityContextHolder;
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

	@GetMapping("/homepage")
	public String homepagecustomers(){	
        Set<String> roles = AuthorityUtils.authorityListToSet(SecurityContextHolder.getContext().getAuthentication().getAuthorities());
        if (roles.contains("janitor")) {
        	return homepageadmin();
        }
		return "pages/homepageusers";
	}
	
	@GetMapping("/homepageadmin")
	public String homepageadmin(){		
		return "pages/homepageadmin";
	}
}
