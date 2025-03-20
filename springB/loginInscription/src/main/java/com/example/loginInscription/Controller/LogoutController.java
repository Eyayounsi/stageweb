package com.example.loginInscription.Controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@RestController
@RequestMapping("/user/auth")
public class LogoutController {

    @RestController
    @RequestMapping("/user/auth")
    public class AuthController {

        @PostMapping("/logout")
        public ResponseEntity<String> logout(HttpServletRequest request, HttpServletResponse response) {
            Authentication auth = SecurityContextHolder.getContext().getAuthentication();
            System.out.println("Authentification actuelle : " + auth);

            if (auth != null) {
                new SecurityContextLogoutHandler().logout(request, response, auth);
                System.out.println("Utilisateur déconnecté : " + auth.getName());
            } else {
                System.out.println("Aucun utilisateur authentifié.");
            }

            return ResponseEntity.ok("Déconnexion réussie");
        }
    }
}