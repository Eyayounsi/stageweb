package com.example.loginInscription.Repo;

import com.example.loginInscription.entities.Electricite.ConsommationElectricite;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ConsommationElectriciteRepo extends JpaRepository<ConsommationElectricite ,Long >{
}
