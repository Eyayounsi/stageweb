package com.example.loginInscription.Controller;

import com.example.loginInscription.Services.ConsommationCarburantTerrestreService;
import com.example.loginInscription.entities.Terrestre.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/consommation-carburant-terrestre")
public class ConsommationCarburantTerrestreController {

    @Autowired
    private ConsommationCarburantTerrestreService consommationCarburantTerrestreService;

    // Ajouter une nouvelle consommation de carburant terrestre
    @PostMapping("/ajouterCompteurCarburantTerrestre")
    public String ajouterCompteurCarburantTerrestre(@RequestBody CompteurCarburantTerrestreRequest request) {
        consommationCarburantTerrestreService.ajouterCompteurCarburantTerrestre(request);
        return "CompteurCarburantTerrestre ajouté avec succès!";
    }

    @PostMapping("/ajouterConsommationCarburantTerrestre")
    public String ajouterConsommationCarburantTerrestre(@RequestBody ConsommationCarburantTerrestreRequestAjout request) {
        consommationCarburantTerrestreService.ajouterConsommationCarburantTerrestre(request);
        return "ConsommationCarburantTerrestre ajoutée avec succès!";
    }

    // Mettre à jour une consommation de carburant terrestre existante
    @PutMapping("/updateConsommationCarburantTerrestre/{id}")
    public String updateConsommationCarburantTerrestre(@PathVariable int id, @RequestBody ConsommationCarburantTerrestreRequest request) {
        consommationCarburantTerrestreService.updateConsommationCarburantTerrestre(id, request);
        return "ConsommationCarburantTerrestre mise à jour avec succès!";
    }

    @PutMapping("/updateCompteurCarburantTerrestre/{id}")
    public String updateCompteurCarburantTerrestre(@PathVariable int id, @RequestBody ConsommationCarburantTerrestreRequest request) {
        consommationCarburantTerrestreService.updateCompteurCarburantTerrestre(id, request);
        return "CompteurCarburantTerrestre mis à jour avec succès!";
    }

    // Supprimer un compteur de carburant terrestre et ses consommations associées
    @DeleteMapping("/delete/{id}")
    public void deleteCompteurCarburantTerrestre(@PathVariable int id) {
        consommationCarburantTerrestreService.deleteCompteurCarburantTerrestre(id);
    }

    // Récupérer un compteur de carburant terrestre avec ses consommations associées par son ID
    @GetMapping("/{id}")
    public CompteurCarburantTerrestreDTO getCompteurCarburantTerrestreByIdWithConsommations(@PathVariable int id) {
        return consommationCarburantTerrestreService.getCompteurCarburantTerrestreByIdWithConsommations(id);
    }

    // Récupérer tous les compteurs de carburant terrestre avec leurs consommations associées
    @GetMapping("/tous")
    public List<CompteurCarburantTerrestreDTO> getAllCompteurCarburantTerrestreWithConsommations() {
        return consommationCarburantTerrestreService.getAllCompteurCarburantTerrestreWithConsommations();
    }
}