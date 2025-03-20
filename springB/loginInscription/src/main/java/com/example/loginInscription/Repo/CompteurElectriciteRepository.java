package com.example.loginInscription.Repo;


import com.example.loginInscription.entities.Electricite.CompteurElectricite;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CompteurElectriciteRepository extends JpaRepository<CompteurElectricite, Integer> {

    // Récupérer un compteur électrique avec ses consommations associées par son ID
    @Query("SELECT c FROM CompteurElectricite c LEFT JOIN FETCH c.consommationsElectricite WHERE c.num_compteur_electricite = :id")
    Optional<CompteurElectricite> findByIdWithConsommations(@Param("id") int id);

    // Récupérer tous les compteurs électriques avec leurs consommations associées
    @Query("SELECT c FROM CompteurElectricite c LEFT JOIN FETCH c.consommationsElectricite")
    List<CompteurElectricite> findAllWithConsommations();
}