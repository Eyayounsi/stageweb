package com.example.loginInscription.Controller;

import com.example.loginInscription.Repo.ConsommationEauRepo;
import com.example.loginInscription.Repo.ConsommationElectriciteRepo;
import com.example.loginInscription.Repo.UtilisateurRepository;
import com.example.loginInscription.Services.*;
import com.example.loginInscription.config.TokenBlacklist;
import com.example.loginInscription.entities.*;
import com.example.loginInscription.entities.Eau.*;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")

public class AuthController {
    @Autowired
    private UtilisateurRepository utilisateurRepository;
    @Autowired
    private ConsommationElectriciteRepo consommationElectriciteRepo;
    @Autowired
    private ConsommationEauRepo consommationEauRepo;

    private final UtilisateurService utilisateurService;

    private final ConsommationEauService consommationEauService;

    private final ConsommationElectriciteService consommationElectriciteService ;
    @Autowired
    private ConsommationCarburantTerrestreService consommationCarburantTerrestreService;
    @Autowired
    private ConsommationCarburantFlottanteService consommationCarburantFlottanteService;

    @Autowired
    public AuthController(UtilisateurService utilisateurService, ConsommationEauService consommationEauService ,ConsommationElectriciteService consommationElectriciteService) {
        this.utilisateurService = utilisateurService;
        this.consommationEauService = consommationEauService;
        this.consommationElectriciteService = consommationElectriciteService;
    }



    @Autowired
    private TokenBlacklist tokenBlacklist;

   /* @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        try {
            // Appel de la méthode login du service
            Utilisateur utilisateur = utilisateurService.login(loginRequest.getMail(), loginRequest.getMot_de_passe());
            return ResponseEntity.ok(utilisateur); // Retourne l'utilisateur dans la réponse
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage()); // Gestion des erreurs
        }
    }*/
   @PostMapping("/login")
   public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
       try {
           // Appel de la méthode login du service
           Utilisateur utilisateur = utilisateurService.login(loginRequest.getMail(), loginRequest.getMot_de_passe());

           // Convertir l'utilisateur en DTO
           UtilisateurDTO utilisateurDTO = UtilisateurMapper.toDTO(utilisateur);

           return ResponseEntity.ok(utilisateurDTO); // Retourne le DTO dans la réponse
       } catch (RuntimeException e) {
           return ResponseEntity.badRequest().body(e.getMessage()); // Gestion des erreurs
       }
   }

    // Endpoint pour le logout
    @PostMapping("/logout")
    public ResponseEntity<String> logout(@RequestHeader("Authorization") String token) {
        try {
            // Extraire le token du header
            if (token != null && token.startsWith("Bearer ")) {
                token = token.substring(7); // Supprimer "Bearer " du token
                utilisateurService.logout(token); // Ajouter le token à la blacklist
                return ResponseEntity.ok("Utilisateur déconnecté"); // Retourne un message de succès
            } else {
                return ResponseEntity.badRequest().body("Token invalide");
            }
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage()); // Gestion des erreurs
        }
    }



    @PostMapping("/signup")
    public Utilisateur signup(@RequestBody Utilisateur utilisateur) {
        return utilisateurService.signup(utilisateur);
    }

    @PutMapping("/updateUtilisateur/{id}")
    public ResponseEntity<Utilisateur> updateUtilisateur(@PathVariable Long id, @RequestBody Utilisateur updatedUtilisateur) {
        // Met à jour l'utilisateur
        Utilisateur utilisateur = utilisateurService.updateUtilisateur(id, updatedUtilisateur);

        // Retourne la réponse avec le statut 200 OK et l'utilisateur mis à jour
        return ResponseEntity.ok(utilisateur);
    }

    @DeleteMapping("/deleteUtilisateur/{id}")
    public ResponseEntity<String> deleteUtilisateur(@PathVariable Long id) {
        // Supprime l'utilisateur
        utilisateurService.deleteUtilisateur(id);

        // Retourne la réponse de confirmation
        return ResponseEntity.ok("Utilisateur supprimé avec succès pour l'ID :" + id);
    }


    /*@PostMapping("/ajouterEau")
    public String ajouterConsommationEau(@RequestBody ConsommationEauRequest request) {
        consommationEauService.ajouterConsommationEau(request);
        return "ConsommationEau et CompteurEau ajoutés avec succès!";
    }*/
    @PostMapping("/ajouterCompteurEau")
    public ResponseEntity<String> ajouterCompteurEau(@RequestBody CompteurEauRequest request) {
        try {
            consommationEauService.ajouterCompteurEau(request);
            return ResponseEntity.ok("CompteurEau ajouté avec succès!");
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/ajouterConsommationEau")
    public String ajouterConsommationEau(@RequestBody ConsommationEauRequestAjout request) {
        consommationEauService.ajouterConsommationEau(request);
        return "ConsommationEau ajoutée avec succès!";
    }
/*
    @PutMapping("/updateEau/{id}")
    public String updateConsommationEau(@PathVariable int id, @RequestBody ConsommationEauRequest request) {
        consommationEauService.updateConsommationEau(id, request);
        return "ConsommationEau mise à jour avec succès!";
    }
*/

    @PutMapping("/updateConsommationEau/{id}")
    public String updateConsommationEau(@PathVariable int id, @RequestBody ConsommationEauRequest request) {
        consommationEauService.updateConsommationEau(id, request);
        return "ConsommationEau mise à jour avec succès!";
    }

    @PutMapping("/updateCompteurEau/{id}")
    public String updateCompteurEau(@PathVariable int id, @RequestBody ConsommationEauRequest request) {
        consommationEauService.updateCompteurEau(id, request);
        return "CompteurEau mis à jour avec succès!";
    }

    @DeleteMapping("/deleteEau/{id}")
    public String deleteCompteurEau(@PathVariable int id) {
        consommationEauService.deleteCompteurEau(id);
        return "CompteurEau supprimé avec succès!";
    }

   /* @GetMapping("/getCompteurById/{id}")
    public CompteurEau getCompteurEauById(@PathVariable int id) {
        return consommationEauService.getCompteurEauByIdWithConsommations(id);
    }

    @GetMapping("/GetEauall")
    public List<CompteurEau> getAllCompteurEau() {
        return consommationEauService.getAllCompteurEauWithConsommations();
    }*/

    @GetMapping("/getCompteurById/{id}")
    public CompteurEauDTO getCompteurEauById(@PathVariable int id) {
        return consommationEauService.getCompteurEauByIdWithConsommations(id);
    }

    // Endpoint pour récupérer tous les compteurs d'eau avec leurs consommations
    @GetMapping("/GetEauall")
    public List<CompteurEauDTO> getAllCompteurEau() {
        return consommationEauService.getAllCompteurEauWithConsommations();
    }

}