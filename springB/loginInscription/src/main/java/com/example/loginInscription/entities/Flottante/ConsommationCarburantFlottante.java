package com.example.loginInscription.entities.Flottante;

import com.example.loginInscription.entities.TypeFlottant;
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
public class ConsommationCarburantFlottante implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id_carburant_flottant;

    private float quantite_carburant_flottant;
    private float tarif_carburant_flottant;
    private Date date_carburant_flottant;
    @Enumerated(EnumType.STRING)
    private TypeFlottant typeFlottant;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private Utilisateur utilisateur;

    @ManyToOne
    @JoinColumn(name = "num_compteur_flottant")
    private CompteurCarburantFlottante compteurCarburantFlottante;


    public int getId_carburant_flottant() {
        return id_carburant_flottant;
    }

    public void setId_carburant_flottant(int id_carburant_flottant) {
        this.id_carburant_flottant = id_carburant_flottant;
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

    public Date getDate_carburant_flottant() {
        return date_carburant_flottant;
    }

    public void setDate_carburant_flottant(Date date_carburant_flottant) {
        this.date_carburant_flottant = date_carburant_flottant;
    }

    public TypeFlottant getTypeFlottant() {
        return typeFlottant;
    }

    public void setTypeFlottant(TypeFlottant typeFlottant) {
        this.typeFlottant = typeFlottant;
    }

    public Utilisateur getUtilisateur() {
        return utilisateur;
    }

    public void setUtilisateur(Utilisateur utilisateur) {
        this.utilisateur = utilisateur;
    }

    public CompteurCarburantFlottante getCompteurCarburantFlottante() {
        return compteurCarburantFlottante;
    }

    public void setCompteurCarburantFlottante(CompteurCarburantFlottante compteurCarburantFlottante) {
        this.compteurCarburantFlottante = compteurCarburantFlottante;
    }
}