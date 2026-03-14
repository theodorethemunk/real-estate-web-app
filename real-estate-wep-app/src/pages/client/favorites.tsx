import HeroComponentLite from "../../components/client/HeroLite";


const FavoritesPage: React.FC = () => {

  return (
    <>
      <HeroComponentLite
        breadcrumbLinks={[
          { href: "home", text: "Home" },
          { href: "#", text: "Favorites" },
        ]}
        title="My Favorites"
      />
      <div className="mission-section-area sp1" style={{ backgroundImage:"url(/client/img/all-images/bg/bg1.png)", backgroundPosition:"center", backgroundRepeat:"no-repeat", backgroundSize:"cover", }}>
    <div className="container">
      <div className="row">
        <div className="col-lg-6 m-auto">
          <div className="heading1 text-center space-margin60">
            <h5>Page Under Development</h5>
            <div className="space20"></div>
            <h2>Under Construction</h2>
            <div className="space30"></div>
            
            <p>The page you are looking for is currently under-going development and will be available in a couple of day, check back later.</p>
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

export default FavoritesPage;
