import { Route, Routes } from 'react-router-dom';

import DashSupport from '../DashSupport';
import DashSupportS from '../Services/dashboardS';
import DashSupportP from '../Produit/dashboardP';
import DashSupportF from '../families/DashSupportFamilies';
import DashSupportM from '../modeVente/dashboardM';
import {Header} from "../Header";

export function MainContent() {
    return (
      <div className="main-content">
        <Header />
        <Routes>
          <Route path="/support-vente" element={<DashSupport />} />
          <Route path="/service" element={<DashSupportS />} />
          <Route path="/produit" element={<DashSupportP />} />
          <Route path="/familles-produits" element={<DashSupportF />} />
          <Route path="/mode-vente" element={<DashSupportM />} /> 
          
        </Routes>
      </div>
    );
  }
  