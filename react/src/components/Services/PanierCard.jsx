import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../StatCard/StatCard.css';

const PanierCard = ({ title, icon }) => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    fetch("/api/average-basket-by-service")
      .then((response) => response.json())
      .then((data) => {
        processApiData(data);
      })
      .catch((error) => console.error('Error fetching the data:', error));
  }, []);

  const processApiData = (data) => {
    if (data.length === 0) return;
    const totalPanier = data.reduce((total, item) => total + item["Panier Moyen"], 0);
    const averagePanier = totalPanier / data.length;
    setValue(averagePanier);
  };

  return (
    <div className="stat-card">
      <div className="card-icon">
        {icon}
      </div>
      <div className="card-content">
        <div className="card-title">{title}</div>
        <div className="card-value">
          {value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} €
        </div>
      </div>
    </div>
  );
};

export default PanierCard;
