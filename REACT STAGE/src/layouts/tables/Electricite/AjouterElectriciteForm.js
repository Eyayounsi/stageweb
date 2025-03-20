import React, { useState } from "react";
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

function AjouterElectriciteForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    emplacementElectricite: "",
    ordreElectricite: 0,
    portId: 0,
    quantiteElectricite: 0,
    tarifElectricite: 0,
    dateElectricite: "",
    userId: 0,
  });

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "ordreElectricite" ||
        name === "portId" ||
        name === "quantiteElectricite" ||
        name === "tarifElectricite" ||
        name === "userId"
          ? parseFloat(value)
          : value,
    }));
  };

  const handlePortChange = (e) => {
    const selectedPortId = e.target.value;
    setFormData((prev) => ({
      ...prev,
      portId: selectedPortId,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Vérifier que tous les champs sont remplis
    if (
      !formData.emplacementElectricite ||
      !formData.ordreElectricite ||
      !formData.portId ||
      !formData.quantiteElectricite ||
      !formData.tarifElectricite ||
      !formData.dateElectricite ||
      !formData.userId
    ) {
      swal("Erreur", "Veuillez remplir tous les champs.", "error");
      return;
    }

    // Préparer les données à envoyer
    const requestData = {
      emplacement_electricite: formData.emplacementElectricite.trim(), // Supprimer les espaces inutiles
      ordre_electricite: formData.ordreElectricite,
      portId: formData.portId, // Seul l'ID est envoyé
      quantite_electricite: formData.quantiteElectricite,
      tarif_electricite: formData.tarifElectricite,
      date_electricite: formData.dateElectricite,
      userId: formData.userId,
    };

    // Envoyer les données à l'API
    fetch("http://localhost:8082/user/api/consommation-electricite/ajouter", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    })
      .then((response) => {
        if (response.ok) {
          swal("Succès !", "Consommation d'électricité ajoutée avec succès.", "success").then(
            () => {
              navigate("/tables-electricite"); // Rediriger vers la liste des compteurs
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
                      <TextField
                        fullWidth
                        label="Emplacement"
                        name="emplacementElectricite"
                        value={formData.emplacementElectricite}
                        onChange={handleChange}
                        required
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        label="Ordre"
                        name="ordreElectricite"
                        type="number"
                        value={formData.ordreElectricite}
                        onChange={handleChange}
                        required
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <FormControl fullWidth variant="standard">
                        <InputLabel id="port-label">Port</InputLabel>
                        <Select
                          labelId="port-label"
                          name="portId"
                          value={formData.portId}
                          onChange={handlePortChange}
                          required
                        >
                          {ports.map((port) => (
                            <MenuItem key={port.id} value={port.id}>
                              {port.nom} (ID: {port.id})
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        label="Quantité (kWh)"
                        name="quantiteElectricite"
                        type="number"
                        value={formData.quantiteElectricite}
                        onChange={handleChange}
                        required
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        label="Tarif (€)"
                        name="tarifElectricite"
                        type="number"
                        value={formData.tarifElectricite}
                        onChange={handleChange}
                        required
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        label="Date"
                        name="dateElectricite"
                        type="date"
                        InputLabelProps={{ shrink: true }}
                        value={formData.dateElectricite}
                        onChange={handleChange}
                        required
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        label="User ID"
                        name="userId"
                        type="number"
                        value={formData.userId}
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

export default AjouterElectriciteForm;
