package com.dev.demo.Service;

import com.dev.demo.Entity.User;
import com.dev.demo.Entity.UserDB;
import com.dev.demo.exception.UserException;
import com.dev.demo.repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;

@org.springframework.stereotype.Service
public class Service {
  @Autowired
  UserRepo userRepo;
  @Autowired
  MailService mailService;

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
        userRepo.updateVerified(0, email);
      }
    }else throw new UserException("Utente inesistente");

  }

  //---------------------------------------GESTORE MAIL..............................

  public void sendEmail(String email, int type) throws UserException {
    if(isUserExist("",email) == 1){ //1-> mail exist
        String user = userRepo.getUtente(email);
        String psw = userRepo.getPassword(user);
        String name = userRepo.getNome(user);
        if(type == 1)
            mailService.sendEmail(user, psw, name, email, "Recupero credenziali", 1);
        else
          mailService.sendEmail(user, psw, name, email, "Conferma l'email", 2);
    }else{
      throw new UserException("Email inesistente");
    }
  }
  public void confirmEmail(String user) throws UserException {
    if(isUserExist(user, "") == 2){
        userRepo.updateVerified(1, user);
    }
    else
      throw new UserException("utente inesistente");
  }
}
