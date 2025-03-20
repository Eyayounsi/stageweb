package com.example.loginInscription.entities;

import com.example.loginInscription.entities.Eau.CompteurEau;
import com.example.loginInscription.entities.Electricite.CompteurElectricite;
import com.example.loginInscription.entities.Flottante.CompteurCarburantFlottante;
import com.example.loginInscription.entities.Terrestre.CompteurCarburantTerrestre;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Port implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String libelle;

    @OneToMany(mappedBy = "port")
    private List<Utilisateur> utilisateurs;

    @OneToMany(mappedBy = "port")
    private List<CompteurEau> compteursEau;

    @OneToMany(mappedBy = "port")
    private List<CompteurElectricite> compteursElectricite;

    @OneToMany(mappedBy = "port")
    private List<CompteurCarburantTerrestre> compteursCarburantTerrestre;

    @OneToMany(mappedBy = "port", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<CompteurCarburantFlottante> compteursCarburantFlottante;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getLibelle() {
        return libelle;
    }

    public void setLibelle(String libelle) {
        this.libelle = libelle;
    }

    public List<Utilisateur> getUtilisateurs() {
        return utilisateurs;
    }

    public void setUtilisateurs(List<Utilisateur> utilisateurs) {
        this.utilisateurs = utilisateurs;
    }

    public List<CompteurEau> getCompteursEau() {
        return compteursEau;
    }

    public void setCompteursEau(List<CompteurEau> compteursEau) {
        this.compteursEau = compteursEau;
    }

    public List<CompteurElectricite> getCompteursElectricite() {
        return compteursElectricite;
    }

    public void setCompteursElectricite(List<CompteurElectricite> compteursElectricite) {
        this.compteursElectricite = compteursElectricite;
    }

    public List<CompteurCarburantTerrestre> getCompteursCarburantTerrestre() {
        return compteursCarburantTerrestre;
    }

    public void setCompteursCarburantTerrestre(List<CompteurCarburantTerrestre> compteursCarburantTerrestre) {
        this.compteursCarburantTerrestre = compteursCarburantTerrestre;
    }

    public List<CompteurCarburantFlottante> getCompteursCarburantFlottante() {
        return compteursCarburantFlottante;
    }

    public void setCompteursCarburantFlottante(List<CompteurCarburantFlottante> compteursCarburantFlottante) {
        this.compteursCarburantFlottante = compteursCarburantFlottante;
    }
}