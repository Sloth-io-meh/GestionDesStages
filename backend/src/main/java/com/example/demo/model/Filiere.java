package com.example.demo.model;

import jakarta.persistence.*;

@Entity
public class Filiere {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String intitule;

    @OneToOne(mappedBy = "filiere", cascade = CascadeType.ALL)
    private ResponsableFiliere responsable;

    public Filiere() {
    }

    public Filiere(Long id, String intitule, ResponsableFiliere responsable) {
        this.id = id;
        this.intitule = intitule;
        this.responsable = responsable;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getIntitule() {
        return intitule;
    }

    public void setIntitule(String intitule) {
        this.intitule = intitule;
    }

    public ResponsableFiliere getResponsable() {
        return responsable;
    }

    public void setResponsable(ResponsableFiliere responsable) {
        this.responsable = responsable;
    }
}
