package com.example.loginInscription.entities;

public enum TypeFlottant {
    VEDETTE,
    REMORQUE;

    // Méthode pour convertir une chaîne en enum
    public static TypeFlottant fromString(String value) {
        return TypeFlottant.valueOf(value.toUpperCase());
    }
}