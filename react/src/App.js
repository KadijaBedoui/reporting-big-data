import React from 'react';

import DashSupport from './components/DashSupport';
import SideBar from './components/SideBar/SideBar';

import './App.css';

export function App() {
  return (
    <div className="App">
      <SideBar />
      <MainContent />
    </div>
  );
}

function MainContent() {
  return <div className="main-content">
  <Header />
  <DashSupport />
</div>
}
function Header() {
  return <header className="App-header">
  <h1>Tableau de Bord</h1>
</header>
}