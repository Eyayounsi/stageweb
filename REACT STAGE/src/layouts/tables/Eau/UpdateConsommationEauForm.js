import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Grid, Card } from "@mui/material";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import CoverLayout from "layouts/authentication/components/CoverLayout";
import swal from "sweetalert";
import videoBg from "assets/images/eau.mp4";

function UpdateConsommationEauForm() {
  const { id } = useParams(); // Récupérer l'ID de la consommation depuis l'URL
  const navigate = useNavigate();
  const [quantiteEau, setQuantiteEau] = useState(0);
  const [tarifEau, setTarifEau] = useState(0);
  const [dateEau, setDateEau] = useState("");

  useEffect(() => {
    // Récupérer les données de la consommation à modifier
    fetch(`http://localhost:8082/user/auth/getConsommationEauById/${id}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("Données de la consommation récupérées:", data);
        setQuantiteEau(data.quantite_eau);
        setTarifEau(data.tarif_eau);
        setDateEau(new Date(data.date_eau).toISOString().split("T")[0]); // Formater la date pour l'input
      })
      .catch((error) => console.error("Erreur lors de la récupération des données:", error));
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!quantiteEau || !tarifEau || !dateEau) {
      swal("Erreur", "Veuillez remplir tous les champs", "error");
      return;
    }

    const updatedData = {
      quantiteEau: parseFloat(quantiteEau),
      tarifEau: parseFloat(tarifEau),
      dateEau: new Date(dateEau).toISOString(), // Convertir la date en format ISO
    };

    fetch(`http://localhost:8082/user/auth/updateConsommationEau/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    })
      .then((response) => {
        if (response.ok) {
          swal("Succès !", "La consommation a été mise à jour.", "success").then(() => {
            navigate("/tables"); // Rediriger vers la liste des consommations
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
            Modifier la consommation d&apos;eau
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form" onSubmit={handleSubmit}>
            <MDBox mb={2}>
              <MDInput
                type="number"
                label="Quantité (m³)"
                variant="standard"
                fullWidth
                value={quantiteEau}
                onChange={(e) => setQuantiteEau(e.target.value)}
                required
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="number"
                label="Tarif (Dt)"
                variant="standard"
                fullWidth
                value={tarifEau}
                onChange={(e) => setTarifEau(e.target.value)}
                required
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="date"
                label="Date"
                variant="standard"
                fullWidth
                value={dateEau}
                onChange={(e) => setDateEau(e.target.value)}
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

export default UpdateConsommationEauForm;
