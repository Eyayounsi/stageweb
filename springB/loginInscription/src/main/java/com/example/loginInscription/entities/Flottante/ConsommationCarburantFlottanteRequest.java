package com.example.loginInscription.entities.Flottante;

import com.example.loginInscription.entities.TypeFlottant;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;

import java.io.Serializable;
import java.util.Date;

public class ConsommationCarburantFlottanteRequest implements Serializable {
    private String emplacement_flottant;
    private int ordre_flottant;
    private int portId;
    private Long userId;
    private float quantite_carburant_flottant;
    private float tarif_carburant_flottant;
    private TypeFlottant type_flottant;
    @Enumerated(EnumType.STRING)// Utilisation de l'enum TypeFlottant
    private Date date_carburant_flottant;

    // Getters et Setters
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

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public float getQuantite_carburant_flottant() {
        return quantite_carburant_flottant;
    }

    public void setQuantite_carburant_flottant(float quantite_carburant_flottant) {
        this.quantite_carburant_flottant = quantite_carburant_flottant;
    }

    public float getTarif_carburant_flottant() {
        return tarif_carburant_flottant;
    }

    public void setTarif_carburant_flottant(float tarif_carburant_flottant) {
        this.tarif_carburant_flottant = tarif_carburant_flottant;
    }

    public TypeFlottant getType_flottant() {
        return type_flottant;
    }

    public void setType_flottant(TypeFlottant type_flottant) {
        this.type_flottant = type_flottant;
    }

    public Date getDate_carburant_flottant() {
        return date_carburant_flottant;
    }

    public void setDate_carburant_flottant(Date date_carburant_flottant) {
        this.date_carburant_flottant = date_carburant_flottant;
    }
}
