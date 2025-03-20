package com.example.loginInscription.Controller;

import com.example.loginInscription.Services.ConsommationElectriciteService;
import com.example.loginInscription.entities.Electricite.*;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/consommation-electricite")
public class ConsommationElectriciteController {
    private final ConsommationElectriciteService consommationElectriciteService;

    public ConsommationElectriciteController(ConsommationElectriciteService consommationElectriciteService) {
        this.consommationElectriciteService = consommationElectriciteService;
    }

    @PostMapping("/ajouterCompteurElectricite")
    public String ajouterCompteurElectricite(@RequestBody CompteurElectriciteRequest request) {
        consommationElectriciteService.ajouterCompteurElectricite(request);
        return "CompteurElectricite ajouté avec succès!";
    }

    @PostMapping("/ajouterConsommationElectricite")
    public String ajouterConsommationElectricite(@RequestBody ConsommationElectriciteRequestAjout request) {
        consommationElectriciteService.ajouterConsommationElectricite(request);
        return "ConsommationElectricite ajoutée avec succès!";
    }

   /* @PutMapping("/modifier/{id}")
    public void updateConsommationElectricite(@PathVariable Long id, @RequestBody ConsommationElectriciteRequest request) {
        consommationElectriciteService.updateConsommationElectricite(id, request);
    }*/
   @PutMapping("/updateConsommationElectricite/{id}")
   public String updateConsommationElectricite(@PathVariable Long id, @RequestBody ConsommationElectriciteRequest request) {
       consommationElectriciteService.updateConsommationElectricite(id, request);
       return "ConsommationElectricite mise à jour avec succès!";
   }

    @PutMapping("/updateCompteurElectricite/{id}")
    public String updateCompteurElectricite(@PathVariable Integer id, @RequestBody ConsommationElectriciteRequest request) {
        consommationElectriciteService.updateCompteurElectricite(id, request);
        return "CompteurElectricite mis à jour avec succès!";
    }

    @DeleteMapping("/supprimer/{id}")
    public String deleteCompteurElectricite(@PathVariable int id) {
        consommationElectriciteService.deleteCompteurElectricite(id);
        return "CompteurElecticite supprimé avec succès!";
    }





    @GetMapping("/{id}")
    public CompteurElectriciteDTO getCompteurElectriciteById(@PathVariable int id) {
        return consommationElectriciteService.getCompteurElectriciteByIdWithConsommations(id);
    }

    @GetMapping("/all")
    public List<CompteurElectriciteDTO> getAllCompteursElectricite() {
        return consommationElectriciteService.getAllCompteurElectriciteWithConsommations();
    }
}