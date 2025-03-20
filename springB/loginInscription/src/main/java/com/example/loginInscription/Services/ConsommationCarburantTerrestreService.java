package com.example.loginInscription.Services;

import com.example.loginInscription.Repo.CompteurCarburantTerrestreRepository;
import com.example.loginInscription.Repo.ConsommationCarburantTerrestreRepo;
import com.example.loginInscription.Repo.PortRepository;
import com.example.loginInscription.Repo.UtilisateurRepository;
import com.example.loginInscription.entities.*;
import com.example.loginInscription.entities.Terrestre.*;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class ConsommationCarburantTerrestreService {


    @Autowired
    private ConsommationCarburantTerrestreMapper consommationCarburantTerrestreMapper;

    @Autowired
    private ConsommationCarburantTerrestreRepo consommationCarburantTerrestreRepo;

    @Autowired
    private CompteurCarburantTerrestreRepository compteurCarburantTerrestreRepository;

    @Autowired
    private PortRepository portRepository;

    @Autowired
    private UtilisateurRepository utilisateurRepository;

    @Transactional
    public void ajouterCompteurCarburantTerrestre(CompteurCarburantTerrestreRequest request) {
        // Check if the counter number already exists
        if (compteurCarburantTerrestreRepository.existsById(request.getNum_compteur_terrestre())) {
            throw new RuntimeException("Le numéro de compteur existe déjà.");
        }

        Port port = portRepository.findById(request.getPortId())
                .orElseThrow(() -> new RuntimeException("Port non trouvé"));

        CompteurCarburantTerrestre compteur = new CompteurCarburantTerrestre();
        compteur.setNum_compteur_terrestre(request.getNum_compteur_terrestre()); // Set the manual counter number
        compteur.setEmplacement_terrestre(request.getEmplacement_terrestre());
        compteur.setOrdre_terrestre(request.getOrdre_terrestre());
        compteur.setPort(port);

        compteurCarburantTerrestreRepository.save(compteur);
    }

    @Transactional
    public void ajouterConsommationCarburantTerrestre(ConsommationCarburantTerrestreRequestAjout request) {
        Utilisateur utilisateur = utilisateurRepository.findById(request.getUserId())
                .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé"));

        CompteurCarburantTerrestre compteur = compteurCarburantTerrestreRepository.findById(request.getCompteurCarburantTerrestreId())
                .orElseThrow(() -> new RuntimeException("CompteurCarburantTerrestre non trouvé"));

        ConsommationCarburantTerrestre consommation = new ConsommationCarburantTerrestre();
        consommation.setQuantite_carburant_terrestre(request.getQuantite_carburant_terrestre());
        consommation.setTarif_carburant_terrestre(request.getTarif_carburant_terrestre());
        consommation.setType_carburant(request.getType_carburant());
        consommation.setDate_carburant_terrestre(request.getDate_carburant_terrestre());
        consommation.setUtilisateur(utilisateur);
        consommation.setCompteurCarburantTerrestre(compteur);

        consommationCarburantTerrestreRepo.save(consommation);
    }

    @Transactional
    public void updateConsommationCarburantTerrestre(int id, ConsommationCarburantTerrestreRequest request) {
        ConsommationCarburantTerrestre consommationCarburantTerrestre = consommationCarburantTerrestreRepo.findById(Long.valueOf(id))
                .orElseThrow(() -> new RuntimeException("ConsommationCarburantTerrestre non trouvée"));

        // Mettre à jour les champs de ConsommationCarburantTerrestre
        consommationCarburantTerrestre.setQuantite_carburant_terrestre(request.getQuantite_carburant_terrestre());
        consommationCarburantTerrestre.setTarif_carburant_terrestre(request.getTarif_carburant_terrestre());
        consommationCarburantTerrestre.setType_carburant(request.getType_carburant());
        consommationCarburantTerrestre.setDate_carburant_terrestre(request.getDate_carburant_terrestre());

        // Enregistrer les modifications
        consommationCarburantTerrestreRepo.save(consommationCarburantTerrestre);
    }

    @Transactional
    public void updateCompteurCarburantTerrestre(int id, ConsommationCarburantTerrestreRequest request) {
        CompteurCarburantTerrestre compteurCarburantTerrestre = compteurCarburantTerrestreRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("CompteurCarburantTerrestre non trouvé"));

        // Mettre à jour les champs de CompteurCarburantTerrestre
        compteurCarburantTerrestre.setEmplacement_terrestre(request.getEmplacement_terrestre());
        compteurCarburantTerrestre.setOrdre_terrestre(request.getOrdre_terrestre());
        compteurCarburantTerrestre.setPort(portRepository.findById(request.getPortId())
                .orElseThrow(() -> new RuntimeException("Port non trouvé")));

        // Enregistrer les modifications
        compteurCarburantTerrestreRepository.save(compteurCarburantTerrestre);
    }

    @Transactional
    public void deleteCompteurCarburantTerrestre(int id) {
        CompteurCarburantTerrestre compteurCarburantTerrestre = compteurCarburantTerrestreRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("CompteurCarburantTerrestre non trouvé"));

        // Supprimer le CompteurCarburantTerrestre (les ConsommationCarburantTerrestre associées seront supprimées automatiquement)
        compteurCarburantTerrestreRepository.delete(compteurCarburantTerrestre);
    }





    public CompteurCarburantTerrestreDTO getCompteurCarburantTerrestreByIdWithConsommations(int id) {
        CompteurCarburantTerrestre compteurCarburantTerrestre = compteurCarburantTerrestreRepository.findByIdWithConsommations(id)
                .orElseThrow(() -> new RuntimeException("CompteurCarburantTerrestre non trouvé"));
        return consommationCarburantTerrestreMapper.toCompteurCarburantTerrestreDTO(compteurCarburantTerrestre);
    }

    public List<CompteurCarburantTerrestreDTO> getAllCompteurCarburantTerrestreWithConsommations() {
        List<CompteurCarburantTerrestre> compteurCarburantTerrestreList = compteurCarburantTerrestreRepository.findAllWithConsommations();
        return compteurCarburantTerrestreList.stream()
                .map(consommationCarburantTerrestreMapper::toCompteurCarburantTerrestreDTO)
                .collect(Collectors.toList());
    }

}
