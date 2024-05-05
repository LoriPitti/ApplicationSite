package com.dev.demo.repository;

import com.dev.demo.Entity.Admin;
import com.dev.demo.Entity.AdminDB;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

public interface AdminRepo extends JpaRepository<AdminDB, Integer> {
  boolean  existsByAdmin(String admin);

  @Query("Select password from AdminDB where admin =?1")
  String getPassword(String admin);

  AdminDB findByAdmin(String admin);

  @Query("select id from AdminDB where admin = ?1" )
  int getAdminId(String admin);

  @Transactional
  @Modifying
  @Query("UPDATE AdminDB SET password = ?1 WHERE  admin = ?2")
  int updatePassword(String password, String admin);

  @Transactional
  @Modifying
  @Query("UPDATE AdminDB SET cognome = ?1 WHERE  admin = ?2")
  int udpateCognome(String cognome, String admin);

  @Transactional
  @Modifying
  @Query("UPDATE AdminDB SET cell = ?1 WHERE  admin = ?2")
  int updateCell(String cell, String admin);

}
