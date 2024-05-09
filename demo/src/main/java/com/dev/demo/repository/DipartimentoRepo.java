package com.dev.demo.repository;

import com.dev.demo.Entity.Dipartimento;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface DipartimentoRepo extends JpaRepository<Dipartimento, Integer> {

  boolean existsByUniversity(String university);
}
