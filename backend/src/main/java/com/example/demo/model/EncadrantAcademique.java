package com.example.demo.model;

import jakarta.persistence.*;

@Entity
public class EncadrantAcademique {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nom;
    private String departement;
    private String etablissement;

    public EncadrantAcademique() {
    }

    public EncadrantAcademique(Long id, String nom, String departement, String etablissement) {
        this.id = id;
        this.nom = nom;
        this.departement = departement;
        this.etablissement = etablissement;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getDepartement() {
        return departement;
    }

    public void setDepartement(String departement) {
        this.departement = departement;
    }

    public String getEtablissement() {
        return etablissement;
    }

    public void setEtablissement(String etablissement) {
        this.etablissement = etablissement;
    }
}
