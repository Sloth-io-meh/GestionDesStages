package com.example.demo.repository;

import com.example.demo.model.Stage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StageRepository extends JpaRepository<Stage, Long> {
    List<Stage> findByEtudiantFiliereId(Long filiereId);

    @Query("SELECT s FROM Stage s WHERE YEAR(s.dateDebut) = :year")
    List<Stage> findByYear(@Param("year") int year);
}
