package com.example.loginInscription.Repo;

import com.example.loginInscription.entities.Eau.CompteurEau;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CompteurEauRepository extends JpaRepository<CompteurEau, Integer> {
    @Query("SELECT c FROM CompteurEau c LEFT JOIN FETCH c.consommationsEau ce LEFT JOIN FETCH ce.utilisateur WHERE c.num_compteur_eau = :id")
    Optional<CompteurEau> findByIdWithConsommations(@Param("id") int id);

    @Query("SELECT c FROM CompteurEau c LEFT JOIN FETCH c.consommationsEau ce LEFT JOIN FETCH ce.utilisateur")
    List<CompteurEau> findAllWithConsommations();
}

