import React, { useEffect, useState } from "react";
import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";

function WaterConsumptionChart() {
  const [waterData, setWaterData] = useState({ labels: [], datasets: { label: "", data: [] } });

  useEffect(() => {
    // Récupérer les données de consommation d'eau
    fetch("http://localhost:8082/user/auth/GetEauall")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des données");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Réponse de l'API:", data); // Affichez la réponse complète dans la console

        // Extraire toutes les consommations d'eau
        const allConsommations = data.flatMap((compteur) => compteur.consommationsEau);

        // Transformer les données pour le graphique
        const labels = allConsommations.map((consommation) =>
          new Date(consommation.date_eau).toLocaleDateString()
        );
        const quantites = allConsommations.map((consommation) => consommation.quantite_eau);

        setWaterData({
          labels: labels,
          datasets: { label: "Consommation d'eau (m³)", data: quantites },
        });
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des données:", error);
        // Affichez un message d'erreur ou initialisez les données par défaut
        setWaterData({
          labels: [],
          datasets: { label: "Consommation d'eau (m³)", data: [] },
        });
      });
  }, []);

  return (
    <ReportsLineChart
      color="info"
      title="Consommation d'eau"
      description="Quantité d'eau consommée au fil du temps"
      date="mis à jour récemment"
      chart={waterData}
    />
  );
}

export default WaterConsumptionChart;
