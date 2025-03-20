package com.example.loginInscription.Repo;

import com.example.loginInscription.entities.Flottante.ConsommationCarburantFlottante;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ConsommationCarburantFlottanteRepo extends JpaRepository<ConsommationCarburantFlottante, Long> {
}
