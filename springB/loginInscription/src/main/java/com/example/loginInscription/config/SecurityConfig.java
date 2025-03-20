package com.example.loginInscription.config;

import jakarta.servlet.http.HttpServletResponse;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;
import java.util.List;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf().disable() // Désactiver CSRF
                .cors().configurationSource(corsConfigurationSource()) // Activer CORS
                .and()
                .authorizeRequests()
                .requestMatchers("/**").permitAll() // Autoriser toutes les requêtes sans authentification
                .anyRequest().permitAll() // Autoriser toutes les autres requêtes
                .and()
                .sessionManagement() // Activer la gestion des sessions
                .sessionCreationPolicy(SessionCreationPolicy.IF_REQUIRED) // Créer une session si nécessaire
                .and()
                .logout() // Activer la déconnexion personnalisée
                .logoutUrl("/user/auth/logout") // URL de déconnexion
                .logoutSuccessHandler((request, response, authentication) -> {
                    response.setStatus(HttpServletResponse.SC_OK);
                    response.getWriter().write("Déconnexion réussie");
                })
                .invalidateHttpSession(true) // Invalider la session
                .deleteCookies("JSESSIONID") // Supprimer le cookie de session
                .and()
                .exceptionHandling()
                .authenticationEntryPoint((request, response, authException) -> {
                    response.setStatus(401);
                    response.getWriter().write("Accès non autorisé");
                })
                .accessDeniedHandler((request, response, accessDeniedException) -> {
                    response.setStatus(403);
                    response.getWriter().write("Accès refusé");
                });

        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(List.of("http://localhost:3000")); // Autoriser le frontend
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS")); // Autoriser les méthodes
        configuration.setAllowedHeaders(Arrays.asList("*")); // Autoriser tous les en-têtes
        configuration.setExposedHeaders(Arrays.asList("Authorization", "Content-Disposition")); // En-têtes exposés
        configuration.setAllowCredentials(true); // Autoriser les credentials (cookies, jetons)

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration); // Appliquer à tous les endpoints
        return source;
    }
}