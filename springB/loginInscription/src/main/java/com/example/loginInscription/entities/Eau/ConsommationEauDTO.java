package com.example.loginInscription.entities.Eau;


import java.util.Date;

public class ConsommationEauDTO {
    private int id_eau;
    private float quantite_eau;
    private float tarif_eau;
    private Date date_eau;
    private Long userId;
    private int compteurEauId;
    private String nom; // Ajoutez ce champ
    private String prenom; // Ajoutez ce champ
    private int portId; // Ajoutez ce champ

    // Getters et Setters
    public int getId_eau() {
        return id_eau;
    }

    public void setId_eau(int id_eau) {
        this.id_eau = id_eau;
    }

    public float getQuantite_eau() {
        return quantite_eau;
    }

    public void setQuantite_eau(float quantite_eau) {
        this.quantite_eau = quantite_eau;
    }

    public float getTarif_eau() {
        return tarif_eau;
    }

    public void setTarif_eau(float tarif_eau) {
        this.tarif_eau = tarif_eau;
    }

    public Date getDate_eau() {
        return date_eau;
    }

    public void setDate_eau(Date date_eau) {
        this.date_eau = date_eau;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public int getCompteurEauId() {
        return compteurEauId;
    }

    public void setCompteurEauId(int compteurEauId) {
        this.compteurEauId = compteurEauId;
    }

    public String getNom() { // Ajoutez ce getter
        return nom;
    }

    public void setNom(String nom) { // Ajoutez ce setter
        this.nom = nom;
    }

    public String getPrenom() { // Ajoutez ce getter
        return prenom;
    }

    public void setPrenom(String prenom) { // Ajoutez ce setter
        this.prenom = prenom;
    }

    public int getPortId() { // Ajoutez ce getter
        return portId;
    }

    public void setPortId(int portId) { // Ajoutez ce setter
        this.portId = portId;
    }
}
