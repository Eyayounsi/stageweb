import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import Grid from "@mui/material/Grid";
import MDBox from "components/MDBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";
import WaterConsumptionChart from "layouts/tables/Eau/WaterConsumptionChart";
import ElectricityConsumptionChart from "layouts/tables/Electricite/ElectricityConsumptionChart";
import FuelConsumptionChart from "layouts/tables/CarburantTerrestre/FuelConsumptionChart";
import CarburantFlottantChart from "layouts/tables/CarburantFlottant/CarburantFlottantChart";

// Dashboard components
import Projects from "layouts/dashboard/components/Projects";
import OrdersOverview from "layouts/dashboard/components/OrdersOverview";

function Dashboard() {
  const navigate = useNavigate(); // Initialize useNavigate
  const [statistics, setStatistics] = useState({
    nombreUtilisateurs: 0,
    nombreCompteursEau: 0,
    nombreCompteursElectricite: 0,
    nombreCompteursCarburantTerrestre: 0,
    nombreCompteursCarburantFlottant: 0,
  });

  const fetchStatistics = async () => {
    try {
      const [usersResponse, waterResponse, electricityResponse, fuelResponse, flottantResponse] =
        await Promise.all([
          fetch("http://localhost:8082/user/api/statistics/nombre-utilisateurs"),
          fetch("http://localhost:8082/user/api/statistics/nombre-compteurs-eau"),
          fetch("http://localhost:8082/user/api/statistics/nombre-compteurs-electricite"),
          fetch("http://localhost:8082/user/api/statistics/nombre-compteurs-carburant-terrestre"),
          fetch("http://localhost:8082/user/api/statistics/nombre-compteurs-carburant-flottante"),
        ]);

      if (
        !usersResponse.ok ||
        !waterResponse.ok ||
        !electricityResponse.ok ||
        !fuelResponse.ok ||
        !flottantResponse.ok
      ) {
        throw new Error("Erreur lors de la récupération des statistiques");
      }

      const nombreUtilisateurs = await usersResponse.json();
      const nombreCompteursEau = await waterResponse.json();
      const nombreCompteursElectricite = await electricityResponse.json();
      const nombreCompteursCarburantTerrestre = await fuelResponse.json();
      const nombreCompteursCarburantFlottant = await flottantResponse.json();

      setStatistics({
        nombreUtilisateurs,
        nombreCompteursEau,
        nombreCompteursElectricite,
        nombreCompteursCarburantTerrestre,
        nombreCompteursCarburantFlottant,
      });
    } catch (error) {
      console.error("Erreur lors de la récupération des statistiques:", error);
    }
  };

  useEffect(() => {
    fetchStatistics();
  }, []);

  // Function to handle card clicks
  const handleCardClick = (route) => {
    navigate(route); // Navigate to the specified route
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <Grid container spacing={3}>
          {/* Nombre d'utilisateurs */}
          <Grid item xs={12} md={6} lg={2.4}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="info"
                icon="people"
                title="Utilisateurs"
                count={statistics.nombreUtilisateurs}
                percentage={{
                  color: "success",
                  amount: "+0%",
                  label: "depuis hier",
                }}
              />
            </MDBox>
          </Grid>

          {/* Nombre de compteurs d'eau */}
          <Grid item xs={12} md={6} lg={2.4}>
            <MDBox
              mb={1.5}
              onClick={() => handleCardClick("/tables")}
              style={{ cursor: "pointer" }}
            >
              <ComplexStatisticsCard
                color="primary"
                icon="water_drop"
                title="Compteurs d'eau"
                count={statistics.nombreCompteursEau}
                percentage={{
                  color: "success",
                  amount: "+0%",
                  label: "depuis hier",
                }}
              />
            </MDBox>
          </Grid>

          {/* Nombre de compteurs d'électricité */}
          <Grid item xs={12} md={6} lg={2.4}>
            <MDBox
              mb={1.5}
              onClick={() => handleCardClick("/tables-electricite")}
              style={{ cursor: "pointer" }}
            >
              <ComplexStatisticsCard
                color="success"
                icon="bolt"
                title="Compteurs d'électricité"
                count={statistics.nombreCompteursElectricite}
                percentage={{
                  color: "success",
                  amount: "+0%",
                  label: "depuis hier",
                }}
              />
            </MDBox>
          </Grid>

          {/* Nombre de compteurs de carburant terrestre */}
          <Grid item xs={12} md={6} lg={2.4}>
            <MDBox
              mb={1.5}
              onClick={() => handleCardClick("/tables-carburant-terrestre")}
              style={{ cursor: "pointer" }}
            >
              <ComplexStatisticsCard
                color="warning"
                icon="local_gas_station"
                title="Compteurs de carburant terrestre"
                count={statistics.nombreCompteursCarburantTerrestre}
                percentage={{
                  color: "success",
                  amount: "+0%",
                  label: "depuis hier",
                }}
              />
            </MDBox>
          </Grid>

          {/* Nombre de compteurs de carburant flottant */}
          <Grid item xs={12} md={6} lg={2.4}>
            <MDBox
              mb={1.5}
              onClick={() => handleCardClick("/tables-carburant-flottant")}
              style={{ cursor: "pointer" }}
            >
              <ComplexStatisticsCard
                color="secondary"
                icon="directions_boat"
                title="Compteurs de carburant flottant"
                count={statistics.nombreCompteursCarburantFlottant}
                percentage={{
                  color: "success",
                  amount: "+0%",
                  label: "depuis hier",
                }}
              />
            </MDBox>
          </Grid>
        </Grid>

        <MDBox mt={4.5}>
          {/* Première ligne : Eau et Électricité */}
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={6}>
              <MDBox mb={3}>
                <WaterConsumptionChart /> {/* Graphique pour l'eau */}
              </MDBox>
            </Grid>

            <Grid item xs={12} md={6} lg={6}>
              <MDBox mb={3}>
                <ElectricityConsumptionChart /> {/* Graphique pour l'électricité */}
              </MDBox>
            </Grid>
          </Grid>

          {/* Deuxième ligne : Carburant Terrestre et Carburant Flottant */}
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={6}>
              <MDBox mb={3}>
                <FuelConsumptionChart /> {/* Graphique pour le carburant terrestre */}
              </MDBox>
            </Grid>

            <Grid item xs={12} md={6} lg={6}>
              <MDBox mb={3}>
                <CarburantFlottantChart /> {/* Graphique pour le carburant flottant */}
              </MDBox>
            </Grid>
          </Grid>
        </MDBox>
      </MDBox>
    </DashboardLayout>
  );
}

export default Dashboard;
