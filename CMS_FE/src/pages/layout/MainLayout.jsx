import "./layout.css";
import { Bell, Calendar, CalendarRange, ChevronLeft, ChevronRight, Coins, Earth, Globe, Home, Lightbulb, ReceiptText, Settings, Sun, User } from 'lucide-react'
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom"
import { ToastContainer } from "react-toastify";

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
    const [showLangSelect, toggleLangSelect] = useState(false);
    const nav = useNavigate();
    return <>
        <ToastContainer style={{ zIndex: 10000 }} />
        <div className="container" onClick={(e) => { toggleLangSelect(false) }}>
            <div className="header-container">
                <div className="logo">
                    <img src='/blueoclogo.png' />
                    <p>Contract Management</p>
                </div>
                <div className="header-utility-bar">
                    <div className="lang-select-container" onClick={(e) => {
                        e.stopPropagation();
                        toggleLangSelect(!showLangSelect);
                    }}>
                        <img src="/united_states.png" /><p>ENG</p>
                        <ul className={`lang-select ${showLangSelect ? "show" : "hide"}`}>
                            <li><img src="/united_states.png" /><p>ENG</p></li>
                            <li><img src="/vietnam.png" /><p>VIE</p></li>
                        </ul>
                    </div>
                    <div className="theme-toggle"><Sun color="rgb(88, 88, 88)" /></div>
                    <div className="notification-container">
                        <div className="notification-icon"><Bell color="rgb(88, 88, 88)" /></div>
                        <div className="notification-amount">1</div>
                    </div>
                    <div className="user-option">
                        SA
                    </div>
                </div>
            </div>
            <div className="main-container">
                <div className={`nav-container ${showNavbarDetail ? "extend" : "collapse"}`}>
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
                        () => { toggleNavbarDetail(!showNavbarDetail) }
                    }>
                        {showNavbarDetail ?
                            <ChevronLeft color="#777" /> : <ChevronRight color="#777" />
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