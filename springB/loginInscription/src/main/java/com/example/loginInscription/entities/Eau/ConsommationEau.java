package com.example.loginInscription.entities.Eau;

import com.example.loginInscription.entities.Utilisateur;
import jakarta.persistence.*;
import lombok.*;

import java.io.Serializable;
import java.util.Date;
@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ConsommationEau implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id_eau;

    private float quantite_eau;
    private float tarif_eau;
    private Date date_eau;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id")
    private Utilisateur utilisateur;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "num_compteur_eau")
    private CompteurEau compteurEau;

    public int getId_eau() {
        return id_eau;
    }

    public void setId_eau(int id_eau) {
        this.id_eau = id_eau;
    }

    public float getQuantite_eau() {
        return quantite_eau;
    }

    public void setQuantite_eau(float quantite_eau) {
        this.quantite_eau = quantite_eau;
    }

    public float getTarif_eau() {
        return tarif_eau;
    }

    public void setTarif_eau(float tarif_eau) {
        this.tarif_eau = tarif_eau;
    }

    public Date getDate_eau() {
        return date_eau;
    }

    public void setDate_eau(Date date_eau) {
        this.date_eau = date_eau;
    }

    public Utilisateur getUtilisateur() {
        return utilisateur;
    }

    public void setUtilisateur(Utilisateur utilisateur) {
        this.utilisateur = utilisateur;
    }

    public CompteurEau getCompteurEau() {
        return compteurEau;
    }

    public void setCompteurEau(CompteurEau compteurEau) {
        this.compteurEau = compteurEau;
    }
}