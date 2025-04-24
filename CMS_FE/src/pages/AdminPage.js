import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/styles/Admin/AdminPage.css';
import { useAuth } from '../hooks/useAuth';

const AdminDashboard = () => {
  const { user } = useAuth();

  return (
    <div className="admin-dashboard">
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">
        <div className="container-fluid">
          <a className="navbar-brand fw-bold" href="#">
            Contract Manage System
          </a>
          <span className="navbar-text text-white">Welcome, {user?.full_name || 'Admin'}</span>
        </div>
      </nav>

      <div className="container-fluid">
        <div className="row">
          <div className="col-md-2 sidebar p-0 bg-light border-end">
            <ul className="nav flex-column p-3">
              <li className="nav-item mb-2">
                <a className="nav-link active" href="#">
                  Dashboard
                </a>
              </li>
              <li className="nav-item mb-2">
                <a className="nav-link" href="#">
                  Manage Contracts
                </a>
              </li>
              <li className="nav-item mb-2">
                <a className="nav-link" href="#">
                  Clients
                </a>
              </li>
              <li className="nav-item mb-2">
                <a className="nav-link" href="#">
                  Contract Types
                </a>
              </li>
              <li className="nav-item mb-2">
                <a className="nav-link" href="#">
                  Reports
                </a>
              </li>
            </ul>
          </div>

          <div className="col-md-10 p-4">
            <h3 className="mb-4 fw-semibold">Admin Dashboard</h3>
            <div className="row g-4">
              <div className="col-md-4">
                <div className="card shadow-sm rounded-4">
                  <div className="card-body">
                    <h5 className="card-title">Total Contracts</h5>
                    <p className="card-text">120</p>
                  </div>
                </div>
              </div>

              <div className="col-md-4">
                <div className="card text-white bg-success shadow-sm rounded-4">
                  <div className="card-body">
                    <h5 className="card-title">Active Contracts</h5>
                    <p className="card-text fs-4">85</p>
                  </div>
                </div>
              </div>

              <div className="col-md-4">
                <div className="card text-white bg-danger shadow-sm rounded-4">
                  <div className="card-body">
                    <h5 className="card-title">Expired Contracts</h5>
                    <p className="card-text fs-4">35</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-5">
              <h5 className="mb-3">Recent Notifications</h5>
              <div className="list-group rounded-3 shadow-sm">
                <div className="list-group-item">Contract #234 will expire in 7 days</div>
                <div className="list-group-item">New contract added by ChauNguyen</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
