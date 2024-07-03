import React, { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import 'chart.js/auto';
import "./../DashSupport.css";

const DoughnutCardM = () => {
  const [doughnutData, setDoughnutData] = useState(null);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/api/panier-moyen-par-mode")
      .then((response) => response.json())
      .then((response) => {
        processDoughnutData(response);
      })
      .catch((error) => console.error("Error fetching the data:", error));
  }, []);

  const processDoughnutData = (data) => {
    if (data.length === 0) return;

    const produits = data.map(item => item['Produit']);
    const panierMoyen = data.map(item => item['Panier Moyen']);

    const chartData = {
      labels: produits,
      datasets: [
        {
          label: 'Panier Moyen',
          data: panierMoyen,
          backgroundColor: produits.map((_, index) => `rgba(${index * 30}, 192, 192, 0.6)`),
          borderColor: produits.map((_, index) => `rgba(${index * 30}, 192, 192, 1)`),
          borderWidth: 1,
        },
      ],
    };

    setDoughnutData(chartData);
  };

  return (
    <div>
      <h2 className="doughnut-chart-title">Panier Moyen par Produit</h2>
      {doughnutData !== null ? <Doughnut data={doughnutData} /> : <p>Loading doughnut chart data...</p>}
    </div>
  );
};

export default DoughnutCardM;
