import "./layout.css";
import { Calendar, CalendarRange, ChevronLeft, ChevronRight, Coins, Earth, Globe, Home, ReceiptText, Settings, User } from 'lucide-react'
import logoImg from '../../assets/blueoclogo.png'
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom"

const menuItems = [
    { page: "/", id: 1, icon: <Home color="rgb(63, 63, 63)" size={24} />, name: "Home" },
    { page: "/accounts", id: 2, icon: <User color="rgb(63, 63, 63)" size={24} />, name: "Accounts" },
    { page: "/projects", id: 3, icon: <Earth color="rgb(63, 63, 63)" size={24} />, name: "Projects" },
    { page: "/timesheet", id: 4, icon: <CalendarRange color="rgb(63, 63, 63)" size={24} />, name: "Timesheet" },
    { page: "/", id: 5, icon: <Coins color="rgb(63, 63, 63)" size={24} />, name: "Expense" },
    { page: "/invoices", id: 6, icon: <ReceiptText color="rgb(63, 63, 63)" size={24} />, name: "Invoices" }
];
const MainLayout = () => {
    const [page, openPage] = useState(1);
    const [showNavbarDetail, toggleNavbarDetail] = useState(true);
    const nav = useNavigate();
    return <>
        <div className="container">
            <div className="header-container">
                <div className="logo">
                    <img src={logoImg} />
                    <p>Contract Management</p>
                </div>
            </div>
            <div className="main-container">
                <div className={`nav-container ${showNavbarDetail?"extend":"collapse"}`}>
                    <div className="nav-btns">
                        {menuItems.map((item) => (
                            <div
                                key={item.id}
                                className={`nav-btn ${page === item.id ? "active" : ""}`}
                                onClick={() => { nav(item.page); openPage(item.id) }}>
                                <div>{item.icon}</div>
                                <div style={{ display: showNavbarDetail ? "flex" : "none" }}>
                                    {item.name}
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="nav-extend-btn" onClick={
                        ()=>{toggleNavbarDetail(!showNavbarDetail)}
                    }>
                        {showNavbarDetail?
                        <ChevronLeft color="#777"/>:<ChevronRight color="#777"/>
                        }
                    </div>
                </div>
                <div className="main">
                    <Outlet />
                </div>
            </div>
        </div>
    </>
}
export default MainLayout;