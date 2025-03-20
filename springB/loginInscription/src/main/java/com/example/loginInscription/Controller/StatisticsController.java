package com.example.loginInscription.Controller;

import com.example.loginInscription.Services.StatisticsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
@RestController
@RequestMapping("/api/statistics")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
// Chemin de base pour toutes les méthodes
public class StatisticsController {

    @Autowired
    private StatisticsService statisticsService;

    @GetMapping("/nombre-utilisateurs") // Chemin complet : /user/api/statistics/nombre-utilisateurs
    public long getNombreUtilisateurs() {
        return statisticsService.getNombreUtilisateurs();
    }

    @GetMapping("/nombre-compteurs-eau") // Chemin complet : /user/api/statistics/nombre-compteurs-eau
    public long getNombreCompteursEau() {
        return statisticsService.getNombreCompteursEau();
    }

    @GetMapping("/nombre-compteurs-electricite") // Chemin complet : /user/api/statistics/nombre-compteurs-electricite
    public long getNombreCompteursElectricite() {
        return statisticsService.getNombreCompteursElectricite();
    }

    @GetMapping("/nombre-compteurs-carburant-terrestre") // Chemin complet : /user/api/statistics/nombre-compteurs-carburant-terrestre
    public long getNombreCompteursCarburantTerrestre() {
        return statisticsService.getNombreCompteursCarburantTerrestre();
    }

    @GetMapping("/nombre-compteurs-carburant-flottante") // Chemin complet : /user/api/statistics/nombre-compteurs-carburant-flottante
    public long getNombreCompteursCarburantFlottante() {
        return statisticsService.getNombreCompteursCarburantFlottante();
    }
}