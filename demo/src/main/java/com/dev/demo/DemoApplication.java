package com.dev.demo;

import com.dev.demo.controller.Controller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class DemoApplication {

	public static void main(String[] args) {

    SpringApplication.run(DemoApplication.class, args);
	}
  @Autowired
  Controller controller;

}
