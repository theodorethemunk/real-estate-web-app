import React from "react";

const PageLoadComponent: React.FC = () => {

  return (
    <>
      {/* <div className="preloader">
        <div className="loading-container">
          <div className="loading"></div>
          <div id="loading-icon">
            <img src="./assets/client/img/logo/preloader.png" alt="sommy-logo" />
          </div>
        </div>
      </div> */}

      <div className="paginacontainer">
        <div className="progress-wraap">
          <svg className="progress-circle svg-content" width="100%" height="100%" viewBox="-1 -1 102 102">
            <path d="M50,1 a49,49 0 0,1 0,98 a49,49 0 0,1 0,-98" />
          </svg>
        </div>
      </div>
      </>
  );
};

export default PageLoadComponent;
