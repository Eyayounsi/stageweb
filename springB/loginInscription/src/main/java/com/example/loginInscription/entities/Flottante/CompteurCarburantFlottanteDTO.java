package com.example.loginInscription.entities.Flottante;

import java.util.List;

public class CompteurCarburantFlottanteDTO {
    private int num_compteur_flottant;
    private String emplacement_flottant;
    private int ordre_flottant;
    private int portId;
    private List<ConsommationCarburantFlottanteDTO> consommationsCarburantFlottante;

    // Getters et Setters
    public int getNum_compteur_flottant() {
        return num_compteur_flottant;
    }

    public void setNum_compteur_flottant(int num_compteur_flottant) {
        this.num_compteur_flottant = num_compteur_flottant;
    }

    public String getEmplacement_flottant() {
        return emplacement_flottant;
    }

    public void setEmplacement_flottant(String emplacement_flottant) {
        this.emplacement_flottant = emplacement_flottant;
    }

    public int getOrdre_flottant() {
        return ordre_flottant;
    }

    public void setOrdre_flottant(int ordre_flottant) {
        this.ordre_flottant = ordre_flottant;
    }

    public int getPortId() {
        return portId;
    }

    public void setPortId(int portId) {
        this.portId = portId;
    }

    public List<ConsommationCarburantFlottanteDTO> getConsommationsCarburantFlottante() {
        return consommationsCarburantFlottante;
    }

    public void setConsommationsCarburantFlottante(List<ConsommationCarburantFlottanteDTO> consommationsCarburantFlottante) {
        this.consommationsCarburantFlottante = consommationsCarburantFlottante;
    }
}