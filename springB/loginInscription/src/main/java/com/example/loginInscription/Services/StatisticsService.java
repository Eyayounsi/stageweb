package com.example.loginInscription.Services;

import com.example.loginInscription.Repo.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class StatisticsService {

    @Autowired
    private UtilisateurRepository utilisateurRepository;

    @Autowired
    private CompteurEauRepository compteurEauRepository;

    @Autowired
    private CompteurElectriciteRepository compteurElectriciteRepository;

    @Autowired
    private CompteurCarburantTerrestreRepository compteurCarburantTerrestreRepository;

    @Autowired
    private CompteurCarburantFlottanteRepository compteurCarburantFlottanteRepository;

    // Méthode pour obtenir le nombre d'utilisateurs
    public long getNombreUtilisateurs() {
        return utilisateurRepository.count();
    }

    // Méthode pour obtenir le nombre de compteurs d'eau
    public long getNombreCompteursEau() {
        return compteurEauRepository.count();
    }

    // Méthode pour obtenir le nombre de compteurs d'électricité
    public long getNombreCompteursElectricite() {
        return compteurElectriciteRepository.count();
    }

    // Méthode pour obtenir le nombre de compteurs de carburant terrestre
    public long getNombreCompteursCarburantTerrestre() {
        return compteurCarburantTerrestreRepository.count();
    }

    // Méthode pour obtenir le nombre de compteurs de carburant flottante
    public long getNombreCompteursCarburantFlottante() {
        return compteurCarburantFlottanteRepository.count();
    }

}