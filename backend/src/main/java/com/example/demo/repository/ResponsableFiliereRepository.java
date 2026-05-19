package com.example.demo.repository;

import com.example.demo.model.ResponsableFiliere;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ResponsableFiliereRepository extends JpaRepository<ResponsableFiliere, Long> {
}
