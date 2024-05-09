package com.dev.demo.Entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@Table(name = "dipartimento")
@AllArgsConstructor
@NoArgsConstructor
public class Dipartimento {
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private int id;
  private String nome;
  private String areaGeo;
  private String nazione;
  private String university;
}
