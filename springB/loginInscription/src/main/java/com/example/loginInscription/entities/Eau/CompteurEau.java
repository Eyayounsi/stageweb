package com.example.loginInscription.entities.Eau;

import com.example.loginInscription.entities.Port;
import com.fasterxml.jackson.annotation.*;
import jakarta.persistence.*;

import java.util.List;

@Entity
public class CompteurEau {

    @Id
    //@GeneratedValue(strategy = GenerationType.IDENTITY)
    private int num_compteur_eau;

    private String emplacement_eau;
    private int ordre_eau;

    @ManyToOne
    @JoinColumn(name = "port_id")
    private Port port;

    @OneToMany(mappedBy = "compteurEau", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private List<ConsommationEau> consommationsEau;

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

    public Port getPort() {
        return port;
    }

    public void setPort(Port port) {
        this.port = port;
    }

    public List<ConsommationEau> getConsommationsEau() {
        return consommationsEau;
    }

    public void setConsommationsEau(List<ConsommationEau> consommationsEau) {
        this.consommationsEau = consommationsEau;
    }
}