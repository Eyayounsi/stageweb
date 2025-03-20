package com.example.loginInscription.Services;

import com.example.loginInscription.Repo.CompteurEauRepository;
import com.example.loginInscription.Repo.ConsommationEauRepo;
import com.example.loginInscription.Repo.PortRepository;
import com.example.loginInscription.Repo.UtilisateurRepository;
import com.example.loginInscription.entities.*;
import com.example.loginInscription.entities.Eau.*;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class ConsommationEauService {
    @Autowired
    private ConsommationEauRepo consommationEauRepo;
  /*  public ConsommationEau saveConsommationEau(ConsommationEau consommationEau) {
        // Ensure the Utilisateur is already saved in the database
        if (consommationEau.getUtilisateur().getUser_id() == null) {
            throw new RuntimeException("Utilisateur non trouvé");
        }
        // Save the ConsommationEau
        return consommationEauRepo.save(consommationEau);
    }


    public void deleteConsommationEau(Long consommationEauId) {
        // Vérifie si l'objet ConsommationEau existe dans la base de données
        ConsommationEau consommationEau = consommationEauRepo.findById(consommationEauId)
                .orElseThrow(() -> new RuntimeException("Consommation d'eau non trouvée"));

        // Supprime l'objet ConsommationEau
        consommationEauRepo.delete(consommationEau);
    }
    public ConsommationEau updateConsommationEau(Long id_eau, ConsommationEau updatedConsommationEau) {
        // Vérifie si l'objet ConsommationEau existe dans la base de données
        ConsommationEau consommationEau = consommationEauRepo.findById(id_eau)
                .orElseThrow(() -> new RuntimeException("Consommation d'eau non trouvée"));

        // Met à jour les champs de consommationEau avec les valeurs de updatedConsommationEau
        consommationEau.setNum_compteur_eau(updatedConsommationEau.getNum_compteur_eau());
        consommationEau.setEmplacement_compteur_eau(updatedConsommationEau.getEmplacement_compteur_eau());
        consommationEau.setQuantite_eau(updatedConsommationEau.getQuantite_eau());
        consommationEau.setTarif_eau(updatedConsommationEau.getTarif_eau());
        consommationEau.setType_compteur_eau(updatedConsommationEau.getType_compteur_eau());
        consommationEau.setDate_eau(updatedConsommationEau.getDate_eau());

        // Sauvegarde les changements
        return consommationEauRepo.save(consommationEau);
    }



*/

    @Autowired
    private CompteurEauRepository compteurEauRepository;

    @Autowired
    private ConsommationEauRepo consommationEauRepository;

    @Autowired
    private PortRepository portRepository;

    @Autowired
    private UtilisateurRepository utilisateurRepository;

    @Autowired
    private ConsommationEauMapper consommationEauMapper;




   /* @Transactional
    public void ajouterConsommationEau(ConsommationEauRequest request) {
        // Récupérer le port et l'utilisateur
        Port port = portRepository.findById(request.getPortId())
                .orElseThrow(() -> new RuntimeException("Port non trouvé"));
        Utilisateur utilisateur = utilisateurRepository.findById(request.getUserId())
                .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé"));

        // Créer et enregistrer le CompteurEau
        CompteurEau compteurEau = new CompteurEau();
        compteurEau.setEmplacement_eau(request.getEmplacementEau());
        compteurEau.setOrdre_eau(request.getOrdreEau());
        compteurEau.setPort(port);
        compteurEauRepository.save(compteurEau);

        // Créer et enregistrer la ConsommationEau
        ConsommationEau consommationEau = new ConsommationEau();
        consommationEau.setQuantite_eau(request.getQuantiteEau());
        consommationEau.setTarif_eau(request.getTarifEau());
        consommationEau.setDate_eau(request.getDateEau());
        consommationEau.setUtilisateur(utilisateur);
        consommationEau.setCompteurEau(compteurEau);
        consommationEauRepository.save(consommationEau);
    }*/




    @Transactional
    public void ajouterCompteurEau(CompteurEauRequest request) {
        // Check if the counter number already exists
        if (compteurEauRepository.existsById(request.getNum_compteur_eau())) {
            throw new RuntimeException("Le numéro de compteur existe déjà.");
        }

        // Fetch the port
        Port port = portRepository.findById(request.getPortId())
                .orElseThrow(() -> new RuntimeException("Port non trouvé"));

        // Create and save the CompteurEau entity
        CompteurEau compteurEau = new CompteurEau();
        compteurEau.setNum_compteur_eau(request.getNum_compteur_eau()); // Set the manual counter number
        compteurEau.setEmplacement_eau(request.getEmplacementEau());
        compteurEau.setOrdre_eau(request.getOrdreEau());
        compteurEau.setPort(port);

        compteurEauRepository.save(compteurEau);
    }

    @Transactional
    public void ajouterConsommationEau(ConsommationEauRequestAjout request) {
        Utilisateur utilisateur = utilisateurRepository.findById(request.getUserId())
                .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé"));

        CompteurEau compteurEau = compteurEauRepository.findById(request.getCompteurEauId())
                .orElseThrow(() -> new RuntimeException("CompteurEau non trouvé"));

        ConsommationEau consommationEau = new ConsommationEau();
        consommationEau.setQuantite_eau(request.getQuantiteEau());
        consommationEau.setTarif_eau(request.getTarifEau());
        consommationEau.setDate_eau(request.getDateEau());
        consommationEau.setUtilisateur(utilisateur);
        consommationEau.setCompteurEau(compteurEau);

        consommationEauRepository.save(consommationEau);
    }


/*
    @Transactional
    public void updateConsommationEau(int id, ConsommationEauRequest request) {
        ConsommationEau consommationEau = consommationEauRepository.findById(Long.valueOf(id))
                .orElseThrow(() -> new RuntimeException("ConsommationEau non trouvée"));

        // Mettre à jour les champs de ConsommationEau
        consommationEau.setQuantite_eau(request.getQuantiteEau());
        consommationEau.setTarif_eau(request.getTarifEau());
        consommationEau.setDate_eau(request.getDateEau());

        // Mettre à jour le CompteurEau associé
        CompteurEau compteurEau = consommationEau.getCompteurEau();
        compteurEau.setEmplacement_eau(request.getEmplacementEau());
        compteurEau.setOrdre_eau(request.getOrdreEau());

        // Enregistrer les modifications
        compteurEauRepository.save(compteurEau);
        consommationEauRepository.save(consommationEau);
    }*/

    @Transactional
    public void updateConsommationEau(int id, ConsommationEauRequest request) {
        ConsommationEau consommationEau = consommationEauRepository.findById(Long.valueOf(id))
                .orElseThrow(() -> new RuntimeException("ConsommationEau non trouvée"));

        // Mettre à jour les champs de ConsommationEau
        consommationEau.setQuantite_eau(request.getQuantiteEau());
        consommationEau.setTarif_eau(request.getTarifEau());
        consommationEau.setDate_eau(request.getDateEau());

        // Enregistrer les modifications
        consommationEauRepository.save(consommationEau);
    }

    @Transactional
    public void updateCompteurEau(int id, ConsommationEauRequest request) {
        CompteurEau compteurEau = compteurEauRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("CompteurEau non trouvé"));

        // Mettre à jour les champs de CompteurEau
        compteurEau.setEmplacement_eau(request.getEmplacementEau());
        compteurEau.setOrdre_eau(request.getOrdreEau());
        compteurEau.setPort(portRepository.findById(request.getPortId())
                .orElseThrow(() -> new RuntimeException("Port non trouvé")));
        // Enregistrer les modifications
        compteurEauRepository.save(compteurEau);
    }


    @Transactional
    public void deleteCompteurEau(int id) {
        CompteurEau compteurEau = compteurEauRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("CompteurEau non trouvé"));

        // Supprimer le CompteurEau (les ConsommationEau associées seront supprimées automatiquement)
        compteurEauRepository.delete(compteurEau);
    }

  /*  public CompteurEau getCompteurEauByIdWithConsommations(int id) {
        return compteurEauRepository.findByIdWithConsommations(id)
                .orElseThrow(() -> new RuntimeException("CompteurEau non trouvé"));
    }

    public List<CompteurEau> getAllCompteurEauWithConsommations() {
        return compteurEauRepository.findAllWithConsommations();
    }*/
  public CompteurEauDTO getCompteurEauByIdWithConsommations(int id) {
      CompteurEau compteurEau = compteurEauRepository.findByIdWithConsommations(id)
              .orElseThrow(() -> new RuntimeException("CompteurEau non trouvé"));

      return consommationEauMapper.toCompteurEauDTO(compteurEau);
  }

    public List<CompteurEauDTO> getAllCompteurEauWithConsommations() {
        List<CompteurEau> compteurEauList = compteurEauRepository.findAllWithConsommations();
        return compteurEauList.stream()
                .map(consommationEauMapper::toCompteurEauDTO)
                .collect(Collectors.toList());
    }

}
