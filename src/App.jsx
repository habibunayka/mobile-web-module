import React, { useContext, useEffect, useState } from 'react'
import { BrowserRouter as Router, } from "react-router-dom";
import Events from "./pages/Events";
import Settings from "./pages/Settings";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import "./App.css";
import AppRoutes from "./routes";

function App() {
  return (
    <Router>
      <div className="app-container">
        <Header />
        <main className="main-content">
          <AppRoutes />
        </main>
        <Navbar />
      </div>
    </Router>
  );
}

export default App;
