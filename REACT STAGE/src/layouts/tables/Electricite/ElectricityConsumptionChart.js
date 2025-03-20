import React, { useEffect, useState } from "react";
import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";

function ElectricityConsumptionChart() {
  const [electricityData, setElectricityData] = useState({
    labels: [],
    datasets: { label: "", data: [] },
  });

  useEffect(() => {
    // Récupérer les données de consommation d'électricité
    fetch("http://localhost:8082/user/api/consommation-electricite/all")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des données");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Réponse de l'API:", data); // Affichez la réponse complète dans la console

        // Extraire toutes les consommations d'électricité
        const allConsommations = data.flatMap((compteur) => compteur.consommationsElectricite);

        // Transformer les données pour le graphique
        const labels = allConsommations.map((consommation) =>
          new Date(consommation.date_electricite).toLocaleDateString()
        );
        const quantites = allConsommations.map((consommation) => consommation.quantite_electricite);

        setElectricityData({
          labels: labels,
          datasets: { label: "Consommation d'électricité (kWh)", data: quantites },
        });
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des données:", error);
        // Affichez un message d'erreur ou initialisez les données par défaut
        setElectricityData({
          labels: [],
          datasets: { label: "Consommation d'électricité (kWh)", data: [] },
        });
      });
  }, []);

  return (
    <ReportsLineChart
      color="success" // Couleur de fond
      title="Consommation d'électricité"
      description="Quantité d'électricité consommée au fil du temps"
      date="mis à jour récemment"
      chart={electricityData}
    />
  );
}

export default ElectricityConsumptionChart;
