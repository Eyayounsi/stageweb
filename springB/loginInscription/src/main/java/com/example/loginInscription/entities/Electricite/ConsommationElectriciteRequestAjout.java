package com.example.loginInscription.entities.Electricite;

import java.io.Serializable;
import java.util.Date;

public class ConsommationElectriciteRequestAjout implements Serializable {
    private int compteurElectriciteId; // ID du compteur associé
    private Long userId;
    private float quantite_electricite;
    private float tarif_electricite;
    private Date date_electricite;

    // Getters et Setters
    public int getCompteurElectriciteId() {
        return compteurElectriciteId;
    }

    public void setCompteurElectriciteId(int compteurElectriciteId) {
        this.compteurElectriciteId = compteurElectriciteId;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
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
}