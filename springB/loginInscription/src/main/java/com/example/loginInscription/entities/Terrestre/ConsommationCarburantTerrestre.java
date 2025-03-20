package com.example.loginInscription.entities.Terrestre;

import com.example.loginInscription.entities.Utilisateur;
import jakarta.persistence.*;
import lombok.*;

import java.io.Serializable;
import java.util.Date;


@AllArgsConstructor
@NoArgsConstructor
@ToString
@Entity
@Setter
@Getter
public class ConsommationCarburantTerrestre implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id_carburant_terrestre;

    private float quantite_carburant_terrestre;
    private float tarif_carburant_terrestre;
    private String type_carburant;
    private Date date_carburant_terrestre;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private Utilisateur utilisateur;

    @ManyToOne
    @JoinColumn(name = "num_compteur_terrestre")
    private CompteurCarburantTerrestre compteurCarburantTerrestre;

    public int getId_carburant_terrestre() {
        return id_carburant_terrestre;
    }

    public void setId_carburant_terrestre(int id_carburant_terrestre) {
        this.id_carburant_terrestre = id_carburant_terrestre;
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

    public Utilisateur getUtilisateur() {
        return utilisateur;
    }

    public void setUtilisateur(Utilisateur utilisateur) {
        this.utilisateur = utilisateur;
    }

    public CompteurCarburantTerrestre getCompteurCarburantTerrestre() {
        return compteurCarburantTerrestre;
    }

    public void setCompteurCarburantTerrestre(CompteurCarburantTerrestre compteurCarburantTerrestre) {
        this.compteurCarburantTerrestre = compteurCarburantTerrestre;
    }
}