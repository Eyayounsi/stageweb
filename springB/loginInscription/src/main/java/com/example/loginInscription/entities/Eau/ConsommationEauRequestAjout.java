package com.example.loginInscription.entities.Eau;

import java.io.Serializable;
import java.util.Date;

public class ConsommationEauRequestAjout  implements Serializable {
    private int compteurEauId; // Nouveau champ
    private Long userId;
    private float quantiteEau;
    private float tarifEau;
    private Date dateEau;

    // Getters et Setters
    public int getCompteurEauId() {
        return compteurEauId;
    }

    public void setCompteurEauId(int compteurEauId) {
        this.compteurEauId = compteurEauId;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public float getQuantiteEau() {
        return quantiteEau;
    }

    public void setQuantiteEau(float quantiteEau) {
        this.quantiteEau = quantiteEau;
    }

    public float getTarifEau() {
        return tarifEau;
    }

    public void setTarifEau(float tarifEau) {
        this.tarifEau = tarifEau;
    }

    public Date getDateEau() {
        return dateEau;
    }

    public void setDateEau(Date dateEau) {
        this.dateEau = dateEau;
    }
}