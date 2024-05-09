package com.dev.demo.Entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@Table(name = "university")
@AllArgsConstructor
@NoArgsConstructor
public class University {

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private int id;
  private String nome;
  private int tipo; //0 bechelor, 1 master //TODO eventuali magistrali a ciclo unic
  private String corso;
  private String link;
  private String descrizione;

}
