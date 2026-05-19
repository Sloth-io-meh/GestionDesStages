package com.example.demo.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
public class Stage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String sujet;
    private LocalDate dateDebut;
    private LocalDate dateFin;
    
    @Column(columnDefinition = "TEXT")
    private String description;
    
    @Column(columnDefinition = "TEXT")
    private String objectifs;
    
    @Column(columnDefinition = "TEXT")
    private String solution;
    
    @Column(columnDefinition = "TEXT")
    private String demarche;
    
    @Column(columnDefinition = "TEXT")
    private String outils;

    @OneToOne
    @JoinColumn(name = "etudiant_id")
    private Etudiant etudiant;

    @ManyToOne
    @JoinColumn(name = "entreprise_id")
    private Entreprise entreprise;

    @ManyToOne
    @JoinColumn(name = "encadrant_academique_id")
    private EncadrantAcademique encadrantAcademique;

    public Stage() {
    }

    public Stage(Long id, String sujet, LocalDate dateDebut, LocalDate dateFin, String description, String objectifs, String solution, String demarche, String outils, Etudiant etudiant, Entreprise entreprise, EncadrantAcademique encadrantAcademique) {
        this.id = id;
        this.sujet = sujet;
        this.dateDebut = dateDebut;
        this.dateFin = dateFin;
        this.description = description;
        this.objectifs = objectifs;
        this.solution = solution;
        this.demarche = demarche;
        this.outils = outils;
        this.etudiant = etudiant;
        this.entreprise = entreprise;
        this.encadrantAcademique = encadrantAcademique;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getSujet() {
        return sujet;
    }

    public void setSujet(String sujet) {
        this.sujet = sujet;
    }

    public LocalDate getDateDebut() {
        return dateDebut;
    }

    public void setDateDebut(LocalDate dateDebut) {
        this.dateDebut = dateDebut;
    }

    public LocalDate getDateFin() {
        return dateFin;
    }

    public void setDateFin(LocalDate dateFin) {
        this.dateFin = dateFin;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getObjectifs() {
        return objectifs;
    }

    public void setObjectifs(String objectifs) {
        this.objectifs = objectifs;
    }

    public String getSolution() {
        return solution;
    }

    public void setSolution(String solution) {
        this.solution = solution;
    }

    public String getDemarche() {
        return demarche;
    }

    public void setDemarche(String demarche) {
        this.demarche = demarche;
    }

    public String getOutils() {
        return outils;
    }

    public void setOutils(String outils) {
        this.outils = outils;
    }

    public Etudiant getEtudiant() {
        return etudiant;
    }

    public void setEtudiant(Etudiant etudiant) {
        this.etudiant = etudiant;
    }

    public Entreprise getEntreprise() {
        return entreprise;
    }

    public void setEntreprise(Entreprise entreprise) {
        this.entreprise = entreprise;
    }

    public EncadrantAcademique getEncadrantAcademique() {
        return encadrantAcademique;
    }

    public void setEncadrantAcademique(EncadrantAcademique encadrantAcademique) {
        this.encadrantAcademique = encadrantAcademique;
    }
}
