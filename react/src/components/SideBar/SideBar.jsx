import React, { useState } from 'react';
import { Link } from 'react-router-dom';
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
        <div className="sidebar-logo"></div>
        <div className="sidebar-title">
          {isExpanded && <h1>Aures Group </h1>}
        </div>
      </div>
      <div className="sidebar-content">
        <div className="sidebar-section">
          <div className="section-title">
            <span>General</span>
          </div>
          <Link to="/support-vente" className="section-item">
            <FaHeadset />
            {isExpanded && <span>Support de Vente</span>}
          </Link>
          <Link to="/service" className="section-item">
            <FaConciergeBell />
            {isExpanded && <span>Service</span>}
          </Link>
          <Link to="/produit" className="section-item">
            <FaBox />
            {isExpanded && <span>Produit</span>}
          </Link>
          <Link to="/mode-vente" className="section-item">
            <FaExchangeAlt />
            {isExpanded && <span>Mode de Vente</span>}
          </Link>
          <Link to="/mode-paiement" className="section-item">
            <FaCreditCard />
            {isExpanded && <span>Mode de Paiement</span>}
          </Link>
          <Link to="/familles-produits" className="section-item">
            <FaTags />
            {isExpanded && <span>Familles Produits</span>}
          </Link>
          <Link to="/employeur" className="section-item">
            <FaUserTie />
            {isExpanded && <span>Employeur</span>}
          </Link>
        </div>
        <div className="sidebar-section">
          <div className="section-title">
            <span>Extra</span>
          </div>
          <Link to="/forecast" className="section-item">
            <FaBook />
            {isExpanded && <span>Forecast</span>}
          </Link>
          <Link to="/views" className="section-item">
            <FaHeart />
            {isExpanded && <span>Views</span>}
          </Link>
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
