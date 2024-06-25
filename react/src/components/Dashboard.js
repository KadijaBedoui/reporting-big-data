import React, { useState, useEffect } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import Papa from 'papaparse'; // Import PapaParse
import CSVReader from './CSVReader'; // Ensure this is imported correctly if needed

// Register Chart.js elements and scales globally
ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, Title, Tooltip, Legend);

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/CSVs/support_de_vente_data.csv');
        const text = await response.text();
        const parsedData = Papa.parse(text, { header: true }).data;
        setData(parsedData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false); // Set loading to false even on error
      }
    };

    fetchData();
  }, []);

  const aggregateData = (key) => {
    return data.reduce((acc, curr) => {
      const support = curr['Support de Vente'];
      if (!acc[support]) {
        acc[support] = {};
      }
      const date = curr['Date'];
      const value = parseFloat(curr[key]);
      if (!acc[support][date]) {
        acc[support][date] = 0;
      }
      acc[support][date] += value;
      return acc;
    }, {});
  };

  const createBarChartData = (aggregatedData, label) => {
    return {
      labels: Object.keys(aggregatedData),
      datasets: [{
        label: label,
        data: Object.values(aggregatedData),
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      }],
    };
  };

  const createLineChartData = (aggregatedData, label, color) => {
    // Vérifiez si aggregatedData est défini et contient des données
    if (!aggregatedData || Object.keys(aggregatedData).length === 0) {
      console.error('Invalid aggregatedData:', aggregatedData);
      return null; // Ou retournez un objet vide ou une valeur par défaut selon votre logique
    }
  
    // Continuez avec la création des données de chart
    return {
      labels: Object.keys(aggregatedData),
      datasets: [{
        label: label,
        data: Object.values(aggregatedData),
        fill: false,
        borderColor: color,
        tension: 0.1,
      }],
    };
  };
  
  

  if (loading) {
    return <p>Loading data...</p>;
  }

  // Aggregate data for different metrics
  const chiffreAffaireData = aggregateData('ChiffreAffaire');
  const nbCommandesData = aggregateData('NbCommandes');
  const panierMoyenData = aggregateData('Panier Moyen');

  return (
    <div>
      <h2>Chiffre d'Affaires par Support de Vente</h2>
      <Bar data={createBarChartData(chiffreAffaireData, 'Chiffre d\'Affaires')} />

      <h2>Nombre de Commandes par Support de Vente</h2>
      <Bar data={createBarChartData(nbCommandesData, 'Nombre de Commandes')} />

      <h2>Panier Moyen par Support de Vente</h2>
      <Bar data={createBarChartData(panierMoyenData, 'Panier Moyen')} />

      <h2>Chiffre d'Affaires par Support de Vente chaque jour</h2>
      <Line data={createLineChartData(chiffreAffaireData['Kiosk'], 'Kiosk', 'rgba(255, 99, 132, 0.6)')} />
      <Line data={createLineChartData(chiffreAffaireData['POS'], 'POS', 'rgba(54, 162, 235, 0.6)')} />
      <Line data={createLineChartData(chiffreAffaireData['Application C&C'], 'Application C&C', 'rgba(255, 206, 86, 0.6)')} />
    </div>
  );
};

export default Dashboard;

/*  import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import CSVReader from './CSVReader';
import PieChart from './PieChart';
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [csvData, setCsvData] = useState(null);
  const handleDataLoaded = (loadedData) => {
    setData(loadedData);
  };

  const aggregateData = (key) => {
    return data.reduce((acc, curr) => {
      const support = curr['Support de Vente'];
      if (!acc[support]) {
        acc[support] = 0;
      }
      acc[support] += parseFloat(curr[key]);
      return acc;
    }, {});
  };

  const chiffreAffaireData = aggregateData('ChiffreAffaire');
  const nbCommandesData = aggregateData('NbCommandes');
  const panierMoyenData = aggregateData('Panier Moyen');

  const createChartData = (aggregatedData, label) => {
    return {
      labels: Object.keys(aggregatedData),
      datasets: [
        {
          label: label,
          data: Object.values(aggregatedData),
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
        },
      ],
    };
  };
  

  return (
    <div>
      <CSVReader onDataLoaded={handleDataLoaded} />
      {data.length > 0 && (
        <div>
          <h2>Chiffre d'Affaires par Support de Vente</h2>
          <Bar data={createChartData(chiffreAffaireData, 'Chiffre d\'Affaires')} />

          <h2>Nombre de Commandes par Support de Vente</h2>
          <Bar data={createChartData(nbCommandesData, 'Nombre de Commandes')} />

          <h2>Panier Moyen par Support de Vente</h2>
          <Bar data={createChartData(panierMoyenData, 'Panier Moyen')} />
        </div>
      )}
      
    </div>
  );
};

export default Dashboard; 

 */