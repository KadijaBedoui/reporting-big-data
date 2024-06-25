import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";

import "chart.js/auto";

const DashSupport = () => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/api/sale-supports")
      .then(response => response.json())
      .then((response) => {
        processChartData(response);
      })
      .catch((error) => console.error("Error fetching the data:", error));
  }, []);

  const processChartData = (data) => {
    if (data.length === 0) return;
console.log(data)
    const dates = [...new Set(data.map((item) => item.Date.split("T")[0]))]; 
    // Assumes dates are in ISO format
    const kioskData = data.filter(
      (item) => item["Support de Vente"] === "Kiosk"
    );
    const appCncData = data.filter(
      (item) => item["Support de Vente"] === "Application C&C"
    );
    const posData = data.filter((item) => item["Support de Vente"] === "POS");

    const chartData = {
      labels: dates,
      datasets: [
        {
          label: "Kiosk",
          data: dates.map((date) => {
            const record = kioskData.find(
              (item) => item.Date.split("T")[0] === date
            );
            return record ? record.ChiffreAffaire : 0;
          }),
          fill: false,
          backgroundColor: "rgba(75,192,192,0.4)",
          borderColor: "rgba(75,192,192,1)",
        },
        {
          label: "Application C&C",
          data: dates.map((date) => {
            const record = appCncData.find(
              (item) => item.Date.split("T")[0] === date
            );
            return record ? record.ChiffreAffaire : 0;
          }),
          fill: false,
          backgroundColor: "rgba(192,75,192,0.4)",
          borderColor: "rgba(192,75,192,1)",
        },
        {
          label: "POS",
          data: dates.map((date) => {
            const record = posData.find(
              (item) => item.Date.split("T")[0] === date
            );
            return record ? record.ChiffreAffaire : 0;
          }),
          fill: false,
          backgroundColor: "rgba(192,192,75,0.4)",
          borderColor: "rgba(192,192,75,1)",
        },
      ],
    };

    setChartData(chartData);
  };
  
  return (
    <div className="DashSupport">
      <h1>Sales Dashboard</h1>
      {chartData !== null ? <Line data={chartData} /> : <p>Loading chart data...</p>}
    </div>
  );
};

export default DashSupport;

/* import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

const DashSupport = () => {
  const [data, setData] = useState([]);
  const [kioskData, setKioskData] = useState([]);
  const [appCncData, setAppCncData] = useState([]);
  const [posData, setPosData] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:5000/api/top-supports')
      .then(response => {
        setData(response.data);
        processChartData(response.data);
      })
      .catch(error => console.error('Error fetching the data:', error));
  }, []);

  const processChartData = (data) => {
    const kiosk = data.filter(item => item['Support de Vente'] === 'Kiosk');
    const appCnc = data.filter(item => item['Support de Vente'] === 'Application C&C');
    const pos = data.filter(item => item['Support de Vente'] === 'POS');

    setKioskData(kiosk);
    setAppCncData(appCnc);
    setPosData(pos);
  };

  const generateChartData = (supportData) => {
    return {
      labels: supportData.map(item => item.Date.split('T')[0]), // Assuming the date is in ISO format
      datasets: [
        {
          label: 'Chiffre d\'Affaire',
          data: supportData.map(item => item.ChiffreAffaire),
          fill: false,
          backgroundColor: 'rgba(75,192,192,0.4)',
          borderColor: 'rgba(75,192,192,1)',
        }
      ]
    };
  };

  return (
    <div className="DashSupport">
      <h1>Sales Dashboard</h1>
      <h2>Kiosk Sales</h2>
      <Line data={generateChartData(kioskData)} />
      <h2>Application C&C Sales</h2>
      <Line data={generateChartData(appCncData)} />
      <h2>POS Sales</h2>
      <Line data={generateChartData(posData)} />
    </div>
  );
}

export default DashSupport;
 */
