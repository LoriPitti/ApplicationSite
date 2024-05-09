package com.dev.demo.repository;

import com.dev.demo.Entity.University;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UniversityRepo extends JpaRepository<University, Integer> {

  boolean existsByLink(String link);

}
