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

function AjouterCarburantTerrestreForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    emplacement_terrestre: "",
    ordre_terrestre: 0,
    portId: 0,
    quantite_carburant_terrestre: 0,
    tarif_carburant_terrestre: 0,
    type_carburant: "",
    date_carburant_terrestre: "",
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
        name === "ordre_terrestre" ||
        name === "portId" ||
        name === "quantite_carburant_terrestre" ||
        name === "tarif_carburant_terrestre" ||
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
      !formData.emplacement_terrestre ||
      !formData.ordre_terrestre ||
      !formData.portId ||
      !formData.quantite_carburant_terrestre ||
      !formData.tarif_carburant_terrestre ||
      !formData.type_carburant ||
      !formData.date_carburant_terrestre ||
      !formData.userId
    ) {
      swal("Erreur", "Veuillez remplir tous les champs.", "error");
      return;
    }

    // Préparer les données à envoyer
    const requestData = {
      emplacement_terrestre: formData.emplacement_terrestre.trim(),
      ordre_terrestre: formData.ordre_terrestre,
      portId: formData.portId,
      quantite_carburant_terrestre: parseFloat(formData.quantite_carburant_terrestre),
      tarif_carburant_terrestre: parseFloat(formData.tarif_carburant_terrestre),
      type_carburant: formData.type_carburant.trim(),
      date_carburant_terrestre: new Date(formData.date_carburant_terrestre).toISOString(),
      userId: Number(formData.userId), // Convertir en Long
    };

    // Envoyer les données à l'API
    fetch("http://localhost:8082/user/api/consommation-carburant-terrestre/ajouter", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    })
      .then((response) => {
        if (response.ok) {
          swal(
            "Succès !",
            "Consommation de carburant terrestre ajoutée avec succès.",
            "success"
          ).then(() => {
            navigate("/tables-carburant-terrestre"); // Rediriger vers la liste des compteurs
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
                  Ajouter une consommation de carburant terrestre
                </MDTypography>
              </MDBox>
              <MDBox pt={3} px={3}>
                <form onSubmit={handleSubmit}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        label="Emplacement"
                        name="emplacement_terrestre"
                        value={formData.emplacement_terrestre}
                        onChange={handleChange}
                        required
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        label="Ordre"
                        name="ordre_terrestre"
                        type="number"
                        value={formData.ordre_terrestre}
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
                        label="Quantité (L)"
                        name="quantite_carburant_terrestre"
                        type="number"
                        value={formData.quantite_carburant_terrestre}
                        onChange={handleChange}
                        required
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        label="Tarif (€)"
                        name="tarif_carburant_terrestre"
                        type="number"
                        value={formData.tarif_carburant_terrestre}
                        onChange={handleChange}
                        required
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        label="Type de carburant"
                        name="type_carburant"
                        value={formData.type_carburant}
                        onChange={handleChange}
                        required
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        label="Date"
                        name="date_carburant_terrestre"
                        type="date"
                        InputLabelProps={{ shrink: true }}
                        value={formData.date_carburant_terrestre}
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

export default AjouterCarburantTerrestreForm;
