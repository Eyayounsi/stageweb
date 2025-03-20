package com.example.loginInscription.Controller;

import com.example.loginInscription.Services.ConsommationCarburantFlottanteService;
import com.example.loginInscription.entities.Flottante.*;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/consommation-carburant-flottante")
public class ConsommationCarburantFlottanteController {
    private final ConsommationCarburantFlottanteService consommationCarburantFlottanteService;

    public ConsommationCarburantFlottanteController(ConsommationCarburantFlottanteService consommationCarburantFlottanteService) {
        this.consommationCarburantFlottanteService = consommationCarburantFlottanteService;
    }

   /* @PostMapping("/ajouter")
    public void ajouterConsommationCarburantFlottante(@RequestBody ConsommationCarburantFlottanteRequest request) {
        consommationCarburantFlottanteService.ajouterConsommationCarburantFlottante(request);
    }*/
   @PostMapping("/ajouterCompteurCarburantFlottante")
   public String ajouterCompteurCarburantFlottante(@RequestBody CompteurCarburantFlottanteRequest request) {
       consommationCarburantFlottanteService.ajouterCompteurCarburantFlottante(request);
       return "CompteurCarburantFlottante ajouté avec succès!";
   }

    @PostMapping("/ajouterConsommationCarburantFlottante")
    public String ajouterConsommationCarburantFlottante(@RequestBody ConsommationCarburantFlottanteRequestAjout request) {
        consommationCarburantFlottanteService.ajouterConsommationCarburantFlottante(request);
        return "ConsommationCarburantFlottante ajoutée avec succès!";
    }

    @PutMapping("/updateConsommationCarburantFlottante/{id}")
    public String updateConsommationCarburantFlottante(@PathVariable int id, @RequestBody ConsommationCarburantFlottanteRequest request) {
        consommationCarburantFlottanteService.updateConsommationCarburantFlottante(id, request);
        return "ConsommationCarburantFlottante mise à jour avec succès!";
    }

    @PutMapping("/updateCompteurCarburantFlottante/{id}")
    public String updateCompteurCarburantFlottante(@PathVariable int id, @RequestBody ConsommationCarburantFlottanteRequest request) {
        consommationCarburantFlottanteService.updateCompteurCarburantFlottante(id, request);
        return "CompteurCarburantFlottante mis à jour avec succès!";
    }

    @DeleteMapping("/supprimer/{id}")
    public void deleteConsommationCarburantFlottante(@PathVariable int id) {
        consommationCarburantFlottanteService.deleteCompteurCarburantFlottante(id);
    }

    @GetMapping("/{id}")
    public CompteurCarburantFlottanteDTO getConsommationCarburantFlottanteById(@PathVariable int id) {
        return consommationCarburantFlottanteService.getConsommationCarburantFlottanteById(id);
    }

    @GetMapping("/tous")
    public List<CompteurCarburantFlottanteDTO> getAllConsommationsCarburantFlottante() {
        return consommationCarburantFlottanteService.getAllConsommationsCarburantFlottante();
    }
}