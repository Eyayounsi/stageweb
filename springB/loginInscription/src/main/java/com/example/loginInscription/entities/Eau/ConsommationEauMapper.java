package com.example.loginInscription.entities.Eau;


import com.example.loginInscription.entities.Eau.CompteurEauDTO;
import com.example.loginInscription.entities.Eau.ConsommationEauDTO;
import com.example.loginInscription.entities.Eau.CompteurEau;
import com.example.loginInscription.entities.Eau.ConsommationEau;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class ConsommationEauMapper {

    public CompteurEauDTO toCompteurEauDTO(CompteurEau compteurEau) {
        CompteurEauDTO dto = new CompteurEauDTO();
        dto.setNum_compteur_eau(compteurEau.getNum_compteur_eau());
        dto.setEmplacement_eau(compteurEau.getEmplacement_eau());
        dto.setOrdre_eau(compteurEau.getOrdre_eau());
        dto.setPortId(compteurEau.getPort().getId());

        // Mapper les consommations associées
        if (compteurEau.getConsommationsEau() != null) {
            List<ConsommationEauDTO> consommationEauDTOs = compteurEau.getConsommationsEau().stream()
                    .map(this::toConsommationEauDTO)
                    .collect(Collectors.toList());
            dto.setConsommationsEau(consommationEauDTOs);
        }

        return dto;
    }

    public ConsommationEauDTO toConsommationEauDTO(ConsommationEau consommationEau) {
        ConsommationEauDTO dto = new ConsommationEauDTO();
        dto.setId_eau(consommationEau.getId_eau());
        dto.setQuantite_eau(consommationEau.getQuantite_eau());
        dto.setTarif_eau(consommationEau.getTarif_eau());
        dto.setDate_eau(consommationEau.getDate_eau());
        dto.setUserId(consommationEau.getUtilisateur().getUser_id());
        dto.setCompteurEauId(consommationEau.getCompteurEau().getNum_compteur_eau());

        // Ajouter les informations de l'utilisateur et du port
        dto.setNom(consommationEau.getUtilisateur().getNom());
        dto.setPrenom(consommationEau.getUtilisateur().getPrenom());
        dto.setPortId(consommationEau.getCompteurEau().getPort().getId());

        return dto;
    }
}