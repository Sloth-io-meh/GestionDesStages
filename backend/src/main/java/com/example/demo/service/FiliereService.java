package com.example.demo.service;

import com.example.demo.model.Filiere;
import com.example.demo.repository.FiliereRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class FiliereService {

    private final FiliereRepository repository;

    public FiliereService(FiliereRepository repository) {
        this.repository = repository;
    }

    public List<Filiere> findAll() {
        return repository.findAll();
    }

    public Optional<Filiere> findById(Long id) {
        return repository.findById(id);
    }

    public Filiere save(Filiere filiere) {
        return repository.save(filiere);
    }

    public Optional<Filiere> update(Long id, Filiere details) {
        return repository.findById(id).map(f -> {
            f.setIntitule(details.getIntitule());
            if (details.getResponsable() != null) {
                details.getResponsable().setFiliere(f);
                f.setResponsable(details.getResponsable());
            }
            return repository.save(f);
        });
    }

    public boolean delete(Long id) {
        return repository.findById(id).map(f -> {
            repository.delete(f);
            return true;
        }).orElse(false);
    }
}
