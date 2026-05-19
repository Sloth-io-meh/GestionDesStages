package com.example.demo.service;

import com.example.demo.model.Stage;
import com.example.demo.repository.StageRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class StageService {

    private final StageRepository repository;

    public StageService(StageRepository repository) {
        this.repository = repository;
    }

    public List<Stage> findAll() {
        return repository.findAll();
    }

    public Optional<Stage> findById(Long id) {
        return repository.findById(id);
    }

    public Stage save(Stage stage) {
        return repository.save(stage);
    }

    public Optional<Stage> update(Long id, Stage stageDetails) {
        return repository.findById(id).map(stage -> {
            stage.setSujet(stageDetails.getSujet());
            stage.setDateDebut(stageDetails.getDateDebut());
            stage.setDateFin(stageDetails.getDateFin());
            stage.setDescription(stageDetails.getDescription());
            stage.setObjectifs(stageDetails.getObjectifs());
            stage.setSolution(stageDetails.getSolution());
            stage.setDemarche(stageDetails.getDemarche());
            stage.setOutils(stageDetails.getOutils());
            stage.setEtudiant(stageDetails.getEtudiant());
            stage.setEntreprise(stageDetails.getEntreprise());
            stage.setEncadrantAcademique(stageDetails.getEncadrantAcademique());
            return repository.save(stage);
        });
    }

    public boolean delete(Long id) {
        return repository.findById(id).map(stage -> {
            repository.delete(stage);
            return true;
        }).orElse(false);
    }

    public List<Stage> findByFiliere(Long filiereId) {
        return repository.findByEtudiantFiliereId(filiereId);
    }

    public List<Stage> findByYear(int year) {
        return repository.findByYear(year);
    }
}
