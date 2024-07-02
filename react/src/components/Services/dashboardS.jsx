import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import "chart.js/auto";
import "./../DashSupport.css";
import TotalOrdersCard from "./TotalOrdersCard";  // Ensure this import statement is correct
import StatCard from "./StatCard";
import DoughnutCardP from "./DoughnutCardP";
import DoughnutChart from "./DoughnutChart";
import PanierCard from "./PanierCard";
import { FaMoneyBillWave, FaShoppingCart, FaChartBar } from "react-icons/fa";

const DashSupportS = () => {
  const [chartData, setChartData] = useState(null);
  const [totalChiffreAffaire, setTotalChiffreAffaire] = useState(0);
  const [totalCommandes, setTotalCommandes] = useState(0);
  const [panierMoyen, setPanierMoyen] = useState(0);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [revenueRes, ordersRes, basketRes] = await Promise.all([
        fetch("http://127.0.0.1:5000/api/daily-revenue"),
        fetch("http://127.0.0.1:5000/api/total-orders-by-service"),
        fetch("http://127.0.0.1:5000/api/average-basket-by-service")
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
    const nuitData = data.filter((item) => item["Service"] === "nuit");
    const midiData = data.filter((item) => item["Service"] === "midi");

    const totalChiffreAffaire = data.reduce(
      (total, item) => total + item["Chiffre Affaire"],
      0
    );

    setTotalChiffreAffaire(totalChiffreAffaire);

    const chartData = {
      labels: dates,
      datasets: [
        {
          label: "nuit",
          data: dates.map((date) => {
            const record = nuitData.find((item) => item.Date === date);
            return record ? record["Chiffre Affaire"] : 0;
          }),
          fill: false,
          backgroundColor: "rgba(75,192,192,0.4)",
          borderColor: "rgba(75,192,192,1)"
        },
        {
          label: "midi",
          data: dates.map((date) => {
            const record = midiData.find((item) => item.Date === date);
            return record ? record["Chiffre Affaire"] : 0;
          }),
          fill: false,
          backgroundColor: "rgba(192,75,192,0.4)",
          borderColor: "rgba(192,75,192,1)"
        }
      ]
    };

    setChartData(chartData);
  };

  const processTotalOrders = (data) => {
    const totalCommandes = data.reduce(
      (total, item) => total + item["Nombre Commandes"],
      0
    );
    setTotalCommandes(totalCommandes);
  };

  const processAverageBasket = (data) => {
    const panierMoyen = data.reduce(
      (total, item) => total + item["Panier Moyen Calculated"],
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
          <DoughnutCardP className="chart" />
        </div>
      </div>
    </div>
  );
};

export default DashSupportS;
