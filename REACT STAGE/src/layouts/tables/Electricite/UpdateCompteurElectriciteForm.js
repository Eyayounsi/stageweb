import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Grid, Card, MenuItem, Select, FormControl, InputLabel } from "@mui/material";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import CoverLayout from "layouts/authentication/components/CoverLayout";
import videoBg from "assets/images/electricite.mp4";

import swal from "sweetalert";

function UpdateCompteurElectriciteForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [emplacementElectricite, setEmplacementElectricite] = useState("");
  const [ordreElectricite, setOrdreElectricite] = useState(0);
  const [portId, setPortId] = useState(0);

  // Liste statique des ports
  const ports = [
    { id: 1, nom: "Tunis Goulette" },
    { id: 2, nom: "Bizerte" },
    { id: 3, nom: "Sousse" },
    { id: 4, nom: "Sfax" },
    { id: 5, nom: "Gabes" },
    { id: 6, nom: "Rades" },
    { id: 7, nom: "Zarzis" },
  ];

  useEffect(() => {
    // Récupérer les données du compteur à modifier
    fetch(`http://localhost:8082/user/api/consommation-electricite/${id}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("Données du compteur récupérées:", data);
        setEmplacementElectricite(data.emplacement_electricite);
        setOrdreElectricite(data.ordre_electricite);
        setPortId(data.portId);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des données:", error);
        swal("Erreur", "Impossible de charger les données du compteur", "error");
      });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!emplacementElectricite || !ordreElectricite || !portId) {
      swal("Erreur", "Veuillez remplir tous les champs", "error");
      return;
    }

    const updatedData = {
      emplacement_electricite: emplacementElectricite,
      ordre_electricite: parseInt(ordreElectricite),
      portId: parseInt(portId),
    };

    fetch(
      `http://localhost:8082/user/api/consommation-electricite/updateCompteurElectricite/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      }
    )
      .then((response) => {
        if (response.ok) {
          swal("Succès !", "Le compteur a été mis à jour.", "success").then(() => {
            navigate("/tables-electricite"); // Rediriger vers la liste des compteurs d'électricité
          });
        } else {
          response.json().then((data) => {
            swal("Erreur !", data.message || "La mise à jour a échoué.", "error");
          });
        }
      })
      .catch((error) => {
        console.error("Erreur lors de la mise à jour :", error);
        swal("Erreur !", "La mise à jour a échoué.", "error");
      });
  };

  return (
    <CoverLayout>
      {/* Video Background */}
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
            Modifier le compteur électrique
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form" onSubmit={handleSubmit}>
            <MDBox mb={2}>
              <MDInput
                type="text"
                label="Emplacement"
                variant="standard"
                fullWidth
                value={emplacementElectricite}
                onChange={(e) => setEmplacementElectricite(e.target.value)}
                required
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="number"
                label="Ordre"
                variant="standard"
                fullWidth
                value={ordreElectricite}
                onChange={(e) => setOrdreElectricite(e.target.value)}
                required
              />
            </MDBox>
            <MDBox mb={2}>
              <FormControl fullWidth variant="standard">
                <InputLabel id="port-label">Port</InputLabel>
                <Select
                  labelId="port-label"
                  value={portId}
                  onChange={(e) => setPortId(e.target.value)}
                  required
                >
                  {ports.map((port) => (
                    <MenuItem key={port.id} value={port.id}>
                      {port.nom} (ID: {port.id})
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton variant="gradient" color="info" fullWidth type="submit">
                Enregistrer
              </MDButton>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </CoverLayout>
  );
}

export default UpdateCompteurElectriciteForm;
