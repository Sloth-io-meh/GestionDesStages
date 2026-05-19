package com.example.demo.model;

import jakarta.persistence.*;

@Entity
public class Entreprise {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nom;
    private String adresse;
    private String telephone;
    private String email;
    private String ville;
    private String pays;
    private String nomResponsable;
    private String nomEncadrant;
    private String emailEncadrant;
    private String telEncadrant;

    public Entreprise() {
    }

    public Entreprise(Long id, String nom, String adresse, String telephone, String email, String ville, String pays, String nomResponsable, String nomEncadrant, String emailEncadrant, String telEncadrant) {
        this.id = id;
        this.nom = nom;
        this.adresse = adresse;
        this.telephone = telephone;
        this.email = email;
        this.ville = ville;
        this.pays = pays;
        this.nomResponsable = nomResponsable;
        this.nomEncadrant = nomEncadrant;
        this.emailEncadrant = emailEncadrant;
        this.telEncadrant = telEncadrant;
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

    public String getAdresse() {
        return adresse;
    }

    public void setAdresse(String adresse) {
        this.adresse = adresse;
    }

    public String getTelephone() {
        return telephone;
    }

    public void setTelephone(String telephone) {
        this.telephone = telephone;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getVille() {
        return ville;
    }

    public void setVille(String ville) {
        this.ville = ville;
    }

    public String getPays() {
        return pays;
    }

    public void setPays(String pays) {
        this.pays = pays;
    }

    public String getNomResponsable() {
        return nomResponsable;
    }

    public void setNomResponsable(String nomResponsable) {
        this.nomResponsable = nomResponsable;
    }

    public String getNomEncadrant() {
        return nomEncadrant;
    }

    public void setNomEncadrant(String nomEncadrant) {
        this.nomEncadrant = nomEncadrant;
    }

    public String getEmailEncadrant() {
        return emailEncadrant;
    }

    public void setEmailEncadrant(String emailEncadrant) {
        this.emailEncadrant = emailEncadrant;
    }

    public String getTelEncadrant() {
        return telEncadrant;
    }

    public void setTelEncadrant(String telEncadrant) {
        this.telEncadrant = telEncadrant;
    }
}
