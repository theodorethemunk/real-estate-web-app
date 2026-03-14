import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { removeAdminLoginSession } from "../../services/session/UserLoginSession";
import { AdminLoginProp } from "../../models/interfaces/AdminLoginInterface";
import { useEffect, useState } from "react";

interface AdminHeaderPropsComponentProps {
  adminInfo: AdminLoginProp;
}

const AdminHeaderComponent: React.FC<AdminHeaderPropsComponentProps> = ({ adminInfo }) => {

  const [isValidEmail, setIsValidEmail] = useState(false);

  useEffect(() => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsValidEmail(emailRegex.test(adminInfo.adminEmail));
  }, [adminInfo]);

  const navigate = useNavigate();

  const handleSignOut = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "grey",
      confirmButtonText: "Yes, sign out",
    });

    if (result.isConfirmed) {
      await removeAdminLoginSession();
      navigate("/portalaccess");
    }
  };

  return (
    <header id="page-topbar">
      <div className="layout-width">
        <div className="navbar-header">
          <div className="d-flex">
            {/* Logo */}
            <div className="navbar-brand-box horizontal-logo">
              <a href="home" className="logo logo-dark">
                <span className="logo-sm">
                  <img src="/client/img/logo/main-logo.png" alt="Logo Small" height="30" />
                </span>
                <span className="logo-lg">
                  <img src="/client/img/logo/main-logo.png" alt="Logo Large Dark" height="25" />
                </span>
              </a>
              <a href="#" className="logo logo-light">
                <span className="logo-sm">
                  <img src="/client/img/logo/main-logo.png" alt="Logo Small" height="30" />
                </span>
                <span className="logo-lg">
                  <img src="/client/img/logo/main-logo.png" alt="Logo Large Light" height="25" />
                </span>
              </a>
            </div>

            {/* Hamburger Menu */}
            <div className="d-block d-lg-none px-3 fs-16 header-item vertical-menu-btn pt-4">
              <img src="/client/img/logo/main-logo.png" alt="logo" height="25" />
            </div>
          </div>

          <div className="d-flex align-items-center">
          <div className="ms-1 header-item d-none d-sm-flex">
              <button type="button" className="btn btn-icon btn-topbar btn-ghost-secondary rounded-circle"
                data-toggle="fullscreen">
                <i className='bx bx-fullscreen fs-22'></i>
              </button>
            </div>

            {isValidEmail  && (
              <>
                <div className="ms-1 header-item d-none d-sm-flex">
                  <a className="btn btn-icon btn-topbar btn-ghost-secondary rounded-circle light-dark-mode" href="/settings">
                    <i className="bx bx-cog fs-22"></i>
                  </a>
                </div>

                <div className="ms-1 header-item d-none d-sm-flex">
                  <button
                    type="button"
                    className="btn btn-icon btn-topbar btn-ghost-secondary rounded-circle"
                    onClick={handleSignOut}
                  >
                    <i className="bx bx-log-out-circle fs-22"></i>
                  </button>
                </div>
              </>
            )}

            

            <button
              type="button"
              className="btn btn-sm px-3 fs-16 header-item vertical-menu-btn topnav-hamburger"
              id="topnav-hamburger-icon"
            >
              <span className="hamburger-icon">
                <span></span>
                <span></span>
                <span></span>
              </span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeaderComponent;
