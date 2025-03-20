package com.example.loginInscription.entities.Electricite;


import java.util.Date;

public class ConsommationElectriciteDTO {
    private int id_electricite;
    private float quantite_electricite;
    private float tarif_electricite;
    private Date date_electricite;
    private Long userId;
    private int compteurElectriciteId;
    private String nom;
    private String prenom;
    private int portId;

    // Getters et Setters
    public int getId_electricite() {
        return id_electricite;
    }

    public void setId_electricite(int id_electricite) {
        this.id_electricite = id_electricite;
    }

    public float getQuantite_electricite() {
        return quantite_electricite;
    }

    public void setQuantite_electricite(float quantite_electricite) {
        this.quantite_electricite = quantite_electricite;
    }

    public float getTarif_electricite() {
        return tarif_electricite;
    }

    public void setTarif_electricite(float tarif_electricite) {
        this.tarif_electricite = tarif_electricite;
    }

    public Date getDate_electricite() {
        return date_electricite;
    }

    public void setDate_electricite(Date date_electricite) {
        this.date_electricite = date_electricite;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public int getCompteurElectriciteId() {
        return compteurElectriciteId;
    }

    public void setCompteurElectriciteId(int compteurElectriciteId) {
        this.compteurElectriciteId = compteurElectriciteId;
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