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

function AjouterConsommationElectriciteForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    compteurElectriciteId: 0,
    quantite_electricite: 0,
    tarif_electricite: 0,
    date_electricite: "",
  });

  const [compteurs, setCompteurs] = useState([]);
  const userId = localStorage.getItem("userId"); // Récupérer l'ID de l'utilisateur depuis le localStorage

  useEffect(() => {
    // Récupérer la liste des compteurs d'électricité depuis l'API
    fetch("http://localhost:8082/user/api/consommation-electricite/all")
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
        name === "compteurElectriciteId" ||
        name === "quantite_electricite" ||
        name === "tarif_electricite"
          ? parseFloat(value)
          : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.compteurElectriciteId ||
      !formData.quantite_electricite ||
      !formData.tarif_electricite ||
      !formData.date_electricite
    ) {
      swal("Erreur", "Veuillez remplir tous les champs.", "error");
      return;
    }

    const requestData = {
      ...formData,
      userId: userId, // Utiliser l'ID de l'utilisateur récupéré
    };

    fetch(
      "http://localhost:8082/user/api/consommation-electricite/ajouterConsommationElectricite",
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
          swal("Succès !", "Consommation d'électricité ajoutée avec succès.", "success").then(
            () => {
              navigate("/tables-electricite");
            }
          );
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
                  Ajouter une consommation d&apos;électricité
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
                          name="compteurElectriciteId"
                          value={formData.compteurElectriciteId}
                          onChange={handleChange}
                          required
                        >
                          {compteurs.map((compteur) => (
                            <MenuItem
                              key={compteur.num_compteur_electricite}
                              value={compteur.num_compteur_electricite}
                            >
                              {compteur.emplacement_electricite} (ID:{" "}
                              {compteur.num_compteur_electricite})
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        label="Quantité (kWh)"
                        name="quantite_electricite"
                        type="number"
                        value={formData.quantite_electricite}
                        onChange={handleChange}
                        required
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        label="Tarif (€)"
                        name="tarif_electricite"
                        type="number"
                        value={formData.tarif_electricite}
                        onChange={handleChange}
                        required
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        label="Date"
                        name="date_electricite"
                        type="date"
                        InputLabelProps={{ shrink: true }}
                        value={formData.date_electricite}
                        onChange={handleChange}
                        required
                      />
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

export default AjouterConsommationElectriciteForm;
