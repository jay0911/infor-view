package com.infor.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.client.RestTemplate;

public class AjaxCallsCommon {
	@Autowired
	protected RestTemplate rt;
}
