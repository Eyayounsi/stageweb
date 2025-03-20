import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Grid, Card, Button, Icon } from "@mui/material";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import DataTable from "examples/Tables/DataTable";

function ConsommationsCarburantFlottant() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [consommations, setConsommations] = useState([]);

  useEffect(() => {
    // Récupérer les consommations de carburant flottant associées au compteur
    fetch(`http://localhost:8082/user/api/consommation-carburant-flottante/${id}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("Données récupérées:", data);
        setConsommations(data.consommationsCarburantFlottante);
      })
      .catch((error) => console.error("Erreur lors de la récupération des consommations:", error));
  }, [id]);

  const handleUpdateConsommation = (consommation) => {
    navigate(`/update-consommation-carburant-flottant/${consommation.id_carburant_flottant}`);
  };

  const columns = [
    { Header: "ID", accessor: "id_carburant_flottant" },
    { Header: "Quantité (L)", accessor: "quantite_carburant_flottant" },
    { Header: "Tarif (€)", accessor: "tarif_carburant_flottant" },
    { Header: "Date", accessor: "date_carburant_flottant" },
    { Header: "Type Flottant", accessor: "type_flottant" },
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
    id_carburant_flottant: consommation.id_carburant_flottant,
    quantite_carburant_flottant: consommation.quantite_carburant_flottant,
    tarif_carburant_flottant: consommation.tarif_carburant_flottant,
    date_carburant_flottant: new Date(consommation.date_carburant_flottant).toLocaleDateString(),
    type_flottant: consommation.type_flottant,
    nom: consommation.nom || "N/A",
    prenom: consommation.prenom || "N/A",
    portId: consommation.portId || "N/A",
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
                  Consommations de carburant flottant pour le compteur {id}
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

export default ConsommationsCarburantFlottant;
