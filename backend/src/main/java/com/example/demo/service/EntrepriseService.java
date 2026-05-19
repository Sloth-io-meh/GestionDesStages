package com.example.demo.service;

import com.example.demo.model.Entreprise;
import com.example.demo.repository.EntrepriseRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EntrepriseService {

    private final EntrepriseRepository repository;

    public EntrepriseService(EntrepriseRepository repository) {
        this.repository = repository;
    }

    public List<Entreprise> findAll() {
        return repository.findAll();
    }

    public Optional<Entreprise> findById(Long id) {
        return repository.findById(id);
    }

    public Entreprise save(Entreprise entreprise) {
        return repository.save(entreprise);
    }

    public Optional<Entreprise> update(Long id, Entreprise details) {
        return repository.findById(id).map(ent -> {
            ent.setNom(details.getNom());
            ent.setAdresse(details.getAdresse());
            ent.setTelephone(details.getTelephone());
            ent.setEmail(details.getEmail());
            ent.setVille(details.getVille());
            ent.setPays(details.getPays());
            ent.setNomResponsable(details.getNomResponsable());
            ent.setNomEncadrant(details.getNomEncadrant());
            ent.setEmailEncadrant(details.getEmailEncadrant());
            ent.setTelEncadrant(details.getTelEncadrant());
            return repository.save(ent);
        });
    }

    public boolean delete(Long id) {
        return repository.findById(id).map(ent -> {
            repository.delete(ent);
            return true;
        }).orElse(false);
    }
}
