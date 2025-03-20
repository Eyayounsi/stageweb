package com.example.loginInscription.entities.Electricite;


import org.springframework.stereotype.Component;

import java.util.stream.Collectors;

@Component
public class ConsommationElectriciteMapper {

    public CompteurElectriciteDTO toCompteurElectriciteDTO(CompteurElectricite compteurElectricite) {
        CompteurElectriciteDTO dto = new CompteurElectriciteDTO();
        dto.setNum_compteur_electricite(compteurElectricite.getNum_compteur_electricite());
        dto.setEmplacement_electricite(compteurElectricite.getEmplacement_electricite());
        dto.setOrdre_electricite(compteurElectricite.getOrdre_electricite());
        dto.setPortId(compteurElectricite.getPort().getId());

        if (compteurElectricite.getConsommationsElectricite() != null) {
            dto.setConsommationsElectricite(
                    compteurElectricite.getConsommationsElectricite().stream()
                            .map(this::toConsommationElectriciteDTO)
                            .collect(Collectors.toList())
            );
        }

        return dto;
    }

    public ConsommationElectriciteDTO toConsommationElectriciteDTO(ConsommationElectricite consommationElectricite) {
        ConsommationElectriciteDTO dto = new ConsommationElectriciteDTO();
        dto.setId_electricite(consommationElectricite.getId_electricite());
        dto.setQuantite_electricite(consommationElectricite.getQuantite_electricite());
        dto.setTarif_electricite(consommationElectricite.getTarif_electricite());
        dto.setDate_electricite(consommationElectricite.getDate_electricite());
        dto.setUserId(consommationElectricite.getUtilisateur().getUser_id());
        dto.setCompteurElectriciteId(consommationElectricite.getCompteurElectricite().getNum_compteur_electricite());

        // Ajouter les informations de l'utilisateur et du port
        dto.setNom(consommationElectricite.getUtilisateur().getNom());
        dto.setPrenom(consommationElectricite.getUtilisateur().getPrenom());
        dto.setPortId(consommationElectricite.getCompteurElectricite().getPort().getId());

        return dto;
    }
}