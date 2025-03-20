package com.example.loginInscription.config;


import org.springframework.stereotype.Component;

import java.util.HashSet;
import java.util.Set;

@Component//deux class qui sont en contact on utlise cette biblio
public class TokenBlacklist {
    private Set<String> blacklistedTokens = new HashSet<>();// list des token a jeter

    public void addToBlacklist(String token) {
        blacklistedTokens.add(token);//ajout au blacklist
    }

    public boolean isBlacklisted(String token) {
        return blacklistedTokens.contains(token); //verification
    }
}