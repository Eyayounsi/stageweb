package com.example.loginInscription.entities.Electricite;

import com.example.loginInscription.entities.Port;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CompteurElectricite implements Serializable {
    @Id
    private int num_compteur_electricite;

    private String emplacement_electricite;
    private int ordre_electricite;

    @ManyToOne
    @JoinColumn(name = "port_id")
    private Port port;

    @OneToMany(mappedBy = "compteurElectricite", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private List<ConsommationElectricite> consommationsElectricite;

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

    public Port getPort() {
        return port;
    }

    public void setPort(Port port) {
        this.port = port;
    }

    public List<ConsommationElectricite> getConsommationsElectricite() {
        return consommationsElectricite;
    }

    public void setConsommationsElectricite(List<ConsommationElectricite> consommationsElectricite) {
        this.consommationsElectricite = consommationsElectricite;
    }
}