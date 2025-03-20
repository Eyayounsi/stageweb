package com.example.loginInscription.Services;

import com.example.loginInscription.Repo.ConsommationCarburantFlottanteRepo;
import com.example.loginInscription.Repo.CompteurCarburantFlottanteRepository;
import com.example.loginInscription.Repo.PortRepository;
import com.example.loginInscription.Repo.UtilisateurRepository;
import com.example.loginInscription.entities.*;
import com.example.loginInscription.entities.Electricite.CompteurElectricite;
import com.example.loginInscription.entities.Flottante.*;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class ConsommationCarburantFlottanteService {
    @Autowired
    private ConsommationCarburantFlottanteRepo consommationCarburantFlottanteRepository;

    @Autowired
    private CompteurCarburantFlottanteRepository compteurCarburantFlottant;

    @Autowired
    private CompteurCarburantFlottanteRepository compteurCarburantFlottanteRepository;

    @Autowired
    private PortRepository portRepository;

    @Autowired
    private UtilisateurRepository utilisateurRepository;
    @Autowired
    private ConsommationCarburantFlottanteMapper consommationCarburantFlottanteMapper;


   /* @Transactional
    public void ajouterConsommationCarburantFlottante(ConsommationCarburantFlottanteRequest request) {
        Port port = portRepository.findById(request.getPortId())
                .orElseThrow(() -> new RuntimeException("Port non trouvé"));
        Utilisateur utilisateur = utilisateurRepository.findById(request.getUserId())
                .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé"));

        // Créer et enregistrer le CompteurCarburantFlottante
        CompteurCarburantFlottante compteur = new CompteurCarburantFlottante();
        compteur.setEmplacement_flottant(request.getEmplacement_flottant());
        compteur.setOrdre_flottant(request.getOrdre_flottant());
        compteur.setPort(port);
        compteurCarburantFlottanteRepository.save(compteur);

        // Créer et enregistrer la ConsommationCarburantFlottante
        ConsommationCarburantFlottante consommation = new ConsommationCarburantFlottante();
        consommation.setQuantite_carburant_flottant(request.getQuantite_carburant_flottant());
        consommation.setTarif_carburant_flottant(request.getTarif_carburant_flottant());
        consommation.setDate_carburant_flottant(request.getDate_carburant_flottant());
        consommation.setTypeFlottant(request.getType_flottant());
        consommation.setUtilisateur(utilisateur);
        consommation.setCompteurCarburantFlottante(compteur);

        consommationCarburantFlottanteRepository.save(consommation);
    }*/
   @Transactional
   public void ajouterCompteurCarburantFlottante(CompteurCarburantFlottanteRequest request) {
       // Check if the counter number already exists
       if (compteurCarburantFlottanteRepository.existsById(request.getNum_compteur_flottant())) {
           throw new RuntimeException("Le numéro de compteur existe déjà.");
       }

       Port port = portRepository.findById(request.getPortId())
               .orElseThrow(() -> new RuntimeException("Port non trouvé"));

       CompteurCarburantFlottante compteur = new CompteurCarburantFlottante();
       compteur.setNum_compteur_flottant(request.getNum_compteur_flottant()); // Set the manual counter number
       compteur.setEmplacement_flottant(request.getEmplacement_flottant());
       compteur.setOrdre_flottant(request.getOrdre_flottant());
       compteur.setPort(port);

       compteurCarburantFlottanteRepository.save(compteur);
   }

    @Transactional
    public void ajouterConsommationCarburantFlottante(ConsommationCarburantFlottanteRequestAjout request) {
        Utilisateur utilisateur = utilisateurRepository.findById(request.getUserId())
                .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé"));

        CompteurCarburantFlottante compteur = compteurCarburantFlottanteRepository.findById(request.getCompteurCarburantFlottanteId())
                .orElseThrow(() -> new RuntimeException("CompteurCarburantFlottante non trouvé"));

        ConsommationCarburantFlottante consommation = new ConsommationCarburantFlottante();
        consommation.setQuantite_carburant_flottant(request.getQuantite_carburant_flottant());
        consommation.setTarif_carburant_flottant(request.getTarif_carburant_flottant());
        consommation.setDate_carburant_flottant(request.getDate_carburant_flottant());
        consommation.setTypeFlottant(request.getType_flottant());
        consommation.setUtilisateur(utilisateur);
        consommation.setCompteurCarburantFlottante(compteur);

        consommationCarburantFlottanteRepository.save(consommation);
    }

    @Transactional
    public void updateConsommationCarburantFlottante(int id, ConsommationCarburantFlottanteRequest request) {
        ConsommationCarburantFlottante consommation = consommationCarburantFlottanteRepository.findById(Long.valueOf(id))
                .orElseThrow(() -> new RuntimeException("ConsommationCarburantFlottante non trouvée"));

        // Mettre à jour les champs de ConsommationCarburantFlottante
        consommation.setQuantite_carburant_flottant(request.getQuantite_carburant_flottant());
        consommation.setTarif_carburant_flottant(request.getTarif_carburant_flottant());
        consommation.setDate_carburant_flottant(request.getDate_carburant_flottant());
        consommation.setTypeFlottant(request.getType_flottant());

        // Enregistrer les modifications
        consommationCarburantFlottanteRepository.save(consommation);
    }

    @Transactional
    public void updateCompteurCarburantFlottante(int id, ConsommationCarburantFlottanteRequest request) {
        CompteurCarburantFlottante compteur = compteurCarburantFlottanteRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("CompteurCarburantFlottante non trouvé"));

        // Mettre à jour les champs de CompteurCarburantFlottante
        compteur.setEmplacement_flottant(request.getEmplacement_flottant());
        compteur.setOrdre_flottant(request.getOrdre_flottant());
        compteur.setPort(portRepository.findById(request.getPortId())
                .orElseThrow(() -> new RuntimeException("Port non trouvé")));

        // Enregistrer les modifications
        compteurCarburantFlottanteRepository.save(compteur);
    }

    @Transactional
    public void deleteCompteurCarburantFlottante(int id) {
        CompteurCarburantFlottante compteurFlottante = compteurCarburantFlottanteRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("ConsommationCarburantFlottante non trouvée"));
        compteurCarburantFlottanteRepository.delete(compteurFlottante);
    }

    public CompteurCarburantFlottanteDTO getConsommationCarburantFlottanteById(int id) {
        CompteurCarburantFlottante compteur = compteurCarburantFlottanteRepository.findByIdWithConsommations(id)
                .orElseThrow(() -> new RuntimeException("ConsommationCarburantFlottante non trouvée"));
        return consommationCarburantFlottanteMapper.toCompteurCarburantFlottanteDTO(compteur);
    }

    public List<CompteurCarburantFlottanteDTO> getAllConsommationsCarburantFlottante() {
        List<CompteurCarburantFlottante> compteurs = compteurCarburantFlottanteRepository.findAllWithConsommations();
        return compteurs.stream()
                .map(consommationCarburantFlottanteMapper::toCompteurCarburantFlottanteDTO)
                .collect(Collectors.toList());
    }
}