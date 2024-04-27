package com.dev.demo.controller;

import com.dev.demo.Entity.Password;
import com.dev.demo.Entity.User;
import com.dev.demo.Service.Service;
import com.dev.demo.exception.UserException;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class Controller {
  @Autowired
  Service service;
  private ObjectMapper objectMapper;

  //--------------------USER METHOD-----------------------------------
  @PostMapping("/signup")
  public ResponseEntity<String> signup(@RequestBody String json) {
    objectMapper = new ObjectMapper();
    try {
      User user = objectMapper.readValue(json, User.class);
      if (service.signup(user))
        return ResponseEntity.ok().body("{\"content\" : \"confermato\"}");

    } catch (JsonProcessingException e) {
      return ResponseEntity.badRequest().body("Errore interno");
    } catch (UserException e) {
      if (e.getMessage().equals("email"))
        return ResponseEntity.badRequest().body("Email già esistente");
      else if (e.getMessage().equals("utente"))
        return ResponseEntity.badRequest().body("Nome utente già esistente");
    }
    return ResponseEntity.badRequest().body("Errore sconsosciuto");
  }

  @GetMapping("/login")
  public ResponseEntity<String> login(@RequestParam String username, @RequestParam String password) {
    System.out.println("us : " + username + " ps: " + password);
    try {
      if (service.login(username, password)) {
        return ResponseEntity.ok().body("{\"content\" : \"log\"}");
      } else
        return ResponseEntity.badRequest().body("Password errata");
    } catch (UserException e) {
      return ResponseEntity.badRequest().body("Utente inesistente");
    }
  }

  @PostMapping("/user/update/password")
  public ResponseEntity<String> updatePassword(@RequestBody String json) {
    objectMapper = new ObjectMapper();
    System.out.println("JSON: "+json);
    try {
      Password psw = objectMapper.readValue(json, Password.class);
      service.updatePassword(psw.user(), psw.password(), psw.passwordNew());
      return ResponseEntity.ok().body("{\"content\" : \"updated\"}");
    } catch (JsonProcessingException e) {
      return ResponseEntity.badRequest().body("Errore interno");
    } catch (UserException e) {
      return ResponseEntity.badRequest().body(e.getMessage());
    }
  }
}

