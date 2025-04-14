import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRouter from './router/AppRouter';
import { AuthProvider } from './context/AuthContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const App = () => {
  return (
    <AuthProvider>
      <Router>
        <AppRouter />
        <ToastContainer />
      </Router>
    </AuthProvider>
  );
};
export default App;


