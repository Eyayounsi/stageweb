package com.example.loginInscription.Repo;

import com.example.loginInscription.entities.Port;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PortRepository extends JpaRepository<Port,Integer> {
}
