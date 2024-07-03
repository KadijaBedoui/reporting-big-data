import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import '../StatCard/StatCard.css';

const StatCard = ({ title, url, valueKey, icon }) => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        processApiData(data);
      })
      .catch((error) => console.error("Error fetching the data:", error));
  }, [url]);

  const processApiData = (data) => {
    if (data.length === 0) return;
    const totalValue = data.reduce((total, item) => total + item[valueKey], 0);
    setValue(totalValue);
  };

  return (
    <div className="stat-card">
      <div className="card-icon">{icon}</div>
      <div className="card-content">
        <div className="card-title">{title}</div>
        <div className="card-value">
          {value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} €
        </div>
      </div>
    </div>
  );
};

export default StatCard;
