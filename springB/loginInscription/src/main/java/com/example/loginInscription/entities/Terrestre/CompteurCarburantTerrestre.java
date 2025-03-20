package com.example.loginInscription.entities.Terrestre;

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
public class CompteurCarburantTerrestre implements Serializable {
    @Id
    private int num_compteur_terrestre;

    private String emplacement_terrestre;
    private int ordre_terrestre;

    @ManyToOne
    @JoinColumn(name = "port_id")
    private Port port;

    @OneToMany(mappedBy = "compteurCarburantTerrestre", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private List<ConsommationCarburantTerrestre> consommationsCarburantTerrestre;

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

    public Port getPort() {
        return port;
    }

    public void setPort(Port port) {
        this.port = port;
    }

    public List<ConsommationCarburantTerrestre> getConsommationsCarburantTerrestre() {
        return consommationsCarburantTerrestre;
    }

    public void setConsommationsCarburantTerrestre(List<ConsommationCarburantTerrestre> consommationsCarburantTerrestre) {
        this.consommationsCarburantTerrestre = consommationsCarburantTerrestre;
    }
}
