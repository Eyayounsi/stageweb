package com.example.loginInscription.entities.Flottante;

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
public class CompteurCarburantFlottante implements Serializable {
    @Id
    //@GeneratedValue(strategy = GenerationType.IDENTITY)
    private int num_compteur_flottant;

    private String emplacement_flottant;
    private int ordre_flottant;

    @ManyToOne
    @JoinColumn(name = "port_id")
    private Port port;

    @OneToMany(mappedBy = "compteurCarburantFlottante", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private List<ConsommationCarburantFlottante> consommationsCarburantFlottante;

    public void setNum_compteur_flottant(int num_compteur_flottant) {
        this.num_compteur_flottant = num_compteur_flottant;
    }

    public void setEmplacement_flottant(String emplacement_flottant) {
        this.emplacement_flottant = emplacement_flottant;
    }

    public void setOrdre_flottant(int ordre_flottant) {
        this.ordre_flottant = ordre_flottant;
    }

    public void setPort(Port port) {
        this.port = port;
    }

    public void setConsommationsCarburantFlottante(List<ConsommationCarburantFlottante> consommationsCarburantFlottante) {
        this.consommationsCarburantFlottante = consommationsCarburantFlottante;
    }

    public int getNum_compteur_flottant() {
        return num_compteur_flottant;
    }

    public String getEmplacement_flottant() {
        return emplacement_flottant;
    }

    public int getOrdre_flottant() {
        return ordre_flottant;
    }

    public Port getPort() {
        return port;
    }

    public List<ConsommationCarburantFlottante> getConsommationsCarburantFlottante() {
        return consommationsCarburantFlottante;
    }
}