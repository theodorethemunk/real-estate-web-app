import HeroComponentLite from "../../components/client/HeroLite";


const Error404Page: React.FC = () => {
  return (
    <>
    <HeroComponentLite
        breadcrumbLinks={[
          { href: "home", text: "Home" },
          { href: "#", text: "Error 404" },
        ]}
        title="Page Not Found"
      />
    <div className="mission-section-area sp1" style={{ backgroundImage:"url(src//client/img/all-images/bg/bg1.png)", backgroundPosition:"center", backgroundRepeat:"no-repeat", backgroundSize:"cover", }}>
    <div className="container">
      <div className="row">
        <div className="col-lg-6 m-auto">
          <div className="heading1 text-center space-margin60">
            <h5>Page Not Found</h5>
            <div className="space20"></div>
            <h2>ERROR 404</h2>
            <div className="space30"></div>
            
            <p>The page you are looking for might have been removed or is temporarily unavailable.</p>
            <div className="space30"></div>

            <a href="/home" className="theme-btn1">
            Go Back Home 
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
              <path d="M12 13H4V11H12V4L20 12L12 20V13Z"></path>
            </svg>
            <span className="arrow2">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
              <path d="M12 13H4V11H12V4L20 12L12 20V13Z"></path>
            </svg>
            </span>
            </a>
          </div>

          <div className="space100 d-lg-block d-none"></div>
        </div>
      </div>
      </div>
    </div>
    </>
  );
};

export default Error404Page;
