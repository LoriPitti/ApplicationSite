package com.dev.demo.Service;

import com.dev.demo.Entity.Token;
import com.dev.demo.Entity.User;
import com.dev.demo.Entity.UserDB;
import com.dev.demo.exception.UserException;
import com.dev.demo.repository.TokenRepo;
import com.dev.demo.repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;

import java.security.SecureRandom;
import java.util.Base64;

@org.springframework.stereotype.Service
public class Service {
  @Autowired
  UserRepo userRepo;
  @Autowired
  MailService mailService;
  @Autowired
  TokenRepo tokenRepo;

  public boolean signup(User user) throws UserException {
    int status = isUserExist(user.utente(), user.email());
      return switch (status) {
          case 0 -> {
              userRepo.save(new UserDB(0,user.utente(), user.matricola(), user.nome(), user.cognome(), user.email(), user.password(), 0, 0));
              yield true;
          }
          case 1 -> throw new UserException("email");
          case 2 -> throw new UserException("utente");
          default -> false;
      };
  }

  public boolean login(String username, String password) throws UserException {
    String psw = userRepo.getPassword(username);
    System.out.println("passowrd " + psw);
    if(psw == null)
      throw new UserException("Utente inesistente");
    return psw.equals(password);
  }
  private int isUserExist(String utente, String email){
     if(userRepo.existsByEmail(email))
      return 1;
     if(userRepo.existsByUtente(utente))
        return 2;
      return 0;
  }

  public UserDB getUserData(String username) throws UserException {
    if(isUserExist(username, "") == 2){
      return  userRepo.findByUtente(username);

    }else {
      throw new UserException("utente inesistente");
    }
  }
  public boolean updatePassword(String user, String password, String passwordNew) throws UserException {
    if(login(user, password)){
        return userRepo.updatePassword(passwordNew, user) == 1;  //1-> ok
    }else
      throw  new UserException("password errata");
  }

  public void updateData(String user, String bin, String nome, String cognome, String email, int matricola) throws UserException {
    boolean status = true;
    if(this.isUserExist(user, "") == 2){
      //bin has 4 digit ( binari number )
      //for each digit == 1 update the relative element
      //1 1 1 1 -> name surname matr email (0 1 2 3)
      char digit0 = bin.charAt(0);
      char digit1 = bin.charAt(1);
      char digit2 = bin.charAt(2);
      char digit3 = bin.charAt(3);
      if(digit0 == '1')
        userRepo.updateNome(nome, user);
      if(digit1 == '1')
        userRepo.udpateCognome(cognome, user);
      if(digit3 == '1')
        userRepo.updateMatricola(matricola, user);
      if(digit2 == '1'){
        if(isUserExist(user, email) == 1)
          throw new UserException("Email già esistente");
        userRepo.updateEmail(email,user);
        userRepo.updateVerified(0, user);
      }
    }else throw new UserException("Utente inesistente");

  }

  public void deleteUser(String user) throws UserException {
    if(isUserExist(user, "")==2){
      userRepo.deleteById(userRepo.getUserId(user));
    }else
      throw new UserException("Utente inesistente");

  }
  //---------------------------------------GESTORE MAIL..............................

  public void sendEmail(String email, int type) throws UserException {
    if(isUserExist("",email) == 1){ //1-> mail exist
        String user = userRepo.getUtente(email);
        String psw = userRepo.getPassword(user);
        String name = userRepo.getNome(user);
        String token = "";
        if(type == 1)
            mailService.sendEmail(user, psw, name, email, "Recupero credenziali", 1, "");
        else {
          if(!tokenRepo.existsByUtente(user)){ //utente senza token
             token = generateToken();
            tokenRepo.save(new Token(0, user,token));
          }else {
             token = tokenRepo.getToken(user);
          }
          mailService.sendEmail(user, psw, name, email, "Conferma l'email", 2, token);
        }
    }else{
      throw new UserException("Email inesistente");
    }
  }
  public void confirmEmail(String user) throws UserException {
    if(isUserExist(user, "") == 2){
        userRepo.updateVerified(1, user);
       // tokenRepo.deleteById(tokenRepo.getTokenId(user));
    }
    else
      throw new UserException("utente inesistente");
  }

  //------------------------------------------TOKEN-------------------
  private String generateToken(){
    SecureRandom secureRandom = new SecureRandom();
    byte[] tokenBytes = new byte[32]; // Lunghezza del token in byte
    secureRandom.nextBytes(tokenBytes);
    return Base64.getUrlEncoder().withoutPadding().encodeToString(tokenBytes);
  }

  public boolean verifyToken(String user, String token) throws UserException {
    if(isUserExist(user,"") == 2){
        return tokenRepo.getToken(user).equals(token);
    }else
      throw new UserException("Utente inesistente");
  }
}
