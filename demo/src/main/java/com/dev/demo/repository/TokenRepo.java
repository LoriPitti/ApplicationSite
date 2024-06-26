package com.dev.demo.repository;

import com.dev.demo.Entity.Token;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface TokenRepo extends JpaRepository<Token, Integer> {

  @Query("Select token from Token where utente = ?1")
  String getToken(String user);
  @Query("select id from Token where utente = ?1" )
  int getTokenId(String username);

  boolean  existsByUtente(String utente);

}
