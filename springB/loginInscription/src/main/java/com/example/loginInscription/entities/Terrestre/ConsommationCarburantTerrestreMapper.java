package com.example.loginInscription.entities.Terrestre;

import com.example.loginInscription.entities.Port;
import com.example.loginInscription.entities.Utilisateur;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class ConsommationCarburantTerrestreMapper {

    public CompteurCarburantTerrestreDTO toCompteurCarburantTerrestreDTO(CompteurCarburantTerrestre compteurCarburantTerrestre) {
        CompteurCarburantTerrestreDTO dto = new CompteurCarburantTerrestreDTO();
        dto.setNum_compteur_terrestre(compteurCarburantTerrestre.getNum_compteur_terrestre());
        dto.setEmplacement_terrestre(compteurCarburantTerrestre.getEmplacement_terrestre());
        dto.setOrdre_terrestre(compteurCarburantTerrestre.getOrdre_terrestre());
        dto.setPortId(compteurCarburantTerrestre.getPort().getId());

        if (compteurCarburantTerrestre.getConsommationsCarburantTerrestre() != null) {
            List<ConsommationCarburantTerrestreDTO> consommationDTOs = compteurCarburantTerrestre.getConsommationsCarburantTerrestre().stream()
                    .map(this::toConsommationCarburantTerrestreDTO)
                    .collect(Collectors.toList());
            dto.setConsommationsCarburantTerrestre(consommationDTOs);
        }

        return dto;
    }

    public ConsommationCarburantTerrestreDTO toConsommationCarburantTerrestreDTO(ConsommationCarburantTerrestre consommationCarburantTerrestre) {
        ConsommationCarburantTerrestreDTO dto = new ConsommationCarburantTerrestreDTO();
        dto.setId_carburant_terrestre(consommationCarburantTerrestre.getId_carburant_terrestre());
        dto.setQuantite_carburant_terrestre(consommationCarburantTerrestre.getQuantite_carburant_terrestre());
        dto.setTarif_carburant_terrestre(consommationCarburantTerrestre.getTarif_carburant_terrestre());
        dto.setType_carburant(consommationCarburantTerrestre.getType_carburant());
        dto.setDate_carburant_terrestre(consommationCarburantTerrestre.getDate_carburant_terrestre());
        dto.setUserId(consommationCarburantTerrestre.getUtilisateur().getUser_id());
        dto.setCompteurCarburantTerrestreId(consommationCarburantTerrestre.getCompteurCarburantTerrestre().getNum_compteur_terrestre());

        // Ajouter les informations de l'utilisateur et du port
        dto.setNom(consommationCarburantTerrestre.getUtilisateur().getNom());
        dto.setPrenom(consommationCarburantTerrestre.getUtilisateur().getPrenom());
        dto.setPortId(consommationCarburantTerrestre.getCompteurCarburantTerrestre().getPort().getId());

        return dto;
    }
}