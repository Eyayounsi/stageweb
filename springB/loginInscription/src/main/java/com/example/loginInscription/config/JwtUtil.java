package com.example.loginInscription.config;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Component
public class JwtUtil {
//
    private static final Key SECRET_KEY = Keys.secretKeyFor(SignatureAlgorithm.HS256); // Clé secrète pour signer le token
    private static final long EXPIRATION_TIME = 86400000; // 24 heures en millisecondes

    // Générer un token JWT
    public String generateToken(UserDetails userDetails) {
        Map<String, Object> claims = new HashMap<>();
        return createToken(claims, userDetails.getUsername());
    }

    // Créer un token JWT
    private String createToken(Map<String, Object> claims, String subject) {
        return Jwts.builder() // cree un nouveau token
                .setClaims(claims)//des donnees supplimentaires pour plus de securité
                .setSubject(subject) //le subject de token(user)
                .setIssuedAt(new Date(System.currentTimeMillis()))//date de creation token
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME)) // date  denfin token (24h de nos cas )
                .signWith(SECRET_KEY) //chiffrer les donnee (token )
                .compact();// Compacte le token en une chaîne de caractères URL-safe.
                // Cette chaîne est le token JWT final qui peut être envoyé au client.
    }

    // Extraire le nom d'utilisateur du token
    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    // Extraire la date d'expiration du token
    public Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    // Extraire une information spécifique du token
    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    // Extraire toutes les informations du token
    private Claims extractAllClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(SECRET_KEY)
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    // Vérifier si le token est expiré
    private Boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    // Valider le token
    public Boolean validateToken(String token, UserDetails userDetails) {
        final String username = extractUsername(token);
        return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
    }
}