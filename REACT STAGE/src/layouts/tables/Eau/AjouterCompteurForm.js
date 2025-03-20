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

function AjouterCompteurForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    num_compteur_eau: 0, // Add this field for manual entry
    emplacementEau: "",
    ordreEau: 0,
    portId: 0, // This will be populated from the logged-in user's data
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
        name === "num_compteur_eau" || name === "ordreEau" || name === "portId"
          ? parseFloat(value)
          : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.num_compteur_eau ||
      !formData.emplacementEau ||
      !formData.ordreEau ||
      !formData.portId
    ) {
      swal("Erreur", "Veuillez remplir tous les champs.", "error");
      return;
    }

    fetch("http://localhost:8082/user/auth/ajouterCompteurEau", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (response.ok) {
          swal("Succès !", "Compteur d'eau ajouté avec succès.", "success").then(() => {
            navigate("/tables");
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
                  Ajouter un compteur d&apos;eau
                </MDTypography>
              </MDBox>
              <MDBox pt={3} px={3}>
                <form onSubmit={handleSubmit}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        label="Numéro de compteur"
                        name="num_compteur_eau"
                        type="number"
                        value={formData.num_compteur_eau}
                        onChange={handleChange}
                        required
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        label="Emplacement"
                        name="emplacementEau"
                        value={formData.emplacementEau}
                        onChange={handleChange}
                        required
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        label="Ordre"
                        name="ordreEau"
                        type="number"
                        value={formData.ordreEau}
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

export default AjouterCompteurForm;
