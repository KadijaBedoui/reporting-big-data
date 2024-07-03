import React, { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';

import 'chart.js/auto';
import "./../DashSupport.css";

const DoughnutCardF = () => {
  const [doughnutData, setDoughnutData] = useState(null);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/api/panier-moyen-par-famille")
      .then((response) => response.json())
      .then((response) => {
        processDoughnutData(response);
      })
      .catch((error) => console.error("Error fetching the data:", error));
  }, []);

  const processDoughnutData = (data) => {
    if (data.length === 0) return;

    const familles = data.map(item => item['famille']);
    const panierMoyen = data.map(item => item['Panier Moyen']);

    const chartData = {
      labels: familles,
      datasets: [
        {
          label: 'Panier Moyen',
          data: panierMoyen,
          backgroundColor: familles.map((_, index) => `rgba(${index * 30}, 192, 192, 0.6)`),
          borderColor: familles.map((_, index) => `rgba(${index * 30}, 192, 192, 1)`),
          borderWidth: 1,
        },
      ],
    };

    setDoughnutData(chartData);
  };

  return (
    <div>
      <h2 className="doughnut-chart-title">Panier Moyen par Famille</h2>
      {doughnutData !== null ? <Doughnut data={doughnutData} /> : <p>Loading doughnut chart data...</p>}
    </div>
  );
};

export default DoughnutCardF;
