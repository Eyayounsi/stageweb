package com.example.loginInscription;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EnableJpaRepositories(basePackages = "com.example.loginInscription.Repo")
@EntityScan(basePackages = "com.example.loginInscription.entities")
public class LoginInscriptionApplication {

	public static void main(String[] args) {
		SpringApplication.run(LoginInscriptionApplication.class, args);
	}

}