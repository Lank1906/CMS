import './layout.css';
import {
  Bell,
  CalendarRange,
  ChevronLeft,
  ChevronRight,
  Coins,
  Earth,
  Home,
  ReceiptText,
  Sun,
  User,
} from 'lucide-react';
import { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

const menuItems = [
  { page: '/cms', id: 1, icon: <Home color="rgb(63, 63, 63)" size={24} />, name: 'Home' },
  {
    page: '/cms/accounts',
    id: 2,
    icon: <User color="rgb(63, 63, 63)" size={24} />,
    name: 'Accounts',
  },
  {
    page: '/cms/projects',
    id: 3,
    icon: <Earth color="rgb(63, 63, 63)" size={24} />,
    name: 'Projects',
  },
  {
    page: '/cms/timesheet',
    id: 4,
    icon: <CalendarRange color="rgb(63, 63, 63)" size={24} />,
    name: 'Timesheet',
  },
  { page: '/cms/', id: 5, icon: <Coins color="rgb(63, 63, 63)" size={24} />, name: 'Expense' },
  {
    page: '/cms/invoices',
    id: 6,
    icon: <ReceiptText color="rgb(63, 63, 63)" size={24} />,
    name: 'Invoices',
  },
];
const MainLayout = () => {
  const [page, openPage] = useState(1);
  const [showNavbarDetail, toggleNavbarDetail] = useState(true);
  const [showLangSelect, toggleLangSelect] = useState(false);
  const nav = useNavigate();
  return (
    <>
      <ToastContainer style={{ zIndex: 10000 }} />
      <div
        className="main-layout-container"
        onClick={() => {
          toggleLangSelect(false);
        }}
      >
        <div className="header-container">
          <div className="main-layout-logo">
            <img src="/blueoclogo.png" />
            Contract Management
          </div>
          <div className="header-utility-bar">
            <div
              className="lang-select-container"
              onClick={(e) => {
                e.stopPropagation();
                toggleLangSelect(!showLangSelect);
              }}
            >
              <img src="/united_states.png" />
              ENG
              <ul className={`lang-select ${showLangSelect ? 'show' : 'hide'}`}>
                <li>
                  <img src="/united_states.png" />
                  ENG
                </li>
                <li>
                  <img src="/vietnam.png" />
                  VIE
                </li>
              </ul>
            </div>
            <div className="theme-toggle">
              <Sun color="rgb(88, 88, 88)" />
            </div>
            <div className="notification-container">
              <div className="notification-icon">
                <Bell color="rgb(88, 88, 88)" />
              </div>
              <div className="notification-amount">1</div>
            </div>
            <div className="user-option">SA</div>
          </div>
        </div>
        <div className="main-container">
          <div className={`nav-container ${showNavbarDetail ? 'extend' : 'collapse'}`}>
            <div className="nav-btns">
              {menuItems.map((item) => (
                <div
                  key={item.id}
                  className={`nav-btn ${page === item.id ? 'active' : ''}`}
                  onClick={() => {
                    nav(item.page);
                    openPage(item.id);
                  }}
                >
                  <div>{item.icon}</div>
                  <div style={{ display: showNavbarDetail ? 'flex' : 'none' }}>{item.name}</div>
                </div>
              ))}
            </div>
            <div
              className="nav-extend-btn"
              onClick={() => {
                toggleNavbarDetail(!showNavbarDetail);
              }}
            >
              {showNavbarDetail ? <ChevronLeft color="#777" /> : <ChevronRight color="#777" />}
            </div>
          </div>
          <div className="main">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};
export default MainLayout;
