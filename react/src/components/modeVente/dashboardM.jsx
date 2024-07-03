import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import "chart.js/auto";
import "./../DashSupport.css";
import TotalOrdersCard from "./TotalOrdersCard"; // Assuming correct import path
import StatCard from "./StatCard";
import DoughnutCardM from "./DoughnutCardM";
import DoughnutChart from "./DoughnutChart";
import PanierCard from "../PanierCard";
import { FaMoneyBillWave, FaShoppingCart, FaChartBar } from "react-icons/fa";

const DashSupportM = () => {
  const [chartData, setChartData] = useState(null);
  const [totalCommandes, setTotalCommandes] = useState(0);
  const [panierMoyen, setPanierMoyen] = useState(0);

  const totalChiffreAffaire = 0;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [revenueRes, ordersRes, basketRes] = await Promise.all([
          fetch("http://127.0.0.1:5000/api/chiffre-affaire-par-mode"), // Updated API endpoint
          fetch("http://127.0.0.1:5000/api/total-commandes-par-mode"), // Updated API endpoint
          fetch("http://127.0.0.1:5000/api/panier-moyen-par-mode"), // Updated API endpoint
        ]);

        const [revenueData, ordersData, basketData] = await Promise.all([
          revenueRes.json(),
          ordersRes.json(),
          basketRes.json(),
        ]);

        processChartData(revenueData);
        processTotalOrders(ordersData);
        processAverageBasket(basketData);
      } catch (error) {
        console.error("Error fetching the data:", error);
      }
    };

    fetchData();
  }, []);

  const processChartData = (data) => {
    if (data.length === 0) return;

    const modes = [...new Set(data.map((item) => item["Mode de Vente"]))];
    const dates = [...new Set(data.map((item) => item.Date))];

    const chartData = {
      labels: dates,
      datasets: modes.map((mode, index) => ({
        label: mode,
        data: dates.map((date) => {
          const record = data.find(
            (item) => item.Date === date && item["Mode de Vente"] === mode
          );
          return record ? record["ChiffreAffaire"] : 0;
        }),
        fill: false,
        backgroundColor: `rgba(${index * 30}, 192, 192, 0.4)`,
        borderColor: `rgba(${index * 30}, 192, 192, 1)`,
      })),
    };

    setChartData(chartData);
  };

  const processTotalOrders = (data) => {
    const totalCommandes = data.reduce(
      (total, item) => total + item["NbCommandes"],
      0
    );
    setTotalCommandes(totalCommandes);
  };

  const processAverageBasket = (data) => {
    const panierMoyen =
      data.reduce((total, item) => total + item["Panier Moyen"], 0) /
      data.length;
    setPanierMoyen(panierMoyen);
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
          title="Panier Moyen"
          value={`€ ${panierMoyen.toFixed(2)}`}
          icon={<FaChartBar />}
        />
      </div>
      <div className="header">
        <h1>Service Dashboard</h1>
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
          <DoughnutCardM className="chart" />
        </div>
      </div>
    </div>
  );
};

export default DashSupportM;
