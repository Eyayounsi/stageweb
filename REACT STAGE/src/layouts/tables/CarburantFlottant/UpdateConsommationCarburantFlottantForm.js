import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Grid, Card, MenuItem, Select, FormControl, InputLabel } from "@mui/material";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import CoverLayout from "layouts/authentication/components/CoverLayout";
import videoBg from "assets/images/flottante.mp4";
import swal from "sweetalert";

function UpdateConsommationCarburantFlottantForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quantite_carburant_flottant, setQuantite_carburant_flottant] = useState(0);
  const [tarif_carburant_flottant, setTarif_carburant_flottant] = useState(0);
  const [date_carburant_flottant, setDate_carburant_flottant] = useState("");
  const [type_flottant, setType_flottant] = useState("VEDETTE");

  useEffect(() => {
    // Récupérer les données de la consommation à modifier
    fetch(`http://localhost:8082/user/api/consommation-carburant-flottante/${id}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("Données de la consommation récupérées:", data);
        setQuantite_carburant_flottant(data.quantite_carburant_flottant);
        setTarif_carburant_flottant(data.tarif_carburant_flottant);
        setDate_carburant_flottant(
          new Date(data.date_carburant_flottant).toISOString().split("T")[0]
        );
        setType_flottant(data.type_flottant);
      })
      .catch((error) => console.error("Erreur lors de la récupération des données:", error));
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!quantite_carburant_flottant || !tarif_carburant_flottant || !date_carburant_flottant) {
      swal("Erreur", "Veuillez remplir tous les champs", "error");
      return;
    }

    const updatedData = {
      quantite_carburant_flottant: parseFloat(quantite_carburant_flottant),
      tarif_carburant_flottant: parseFloat(tarif_carburant_flottant),
      date_carburant_flottant: new Date(date_carburant_flottant).toISOString(),
      type_flottant: type_flottant,
    };

    fetch(
      `http://localhost:8082/user/api/consommation-carburant-flottante/updateConsommationCarburantFlottante/${id}`,
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
            navigate("/tables-carburant-flottant");
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
            Modifier la consommation de carburant flottant
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
                value={quantite_carburant_flottant}
                onChange={(e) => setQuantite_carburant_flottant(e.target.value)}
                required
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="number"
                label="Tarif (€)"
                variant="standard"
                fullWidth
                value={tarif_carburant_flottant}
                onChange={(e) => setTarif_carburant_flottant(e.target.value)}
                required
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="date"
                label="Date"
                variant="standard"
                fullWidth
                value={date_carburant_flottant}
                onChange={(e) => setDate_carburant_flottant(e.target.value)}
                required
              />
            </MDBox>
            <MDBox mb={2}>
              <FormControl fullWidth variant="standard">
                <InputLabel id="type-flottant-label">Type Flottant</InputLabel>
                <Select
                  labelId="type-flottant-label"
                  value={type_flottant}
                  onChange={(e) => setType_flottant(e.target.value)}
                  required
                >
                  <MenuItem value="VEDETTE">VEDETTE</MenuItem>
                  <MenuItem value="REMORQUE">REMORQUE</MenuItem>
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

export default UpdateConsommationCarburantFlottantForm;
