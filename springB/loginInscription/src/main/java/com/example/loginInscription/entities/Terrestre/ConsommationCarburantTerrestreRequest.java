package com.example.loginInscription.entities.Terrestre;

import java.io.Serializable;
import java.util.Date;

public class ConsommationCarburantTerrestreRequest implements Serializable {
    private String emplacement_terrestre;
    private int ordre_terrestre;
    private int portId;
    private Long userId;
    private float quantite_carburant_terrestre;
    private float tarif_carburant_terrestre;
    private String type_carburant;
    private Date date_carburant_terrestre;

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

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public float getQuantite_carburant_terrestre() {
        return quantite_carburant_terrestre;
    }

    public void setQuantite_carburant_terrestre(float quantite_carburant_terrestre) {
        this.quantite_carburant_terrestre = quantite_carburant_terrestre;
    }

    public float getTarif_carburant_terrestre() {
        return tarif_carburant_terrestre;
    }

    public void setTarif_carburant_terrestre(float tarif_carburant_terrestre) {
        this.tarif_carburant_terrestre = tarif_carburant_terrestre;
    }

    public String getType_carburant() {
        return type_carburant;
    }

    public void setType_carburant(String type_carburant) {
        this.type_carburant = type_carburant;
    }

    public Date getDate_carburant_terrestre() {
        return date_carburant_terrestre;
    }

    public void setDate_carburant_terrestre(Date date_carburant_terrestre) {
        this.date_carburant_terrestre = date_carburant_terrestre;
    }
}
