package com.dev.demo.Service;

import com.dev.demo.Entity.*;
import com.dev.demo.exception.UniversityException;
import com.dev.demo.exception.UserException;
import com.dev.demo.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.io.UncheckedIOException;
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
  @Autowired
  AdminRepo adminRepo;
  @Autowired
  DipartimentoRepo dipartimentoRepo;
  @Autowired
  UniversityRepo universityRepo;

//------------------------------ADMIN---------------------------------------------------
public boolean addAdmin(Admin admin) throws UserException {
  System.out.println("Service: ricevuto");
  if(!isAdminExist(admin.admin())){

    String hashedPsw = hashingPsw(admin.password());
    adminRepo.save(new AdminDB(0,admin.admin(),hashedPsw, admin.cognome(), admin.cell()));
    return true;
  }else
    throw new UserException("Admin già esistente");
}

  public String adminLogin(String admin, String password) throws UserException {
    String dbPsw = adminRepo.getPassword(admin);
    if(dbPsw == null)
      throw new UserException("Admin inesistente");
    if(matchPsw(password,dbPsw))
      return generateAuthToken(admin, 1);
    else
      return "";
  }

  public AdminDB getAdminData(String admin) throws UserException {
    if(isAdminExist(admin)){
      return  adminRepo.findByAdmin(admin);
    }else {
      throw new UserException("Admin inesistente");
    }
  }

  private boolean isAdminExist(String admin){
    return adminRepo.existsByAdmin(admin);
  }
  public void updateAdminData(String admin, String cognome, String cell, String  bin) throws UserException {
    boolean status = true;
    if(this.isAdminExist(admin)){
      //bin has 4 digit ( binari number )
      //for each digit == 1 update the relative element
      //1 1 1 1 -> name surname matr email (0 1 2 3)
      char digit0 = bin.charAt(0);
      char digit1 = bin.charAt(1);
      if(digit0 == '1')
        adminRepo.udpateCognome(cognome, admin);
      if(digit1 == '1')
        adminRepo.updateCell(cell, admin);
    }else throw new UserException("Admin inesistente");

  }


  public boolean addApplication(Application application) throws UniversityException {
  if(!dipartimentoRepo.existsByUniversity(application.uni())) { //Se non esiste aggiungilo prima nel dipartimento
    dipartimentoRepo.save(new Dipartimento(0, application.dip(), application.area(), application.nazione(), application.uni()));
    universityRepo.save(new University(0, application.uni(), application.type(), application.corso(), application.url(), ""));
    return true;
  }else { //altrimenti aggiungilo solo all'uni
      if(!universityRepo.existsByLink(application.url())){
        universityRepo.save(new University(0, application.uni(), application.type(), application.corso(), application.url(), ""));
        return true;
      }else
        throw new UniversityException("Link già esistente");
  }


}
  //--------------------------------------------  USER.----------------------
  public boolean signup(User user) throws UserException {
    int status = isUserExist(user.utente(), user.email());
      return switch (status) {
          case 0 -> {
              String hashedPsw = hashingPsw(user.password());
              userRepo.save(new UserDB(0,user.utente(), user.matricola(), user.nome(), user.cognome(), user.email(), hashedPsw, 0, 0));
              yield true;
          }
          case 1 -> throw new UserException("email");
          case 2 -> throw new UserException("utente");
          default -> false;
      };
  }

  public String login(String username, String password) throws UserException {
    String dbPsw = userRepo.getPassword(username);
    if(dbPsw == null)
      throw new UserException("Utente inesistente");
    if(matchPsw(password,dbPsw))
      return generateAuthToken(username, 0);
    else
      return "";
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
    if(!login(user, password).isEmpty()){
        return userRepo.updatePassword(hashingPsw(passwordNew), user) == 1;  //1-> ok
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
             token = generateEmailToken();
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

  //------------------------------------------------------TOKEN---------------------------------------------------------
  private String generateEmailToken(){
    SecureRandom secureRandom = new SecureRandom();
    byte[] tokenBytes = new byte[32]; // Lunghezza del token in byte
    secureRandom.nextBytes(tokenBytes);
    return Base64.getUrlEncoder().withoutPadding().encodeToString(tokenBytes);
  } //email token

  public boolean verifyToken(String user, String token) throws UserException {
    if(isUserExist(user,"") == 2){
        return tokenRepo.getToken(user).equals(token);
    }else
      throw new UserException("Utente inesistente");
  } //token to verify email

  private String generateAuthToken(String username, int type){
  int id = 0;
    if(type == 0)
      id = userRepo.getUserId(username);
    else
      id = adminRepo.getAdminId(username);
    return "token";//JwtTokenProvider.generateToken(Integer.toString(id), username);
  }

  //-----------------------------------------------------------hashing psw
  private String hashingPsw(String psw){
    BCryptPasswordEncoder pswEncoder = new BCryptPasswordEncoder();
      return pswEncoder.encode(psw);

  }
  private boolean matchPsw(String psw, String dbPsw){
    BCryptPasswordEncoder pswEncoder = new BCryptPasswordEncoder();
    return pswEncoder.matches(psw, dbPsw);
  }
}
