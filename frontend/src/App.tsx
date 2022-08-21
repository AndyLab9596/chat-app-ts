import axios from 'axios'
import React, { useEffect } from 'react';
import './App.css';
import { Routes, Route } from "react-router-dom";
import HomePage from './pages/HomePage';
import ChatPage from './pages/ChatPage';

const App = () => {
  useEffect(() => {
    const testingRoute = async () => {
      const response = await axios.get('/api/v1');
      console.log(response);
    }
    testingRoute();
  }, [])
  return (
    <div className='App'>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="chats" element={<ChatPage />} />
      </Routes>
    </div>
  )
}

export default App