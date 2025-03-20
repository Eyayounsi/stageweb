package com.example.loginInscription.entities.Terrestre;

import java.util.List;

public class CompteurCarburantTerrestreDTO {
    private int num_compteur_terrestre;
    private String emplacement_terrestre;
    private int ordre_terrestre;
    private int portId;
    private List<ConsommationCarburantTerrestreDTO> consommationsCarburantTerrestre;

    // Getters et Setters
    public int getNum_compteur_terrestre() {
        return num_compteur_terrestre;
    }

    public void setNum_compteur_terrestre(int num_compteur_terrestre) {
        this.num_compteur_terrestre = num_compteur_terrestre;
    }

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

    public List<ConsommationCarburantTerrestreDTO> getConsommationsCarburantTerrestre() {
        return consommationsCarburantTerrestre;
    }

    public void setConsommationsCarburantTerrestre(List<ConsommationCarburantTerrestreDTO> consommationsCarburantTerrestre) {
        this.consommationsCarburantTerrestre = consommationsCarburantTerrestre;
    }
}