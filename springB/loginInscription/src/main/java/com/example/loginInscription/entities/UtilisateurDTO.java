package com.example.loginInscription.entities;


public class UtilisateurDTO {
    private Long user_id;
    private String nom;
    private String prenom;
    private String role;
    private String nom_port;
    private Long port_id;
    private String mail;
    private PortDTO port; // Utilisez PortDTO au lieu de Port

    // Getters et Setters
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

    public PortDTO getPort() {
        return port;
    }

    public void setPort(PortDTO port) {
        this.port = port;
    }
}