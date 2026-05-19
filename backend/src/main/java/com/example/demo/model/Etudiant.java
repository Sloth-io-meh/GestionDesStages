package com.example.demo.model;

import jakarta.persistence.*;

@Entity
public class Etudiant {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String email;
    private String cne;
    private String nom;
    private String prenom;
    private String tel;

    @ManyToOne
    @JoinColumn(name = "filiere_id")
    private Filiere filiere;

    public Etudiant() {
    }

    public Etudiant(Long id, String email, String cne, String nom, String prenom, String tel, Filiere filiere) {
        this.id = id;
        this.email = email;
        this.cne = cne;
        this.nom = nom;
        this.prenom = prenom;
        this.tel = tel;
        this.filiere = filiere;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getCne() {
        return cne;
    }

    public void setCne(String cne) {
        this.cne = cne;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getPrenom() {
        return prenom;
    }

    public void setPrenom(String prenom) {
        this.prenom = prenom;
    }

    public String getTel() {
        return tel;
    }

    public void setTel(String tel) {
        this.tel = tel;
    }

    public Filiere getFiliere() {
        return filiere;
    }

    public void setFiliere(Filiere filiere) {
        this.filiere = filiere;
    }
}
