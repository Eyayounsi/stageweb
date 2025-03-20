import React, { useEffect, useState } from "react";
import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";

function FuelConsumptionChart() {
  const [fuelData, setFuelData] = useState({ labels: [], datasets: { label: "", data: [] } });

  useEffect(() => {
    // Récupérer les données de consommation de carburant terrestre
    fetch("http://localhost:8082/user/api/consommation-carburant-terrestre/tous")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des données");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Réponse de l'API:", data); // Affichez la réponse complète dans la console

        // Extraire toutes les consommations de carburant terrestre
        const allConsommations = data.flatMap(
          (compteur) => compteur.consommationsCarburantTerrestre
        );

        // Transformer les données pour le graphique
        const labels = allConsommations
          .map((consommation) => {
            const date = new Date(consommation.date_carburant_terrestre);
            return isNaN(date.getTime()) ? "Date invalide" : date.toLocaleDateString();
          })
          .filter((label) => label !== "Date invalide"); // Filtrer les dates invalides

        const quantites = allConsommations
          .map((consommation, index) =>
            labels[index] !== "Date invalide" ? consommation.quantite_carburant_terrestre : null
          )
          .filter((quantite) => quantite !== null); // Filtrer les quantités correspondant aux dates invalides

        setFuelData({
          labels: labels,
          datasets: { label: "Consommation de carburant terrestre (L)", data: quantites },
        });
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des données:", error);
        // Affichez un message d'erreur ou initialisez les données par défaut
        setFuelData({
          labels: [],
          datasets: { label: "Consommation de carburant terrestre (L)", data: [] },
        });
      });
  }, []);

  return (
    <ReportsLineChart
      color="dark" // Couleur de fond
      title="Consommation de carburant terrestre"
      description="Quantité de carburant terrestre consommée au fil du temps"
      date="mis à jour récemment"
      chart={fuelData}
    />
  );
}

export default FuelConsumptionChart;
