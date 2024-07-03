import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../StatCard/StatCard.css';

const TotalOrdersCard = ({ title, icon }) => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/api/total-commandes-par-mode")
      .then((response) => response.json())
      .then((data) => {
        processApiData(data);
      })
      .catch((error) => console.error('Error fetching the data:', error));
  }, []);

  const processApiData = (data) => {
    const totalValue = data.reduce((total, item) => total + item["NbCommandes"], 0);
    setValue(totalValue);
  };

  return (
    <div className="stat-card">
      <div className="card-icon">
        {icon}
      </div>
      <div className="card-content">
        <div className="card-title">{title}</div>
        <div className="card-value">
          {value.toLocaleString()}
        </div>
      </div>
    </div>
  );
};

export default TotalOrdersCard;
