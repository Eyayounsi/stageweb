package com.example.loginInscription.Services;

import com.example.loginInscription.Repo.CompteurElectriciteRepository;
import com.example.loginInscription.Repo.ConsommationElectriciteRepo;
import com.example.loginInscription.Repo.PortRepository;
import com.example.loginInscription.Repo.UtilisateurRepository;
import com.example.loginInscription.entities.*;
import com.example.loginInscription.entities.Eau.CompteurEau;
import com.example.loginInscription.entities.Electricite.*;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class ConsommationElectriciteService {
    @Autowired
    private CompteurElectriciteRepository compteurElectriciteRepository;

    @Autowired
    private ConsommationElectriciteRepo consommationElectriciteRepo;

    @Autowired
    private PortRepository portRepository;

    @Autowired
    private UtilisateurRepository utilisateurRepository;

    @Autowired
    private ConsommationElectriciteMapper consommationElectriciteMapper;


    @Transactional
    public void ajouterCompteurElectricite(CompteurElectriciteRequest request) {
        // Check if the counter number already exists
        if (compteurElectriciteRepository.existsById(request.getNum_compteur_electricite())) {
            throw new RuntimeException("Le numéro de compteur existe déjà.");
        }

        Port port = portRepository.findById(request.getPortId())
                .orElseThrow(() -> new RuntimeException("Port non trouvé"));

        CompteurElectricite compteur = new CompteurElectricite();
        compteur.setNum_compteur_electricite(request.getNum_compteur_electricite()); // Set the manual counter number
        compteur.setEmplacement_electricite(request.getEmplacement_electricite());
        compteur.setOrdre_electricite(request.getOrdre_electricite());
        compteur.setPort(port);

        compteurElectriciteRepository.save(compteur);
    }
    @Transactional
    public void ajouterConsommationElectricite(ConsommationElectriciteRequestAjout request) {
        Utilisateur utilisateur = utilisateurRepository.findById(request.getUserId())
                .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé"));

        CompteurElectricite compteurElectricite = compteurElectriciteRepository.findById(request.getCompteurElectriciteId())
                .orElseThrow(() -> new RuntimeException("CompteurElectricite non trouvé"));

        ConsommationElectricite consommationElectricite = new ConsommationElectricite();
        consommationElectricite.setQuantite_electricite(request.getQuantite_electricite());
        consommationElectricite.setTarif_electricite(request.getTarif_electricite());
        consommationElectricite.setDate_electricite(request.getDate_electricite());
        consommationElectricite.setUtilisateur(utilisateur);
        consommationElectricite.setCompteurElectricite(compteurElectricite);

        consommationElectriciteRepo.save(consommationElectricite);
    }

  /*  @Transactional
    public void updateConsommationElectricite(Long id, ConsommationElectriciteRequest request) {
        ConsommationElectricite consommationElectricite = consommationElectriciteRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("ConsommationElectricite non trouvée"));

        consommationElectricite.setQuantite_electricite(request.getQuantite_electricite());
        consommationElectricite.setTarif_electricite(request.getTarif_electricite());
        consommationElectricite.setDate_electricite(request.getDate_electricite());

        CompteurElectricite compteurElectricite = consommationElectricite.getCompteurElectricite();
        compteurElectricite.setEmplacement_electricite(request.getEmplacement_electricite());
        compteurElectricite.setOrdre_electricite(request.getOrdre_electricite());

        compteurElectriciteRepository.save(compteurElectricite);
        consommationElectriciteRepo.save(consommationElectricite);
    }
*/
  @Transactional
  public void updateConsommationElectricite(Long id, ConsommationElectriciteRequest request) {
      ConsommationElectricite consommationElectricite = consommationElectriciteRepo.findById(id)
              .orElseThrow(() -> new RuntimeException("ConsommationElectricite non trouvée"));

      // Mettre à jour les champs de ConsommationElectricite
      consommationElectricite.setQuantite_electricite(request.getQuantite_electricite());
      consommationElectricite.setTarif_electricite(request.getTarif_electricite());
      consommationElectricite.setDate_electricite(request.getDate_electricite());

      // Enregistrer les modifications
      consommationElectriciteRepo.save(consommationElectricite);
  }

    @Transactional
    public void updateCompteurElectricite(Integer id, ConsommationElectriciteRequest request) {
        CompteurElectricite compteurElectricite = compteurElectriciteRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("CompteurElectricite non trouvé"));

        // Mettre à jour les champs de CompteurElectricite
        compteurElectricite.setEmplacement_electricite(request.getEmplacement_electricite());
        compteurElectricite.setOrdre_electricite(request.getOrdre_electricite());
        compteurElectricite.setPort(portRepository.findById(request.getPortId())
                .orElseThrow(() -> new RuntimeException("Port non trouvé")));
        // Enregistrer les modifications
        compteurElectriciteRepository.save(compteurElectricite);
    }





