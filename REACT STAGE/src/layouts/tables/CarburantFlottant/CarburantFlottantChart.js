import React, { useEffect, useState } from "react";
import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";

function CarburantFlottantChart() {
  const [carburantData, setCarburantData] = useState({
    labels: [],
    datasets: { label: "", data: [] },
  });

  useEffect(() => {
    fetch("http://localhost:8082/user/api/consommation-carburant-flottante/tous")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des données");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Réponse de l'API:", data);

        const allConsommations = data.flatMap(
          (compteur) => compteur.consommationsCarburantFlottante
        );

        const labels = allConsommations.map((consommation) =>
          new Date(consommation.date_carburant_flottant).toLocaleDateString()
        );
        const quantites = allConsommations.map(
          (consommation) => consommation.quantite_carburant_flottant
        );

        setCarburantData({
          labels: labels,
          datasets: { label: "Consommation de carburant flottant (L)", data: quantites },
        });
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des données:", error);
        setCarburantData({
          labels: [],
          datasets: { label: "Consommation de carburant flottant (L)", data: [] },
        });
      });
  }, []);

  return (
    <ReportsLineChart
      color="info"
      title="Materielle  flottant"
      description="Quantité de carburant flottant consommée au fil du temps"
      date="mis à jour récemment"
      chart={carburantData}
    />
  );
}

export default CarburantFlottantChart;
