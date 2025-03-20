import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Grid, Card } from "@mui/material";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import CoverLayout from "layouts/authentication/components/CoverLayout";
import videoBg from "assets/images/electricite.mp4";
import swal from "sweetalert";

function UpdateConsommationElectriciteForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quantiteElectricite, setQuantiteElectricite] = useState(0);
  const [tarifElectricite, setTarifElectricite] = useState(0);
  const [dateElectricite, setDateElectricite] = useState("");

  useEffect(() => {
    // Récupérer les données de la consommation à modifier
    fetch(`http://localhost:8082/user/auth/getConsommationElectriciteById/${id}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("Données de la consommation récupérées:", data);
        setQuantiteElectricite(data.quantite_electricite);
        setTarifElectricite(data.tarif_electricite);
        setDateElectricite(new Date(data.date_electricite).toISOString().split("T")[0]);
      })
      .catch((error) => console.error("Erreur lors de la récupération des données:", error));
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!quantiteElectricite || !tarifElectricite || !dateElectricite) {
      swal("Erreur", "Veuillez remplir tous les champs", "error");
      return;
    }

    const updatedData = {
      quantite_electricite: parseFloat(quantiteElectricite),
      tarif_electricite: parseFloat(tarifElectricite),
      date_electricite: dateElectricite, // Utilisez directement la date sans conversion
    };

    fetch(
      `http://localhost:8082/user/api/consommation-electricite/updateConsommationElectricite/${id}`,
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
            navigate("/tables-electricite"); // Rediriger vers la liste des consommations
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
            Modifier la consommation d&apos;électricité
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form" onSubmit={handleSubmit}>
            <MDBox mb={2}>
              <MDInput
                type="number"
                label="Quantité (kWh)"
                variant="standard"
                fullWidth
                value={quantiteElectricite}
                onChange={(e) => setQuantiteElectricite(e.target.value)}
                required
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="number"
                label="Tarif (€)"
                variant="standard"
                fullWidth
                value={tarifElectricite}
                onChange={(e) => setTarifElectricite(e.target.value)}
                required
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="date"
                label="Date"
                variant="standard"
                fullWidth
                value={dateElectricite}
                onChange={(e) => setDateElectricite(e.target.value)}
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

export default UpdateConsommationElectriciteForm;
