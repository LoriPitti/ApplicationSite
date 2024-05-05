package com.dev.demo.Entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@Table(name = "admin")
@AllArgsConstructor
@NoArgsConstructor
public class AdminDB {
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private int id;
  private String admin;
  private String password;
  private String cognome;
  private String cell;
}
