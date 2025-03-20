package com.example.loginInscription.Repo;

import com.example.loginInscription.entities.Terrestre.ConsommationCarburantTerrestre;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ConsommationCarburantTerrestreRepo extends JpaRepository<ConsommationCarburantTerrestre , Long> {
}
