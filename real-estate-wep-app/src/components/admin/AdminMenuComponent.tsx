import React from "react";

const AdminMenuComponent: React.FC = () => {
  return (
    <>
      <div className="app-menu navbar-menu">
        <div id="scrollbar">
          <div className="container-fluid">
            <div id="two-column-menu"></div>
            <ul className="navbar-nav" id="navbar-nav">
              <li className="menu-title"><span data-key="t-menu">Menu</span></li>

              <li className="nav-item">
                <a className="nav-link menu-link" href="/users">
                  <i className="ri-user-line"></i> <span data-key="t-dashboards">Users</span>
                </a>
              </li>

              <li className="nav-item">
                <a className="nav-link menu-link" href="/transactions">
                  <i className="ri-exchange-line"></i> <span>User Transactions</span>
                </a>
              </li>

              <li className="nav-item">
                <a className="nav-link menu-link" href="/tickets">
                  <i className="ri-customer-service-line"></i> <span>Customer Queries</span>
                </a>
              </li>

              <li className="nav-item">
                <a className="nav-link menu-link" href="/manageproperties">
                  <i className="ri-home-line"></i> <span data-key="t-dashboards">Properties</span>
                </a>
              </li>

              <li className="nav-item">
                <a className="nav-link menu-link" href="/managecareers">
                  <i className="ri-briefcase-line"></i> <span data-key="t-dashboards">Careers</span>
                </a>
              </li>

              <li className="nav-item">
                <a className="nav-link menu-link" href="/managefaq">
                  <i className="ri-information-line"></i> <span data-key="t-dashboards">FAQ</span>
                </a>
              </li>

              <li className="nav-item">
                <a className="nav-link menu-link" href="/managemailinglist">
                  <i className="ri-mail-star-line"></i> <span data-key="t-dashboards">Mailing List</span>
                </a>
              </li>

              <li className="nav-item">
                <a className="nav-link menu-link" href="/settings">
                  <i className="ri-settings-line"></i> <span data-key="t-dashboards">Settings</span>
                </a>
              </li>

              <li className="nav-item">
                <a className="nav-link menu-link" href="/managetestimonials">
                  <i className="ri-star-line"></i> <span>Manage Testimonials</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="sidebar-background"></div>
      </div>
    </>
  );
};

export default AdminMenuComponent;