package com.example.react.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class helloController {
	
	@RequestMapping(value = "/api",method = RequestMethod.GET)
	public String hello(){
		return "Hello World";
	}
	
	
}
