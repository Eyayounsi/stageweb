import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

function Logout() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true); // État pour gérer le chargement
  const [error, setError] = useState(null); // État pour gérer les erreurs

  useEffect(() => {
    const logout = async () => {
      try {
        const token = localStorage.getItem("token"); // Récupérer le token du stockage local
        const response = await fetch("http://localhost:8082/user/auth/logout", {
          method: "POST",
          credentials: "include", // Inclure les cookies pour la session
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Inclure le token dans l'en-tête
          },
        });

        if (response.ok) {
          console.log("Déconnexion réussie");
          localStorage.removeItem("token"); // Supprimer le token du stockage local
          localStorage.removeItem("user"); // Supprimer les informations de l'utilisateur
          localStorage.removeItem("userId"); // Supprimer l'ID de l'utilisateur
          setLoading(false); // Arrêter le chargement
          navigate("/authentication/sign-in"); // Rediriger vers la page de connexion
        } else {
          const errorText = await response.text();
          console.error("Échec de la déconnexion :", errorText);
          setError("Échec de la déconnexion. Veuillez réessayer."); // Définir le message d'erreur
          setLoading(false); // Arrêter le chargement en cas d'erreur
        }
      } catch (error) {
        console.error("Erreur lors de la déconnexion :", error);
        setError("Une erreur s'est produite lors de la déconnexion."); // Définir le message d'erreur
        setLoading(false); // Arrêter le chargement en cas d'erreur
      }
    };

    logout();
  }, [navigate]);

  return (
    <MDBox
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      flexDirection="column"
    >
      {loading ? (
        <MDTypography variant="h6" color="text">
          Déconnexion en cours...
        </MDTypography>
      ) : error ? (
        <>
          <MDTypography variant="h6" color="error">
            {error}
          </MDTypography>
          <MDButton
            variant="gradient"
            color="info"
            onClick={() => navigate("/authentication/sign-in")}
            style={{ marginTop: "10px" }}
          >
            Retour à la page de connexion
          </MDButton>
        </>
      ) : (
        <MDTypography variant="h6" color="text">
          Vous avez été déconnecté avec succès.
        </MDTypography>
      )}
    </MDBox>
  );
}

export default Logout;
