const AdminMenuComponent: React.FC = () => {
    return (
      <>
        <div className="app-menu navbar-menu">
            <div id="scrollbar">
                <div className="container-fluid">
                    <div id="two-column-menu">
                    </div>
                    <ul className="navbar-nav" id="navbar-nav">
                        <li className="menu-title"><span data-key="t-menu">Menu</span></li>

                        <li className="nav-item">
                            <a className="nav-link menu-link" href="#sidebarDashboards" data-bs-toggle="collapse" role="button" aria-expanded="false" aria-controls="sidebarDashboards">
                                <i className="ri-user-line"></i> <span data-key="t-dashboards">Users</span>
                            </a>
                            <div className="collapse menu-dropdown" id="sidebarDashboards">
                                <ul className="nav nav-sm flex-column">
                                    <li className="nav-item">
                                        <a href="/users" className="nav-link" data-key="t-analytics"> Manage Users </a>
                                    </li>
                                    <li className="nav-item">
                                        <a href="/transactions" className="nav-link" data-key="t-crm"> User Transactions </a>
                                    </li>
                                    <li className="nav-item">
                                        <a href="/tickets" className="nav-link" data-key="t-ecommerce"> Customer Queries </a>
                                    </li>
                                </ul>
                            </div>
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
                            <a className="nav-link menu-link" href="#sidebarDashboards" data-bs-toggle="collapse" role="button" aria-expanded="false" aria-controls="sidebarDashboards">
                            <i className="ri-settings-line"></i><span data-key="t-dashboards">Settings</span>
                            </a>
                            <div className="collapse menu-dropdown" id="sidebarDashboards">
                                <ul className="nav nav-sm flex-column">
                                    <li className="nav-item">
                                        <a href="/settings" className="nav-link" data-key="t-analytics"> Settings </a>
                                    </li>
                                    <li className="nav-item">
                                        <a href="/managetestimonials" className="nav-link" data-key="t-crm"> Manage Testimonials </a>
                                    </li>
                                </ul>
                            </div>
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
  
