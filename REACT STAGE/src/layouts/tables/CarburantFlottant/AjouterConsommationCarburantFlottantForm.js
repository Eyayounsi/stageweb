import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Grid,
  Card,
  Button,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import swal from "sweetalert";

function AjouterConsommationCarburantFlottantForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    compteurCarburantFlottanteId: 0,
    quantite_carburant_flottant: 0,
    tarif_carburant_flottant: 0,
    date_carburant_flottant: "",
    type_flottant: "VEDETTE", // Default value
  });

  const [compteurs, setCompteurs] = useState([]);
  const userId = localStorage.getItem("userId"); // Récupérer l'ID de l'utilisateur depuis le localStorage

  useEffect(() => {
    // Récupérer la liste des compteurs de carburant flottant depuis l'API
    fetch("http://localhost:8082/user/api/consommation-carburant-flottante/tous")
      .then((response) => response.json())
      .then((data) => {
        setCompteurs(data);
      })
      .catch((error) => console.error("Erreur lors de la récupération des compteurs:", error));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "compteurCarburantFlottanteId" ||
        name === "quantite_carburant_flottant" ||
        name === "tarif_carburant_flottant"
          ? parseFloat(value)
          : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.compteurCarburantFlottanteId ||
      !formData.quantite_carburant_flottant ||
      !formData.tarif_carburant_flottant ||
      !formData.date_carburant_flottant
    ) {
      swal("Erreur", "Veuillez remplir tous les champs.", "error");
      return;
    }
    const requestData = {
      ...formData,
      userId: userId, // Utiliser l'ID de l'utilisateur récupéré
    };

    fetch(
      "http://localhost:8082/user/api/consommation-carburant-flottante/ajouterConsommationCarburantFlottante",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      }
    )
      .then((response) => {
        if (response.ok) {
          swal(
            "Succès !",
            "Consommation de carburant flottant ajoutée avec succès.",
            "success"
          ).then(() => {
            navigate("/tables-carburant-flottant");
          });
        } else {
          swal("Erreur !", "L'ajout a échoué.", "error");
        }
      })
      .catch((error) => {
        console.error("Erreur lors de l'ajout :", error);
        swal("Erreur !", "L'ajout a échoué.", "error");
      });
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h6" color="white">
                  Ajouter une consommation de carburant flottant
                </MDTypography>
              </MDBox>
              <MDBox pt={3} px={3}>
                <form onSubmit={handleSubmit}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                      <FormControl fullWidth variant="standard">
                        <InputLabel id="compteur-label">Compteur</InputLabel>
                        <Select
                          labelId="compteur-label"
                          name="compteurCarburantFlottanteId"
                          value={formData.compteurCarburantFlottanteId}
                          onChange={handleChange}
                          required
                        >
                          {compteurs.map((compteur) => (
                            <MenuItem
                              key={compteur.num_compteur_flottant}
                              value={compteur.num_compteur_flottant}
                            >
                              {compteur.emplacement_flottant} (ID: {compteur.num_compteur_flottant})
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        label="Quantité (L)"
                        name="quantite_carburant_flottant"
                        type="number"
                        value={formData.quantite_carburant_flottant}
                        onChange={handleChange}
                        required
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        label="Tarif (€)"
                        name="tarif_carburant_flottant"
                        type="number"
                        value={formData.tarif_carburant_flottant}
                        onChange={handleChange}
                        required
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        label="Date"
                        name="date_carburant_flottant"
                        type="date"
                        InputLabelProps={{ shrink: true }}
                        value={formData.date_carburant_flottant}
                        onChange={handleChange}
                        required
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <FormControl fullWidth variant="standard">
                        <InputLabel id="type-flottant-label">Type Flottant</InputLabel>
                        <Select
                          labelId="type-flottant-label"
                          name="type_flottant"
                          value={formData.type_flottant}
                          onChange={handleChange}
                          required
                        >
                          <MenuItem value="VEDETTE">VEDETTE</MenuItem>
                          <MenuItem value="REMORQUE">REMORQUE</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                      <Button type="submit" variant="contained" color="success">
                        Ajouter
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
    </DashboardLayout>
  );
}

export default AjouterConsommationCarburantFlottantForm;
