import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";

import TotalOrdersCard from "./StatCard/TotalOrdersCard";
import StatCard from "./StatCard/StatCard";
import { DoughnutChart } from "./DoughnutChart";
import DoughnutCardP from "./DoughnutCardP";
import PanierCard from "./PanierCard";
import { FaMoneyBillWave, FaShoppingCart } from "react-icons/fa";

import "chart.js/auto";
import "./DashSupport.css";

const DashSupport = () => {
  const [chartData, setChartData] = useState(null);
  const [totalChiffreAffaire, setTotalChiffreAffaire] = useState(0);
  const [totalCommandes, setTotalCommandes] = useState(0);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/api/sale-supports")
      .then((response) => response.json())
      .then((response) => {
        processChartData(response);
      })
      .catch((error) => console.error("Error fetching the data:", error));
  }, []);

  const processChartData = (data) => {
    if (data.length === 0) return;

    const dates = [...new Set(data.map((item) => item.Date.split("T")[0]))];
    const kioskData = data.filter(
      (item) => item["Support de Vente"] === "Kiosk"
    );
    const appCncData = data.filter(
      (item) => item["Support de Vente"] === "Application C&C"
    );
    const posData = data.filter((item) => item["Support de Vente"] === "POS");

    const totalChiffreAffaire = data.reduce(
      (total, item) => total + item.ChiffreAffaire,
      0
    );
    const totalCommandes = data.length;

    setTotalChiffreAffaire(totalChiffreAffaire);
    setTotalCommandes(totalCommandes);

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

  const options = {
    scales: {
      x: {
        title: {
          display: true,
          text: "Dates",
        },
      },
      y: {
        title: {
          display: true,
          text: "Chiffre d'Affaire (en Euros)",
        },
        ticks: {
          callback: function (value) {
            return value + " €";
          },
        },
      },
    },
  };

  return (
    <div className="dashboard-container">
      <div className="stat-cards-container">
        <StatCard
          title="Chiffre d'Affaire"
          value={`€ ${totalChiffreAffaire.toLocaleString()}`}
          icon={<FaMoneyBillWave />}
        />
        <TotalOrdersCard
          title="Total des Commandes"
          value={totalCommandes}
          icon={<FaShoppingCart />}
        />
        <PanierCard
          title="Total des Commandes"
          value={totalCommandes}
          icon={<FaShoppingCart />}
        />
      </div>
      <div className="header">
        <h1>Sales Dashboard</h1>
      </div>
      <div className="chart-section">
        {chartData !== null ? (
          <Line data={chartData} options={options} />
        ) : (
          <p>Loading chart data...</p>
        )}
      </div>
      <div className="row">
        <div className="doughnut-chart-container col">
          <DoughnutChart className="chart" />
        </div>
        <div className="doughnut-chart-container col">
          <DoughnutCardP className="chart" />
        </div>
      </div>
    </div>
  );
};

export default DashSupport;
