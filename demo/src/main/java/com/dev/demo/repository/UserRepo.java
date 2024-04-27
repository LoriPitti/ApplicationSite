package com.dev.demo.repository;

import com.dev.demo.Entity.UserDB;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

public interface UserRepo extends JpaRepository<UserDB, Integer> {


  boolean  existsByUtente(String utente);

  boolean existsByEmail(String email);

  @Query("Select password from UserDB where utente =?1")
  String getPassword(String userame);

  @Query("Select utente from UserDB  where email = ?1")
  String getUtente(String user);

  @Transactional
  @Modifying
  @Query("UPDATE UserDB SET password = ?1 WHERE  utente = ?2")
  int updatePassword(String password, String utente);

}
