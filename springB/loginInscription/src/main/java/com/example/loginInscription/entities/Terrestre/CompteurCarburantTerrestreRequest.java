package com.example.loginInscription.entities.Terrestre;

import java.io.Serializable;

public class CompteurCarburantTerrestreRequest implements Serializable {
    private int num_compteur_terrestre; // Add this field
    private String emplacement_terrestre;
    private int ordre_terrestre;
    private int portId;

    public int getNum_compteur_terrestre() {
        return num_compteur_terrestre;
    }

    public void setNum_compteur_terrestre(int num_compteur_terrestre) {
        this.num_compteur_terrestre = num_compteur_terrestre;
    }

    // Getters et Setters
    public String getEmplacement_terrestre() {
        return emplacement_terrestre;
    }

    public void setEmplacement_terrestre(String emplacement_terrestre) {
        this.emplacement_terrestre = emplacement_terrestre;
    }

    public int getOrdre_terrestre() {
        return ordre_terrestre;
    }

    public void setOrdre_terrestre(int ordre_terrestre) {
        this.ordre_terrestre = ordre_terrestre;
    }

    public int getPortId() {
        return portId;
    }

    public void setPortId(int portId) {
        this.portId = portId;
    }
}