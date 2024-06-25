import React, { useState } from 'react';
import {
  FaBook, FaHeart,
  FaAngleDown, FaAngleUp, FaHeadset, FaConciergeBell, FaBox, FaExchangeAlt, FaCreditCard, FaTags, FaUserTie
} from 'react-icons/fa';

import './SideBar.css';

const SideBar = () => {
  const [isExpanded, setIsExpanded] = useState(true);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={`sidebar ${isExpanded ? 'expanded' : 'collapsed'}`}>
      <div className="sidebar-header">
        <div className="sidebar-logo">
          
        </div>
        <div className="sidebar-title">
          {isExpanded && <h1>Aures Group </h1>}
        </div>
      </div>
      <div className="sidebar-content">
        <div className="sidebar-section">
          <div className="section-title">
            <span>General</span>
          </div>
          <div className="section-item">
            <FaHeadset />
            {isExpanded && <span>Support de Vente</span>}
          </div>
          <div className="section-item">
            <FaConciergeBell />
            {isExpanded && <span>Service</span>}
          </div>
          <div className="section-item">
            <FaBox />
            {isExpanded && <span>Produit</span>}
          </div>
          <div className="section-item">
            <FaExchangeAlt />
            {isExpanded && <span>Mode de Vente</span>}
          </div>
          <div className="section-item">
            <FaCreditCard />
            {isExpanded && <span>Mode de Paiement</span>}
          </div>
          <div className="section-item">
            <FaTags />
            {isExpanded && <span>Familles Produits</span>}
          </div>
          <div className="section-item">
            <FaUserTie />
            {isExpanded && <span>Employeur</span>}
          </div>
        </div>
        <div className="sidebar-section">
          <div className="section-title">
            <span>Extra</span>
          </div>
          
          <div className="section-item">
            <FaBook />
            {isExpanded && <span>Forecast</span>}
          </div>
          <div className="section-item">
            <FaHeart />
            {isExpanded && <span>Views</span>}
          </div>
        </div>
      </div>
      <div className="sidebar-footer">
        <button onClick={toggleExpand}>
          {isExpanded ? <FaAngleUp /> : <FaAngleDown />}
        </button>
      </div>
    </div>
  );
};

export default SideBar;
