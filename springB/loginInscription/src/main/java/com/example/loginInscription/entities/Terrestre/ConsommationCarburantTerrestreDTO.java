package com.example.loginInscription.entities.Terrestre;

import java.util.Date;

public class ConsommationCarburantTerrestreDTO {
    private int id_carburant_terrestre;
    private float quantite_carburant_terrestre;
    private float tarif_carburant_terrestre;
    private String type_carburant;
    private Date date_carburant_terrestre;
    private Long userId;
    private int compteurCarburantTerrestreId;
    private String nom;
    private String prenom;
    private int portId;

    // Getters et Setters
    public int getId_carburant_terrestre() {
        return id_carburant_terrestre;
    }

    public void setId_carburant_terrestre(int id_carburant_terrestre) {
        this.id_carburant_terrestre = id_carburant_terrestre;
    }

    public float getQuantite_carburant_terrestre() {
        return quantite_carburant_terrestre;
    }

    public void setQuantite_carburant_terrestre(float quantite_carburant_terrestre) {
        this.quantite_carburant_terrestre = quantite_carburant_terrestre;
    }

    public float getTarif_carburant_terrestre() {
        return tarif_carburant_terrestre;
    }

    public void setTarif_carburant_terrestre(float tarif_carburant_terrestre) {
        this.tarif_carburant_terrestre = tarif_carburant_terrestre;
    }

    public String getType_carburant() {
        return type_carburant;
    }

    public void setType_carburant(String type_carburant) {
        this.type_carburant = type_carburant;
    }

    public Date getDate_carburant_terrestre() {
        return date_carburant_terrestre;
    }

    public void setDate_carburant_terrestre(Date date_carburant_terrestre) {
        this.date_carburant_terrestre = date_carburant_terrestre;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public int getCompteurCarburantTerrestreId() {
        return compteurCarburantTerrestreId;
    }

    public void setCompteurCarburantTerrestreId(int compteurCarburantTerrestreId) {
        this.compteurCarburantTerrestreId = compteurCarburantTerrestreId;
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

    public int getPortId() {
        return portId;
    }

    public void setPortId(int portId) {
        this.portId = portId;
    }
}