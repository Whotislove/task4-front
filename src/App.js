import React from 'react';
import './app.scss';
import { Routes, Route } from 'react-router-dom';
import Autorization from './pages/Authorization';
import MainPage from './pages/MainPage';
import axios from './axios';
import { useDispatch } from 'react-redux';
import { addUserInfo } from './redux/slices/user';
function App() {
  const dispatch = useDispatch();
  React.useEffect(() => {
    async function getMe() {
      const { data } = await axios.get('/auth/me');
      dispatch(addUserInfo(data));
    }
    getMe();
  });
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
