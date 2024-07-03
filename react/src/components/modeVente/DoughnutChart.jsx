import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";

import "chart.js/auto";
import "./../DashSupport.css";

export function DoughnutChart() {
  const [doughnutData, setDoughnutData] = useState(null);

  useEffect(() => {
    const processDoughnutData = (data) => {
      if (data.length === 0) return;

      const modes = data.map((item) => item["Mode de Vente"]);
      const totalCommandes = data.map((item) => item["NbCommandes"]);

      const chartData = {
        labels: modes,
        datasets: [
          {
            label: "Nombre Total de Commandes",
            data: totalCommandes,
            backgroundColor: generateColors(modes.length, 0.6),
            borderColor: generateColors(modes.length, 1),
            borderWidth: 1,
          },
        ],
      };

      setDoughnutData(chartData);
    };

    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://127.0.0.1:5000/api/total-commandes-par-mode"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        processDoughnutData(data);
      } catch (error) {
        console.error("Error fetching the data:", error);
      }
    };

    fetchData();
  }, []);

  const generateColors = (count, opacity) => {
    return Array.from(
      { length: count },
      (_, index) => `rgba(${index * 30}, 192, 192, ${opacity})`
    );
  };

  return (
    <div>
      <h2 className="doughnut-chart-title">
        Nombre Total de Commandes par Mode de Vente
      </h2>
      {doughnutData !== null ? (
        <Doughnut data={doughnutData} />
      ) : (
        <p>Loading doughnut chart data...</p>
      )}
    </div>
  );
};

export default DoughnutChart;