/*    @Transactional
    public ResponseEntity<?> updateCompteurElectricite(Integer id, ConsommationElectriciteRequest request) {
        try {
            // Récupérer le CompteurElectricite à mettre à jour
            CompteurElectricite compteurElectricite = compteurElectriciteRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("CompteurElectricite non trouvé"));

            // Mettre à jour les champs de CompteurElectricite
            compteurElectricite.setEmplacement_electricite(request.getEmplacement_electricite());
            compteurElectricite.setOrdre_electricite(request.getOrdre_electricite());

            // Vérifier que le portId est compris entre 1 et 7
            int portId = request.getPortId();
            if (portId < 1 || portId > 7) {
                throw new RuntimeException("Port non trouvé. Le portId doit être compris entre 1 et 7.");
            }

            // Récupérer le Port correspondant au portId depuis la base de données
            Port port = portRepository.findById(portId)
                    .orElseThrow(() -> new RuntimeException("Port non trouvé avec l'ID : " + portId));

            // Associer le Port au CompteurElectricite
            compteurElectricite.setPort(port);

            // Enregistrer les modifications
            compteurElectriciteRepository.save(compteurElectricite);

            // Renvoyer une réponse JSON
            return ResponseEntity.ok().body(Map.of(
                    "message", "CompteurElectricite mis à jour avec succès",
                    "data", compteurElectricite
            ));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("message", "Erreur lors de la mise à jour du CompteurElectricite", "error", e.getMessage()));
        }
    }
*/


    @Transactional
    public void deleteCompteurElectricite(int id) {
        CompteurElectricite compteurElectricite = compteurElectriciteRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("CompteurElectricite non trouvé"));
        compteurElectriciteRepository.delete(compteurElectricite);
    }







   /* public CompteurElectricite getCompteurElectriciteByIdWithConsommations(Integer id) {
        return compteurElectriciteRepository.findByIdWithConsommations(id)
                .orElseThrow(() -> new RuntimeException("CompteurElectricite non trouvé"));
    }

    public List<CompteurElectricite> getAllCompteurElectriciteWithConsommations() {
        return compteurElectriciteRepository.findAllWithConsommations();
    }*/



    public CompteurElectriciteDTO getCompteurElectriciteByIdWithConsommations(int id) {
        CompteurElectricite compteurElectricite = compteurElectriciteRepository.findByIdWithConsommations(id)
                .orElseThrow(() -> new RuntimeException("CompteurElectricite non trouvé"));

        return consommationElectriciteMapper.toCompteurElectriciteDTO(compteurElectricite);
    }

    public List<CompteurElectriciteDTO> getAllCompteurElectriciteWithConsommations() {
        List<CompteurElectricite> compteurElectriciteList = compteurElectriciteRepository.findAllWithConsommations();
        return compteurElectriciteList.stream()
                .map(consommationElectriciteMapper::toCompteurElectriciteDTO)
                .collect(Collectors.toList());
    }

}


