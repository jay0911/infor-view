package com.infor.security;

import org.springframework.security.core.Authentication;

public class SecurityHelper {
	/**
	 * gets the user details of current user logged in
	 * @param authentication
	 * @return
	 */
	public static UserConfigurable getUserDetails(Authentication authentication){
		return (UserConfigurable) authentication.getPrincipal();
	}
}
