package com.example.loginInscription.Repo;

import com.example.loginInscription.entities.Flottante.CompteurCarburantFlottante;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CompteurCarburantFlottanteRepository extends JpaRepository<CompteurCarburantFlottante, Integer> {
    @Query("SELECT c FROM CompteurCarburantFlottante c LEFT JOIN FETCH c.consommationsCarburantFlottante WHERE c.num_compteur_flottant = :id")
    Optional<CompteurCarburantFlottante> findByIdWithConsommations(@Param("id") int id);

    @Query("SELECT c FROM CompteurCarburantFlottante c LEFT JOIN FETCH c.consommationsCarburantFlottante")
    List<CompteurCarburantFlottante> findAllWithConsommations();
}