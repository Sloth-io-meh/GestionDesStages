package com.example.demo.repository;

import com.example.demo.model.EncadrantAcademique;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EncadrantAcademiqueRepository extends JpaRepository<EncadrantAcademique, Long> {
}
