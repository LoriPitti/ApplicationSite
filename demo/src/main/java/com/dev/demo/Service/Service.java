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
              userRepo.save(new UserDB(0,user.utente(), user.matricola(), user.nome(), user.cognome(), user.email(), user.password(), 0));
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

  public boolean updatePassword(String user, String password, String passwordNew) throws UserException {
    if(login(user, password)){
        return userRepo.updatePassword(passwordNew, user) == 1;  //1-> ok
    }else
      throw  new UserException("password errata");
  }

  public void sendRecoveryEmail(String email) throws UserException {
    if(isUserExist("",email) == 1){ //1-> mail exist
        String user = userRepo.getUtente(email);
        String psw = userRepo.getPassword(user);
      mailService.sendRecoveryEmail(user, psw, email, "Recupero credenziali");
    }else{
      throw new UserException("Email inesistente");
    }
  }
}
