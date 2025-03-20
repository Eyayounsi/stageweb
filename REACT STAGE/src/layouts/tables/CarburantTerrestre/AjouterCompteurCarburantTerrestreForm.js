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

function AjouterCompteurCarburantTerrestreForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    num_compteur_terrestre: 0,
    emplacement_terrestre: "",
    ordre_terrestre: 0,
    portId: 0,
  });

  // Fetch the logged-in user's data from localStorage
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    if (userData && userData.port_id) {
      setFormData((prev) => ({
        ...prev,
        portId: userData.port_id, // Set the portId from the logged-in user's data
      }));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "num_compteur_terrestre" || name === "ordre_terrestre" || name === "portId"
          ? parseFloat(value)
          : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.num_compteur_terrestre ||
      !formData.emplacement_terrestre ||
      !formData.ordre_terrestre ||
      !formData.portId
    ) {
      swal("Erreur", "Veuillez remplir tous les champs.", "error");
      return;
    }

    fetch(
      "http://localhost:8082/user/api/consommation-carburant-terrestre/ajouterCompteurCarburantTerrestre",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    )
      .then((response) => {
        if (response.ok) {
          swal("Succès !", "Compteur de carburant terrestre ajouté avec succès.", "success").then(
            () => {
              navigate("/tables-carburant-terrestre");
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
                  Ajouter un compteur de carburant terrestre
                </MDTypography>
              </MDBox>
              <MDBox pt={3} px={3}>
                <form onSubmit={handleSubmit}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        label="Numéro de compteur"
                        name="num_compteur_terrestre"
                        type="number"
                        value={formData.num_compteur_terrestre}
                        onChange={handleChange}
                        required
                      />
                    </Grid>
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
                          onChange={handleChange}
                          required
                          disabled // Disable the input so the user cannot modify it
                        >
                          <MenuItem value={formData.portId}>
                            {formData.portId} (Auto-filled from user data)
                          </MenuItem>
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

export default AjouterCompteurCarburantTerrestreForm;
