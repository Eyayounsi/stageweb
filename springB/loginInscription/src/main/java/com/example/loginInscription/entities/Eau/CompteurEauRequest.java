package com.example.loginInscription.entities.Eau;


import java.io.Serializable;

public class CompteurEauRequest implements Serializable {
    private int num_compteur_eau; // Add this field
    private String emplacementEau;
    private int ordreEau;
    private int portId;

    public int getNum_compteur_eau() {
        return num_compteur_eau;
    }

    public void setNum_compteur_eau(int num_compteur_eau) {
        this.num_compteur_eau = num_compteur_eau;
    }

    // Getters et Setters
    public String getEmplacementEau() {
        return emplacementEau;
    }

    public void setEmplacementEau(String emplacementEau) {
        this.emplacementEau = emplacementEau;
    }

    public int getOrdreEau() {
        return ordreEau;
    }

    public void setOrdreEau(int ordreEau) {
        this.ordreEau = ordreEau;
    }

    public int getPortId() {
        return portId;
    }

    public void setPortId(int portId) {
        this.portId = portId;
    }
}