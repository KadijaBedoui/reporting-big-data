import React from 'react';

const StatisticCard = ({ title, value }) => {
  return (
    <div className="statistic-card">
      <h3>{title}</h3>
      <p>{value}</p>
    </div>
  );
};

export default StatisticCard;
