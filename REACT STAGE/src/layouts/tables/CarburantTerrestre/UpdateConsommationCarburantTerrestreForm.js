import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Grid, Card } from "@mui/material";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import CoverLayout from "layouts/authentication/components/CoverLayout";
import videoBg from "assets/images/terrestre.mp4";
import swal from "sweetalert";

function UpdateConsommationCarburantTerrestreForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quantite_carburant_terrestre, setQuantiteCarburantTerrestre] = useState(0);
  const [tarif_carburant_terrestre, setTarifCarburantTerrestre] = useState(0);
  const [type_carburant, setTypeCarburant] = useState("");
  const [date_carburant_terrestre, setDateCarburantTerrestre] = useState("");

  useEffect(() => {
    // Récupérer les données de la consommation à modifier
    fetch(`http://localhost:8082/user/api/consommation-carburant-terrestre/${id}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("Données de la consommation récupérées:", data);
        setQuantiteCarburantTerrestre(data.quantite_carburant_terrestre);
        setTarifCarburantTerrestre(data.tarif_carburant_terrestre);
        setTypeCarburant(data.type_carburant);
        setDateCarburantTerrestre(
          new Date(data.date_carburant_terrestre).toISOString().split("T")[0]
        );
      })
      .catch((error) => console.error("Erreur lors de la récupération des données:", error));
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !quantite_carburant_terrestre ||
      !tarif_carburant_terrestre ||
      !type_carburant ||
      !date_carburant_terrestre
    ) {
      swal("Erreur", "Veuillez remplir tous les champs", "error");
      return;
    }

    const updatedData = {
      quantite_carburant_terrestre: parseFloat(quantite_carburant_terrestre),
      tarif_carburant_terrestre: parseFloat(tarif_carburant_terrestre),
      type_carburant: type_carburant.trim(),
      date_carburant_terrestre: new Date(date_carburant_terrestre).toISOString(),
    };

    fetch(
      `http://localhost:8082/user/api/consommation-carburant-terrestre/updateConsommationCarburantTerrestre/${id}`,
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
          swal("Succès !", "La consommation a été mise à jour.", "success").then(() => {
            navigate("/tables-carburant-terrestre"); // Rediriger vers la liste des consommations
          });
        } else {
          swal("Erreur !", "La mise à jour a échoué.", "error");
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
            Modifier la consommation de carburant terrestre
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form" onSubmit={handleSubmit}>
            <MDBox mb={2}>
              <MDInput
                type="number"
                label="Quantité (L)"
                variant="standard"
                fullWidth
                value={quantite_carburant_terrestre}
                onChange={(e) => setQuantiteCarburantTerrestre(e.target.value)}
                required
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="number"
                label="Tarif (€)"
                variant="standard"
                fullWidth
                value={tarif_carburant_terrestre}
                onChange={(e) => setTarifCarburantTerrestre(e.target.value)}
                required
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="text"
                label="Type de carburant"
                variant="standard"
                fullWidth
                value={type_carburant}
                onChange={(e) => setTypeCarburant(e.target.value)}
                required
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="date"
                label="Date"
                variant="standard"
                fullWidth
                value={date_carburant_terrestre}
                onChange={(e) => setDateCarburantTerrestre(e.target.value)}
                required
              />
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

export default UpdateConsommationCarburantTerrestreForm;
