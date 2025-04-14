import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/styles/Admin/PMPage.css';
const PMDashboard = () => {
    return (
        <div className="pm-dashboard">
            <nav className="navbar navbar-expand-lg navbar-dark bg-success shadow-sm">
                <div className="container-fluid">
                    <a className="navbar-brand fw-bold" href="#">Contract Manage Systerm</a>
                    <span className="navbar-text text-white">Welcome, Project Manager</span>
                </div>
            </nav>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-2 sidebar p-0 bg-white border-end">
                        <ul className="nav flex-column p-3">
                            <li className="nav-item mb-2">
                                <a className="nav-link active" href="#">Dashboard</a>
                            </li>
                            <li className="nav-item mb-2">
                                <a className="nav-link" href="#">My Projects</a>
                            </li>
                            <li className="nav-item mb-2">
                                <a className="nav-link" href="#">Assigned Contracts</a>
                            </li>
                            <li className="nav-item mb-2">
                                <a className="nav-link" href="#">Team Overview</a>
                            </li>
                        </ul>
                    </div>
                    <div className="col-md-10 p-4">
                        <h3 className="mb-4 fw-semibold">PM Dashboard</h3>
                        <div className="row g-4">
                            <div className="col-md-4">
                                <div className="card text-white bg-primary shadow-sm rounded-4">
                                    <div className="card-body">
                                        <h5 className="card-title">Active Projects</h5>
                                        <p className="card-text fs-4">6</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="card text-white bg-warning shadow-sm rounded-4">
                                    <div className="card-body">
                                        <h5 className="card-title">Pending Approvals</h5>
                                        <p className="card-text fs-4">3</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="card text-white bg-secondary shadow-sm rounded-4">
                                    <div className="card-body">
                                        <h5 className="card-title">Team Members</h5>
                                        <p className="card-text fs-4">12</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-5">
                            <h5 className="mb-3">Latest Activities</h5>
                            <div className="list-group rounded-3 shadow-sm">
                                <div className="list-group-item">Project "ABC" updated status to "Review"</div>
                                <div className="list-group-item">Contract #123 assigned to Team A</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default PMDashboard;
