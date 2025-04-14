import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/styles/Admin/StaffPage.css'; // Import custom CSS for styling

const StaffDashboard = () => {
    return (
        <div className="staff-dashboard">
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">
                <div className="container-fluid">
                    <a className="navbar-brand fw-bold" href="#">Contract Management System</a>
                    <span className="navbar-text text-white">Welcome, Staff Member</span>
                </div>
            </nav>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-3 sidebar p-0 bg-light border-end">
                        <ul className="nav flex-column p-3">
                            <li className="nav-item mb-2">
                                <a className="nav-link active" href="#">Dashboard</a>
                            </li>
                            <li className="nav-item mb-2">
                                <a className="nav-link" href="#">Assigned Tasks</a>
                            </li>
                            <li className="nav-item mb-2">
                                <a className="nav-link" href="#">Contract Overview</a>
                            </li>
                        </ul>
                    </div>
                    <div className="col-md-9 p-4">
                        <h3 className="mb-4 fw-semibold">Staff Dashboard</h3>
                        <div className="row g-4">
                            <div className="col-md-4">
                                <div className="card text-white bg-success shadow-sm rounded-4">
                                    <div className="card-body">
                                        <h5 className="card-title">Assigned Tasks</h5>
                                        <p className="card-text fs-4">5</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="card text-white bg-info shadow-sm rounded-4">
                                    <div className="card-body">
                                        <h5 className="card-title">Pending Tasks</h5>
                                        <p className="card-text fs-4">2</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="card text-white bg-warning shadow-sm rounded-4">
                                    <div className="card-body">
                                        <h5 className="card-title">Team Members</h5>
                                        <p className="card-text fs-4">3</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-5">
                            <h5 className="mb-3">Latest Updates</h5>
                            <div className="list-group rounded-3 shadow-sm">
                                <div className="list-group-item">Task "XYZ" completed successfully</div>
                                <div className="list-group-item">Contract #456 updated</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StaffDashboard;
