package com.example.demo.service;

import com.example.demo.model.EncadrantAcademique;
import com.example.demo.repository.EncadrantAcademiqueRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EncadrantAcademiqueService {

    private final EncadrantAcademiqueRepository repository;

    public EncadrantAcademiqueService(EncadrantAcademiqueRepository repository) {
        this.repository = repository;
    }

    public List<EncadrantAcademique> findAll() {
        return repository.findAll();
    }

    public Optional<EncadrantAcademique> findById(Long id) {
        return repository.findById(id);
    }

    public EncadrantAcademique save(EncadrantAcademique encadrant) {
        return repository.save(encadrant);
    }

    public Optional<EncadrantAcademique> update(Long id, EncadrantAcademique details) {
        return repository.findById(id).map(e -> {
            e.setNom(details.getNom());
            e.setDepartement(details.getDepartement());
            e.setEtablissement(details.getEtablissement());
            return repository.save(e);
        });
    }

    public boolean delete(Long id) {
        return repository.findById(id).map(e -> {
            repository.delete(e);
            return true;
        }).orElse(false);
    }
}
