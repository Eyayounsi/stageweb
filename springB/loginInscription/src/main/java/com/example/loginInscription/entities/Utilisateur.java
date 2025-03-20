package com.example.loginInscription.entities;

import com.example.loginInscription.entities.Eau.ConsommationEau;
import com.example.loginInscription.entities.Electricite.ConsommationElectricite;
import com.example.loginInscription.entities.Flottante.ConsommationCarburantFlottante;
import com.example.loginInscription.entities.Terrestre.ConsommationCarburantTerrestre;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.io.Serializable;
import java.util.Collection;
import java.util.List;
@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Utilisateur implements UserDetails, Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long user_id;

    @Column(nullable = false)
    private String nom;

    @Column(nullable = false)
    private String prenom;

    @Column(nullable = false)
    private String role;

    @Column(nullable = false)
    private String nom_port;

    @Column(nullable = false)
    @JsonProperty("port_id") // Map portId to port_id in JSON
    private Long port_id;

    @Column(nullable = false, unique = true)
    private String mail;

    @Column(length = 60, nullable = false)
    private String mot_de_passe;

    // Relations avec d'autres entités
    @ManyToOne
    @JoinColumn(name = "port_id", insertable = false, updatable = false)

    private Port port;

    @OneToMany(mappedBy = "utilisateur", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ConsommationEau> consommationsEau;

    @OneToMany(mappedBy = "utilisateur", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ConsommationElectricite> consommationsElectricite;

    @OneToMany(mappedBy = "utilisateur", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ConsommationCarburantTerrestre> consommationsCarburantTerrestre;

    @OneToMany(mappedBy = "utilisateur", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ConsommationCarburantFlottante> consommationsCarburantFlottant;

    // Méthodes de l'interface UserDetails
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority("ROLE_" + this.role));
    }

    @Override
    public String getPassword() {
        return this.mot_de_passe;
    }

    @Override
    public String getUsername() {
        return this.mail;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    public Long getUser_id() {
        return user_id;
    }

    public void setUser_id(Long user_id) {
        this.user_id = user_id;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getPrenom() {
        return prenom;
    }

    public void setPrenom(String prenom) {
        this.prenom = prenom;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getNom_port() {
        return nom_port;
    }

    public void setNom_port(String nom_port) {
        this.nom_port = nom_port;
    }

    public Long getPort_id() {
        return port_id;
    }

    public void setPort_id(Long port_id) {
        this.port_id = port_id;
    }

    public String getMail() {
        return mail;
    }

    public void setMail(String mail) {
        this.mail = mail;
    }

    public String getMot_de_passe() {
        return mot_de_passe;
    }

    public void setMot_de_passe(String mot_de_passe) {
        this.mot_de_passe = mot_de_passe;
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

    public List<ConsommationElectricite> getConsommationsElectricite() {
        return consommationsElectricite;
    }

    public void setConsommationsElectricite(List<ConsommationElectricite> consommationsElectricite) {
        this.consommationsElectricite = consommationsElectricite;
    }

    public List<ConsommationCarburantTerrestre> getConsommationsCarburantTerrestre() {
        return consommationsCarburantTerrestre;
    }

    public void setConsommationsCarburantTerrestre(List<ConsommationCarburantTerrestre> consommationsCarburantTerrestre) {
        this.consommationsCarburantTerrestre = consommationsCarburantTerrestre;
    }

    public List<ConsommationCarburantFlottante> getConsommationsCarburantFlottant() {
        return consommationsCarburantFlottant;
    }

    public void setConsommationsCarburantFlottant(List<ConsommationCarburantFlottante> consommationsCarburantFlottant) {
        this.consommationsCarburantFlottant = consommationsCarburantFlottant;
    }
}