package com.example.loginInscription.entities.Eau;

import java.io.Serializable;
import java.util.Date;



public class ConsommationEauRequest implements Serializable {
    private String emplacementEau;
    private int ordreEau;
    private int portId;
    private Long userId;
    private float quantiteEau;
    private float tarifEau;
    private Date dateEau;

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
