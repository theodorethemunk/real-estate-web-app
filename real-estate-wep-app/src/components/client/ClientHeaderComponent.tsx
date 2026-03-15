import React, { useEffect, useState } from "react";
import { Setting } from "../../services/dbservices/company/FetchCompanyInfo";
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import { isValidEmail } from "../../services/Util/Validator";
import { removeLoginSession } from "../../services/session/UserLoginSession";

const ClientHeaderComponent: React.FC<{ settings: Setting[], savedUserEmail: string, loginId: string }> = ({ settings, savedUserEmail, loginId }) => {

  const supportEmailSettings = settings.find(setting => setting.name.toLowerCase() === "support email");
  const infoEmailSettings = settings.find(setting => setting.name.toLowerCase() === "info email");
  const companyPhoneNumberSettings = settings.find(setting => setting.name.toLowerCase() === "company phone");
  const companyAddressSettings = settings.find(setting => setting.name.toLowerCase() === "company address");

  const facebookPageSettings = settings.find(setting => setting.name.toLowerCase() === "facebook page");
  const youtubeChannelSettings = settings.find(setting => setting.name.toLowerCase() === "youtube channel");
  const instagramProfileSettings = settings.find(setting => setting.name.toLowerCase() === "instagram profile");
  const linkedinPageSettings = settings.find(setting => setting.name.toLowerCase() === "linkedin profile");

  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const searchKeyword = searchParams.get("search") || "";
    setSearchTerm(searchKeyword);

  }, [searchParams]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/listing?search=${encodeURIComponent(searchTerm)}`);
    } else {
      navigate("/listing");
    }
  };
  
  const gotoHome = () => {
    navigate("/home");
  };

  const handleSignOut = () => {
    removeLoginSession();
    window.location.href = "/home";
  };

  return (
    <>
      <div className="header-search-form-wrapper">
        <div className="tx-search-close tx-close"><i className="fa-solid fa-xmark"></i></div>
        <div className="header-search-container">
          <form role="search" className="search-form" onSubmit={handleSubmit}>
            <input type="search" className="search-field" placeholder="Search for properties…" name="s" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
            <button type="submit" className="search-submit"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M13.7955 13.8111L19 19M16 8.5C16 12.6421 12.6421 16 8.5 16C4.35786 16 1 12.6421 1 8.5C1 4.35786 4.35786 1 8.5 1C12.6421 1 16 4.35786 16 8.5Z" stroke="#030E0F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg></button>
          </form>
        </div>
      </div>
      <div className="body-overlay"></div>

      <header>
        <div className="header-area homepage1 header header-sticky d-none d-lg-block " id="header">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="header-top-area">
                  <ul className="header-content">
                    <li><a href="#"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M3 3H21C21.5523 3 22 3.44772 22 4V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V4C2 3.44772 2.44772 3 3 3ZM12.0606 11.6829L5.64722 6.2377L4.35278 7.7623L12.0731 14.3171L19.6544 7.75616L18.3456 6.24384L12.0606 11.6829Z"></path>
                    </svg> {supportEmailSettings?.context}</a> <span style={{ color: "#fff" }}> | </span></li>
                    <li><a href="tel:(234)345-4574"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M21 16.42V19.9561C21 20.4811 20.5941 20.9167 20.0705 20.9537C19.6331 20.9846 19.2763 21 19 21C10.1634 21 3 13.8366 3 5C3 4.72371 3.01545 4.36687 3.04635 3.9295C3.08337 3.40588 3.51894 3 4.04386 3H7.5801C7.83678 3 8.05176 3.19442 8.07753 3.4498C8.10067 3.67907 8.12218 3.86314 8.14207 4.00202C8.34435 5.41472 8.75753 6.75936 9.3487 8.00303C9.44359 8.20265 9.38171 8.44159 9.20185 8.57006L7.04355 10.1118C8.35752 13.1811 10.8189 15.6425 13.8882 16.9565L15.4271 14.8019C15.5572 14.6199 15.799 14.5573 16.001 14.6532C17.2446 15.2439 18.5891 15.6566 20.0016 15.8584C20.1396 15.8782 20.3225 15.8995 20.5502 15.9225C20.8056 15.9483 21 16.1633 21 16.42Z"></path>
                    </svg>{companyPhoneNumberSettings?.context}</a><span style={{ color: "#fff" }}> | </span></li>
                  </ul>
                  <ul className="list-content">
                    {isValidEmail(savedUserEmail) && loginId ? (
                      <li><a href="/profile" className="signin"><span style={{ color: "#fff" }}> | </span>Profile</a></li>
                    ) : (
                      <li><a href="/signin" className="signin"><span style={{ color: "#fff" }}> | </span>Account</a></li>
                    )
                    }
                  </ul>
                </div>
                <div className="header-elements">
                  <div className="site-logo">
                    <img src="/client/img/logo/main-logo.png" alt="main-logo" onClick={() => gotoHome()} />
                  </div>
                  <div className="main-menu">
                    <ul>
                      <li><a onClick={() => gotoHome()} className="plus">Home</a></li>
                      <li><a href="/listing" className="plus">Properties</a></li>
                      <li><a href="/careers" className="plus">Careers</a></li>
                      <li><a href="/pricehistory" className="plus">Price History</a></li>
                      <li><a href="/helpcenter" className="plus">Help Center</a></li>
                      {/* SBPI Program Dropdown */}
                      <li className="nav-item dropdown">
                        <a
                          href="/sbpi"
                          className="nav-link dropdown-toggle plus"
                          id="sbpiDropdown"
                          role="button"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          Programs <i className="fa-solid fa-angle-down"></i>
                        </a>
                        <ul className="dropdown-menu" aria-labelledby="sbpiDropdown">
                          <li><a className="dropdown-item" href="/sbpi">SBPI Program</a></li>
                          <li><a className="dropdown-item" href="/sbpi#p2p">Profit 2 Property</a></li>
                        </ul>
                      </li>
                      {isValidEmail(savedUserEmail) && loginId && (
                        <li className="nav-item dropdown">
                          <a
                            href="#"
                            className="nav-link dropdown-toggle"
                            id="accountDropdown"
                            role="button"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                          >
                            Account <i className="fa-solid fa-angle-down"></i>
                          </a>
                          <ul className="dropdown-menu" aria-labelledby="accountDropdown">
                            <li><a className="dropdown-item" href="/profile">Profile</a></li>
                            <li><a className="dropdown-item" href="/myproperties">My Properties</a></li>
                            <li><a className="dropdown-item" href="/mytransactions">My Transactions</a></li>
                            <li><hr className="dropdown-divider" /></li>
                            <li><button className="dropdown-item text-danger" onClick={handleSignOut}>Log Out</button></li>
                          </ul>
                        </li>
                      )}
                    </ul>
                  </div>
                  <div className="btn-area">
                    <div className="search-icon header__search header-search-btn">
                      <a href="#"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M18.031 16.6168L22.3137 20.8995L20.8995 22.3137L16.6168 18.031C15.0769 19.263 13.124 20 11 20C6.032 20 2 15.968 2 11C2 6.032 6.032 2 11 2C15.968 2 20 6.032 20 11C20 13.124 19.263 15.0769 18.031 16.6168ZM16.0247 15.8748C17.2475 14.6146 18 12.8956 18 11C18 7.1325 14.8675 4 11 4C7.1325 4 4 7.1325 4 11C4 14.8675 7.1325 18 11 18C12.8956 18 14.6146 17.2475 15.8748 16.0247L16.0247 15.8748Z"></path>
                      </svg></a>
                    </div>
                    <a href="/listing" className="theme-btn1">View Listing <span className="arrow1"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                      <path d="M12 13H4V11H12V4L20 12L12 20V13Z"></path>
                    </svg></span><span className="arrow2"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                      <path d="M12 13H4V11H12V4L20 12L12 20V13Z"></path>
                    </svg></span></a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="mobile-header mobile-header1 d-block d-lg-none">
        <div className="container-fluid">
          <div className="col-12">
            <div className="mobile-header-elements">
              <div className="mobile-logo">
                <a href="/home"><img src="/client/img/logo/main-logo.png" /></a>
              </div>
              <div className="mobile-right d-flex gap-1 align-items-center">
                <div className="search-icon header__search header-search-btn">
                  <a href="#" className="circle-button add-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.031 16.6168L22.3137 20.8995L20.8995 22.3137L16.6168 18.031C15.0769 19.263 13.124 20 11 20C6.032 20 2 15.968 2 11C2 6.032 6.032 2 11 2C15.968 2 20 6.032 20 11C20 13.124 19.263 15.0769 18.031 16.6168ZM16.0247 15.8748C17.2475 14.6146 18 12.8956 18 11C18 7.1325 14.8675 4 11 4C7.1325 4 4 7.1325 4 11C4 14.8675 7.1325 18 11 18C12.8956 18 14.6146 17.2475 15.8748 16.0247L16.0247 15.8748Z"></path>
                    </svg>
                  </a></div>
                <div className="mobile-nav-icon dots-menu">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3 4H21V6H3V4ZM7 19H21V21H7V19ZM3 14H21V16H3V14ZM7 9H21V11H7V9Z"></path>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mobile-sidebar mobile-sidebar1">
        <div className="logosicon-area">
          <div className="logos">
            <img src="/client/img/logo/main-logo.png" />
          </div>
          <div className="menu-close">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M10.5859 12L2.79297 4.20706L4.20718 2.79285L12.0001 10.5857L19.793 2.79285L21.2072 4.20706L13.4143 12L21.2072 19.7928L19.793 21.2071L12.0001 13.4142L4.20718 21.2071L2.79297 19.7928L10.5859 12Z"></path>
            </svg>
          </div>
        </div>
        <div className="mobile-nav mobile-nav1">
          <ul className="mobile-nav-list nav-list1">
            <li><a href="/home">Home</a></li>
            <li><a href="/listing">Properties</a></li>
            <li><a href="/careers">Careers</a></li>
            <li><a href="/pricehistory">Price History</a></li>
            <li><a href="/helpcenter">Help Center</a></li>
            {/* SBPI Programs in mobile menu */}
            <li>
              <a href="#" className="plus">Programs</a>
              <ul className="sub-menu">
                <li><a href="/sbpi">SBPI Program</a></li>
                <li><a href="/sbpi">Profit 2 Property</a></li>
              </ul>
            </li>
            {isValidEmail(savedUserEmail) && loginId ? (
              <li>
                <a href="#" className="plus">Account</a>
                <ul className="sub-menu">
                  <li><a href="/profile">Profile</a></li>
                  <li><a href="/myproperties">My Properties</a></li>
                  <li><a href="/mytransactions">My Transactions</a></li>
                  <li><a onClick={handleSignOut}>Log Out</a></li>
                </ul>
              </li>
            ) : <li>
              <a href="#" className="plus">Account</a>
              <ul className="sub-menu">
                <li><a href="/signin">Sign In</a></li>
                <li><a href="/signup">Sign up</a></li>
              </ul>
            </li>}
          </ul>

          <div className="allmobilesection">
            <a href="/contact" className="theme-btn1">Contact Us <span className="arrow1"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
              <path d="M12 13H4V11H12V4L20 12L12 20V13Z"></path>
            </svg></span><span className="arrow2"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
              <path d="M12 13H4V11H12V4L20 12L12 20V13Z"></path>
            </svg></span></a>
            <div className="single-footer">
              <h3>Contact Info</h3>
              <div className="footer1-contact-info">
                <div className="contact-info-single">
                  <div className="contact-info-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M21 16.42V19.9561C21 20.4811 20.5941 20.9167 20.0705 20.9537C19.6331 20.9846 19.2763 21 19 21C10.1634 21 3 13.8366 3 5C3 4.72371 3.01545 4.36687 3.04635 3.9295C3.08337 3.40588 3.51894 3 4.04386 3H7.5801C7.83678 3 8.05176 3.19442 8.07753 3.4498C8.10067 3.67907 8.12218 3.86314 8.14207 4.00202C8.34435 5.41472 8.75753 6.75936 9.3487 8.00303C9.44359 8.20265 9.38171 8.44159 9.20185 8.57006L7.04355 10.1118C8.35752 13.1811 10.8189 15.6425 13.8882 16.9565L15.4271 14.8019C15.5572 14.6199 15.799 14.5573 16.001 14.6532C17.2446 15.2439 18.5891 15.6566 20.0016 15.8584C20.1396 15.8782 20.3225 15.8995 20.5502 15.9225C20.8056 15.9483 21 16.1633 21 16.42Z"></path>
                    </svg>
                  </div>
                  <div className="contact-info-text">
                    <a href={companyPhoneNumberSettings?.context ? `tel:${companyPhoneNumberSettings.context}` : "#"}>
                      {companyPhoneNumberSettings?.context || "N/A"}
                    </a>
                  </div>
                </div>
                <div className="contact-info-single">
                  <div className="contact-info-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M3 3H21C21.5523 3 22 3.44772 22 4V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V4C2 3.44772 2.44772 3 3 3ZM12.0606 11.6829L5.64722 6.2377L4.35278 7.7623L12.0731 14.3171L19.6544 7.75616L18.3456 6.24384L12.0606 11.6829Z"></path>
                    </svg>
                  </div>
                  <div className="contact-info-text">
                    <a href={infoEmailSettings?.context ? `mailto:${infoEmailSettings.context}` : "#"}>
                      {infoEmailSettings?.context || "N/A"}
                    </a>
                  </div>
                </div>
                <div className="single-footer">
                  <h3>Our Location</h3>
                  <div className="contact-info-single">
                    <div className="contact-info-icon">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M18.364 17.364L12 23.7279L5.63604 17.364C2.12132 13.8492 2.12132 8.15076 5.63604 4.63604C9.15076 1.12132 14.8492 1.12132 18.364 4.63604C21.8787 8.15076 21.8787 13.8492 18.364 17.364ZM12 15C14.2091 15 16 13.2091 16 11C16 8.79086 14.2091 7 12 7C9.79086 7 8 8.79086 8 11C8 13.2091 9.79086 15 12 15ZM12 13C10.8954 13 10 12.1046 10 11C10 9.89543 10.8954 9 12 9C13.1046 9 14 9.89543 14 11C14 12.1046 13.1046 13 12 13Z"></path>
                      </svg>
                    </div>
                    <div className="contact-info-text">
                      <a href="#">{companyAddressSettings?.context}</a>
                    </div>
                  </div>
                </div>
                <div className="single-footer">
                  <h3>Social Links</h3>
                  <div className="social-links-mobile-menu">
                    <ul>
                      <li><a href={facebookPageSettings?.context}><i className="fa-brands fa-facebook-f"></i></a></li>
                      <li><a href={instagramProfileSettings?.context}><i className="fa-brands fa-instagram"></i></a></li>
                      <li><a href={linkedinPageSettings?.context}><i className="fa-brands fa-linkedin-in"></i></a></li>
                      <li><a href={youtubeChannelSettings?.context}><i className="fa-brands fa-youtube"></i></a></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ClientHeaderComponent;
