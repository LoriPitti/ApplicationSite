package com.dev.demo.controller;

import com.dev.demo.Entity.*;
import com.dev.demo.Service.MailService;
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

  //--------------------------------------ADMIN SECTION---------------------
  @PostMapping("/admin/add")
  public ResponseEntity<String> addAmin(@RequestBody String json){
    objectMapper = new ObjectMapper();
    try {
      Admin admin = objectMapper.readValue(json, Admin.class);
      System.out.println("Controller: ricevuto");
      if (service.addAdmin(admin))
        return ResponseEntity.ok().body("{\"content\" : \"Admin aggiunto\"}");
    } catch (JsonProcessingException e) {
      return ResponseEntity.badRequest().body("Errore interno");
    } catch (UserException e) {
      return ResponseEntity.badRequest().body(e.getMessage());
    }
    return ResponseEntity.badRequest().body("Errore sconosciuto");
  }

  @GetMapping("/admin/login")
  public ResponseEntity<String> adminLogin(@RequestParam String admin, @RequestParam String password) {
    try {
      String token = service.adminLogin(admin, password);
      if (!token.isEmpty()) {
        return ResponseEntity.ok().body("{\"content\" : \""+token+"\"}");
      } else
        return ResponseEntity.badRequest().body("Password errata");
    } catch (UserException e) {
      return ResponseEntity.badRequest().body("Admin inesistente");
    }
  }

  @GetMapping("/admin/data")
  public ResponseEntity<String> getAdminData(@RequestParam String username){
    try {
      AdminDB admin = service.getAdminData(username);
      return ResponseEntity.ok().body(
        "{\"cognome\": \"" + admin.getCognome() + "\"," +
        "\"cell\": \"" + admin.getCell() + "\"" +
        "}");
    } catch (UserException e) {
      return ResponseEntity.badRequest().body(e.getMessage());
    }
  }
  @GetMapping("/admin/data/update")
  public ResponseEntity<String> updateAdminData(@RequestParam String admin,
                                                @RequestParam String cognome,
                                                @RequestParam String cell,
                                                @RequestParam String bin){
    try{
      service.updateAdminData(admin, cognome, cell, bin);
      return ResponseEntity.ok().body("{\"content\" : \"Dati aggiornati\"}");
    }catch (UserException e){
      return ResponseEntity.badRequest().body(e.getMessage());
    }catch (Exception e) {
      return ResponseEntity.badRequest().body("Errore sconosiuto");
    }
  }
  //---------------------------------------------------USER METHOD-----------------------------------
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
    try {
      String token = service.login(username, password);
      if (!token.isEmpty()) {
        return ResponseEntity.ok().body("{\"content\" : \""+token+"\"}");
      } else
        return ResponseEntity.badRequest().body("Password errata");
    } catch (UserException e) {
      return ResponseEntity.badRequest().body("Utente inesistente");
    }
  }

  @PostMapping("/user/update/password")
  public ResponseEntity<String> updatePassword(@RequestBody String json) {
    objectMapper = new ObjectMapper();
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

  @GetMapping("user/data")
  public ResponseEntity<String> getUserData(@RequestParam String username){
    System.out.println("Utente"+username);
      try {
        UserDB user = service.getUserData(username);
          return ResponseEntity.ok().body("{\"nome\": \"" + user.getNome() + "\"," +
            "\"cognome\": \"" + user.getCognome() + "\"," +
            "\"matricola\": \"" + user.getMatricola() + "\"," +
            "\"email\": \"" + user.getEmail() + "\"," +
            "\"password\": \"" + user.getPassword() + "\"," +
            "\"verified\": \"" + user.getVerified() + "\"" +
            "}");
      } catch (UserException e) {
          return ResponseEntity.badRequest().body(e.getMessage());
      }
  }

  @PostMapping("user/data/update")
  public ResponseEntity<String> updateUserData(@RequestBody String json,
                                               @RequestParam String bin) {
    System.out.println("bin"+bin);
    objectMapper = new ObjectMapper();
    try {
      User user = objectMapper.readValue(json, User.class);
      service.updateData(user.utente(), bin, user.nome(), user.cognome(), user.email(), user.matricola());
      return ResponseEntity.ok().body("{\"content\" : \"updated\"}");
    } catch (JsonProcessingException e) {
      return ResponseEntity.badRequest().body("Errore interno");
    } catch (UserException e) {
      return ResponseEntity.badRequest().body(e.getMessage());
    }
  }

  @DeleteMapping("/user/delete")
  public ResponseEntity<String> deleteUser(@RequestParam String user){
      try {
          service.deleteUser(user);
          return ResponseEntity.ok().body("{\"content\": \"deleted\"}");
      } catch (UserException e) {
          return ResponseEntity.badRequest().body(e.getMessage());
      }
  }


      //----------------------------GESTORE MAIL------------------------------------------------
  @GetMapping("/user/recovery")
  public ResponseEntity<String> sendRecoveryEmail(@RequestParam String email){
   try{
     service.sendEmail(email,1);
     return ResponseEntity.ok().body("{\"content\" : \"email sent\"}");
   } catch (UserException e) {
       return ResponseEntity.badRequest().body(e.getMessage());
   }
  }

  @GetMapping("/user/confirm/email")
  public ResponseEntity<String> sendConfirmEmail(@RequestParam String email){
    try{
      service.sendEmail(email,2);
      return ResponseEntity.ok().body("{\"content\" : \"email sent\"}");
    } catch (UserException e) {
      return ResponseEntity.badRequest().body(e.getMessage());
    }
  }

  @GetMapping("/user/confirm/email/set")
  public ResponseEntity<String> updateConfirm(@RequestParam String user, @RequestParam int type){
      try {
          service.confirmEmail(user);
          return ResponseEntity.ok().body("{\"content\" : \"updated\"}");
      } catch (UserException e) {
          return ResponseEntity.badRequest().body(e.getMessage());
      }
  }

  //-----------------------------TOKEN VERIFICATION------------------------------------------------
  @GetMapping("user/token/verify")
  public ResponseEntity<String> verifyToken(@RequestParam String user,
                                            @RequestParam String token){
      try {
        if(service.verifyToken(user, token))
          return ResponseEntity.ok().body("{\"content\":\"validToken\"}");
        else
          return ResponseEntity.badRequest().body("invalid token");
      } catch (UserException e) {
          return ResponseEntity.badRequest().body(e.getMessage());
      }
  }



}

