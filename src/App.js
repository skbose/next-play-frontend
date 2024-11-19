import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import ForgotPassword from './components/ForgotPassword';
import StudentPortal from './components/StudentPortal';
import RecruiterPortal from './components/RecruiterPortal';
import Navbar from './components/Navbar'; // Import Navbar component
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Track authentication state

  const login = () => {
    setIsAuthenticated(true); // Set authentication to true
  };

  const logout = () => {
    setIsAuthenticated(false); // Reset authentication
  };

  return (
    <Router> {/* Wrap your application with Router */}
      <div className="App">
        <Navbar isAuthenticated={isAuthenticated} logout={logout} /> {/* Use Navbar component */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login login={login} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/student-portal" element={<StudentPortal />} />
          <Route path="/recruiter-portal" element={<RecruiterPortal />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
