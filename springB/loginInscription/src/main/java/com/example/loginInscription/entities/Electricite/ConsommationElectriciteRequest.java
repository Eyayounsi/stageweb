package com.example.loginInscription.entities.Electricite;

import java.io.Serializable;
import java.util.Date;

public class ConsommationElectriciteRequest implements Serializable {
    private String emplacement_electricite;
    private int ordre_electricite;
    private int portId;
    private Long userId;
    private float quantite_electricite;
    private float tarif_electricite;
    private Date date_electricite;

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
