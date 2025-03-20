package com.example.loginInscription.Repo;

import com.example.loginInscription.entities.Terrestre.CompteurCarburantTerrestre;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CompteurCarburantTerrestreRepository extends JpaRepository<CompteurCarburantTerrestre, Integer> {
    @Query("SELECT c FROM CompteurCarburantTerrestre c LEFT JOIN FETCH c.consommationsCarburantTerrestre WHERE c.num_compteur_terrestre = :id")
    Optional<CompteurCarburantTerrestre> findByIdWithConsommations(@Param("id") int id);

    @Query("SELECT c FROM CompteurCarburantTerrestre c LEFT JOIN FETCH c.consommationsCarburantTerrestre")
    List<CompteurCarburantTerrestre> findAllWithConsommations();
}