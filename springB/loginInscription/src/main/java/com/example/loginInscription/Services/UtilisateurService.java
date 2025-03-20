package com.example.loginInscription.Services;

import com.example.loginInscription.Repo.ConsommationEauRepo;
import com.example.loginInscription.Repo.ConsommationElectriciteRepo;
import com.example.loginInscription.Repo.UtilisateurRepository;
import com.example.loginInscription.config.JwtUtil;
import com.example.loginInscription.config.TokenBlacklist;
import com.example.loginInscription.entities.Utilisateur;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UtilisateurService implements UserDetailsService {
  //appel a l'interface donc appel au repo

    private final UtilisateurRepository utilisateurRepository;
    private final JwtUtil jwtUtil;
    private final TokenBlacklist tokenBlacklist;
    private final ConsommationEauRepo consommationEauRepo;
    private final PasswordEncoder passwordEncoder;

 @Autowired
 private ConsommationElectriciteRepo consommationElectriciterepo;

    /* public ConsommationEau saveConsommationEau(ConsommationEau consommationEau) {
         // Ensure the Utilisateur is already saved in the database
         if (consommationEau.getUtilisateur().getUser_id() == null) {
             throw new RuntimeException("Utilisateur non trouvé");
         }

         // Save the ConsommationEau
         return consommationEauRepo.save(consommationEau);
     }
*/

    @Autowired
    public UtilisateurService(UtilisateurRepository utilisateurRepository, JwtUtil jwtUtil, TokenBlacklist tokenBlacklist, ConsommationEauRepo consommationEauRepo, PasswordEncoder passwordEncoder) {
        this.utilisateurRepository = utilisateurRepository;
        this.jwtUtil = jwtUtil;
        this.tokenBlacklist = tokenBlacklist;
        this.consommationEauRepo = consommationEauRepo;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public UserDetails loadUserByUsername(String mail) throws UsernameNotFoundException {
        List<Utilisateur> utilisateurs = utilisateurRepository.findByMail(mail);
        if (utilisateurs.isEmpty()) {
            throw new UsernameNotFoundException("Utilisateur non trouvé avec l'e-mail : " + mail);
        }
        Utilisateur utilisateur = utilisateurs.get(0);
        return new org.springframework.security.core.userdetails.User(
                utilisateur.getMail(),
                utilisateur.getMot_de_passe(),
                utilisateur.getAuthorities()
        );
    }

    private Long getPortIdByNomPort(String nomPort) {
        switch (nomPort) {
            case "Tunis Goulette":
                return 1L;
            case "Bizerte":
                return 2L;
            case "Sousse":
                return 3L;
            case "Sfax":
                return 4L;
            case "Gabes":
                return 5L;
            case "Rades":
                return 6L;
            case "Zarzis":
                return 7L;
            default:
                throw new IllegalArgumentException("Nom de port non valide : " + nomPort);
        }
    }

    public Utilisateur signup(Utilisateur utilisateur) {
        // Vérifier si l'email existe déjà
        if (!utilisateurRepository.findByMail(utilisateur.getMail()).isEmpty()) {
            throw new RuntimeException("Un utilisateur avec cet email existe déjà");
        }

        // Mapper le nom du port à l'ID du port
        Long portId = getPortIdByNomPort(utilisateur.getNom_port());
        utilisateur.setPort_id(portId); // Assurez-vous que l'entité Utilisateur a un attribut port_id

        // Encoder le mot de passe
        utilisateur.setMot_de_passe(passwordEncoder.encode(utilisateur.getMot_de_passe()));

        // Sauvegarder l'utilisateur dans la base de données
        return utilisateurRepository.save(utilisateur);
    }

    public Utilisateur login(String mail, String mot_de_passe) {
        // Rechercher l'utilisateur par email
        List<Utilisateur> utilisateurs = utilisateurRepository.findByMail(mail);

        if (utilisateurs.isEmpty()) {
            throw new RuntimeException("Utilisateur non trouvé");
        }

        Utilisateur utilisateur = utilisateurs.get(0);

        // Vérifier si le mot de passe correspond
        if (passwordEncoder.matches(mot_de_passe, utilisateur.getMot_de_passe())) {
            return utilisateur; // Retourner l'utilisateur si la connexion réussit
        } else {
            throw new RuntimeException("Mot de passe incorrect");
        }
    }



    public void logout(String token) {
        tokenBlacklist.addToBlacklist(token);
    }


    public Utilisateur updateUtilisateur(Long id, Utilisateur updatedUtilisateur) {
        // Vérifie si l'utilisateur existe dans la base de données
        Utilisateur utilisateur = utilisateurRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé"));

        // Met à jour les attributs de l'utilisateur
        utilisateur.setNom(updatedUtilisateur.getNom());
        utilisateur.setPrenom(updatedUtilisateur.getPrenom());
        utilisateur.setRole(updatedUtilisateur.getRole());
        utilisateur.setNom_port(updatedUtilisateur.getNom_port());
        utilisateur.setMail(updatedUtilisateur.getMail());

        // Mettre à jour le mot de passe uniquement s'il est fourni
        if (updatedUtilisateur.getMot_de_passe() != null && !updatedUtilisateur.getMot_de_passe().isEmpty()) {
            utilisateur.setMot_de_passe(passwordEncoder.encode(updatedUtilisateur.getMot_de_passe()));
        }

        // Mapper le nom du port à l'ID du port
        Long portId = getPortIdByNomPort(updatedUtilisateur.getNom_port());
        utilisateur.setPort_id(portId);

        // Sauvegarde les modifications dans la base de données
        return utilisateurRepository.save(utilisateur);
    }
  /*  public void deleteUtilisateur(Long id) {
        // Vérifie si l'utilisateur existe dans la base de données
        Utilisateur utilisateur = utilisateurRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé"));

        // Supprime l'utilisateur de la base de données
        utilisateurRepository.delete(utilisateur);
    }
*/
  public void deleteUtilisateur(Long id) {
      // Vérifie si l'utilisateur existe dans la base de données
      Utilisateur utilisateur = utilisateurRepository.findById(id)
              .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé"));

      // Supprime les entités liées
      consommationEauRepo.deleteAll(utilisateur.getConsommationsEau());
      consommationElectriciterepo.deleteAll(utilisateur.getConsommationsElectricite());
      // Ajoutez d'autres suppressions pour les autres entités liées

      // Supprime l'utilisateur de la base de données
      utilisateurRepository.delete(utilisateur);
  }



}