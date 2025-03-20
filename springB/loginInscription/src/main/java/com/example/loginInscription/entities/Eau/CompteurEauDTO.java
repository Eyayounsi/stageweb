package com.example.loginInscription.entities.Eau;


import java.util.List;

public class CompteurEauDTO {
    private int num_compteur_eau;
    private String emplacement_eau;
    private int ordre_eau;
    private int portId;
    private List<ConsommationEauDTO> consommationsEau; // Ajoutez cette ligne

    // Getters et Setters
    public int getNum_compteur_eau() {
        return num_compteur_eau;
    }

    public void setNum_compteur_eau(int num_compteur_eau) {
        this.num_compteur_eau = num_compteur_eau;
    }

    public String getEmplacement_eau() {
        return emplacement_eau;
    }

    public void setEmplacement_eau(String emplacement_eau) {
        this.emplacement_eau = emplacement_eau;
    }

    public int getOrdre_eau() {
        return ordre_eau;
    }

    public void setOrdre_eau(int ordre_eau) {
        this.ordre_eau = ordre_eau;
    }

    public int getPortId() {
        return portId;
    }

    public void setPortId(int portId) {
        this.portId = portId;
    }

    public List<ConsommationEauDTO> getConsommationsEau() { // Ajoutez ce getter
        return consommationsEau;
    }

    public void setConsommationsEau(List<ConsommationEauDTO> consommationsEau) { // Ajoutez ce setter
        this.consommationsEau = consommationsEau;
    }
}