package com.example.loginInscription.Repo;


import com.example.loginInscription.entities.Eau.ConsommationEau;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ConsommationEauRepo extends JpaRepository<ConsommationEau, Long> {

}
