import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { FaMoneyBillWave, FaShoppingCart, FaChartBar } from "react-icons/fa";

import TotalOrdersCard from "./TotalOrdersCard";
import StatCard from "./StatCard";
import DoughnutCardF from "./DoughnutCardF";
import DoughnutChart from "./DoughnutChart";
import PanierCard from "./PanierCard";

import "chart.js/auto";
import "./../DashSupport.css";

const DashSupportFamilies = () => {
  const [chartData, setChartData] = useState(null);
  const [totalCommandes, setTotalCommandes] = useState(0);
  const [panierMoyen, setPanierMoyen] = useState(0);

  const totalChiffreAffaire = 0;

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [revenueRes, ordersRes, basketRes] = await Promise.all([
        fetch("http://127.0.0.1:5000/api/chiffre-affaire-par-famille"),
        fetch("http://127.0.0.1:5000/api/total-commandes-par-famille"),
        fetch("http://127.0.0.1:5000/api/panier-moyen-par-famille")
      ]);

      const revenueData = await revenueRes.json();
      const ordersData = await ordersRes.json();
      const basketData = await basketRes.json();

      processChartData(revenueData);
      processTotalOrders(ordersData);
      processAverageBasket(basketData);
    } catch (error) {
      console.error("Error fetching the data:", error);
    }
  };

  const processChartData = (data) => {
    if (data.length === 0) return;

    const dates = [...new Set(data.map((item) => item.Date))];
    const families = [...new Set(data.map((item) => item.famille))];

    const chartData = {
      labels: dates,
      datasets: families.map((family, index) => ({
        label: family,
        data: dates.map((date) => {
          const record = data.find((item) => item.Date === date && item.famille === family);
          return record ? record["Chiffre Affaire"] : 0;
        }),
        fill: false,
        backgroundColor: `rgba(${index * 30}, 192, 192, 0.4)`, // Adjust color here
        borderColor: `rgba(${index * 30}, 192, 192, 1)` // Adjust border color here
      }))
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
    const panierMoyen = data.reduce(
      (total, item) => total + item["Panier Moyen"],
      0
    ) / data.length;
    setPanierMoyen(panierMoyen);
  };

  const options = {
    scales: {
      x: {
        title: {
          display: true,
          text: "Dates"
        }
      },
      y: {
        title: {
          display: true,
          text: "Chiffre d'Affaire (en Euros)"
        },
        ticks: {
          callback: function (value) {
            return value + " €";
          }
        }
      }
    }
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
          <DoughnutCardF className="chart" />
        </div>
      </div>
    </div>
  );
};

export default DashSupportFamilies;
