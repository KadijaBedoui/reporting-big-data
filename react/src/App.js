import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

import { MainContent } from "./components/MainContent";
import SideBar from "./components/SideBar/SideBar";

import "./App.css";

export function App() {
  return (
    <Router>
      <div className="App">
        <SideBar />
        <MainContent />
      </div>
    </Router>
  );
}
