import React, { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import 'chart.js/auto';
import "./../DashSupport.css";

const DoughnutCardP = () => {
  const [doughnutData, setDoughnutData] = useState(null);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/api/average-basket-by-service")
      .then((response) => response.json())
      .then((response) => {
        processDoughnutData(response);
      })
      .catch((error) => console.error("Error fetching the data:", error));
  }, []);

  const processDoughnutData = (data) => {
    if (data.length === 0) return;

    const nuitBasket = data.find(item => item['Service'] === 'nuit')?.['Panier Moyen '] || 0;
    const midiBasket = data.find(item => item['Service'] === 'midi')?.['Panier Moyen '] || 0;

    const chartData = {
      labels: ['Service Nuit', 'Service Midi'],
      datasets: [
        {
          label: 'Panier Moyen',
          data: [nuitBasket, midiBasket],
          backgroundColor: [
            'rgba(75, 192, 192, 0.6)',
            'rgba(192, 75, 192, 0.6)',
          ],
          borderColor: [
            'rgba(75, 192, 192, 1)',
            'rgba(192, 75, 192, 1)',
          ],
          borderWidth: 1,
        },
      ],
    };

    setDoughnutData(chartData);
  };

  return (
    <div>
      <h2 className="doughnut-chart-title">Panier Moyen par Service</h2>
      {doughnutData !== null ? <Doughnut data={doughnutData} /> : <p>Loading doughnut chart data...</p>}
    </div>
  );
};

export default DoughnutCardP;
