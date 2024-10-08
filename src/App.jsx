import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import SideBar from './components/SideBar/SideBar';
import Main from './components/Main/Main';
import Form from './components/Form/form';
import LandingPage from './components/Home/home';
import './App.css';
import Conv from './components/Conversation/conv';
import EmotionsDetection from './components/EmotionDetection';

const App = () => {
  return (
    <Router>
      <SideBar/>
      <Routes>
        {/* When the path is '/', render the SideBar component */}
        <Route path="/" element={<LandingPage/>} />
        <Route path="/infocollect" element={<Form />} />
        
        <Route path="/conversation" element={<Conv />} />
        
        <Route path="/emdetect" element={<EmotionsDetection/>} />

        {/* When the path is '/bot', render the Main component */}
        <Route path="/bot" element={<Main />} />

        {/* Redirect any unknown path to '/' */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
