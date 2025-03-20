import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Grid, Card, Button, Icon } from "@mui/material";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import DataTable from "examples/Tables/DataTable";

function ConsommationsEau() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [consommations, setConsommations] = useState([]);

  useEffect(() => {
    // Récupérer les consommations d'eau associées au compteur
    fetch(`http://localhost:8082/user/auth/getCompteurById/${id}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("Données récupérées:", data); // Affichez les données dans la console
        setConsommations(data.consommationsEau);
      })
      .catch((error) => console.error("Erreur lors de la récupération des consommations:", error));
  }, [id]);

  // Fonction pour rediriger vers le formulaire de modification
  const handleUpdateConsommation = (consommation) => {
    navigate(`/update-consommation-eau/${consommation.id_eau}`);
  };

  const columns = [
    { Header: "ID", accessor: "id_eau" },
    { Header: "Quantité (m³)", accessor: "quantite_eau" },
    { Header: "Tarif (€)", accessor: "tarif_eau" },
    { Header: "Date", accessor: "date_eau" },
    { Header: "Nom", accessor: "nom" },
    { Header: "Prénom", accessor: "prenom" },
    { Header: "Port ID", accessor: "portId" },
    {
      Header: "Actions",
      accessor: "actions",
      Cell: ({ row }) => (
        <MDBox display="flex" gap={1}>
          <Button
            variant="contained"
            color="warning"
            onClick={() => handleUpdateConsommation(row.original)}
          >
            <Icon>edit</Icon>
          </Button>
        </MDBox>
      ),
    },
  ];

  const rows = consommations.map((consommation) => ({
    id_eau: consommation.id_eau,
    quantite_eau: consommation.quantite_eau,
    tarif_eau: consommation.tarif_eau,
    date_eau: new Date(consommation.date_eau).toLocaleDateString(),
    nom: consommation.nom || "N/A", // Accès direct à la propriété nom
    prenom: consommation.prenom || "N/A", // Accès direct à la propriété prenom
    portId: consommation.portId || "N/A", // Accès direct à la propriété portId
  }));

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
                  Consommations d&apos;eau pour le compteur {id}
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                <DataTable
                  table={{ columns, rows }}
                  isSorted={false}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  noEndBorder
                />
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
    </DashboardLayout>
  );
}

export default ConsommationsEau;
