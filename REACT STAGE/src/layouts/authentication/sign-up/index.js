import React, { useState } from "react";
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import CoverLayout from "layouts/authentication/components/CoverLayout";
import videoBg from "assets/images/bgg.mp4"; // Import your video file

import { useNavigate } from "react-router-dom";

function Cover() {
  const navigate = useNavigate(); // Initialise useNavigate

  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    role: "USER",
    nom_port: "", // Utilisez nom_port au lieu de port_id
    mail: "",
    mot_de_passe: "",
  });

  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8082/user/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        setMessage("Utilisateur créé avec succès !");
        setIsError(false);

        // Rediriger vers la page de connexion après 2 secondes
        setTimeout(() => {
          navigate("/authentication/sign-in"); // Utilisez navigate pour rediriger
        }, 2000);
      } else {
        const errorText = await response.text(); // Lire la réponse en texte brut
        setMessage(`Erreur lors de l'inscription: ${errorText}`);
        setIsError(true);
      }
    } catch (error) {
      console.error("Erreur lors de l'envoi des données:", error);
      setMessage("Une erreur s'est produite lors de l'inscription.");
      setIsError(true);
    }
  };

  return (
    <CoverLayout>
      {/* Conteneur pour la vidéo de fond */}
      <video
        autoPlay
        loop
        muted
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "40%",
          objectFit: "cover",
          zIndex: -1,
        }}
      >
        <source src={videoBg} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="success"
          mx={2}
          mt={-3}
          p={3}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Join us today
          </MDTypography>
          <MDTypography display="block" variant="button" color="white" my={1}>
            Enter your details to register
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form" onSubmit={handleSubmit}>
            <MDBox mb={2}>
              <MDInput
                type="text"
                label="Nom"
                variant="standard"
                fullWidth
                name="nom"
                value={formData.nom}
                onChange={handleChange}
                required
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="text"
                label="Prénom"
                variant="standard"
                fullWidth
                name="prenom"
                value={formData.prenom}
                onChange={handleChange}
                required
              />
            </MDBox>

            {/* Menu déroulant pour le rôle */}
            <MDBox mb={2}>
              <FormControl fullWidth variant="standard">
                <InputLabel id="role-label">Rôle</InputLabel>
                <Select
                  labelId="role-label"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  required
                >
                  <MenuItem value="USER">User</MenuItem>
                  <MenuItem value="ADMIN">Admin</MenuItem>
                  <MenuItem value="CHEF_DE_SERVICE">Chef de Service</MenuItem>
                  <MenuItem value="GESTIONNAIRE">Gestionnaire</MenuItem>
                </Select>
              </FormControl>
            </MDBox>

            {/* Menu déroulant pour le port */}
            <MDBox mb={2}>
              <FormControl fullWidth variant="standard">
                <InputLabel id="port-label">Nom du port</InputLabel>
                <Select
                  labelId="port-label"
                  name="nom_port"
                  value={formData.nom_port}
                  onChange={handleChange}
                  required
                >
                  <MenuItem value="Tunis Goulette">Tunis Goulette</MenuItem>
                  <MenuItem value="Bizerte">Bizerte</MenuItem>
                  <MenuItem value="Sousse">Sousse</MenuItem>
                  <MenuItem value="Sfax">Sfax</MenuItem>
                  <MenuItem value="Gabes">Gabes</MenuItem>
                  <MenuItem value="Rades">Rades</MenuItem>
                  <MenuItem value="Zarzis">Zarzis</MenuItem>
                </Select>
              </FormControl>
            </MDBox>

            <MDBox mb={2}>
              <MDInput
                type="email"
                label="Email"
                variant="standard"
                fullWidth
                name="mail"
                value={formData.mail}
                onChange={handleChange}
                required
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="password"
                label="Mot de passe"
                variant="standard"
                fullWidth
                name="mot_de_passe"
                value={formData.mot_de_passe}
                onChange={handleChange}
                required
              />
            </MDBox>
            <MDBox display="flex" alignItems="center" ml={-1}>
              <Checkbox required />
              <MDTypography
                variant="button"
                fontWeight="regular"
                color="text"
                sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
              >
                &nbsp;&nbsp;I agree the&nbsp;
              </MDTypography>
              <MDTypography
                component="a"
                href="#"
                variant="button"
                fontWeight="bold"
                color="info"
                textGradient
              >
                Terms and Conditions
              </MDTypography>
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton variant="gradient" color="info" fullWidth type="submit">
                Sign Up
              </MDButton>
            </MDBox>
            {/* Affichage du message */}
            {message && (
              <MDTypography
                variant="h6"
                color={isError ? "error" : "success"}
                textAlign="center"
                mt={2}
              >
                {message}
              </MDTypography>
            )}
            <MDBox mt={3} mb={1} textAlign="center">
              <MDTypography variant="button" color="text">
                Already have an account?{" "}
                <MDTypography
                  component={Link}
                  to="/authentication/sign-in"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                >
                  Sign In
                </MDTypography>
              </MDTypography>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </CoverLayout>
  );
}

export default Cover;
