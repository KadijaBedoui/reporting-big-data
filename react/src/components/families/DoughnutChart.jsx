import React, { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import 'chart.js/auto';
import "./../DashSupport.css";

const DoughnutChart = () => {
  const [doughnutData, setDoughnutData] = useState(null);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/api/total-commandes-par-famille")
      .then((response) => response.json())
      .then((response) => {
        processDoughnutData(response);
      })
      .catch((error) => console.error("Error fetching the data:", error));
  }, []);

  const processDoughnutData = (data) => {
    if (data.length === 0) return;

    const familles = data.map(item => item['famille']);
    const totalCommandes = data.map(item => item['NbCommandes']);

    const chartData = {
      labels: familles,
      datasets: [
        {
          label: 'Nombre Total de Commandes',
          data: totalCommandes,
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
      <h2 className="doughnut-chart-title">Nombre Total de Commandes par Famille</h2>
      {doughnutData !== null ? <Doughnut data={doughnutData} /> : <p>Loading doughnut chart data...</p>}
    </div>
  );
};

export default DoughnutChart;
