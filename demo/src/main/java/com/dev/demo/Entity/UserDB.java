package com.dev.demo.Entity;


import jakarta.persistence.*;
import jdk.jfr.DataAmount;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@Table(name = "user")
@AllArgsConstructor
@NoArgsConstructor
public class UserDB {
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private int id;
  private String utente;
  private int matricola;
  private String nome;
  private String cognome;
  private String email;
  private String password;
  private int verified = 0;  //0 = false, 1 = true
  private int type; // 0 = user, 1 = admin
}
