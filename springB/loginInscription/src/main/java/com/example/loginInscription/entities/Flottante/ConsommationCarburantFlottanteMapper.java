package com.example.loginInscription.entities.Flottante;

import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class ConsommationCarburantFlottanteMapper {

    public CompteurCarburantFlottanteDTO toCompteurCarburantFlottanteDTO(CompteurCarburantFlottante compteur) {
        CompteurCarburantFlottanteDTO dto = new CompteurCarburantFlottanteDTO();
        dto.setNum_compteur_flottant(compteur.getNum_compteur_flottant());
        dto.setEmplacement_flottant(compteur.getEmplacement_flottant());
        dto.setOrdre_flottant(compteur.getOrdre_flottant());
        dto.setPortId(compteur.getPort().getId());

        if (compteur.getConsommationsCarburantFlottante() != null) {
            List<ConsommationCarburantFlottanteDTO> consommationDTOs = compteur.getConsommationsCarburantFlottante().stream()
                    .map(this::toConsommationCarburantFlottanteDTO)
                    .collect(Collectors.toList());
            dto.setConsommationsCarburantFlottante(consommationDTOs);
        }

        return dto;
    }

    public ConsommationCarburantFlottanteDTO toConsommationCarburantFlottanteDTO(ConsommationCarburantFlottante consommation) {
        ConsommationCarburantFlottanteDTO dto = new ConsommationCarburantFlottanteDTO();
        dto.setId_carburant_flottant(consommation.getId_carburant_flottant());
        dto.setQuantite_carburant_flottant(consommation.getQuantite_carburant_flottant());
        dto.setTarif_carburant_flottant(consommation.getTarif_carburant_flottant());
        dto.setDate_carburant_flottant(consommation.getDate_carburant_flottant());
        dto.setType_flottant(consommation.getTypeFlottant());
        dto.setUserId(consommation.getUtilisateur().getUser_id());
        dto.setCompteurCarburantFlottanteId(consommation.getCompteurCarburantFlottante().getNum_compteur_flottant());
        dto.setNom(consommation.getUtilisateur().getNom());
        dto.setPrenom(consommation.getUtilisateur().getPrenom());
        dto.setPortId(consommation.getCompteurCarburantFlottante().getPort().getId());

        return dto;
    }
}