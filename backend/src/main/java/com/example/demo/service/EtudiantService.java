package com.example.demo.service;

import com.example.demo.model.Etudiant;
import com.example.demo.repository.EtudiantRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EtudiantService {

    private final EtudiantRepository etudiantRepository;

    public EtudiantService(EtudiantRepository etudiantRepository) {
        this.etudiantRepository = etudiantRepository;
    }

    public List<Etudiant> findAll() {
        return etudiantRepository.findAll();
    }

    public Optional<Etudiant> findById(Long id) {
        return etudiantRepository.findById(id);
    }

    public Etudiant save(Etudiant etudiant) {
        return etudiantRepository.save(etudiant);
    }

    public Optional<Etudiant> update(Long id, Etudiant etudiantDetails) {
        return etudiantRepository.findById(id).map(etudiant -> {
            etudiant.setEmail(etudiantDetails.getEmail());
            etudiant.setCne(etudiantDetails.getCne());
            etudiant.setNom(etudiantDetails.getNom());
            etudiant.setPrenom(etudiantDetails.getPrenom());
            etudiant.setTel(etudiantDetails.getTel());
            etudiant.setFiliere(etudiantDetails.getFiliere());
            return etudiantRepository.save(etudiant);
        });
    }

    public boolean delete(Long id) {
        return etudiantRepository.findById(id).map(etudiant -> {
            etudiantRepository.delete(etudiant);
            return true;
        }).orElse(false);
    }
}
