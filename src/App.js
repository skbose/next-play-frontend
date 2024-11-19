import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import ForgotPassword from './components/ForgotPassword';
import StudentPortal from './components/StudentPortal';
import RecruiterPortal from './components/RecruiterPortal';
import ViewJobs from './components/ViewJobs';
import ViewApplications from './components/ViewApplications';
import Navbar from './components/Navbar'; // Import Navbar component
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Track authentication state
  const [userType, setUserType] = useState(null); // Add userType state

  const login = (type) => {
    setIsAuthenticated(true); // Set authentication to true when logged in
    setUserType(type); // Set user type on login
  };

  const logout = () => {
    setIsAuthenticated(false); // Reset authentication
    setUserType(null); // Clear user type on logout
    localStorage.clear(); // Clear stored data on logout
  };

  return (
    <Router> {/* Wrap your application with Router */}
      <div className="App">
        <Navbar isAuthenticated={isAuthenticated} userType={userType} logout={logout} /> {/* Use Navbar component */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login login={login} />} /> {/* Pass login function */}
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/student-portal" element={<StudentPortal />} />
          <Route path="/recruiter-portal" element={<RecruiterPortal />} /> {/* Recruiter Portal */}
          <Route path="/view-jobs" element={<ViewJobs />} />
          <Route path="/view-applications" element={<ViewApplications />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
