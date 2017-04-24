package com.infor.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.infor.dto.UserMaintenanceDTO;

@Controller
@RequestMapping("/loginhere")
public class AjaxLoginController {
	@Autowired
	AuthenticationManager authenticationManager;

	@RequestMapping(method=RequestMethod.POST)
	@ResponseBody
	public LoginStatus performLogin(@RequestBody UserMaintenanceDTO loginform,
		HttpServletRequest request, HttpServletResponse response) {
		UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(loginform.getUsername(), loginform.getPassword());

	 
	    try {
	      Authentication auth = authenticationManager.authenticate(token);
	      SecurityContextHolder.getContext().setAuthentication(auth);
	      return new LoginStatus(auth.isAuthenticated(), auth.getName());
	    } catch (BadCredentialsException e) {
	      return new LoginStatus(false, null);
	    }
	}
	
	 class LoginStatus {		  
		    private final boolean loggedIn;
		    private final String username;
		 
		    public LoginStatus(boolean loggedIn, String username) {
		      this.loggedIn = loggedIn;
		      this.username = username;
		    }
		 
		    public boolean isLoggedIn() {
		      return loggedIn;
		    }
		 
		    public String getUsername() {
		      return username;
		    }
	  }
}