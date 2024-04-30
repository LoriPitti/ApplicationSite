package com.dev.demo.Entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@Table(name = "token")
@AllArgsConstructor
@NoArgsConstructor
public class Token {
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private int id;
  private String user;
  private String token;

}
