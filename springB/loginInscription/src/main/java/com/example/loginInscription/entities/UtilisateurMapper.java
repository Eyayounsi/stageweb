package com.example.loginInscription.entities;


import com.example.loginInscription.entities.PortDTO;
import com.example.loginInscription.entities.UtilisateurDTO;

public class UtilisateurMapper {
    public static UtilisateurDTO toDTO(Utilisateur utilisateur) {
        UtilisateurDTO dto = new UtilisateurDTO();
        dto.setUser_id(utilisateur.getUser_id());
        dto.setNom(utilisateur.getNom());
        dto.setPrenom(utilisateur.getPrenom());
        dto.setRole(utilisateur.getRole());
        dto.setNom_port(utilisateur.getNom_port());
        dto.setPort_id(utilisateur.getPort_id());
        dto.setMail(utilisateur.getMail());

        // Mapper Port en PortDTO
        if (utilisateur.getPort() != null) {
            PortDTO portDTO = new PortDTO();
            portDTO.setId(utilisateur.getPort().getId());
            portDTO.setLibelle(utilisateur.getPort().getLibelle());
            dto.setPort(portDTO);
        }

        return dto;
    }
}