package com.example.loginInscription.entities.Electricite;

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
public class ConsommationElectricite implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id_electricite;

    private float quantite_electricite;
    private float tarif_electricite;
    private Date date_electricite;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private Utilisateur utilisateur;

    @ManyToOne
    @JoinColumn(name = "num_compteur_electricite")
    private CompteurElectricite compteurElectricite;

    public int getId_electricite() {
        return id_electricite;
    }

    public void setId_electricite(int id_electricite) {
        this.id_electricite = id_electricite;
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

    public Utilisateur getUtilisateur() {
        return utilisateur;
    }

    public void setUtilisateur(Utilisateur utilisateur) {
        this.utilisateur = utilisateur;
    }

    public CompteurElectricite getCompteurElectricite() {
        return compteurElectricite;
    }

    public void setCompteurElectricite(CompteurElectricite compteurElectricite) {
        this.compteurElectricite = compteurElectricite;
    }
}
