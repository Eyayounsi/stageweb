package com.example.loginInscription.entities.Electricite;


import java.util.List;

public class CompteurElectriciteDTO {
    private int num_compteur_electricite;
    private String emplacement_electricite;
    private int ordre_electricite;
    private int portId;
    private List<ConsommationElectriciteDTO> consommationsElectricite;

    // Getters et Setters
    public int getNum_compteur_electricite() {
        return num_compteur_electricite;
    }

    public void setNum_compteur_electricite(int num_compteur_electricite) {
        this.num_compteur_electricite = num_compteur_electricite;
    }

    public String getEmplacement_electricite() {
        return emplacement_electricite;
    }

    public void setEmplacement_electricite(String emplacement_electricite) {
        this.emplacement_electricite = emplacement_electricite;
    }

    public int getOrdre_electricite() {
        return ordre_electricite;
    }

    public void setOrdre_electricite(int ordre_electricite) {
        this.ordre_electricite = ordre_electricite;
    }

    public int getPortId() {
        return portId;
    }

    public void setPortId(int portId) {
        this.portId = portId;
    }

    public List<ConsommationElectriciteDTO> getConsommationsElectricite() {
        return consommationsElectricite;
    }

    public void setConsommationsElectricite(List<ConsommationElectriciteDTO> consommationsElectricite) {
        this.consommationsElectricite = consommationsElectricite;
    }
}