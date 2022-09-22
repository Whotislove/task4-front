import React from 'react';
import './app.scss';
import { Routes, Route } from 'react-router-dom';
import Autorization from './pages/Authorization';
import MainPage from './pages/MainPage';
function App() {
  return (
    <div className="wrapper">
      <div className="content">
        <Routes>
          <Route path="/" element={<Autorization />} />
          <Route path="/main" element={<MainPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
