import { useEffect, useState } from "react";
import { IPropertyMain } from "../../models/interfaces/PropertyInterface";
import { fetchPropertiesLite } from "../../services/dbservices/company/FetchProperties";
import { fetchPriceHistory } from "../../services/dbservices/company/FetchPriceHistory";
import { IPriceHistory } from "../../models/interfaces/PriceHistoryInterface";
import { dateToWords } from "../../services/Util/ConvertDateToWords";
import { useNavigate } from "react-router-dom";
import { ShowMailingListPopup } from "../../services/dbservices/company/AddToMailingListAction";
import { COMPANY_PRIMARY_DOMAIN_URL } from "../../repo/datarepo";

const HomePage: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [properties, setProperties] = useState<IPropertyMain[]>([]);
  const [priceHistory, setPriceHistory] = useState<IPriceHistory[]>([]);

  useEffect(() => {
    setLoading(true);

    const getProperties = async () => {
      const fetchedProperties = await fetchPropertiesLite(100, "");
      const fetchedPriceHistory = await fetchPriceHistory();
      await setProperties(fetchedProperties);
      setPriceHistory(fetchedPriceHistory);

      setTimeout(() => {
        setLoading(false);
      }, 10000);
    };

    getProperties();

    const popupTimer = setTimeout(() => {
      ShowMailingListPopup();
    }, 30000); // Show popup after 30 seconds

    return () => clearTimeout(popupTimer); // Clean up timer on unmount
  }, []);

  const navigate = useNavigate();

  const handleDescriptionNavigate = (property: IPropertyMain) => {
    navigate("/description", { state: property });
  };

  return (
    <>
      {/* Hero Starts Here */}
      <div className="hero-area-slider">
        <div className="hero1-section-area">
          <img
            src="//client/img/all-images/hero/hero-img1.png"
            className="hero-img1"
          />
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="hero-header-area text-center">
                  <h5>Discover Your Ideal Property Today!</h5>
                  <div className="space32"></div>
                  <h1>Find Your Perfect Home</h1>
                  <div className="space40"></div>
                  <div className="btn-area1">
                    <a href="/pricehistory" className="theme-btn1">
                      Price History{" "}
                      <span className="arrow1">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          width="24"
                          height="24"
                          fill="currentColor"
                        >
                          <path d="M12 13H4V11H12V4L20 12L12 20V13Z"></path>
                        </svg>
                      </span>
                      <span className="arrow2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          width="24"
                          height="24"
                          fill="currentColor"
                        >
                          <path d="M12 13H4V11H12V4L20 12L12 20V13Z"></path>
                        </svg>
                      </span>
                    </a>
                    <a href="/listing" className="theme-btn2">
                      Listings
                      <span className="arrow1">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          width="24"
                          height="24"
                          fill="currentColor"
                        >
                          <path d="M12 13H4V11H12V4L20 12L12 20V13Z"></path>
                        </svg>
                      </span>
                      <span className="arrow2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          width="24"
                          height="24"
                          fill="currentColor"
                        >
                          <path d="M12 13H4V11H12V4L20 12L12 20V13Z"></path>
                        </svg>
                      </span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Hero Ends Here */}

      {/* About Us Area Starts Here */}
      <div className="about1-section-area sp1" id="about-us">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <div className="about-images-area">
                <div className="img2">
                  <img src="//client/img/all-images/about/about-img2.png" />
                </div>
                <div className="img1">
                  <img src="//client/img/all-images/about/about-img1.png" />
                </div>
                <div className="author-img">
                  <h3>
                    Become One Of <br />
                    Our Satisfied Customers
                  </h3>
                  <div className="space10"></div>
                  <p></p>
                </div>
              </div>
            </div>
            <div className="col-lg-1"></div>
            <div className="col-lg-5">
              <div className="about-heading heading1">
                <h5>About Sommy Properties</h5>
                <div className="space20"></div>
                <h2 className="text-anime-style-3">
                  Secure Your Future with Sommy Properties
                </h2>
                <div className="space18"></div>
                <p>
                  At Sommy Properties, we believe that owning a home is more
                  than just an investment—it’s a legacy. We are committed to
                  helping you find, buy, and secure your dream home with ease
                  and confidence. With our expert guidance, document
                  preservation services, and seamless transactions, we ensure
                  that your property journey is safe, transparent, and
                  rewarding.
                </p>
                <div className="space32"></div>
                <div className="counter-boxes">
                  <div className="row">
                    <div className="col-lg-4 col-md-4 col-6">
                      <div className="counter-boxarea text-center">
                        <h2>
                          <span className="counter">10</span>K
                        </h2>
                        <div className="space12"></div>
                        <p>Homes Sold</p>
                      </div>
                    </div>

                    <div className="col-lg-4 col-md-4 col-6">
                      <div className="counter-boxarea text-center">
                        <h2>
                          <span className="counter">9</span>K
                        </h2>
                        <div className="space12"></div>
                        <p>Happy Clients</p>
                      </div>
                    </div>

                    <div className="col-lg-4 col-md-4 col-6">
                      <div className="space20 d-md-none d-block"></div>
                      <div className="counter-boxarea text-center">
                        <h2>
                          <span className="counter">98</span>%
                        </h2>
                        <div className="space12"></div>
                        <p>Satisfaction Rate</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="space32"></div>
                <div className="btn-area1">
                  <a href="listing" className="theme-btn1">
                    Explore Our Properties{" "}
                    <span className="arrow1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="24"
                        height="24"
                        fill="currentColor"
                      >
                        <path d="M12 13H4V11H12V4L20 12L12 20V13Z"></path>
                      </svg>
                    </span>
                    <span className="arrow2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="24"
                        height="24"
                        fill="currentColor"
                      >
                        <path d="M12 13H4V11H12V4L20 12L12 20V13Z"></path>
                      </svg>
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* About Us Area Ends Here */}

      {/* Property Listing Area Starts Here */}
      <div
        className="properties-section-area sp2"
        style={{
          backgroundImage: "url(//client/img/all-images/bg/bg1.png)",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-6 m-auto">
              <div className="property-heading heading1 text-center space-margin60">
                <h5>Featured Properties</h5>
                <div className="space20"></div>
                <h2 className="text-anime-style-3">Our Featured Properties</h2>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-12">
              <div className="property-feature-slider">
                <div className="col-lg-12 m-auto">
                  <div className="tabs-btn-area space-margin60">
                    <ul className="nav nav-pills" id="pills-tab" role="tablist">
                      <li className="nav-item" role="presentation">
                        <button
                          className="nav-link active"
                          id="pills-contact2-tab"
                          data-bs-toggle="pill"
                          data-bs-target="#pills-contact2"
                          type="button"
                          role="tab"
                          aria-controls="pills-contact2"
                          aria-selected="false"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                          >
                            <path d="M22 21H2V19H3V4C3 3.44772 3.44772 3 4 3H18C18.5523 3 19 3.44772 19 4V9H21V19H22V21ZM17 19H19V11H13V19H15V13H17V19ZM17 9V5H5V19H11V9H17ZM7 11H9V13H7V11ZM7 15H9V17H7V15ZM7 7H9V9H7V7Z"></path>
                          </svg>
                          Estates
                        </button>
                      </li>
                      <li className="nav-item" role="presentation">
                        <button
                          className="nav-link"
                          id="pills-home-tab"
                          data-bs-toggle="pill"
                          data-bs-target="#pills-home"
                          type="button"
                          role="tab"
                          aria-controls="pills-home"
                          aria-selected="true"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                          >
                            <path d="M19 21H5C4.44772 21 4 20.5523 4 20V11L1 11L11.3273 1.6115C11.7087 1.26475 12.2913 1.26475 12.6727 1.6115L23 11L20 11V20C20 20.5523 19.5523 21 19 21ZM6 19H18V9.15745L12 3.7029L6 9.15745V19ZM8 15H16V17H8V15Z"></path>
                          </svg>
                          Homes
                        </button>
                      </li>
                      <li className="nav-item" role="presentation">
                        <button
                          className="nav-link"
                          id="pills-profile-tab"
                          data-bs-toggle="pill"
                          data-bs-target="#pills-profile"
                          type="button"
                          role="tab"
                          aria-controls="pills-profile"
                          aria-selected="false"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                          >
                            <path d="M12.5812 2.68627C12.2335 2.43791 11.7664 2.43791 11.4187 2.68627L1.9187 9.47198L3.08118 11.0994L11.9999 4.7289L20.9187 11.0994L22.0812 9.47198L12.5812 2.68627ZM19.5812 12.6863L12.5812 7.68627C12.2335 7.43791 11.7664 7.43791 11.4187 7.68627L4.4187 12.6863C4.15591 12.874 3.99994 13.177 3.99994 13.5V20C3.99994 20.5523 4.44765 21 4.99994 21H18.9999C19.5522 21 19.9999 20.5523 19.9999 20V13.5C19.9999 13.177 19.844 12.874 19.5812 12.6863ZM5.99994 19V14.0146L11.9999 9.7289L17.9999 14.0146V19H5.99994Z"></path>
                          </svg>
                          Industry / Commercial
                        </button>
                      </li>
                      <li className="nav-item" role="presentation">
                        <button
                          className="nav-link"
                          id="pills-contact-tab"
                          data-bs-toggle="pill"
                          data-bs-target="#pills-contact"
                          type="button"
                          role="tab"
                          aria-controls="pills-contact"
                          aria-selected="false"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                          >
                            <path d="M21 19H23V21H1V19H3V4C3 3.44772 3.44772 3 4 3H14C14.5523 3 15 3.44772 15 4V19H19V11H17V9H20C20.5523 9 21 9.44772 21 10V19ZM5 5V19H13V5H5ZM7 11H11V13H7V11ZM7 7H11V9H7V7Z"></path>
                          </svg>
                          Apartments
                        </button>
                      </li>
                      <li className="nav-item" role="presentation">
                        <button
                          className="nav-link"
                          id="pills-contact1-tab"
                          data-bs-toggle="pill"
                          data-bs-target="#pills-contact1"
                          type="button"
                          role="tab"
                          aria-controls="pills-contact1"
                          aria-selected="false"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                          >
                            <path d="M12.6727 1.61162 20.7999 9H17.8267L12 3.70302 6 9.15757V19.0001H11V21.0001H5C4.44772 21.0001 4 20.5524 4 20.0001V11.0001L1 11.0001 11.3273 1.61162C11.7087 1.26488 12.2913 1.26488 12.6727 1.61162ZM14 11H23V18H14V11ZM16 13V16H21V13H16ZM24 21H13V19H24V21Z"></path>
                          </svg>
                          Mobile Home
                        </button>
                      </li>
                      <li className="nav-item" role="presentation">
                        <button
                          className="nav-link"
                          id="pills-contact3-tab"
                          data-bs-toggle="pill"
                          data-bs-target="#pills-contact3"
                          type="button"
                          role="tab"
                          aria-controls="pills-contact3"
                          aria-selected="false"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                          >
                            <path d="M3 19V5.70046C3 5.27995 3.26307 4.90437 3.65826 4.76067L13.3291 1.24398C13.5886 1.14961 13.8755 1.28349 13.9699 1.54301C13.9898 1.59778 14 1.65561 14 1.71388V6.6667L20.3162 8.77211C20.7246 8.90822 21 9.29036 21 9.72079V19H23V21H1V19H3ZM5 19H12V3.85543L5 6.40089V19ZM19 19V10.4416L14 8.77488V19H19Z"></path>
                          </svg>
                          Vacant Land
                        </button>
                      </li>
                    </ul>
                  </div>

                  <div className="tab-content" id="pills-tabContent">
                    <div
                      className="tab-pane fade show active"
                      id="pills-home"
                      role="tabpanel"
                      aria-labelledby="pills-home-tab"
                      tabIndex={0}
                    >
                      <div className="row">
                        {loading
                          ? Array(3)
                              .fill(0)
                              .map((_, index) => (
                                <div className="col-lg-4 col-md-4" key={index}>
                                  <div className="property-boxarea">
                                    <div className="img1 image-anime">
                                      <div className="shimmer-box shimmer-image"></div>
                                    </div>
                                    <div className="content-area">
                                      <div className="shimmer-box shimmer-text-lg"></div>
                                      <div className="shimmer-box shimmer-text-sm"></div>
                                      <ul>
                                        <li>
                                          <div className="shimmer-box shimmer-pill"></div>
                                        </li>
                                        <li>
                                          <div className="shimmer-box shimmer-pill"></div>
                                        </li>
                                        <li>
                                          <div className="shimmer-box shimmer-pill"></div>
                                        </li>
                                      </ul>
                                      <div className="btn-area">
                                        <div className="shimmer-box shimmer-btn"></div>
                                        <div className="shimmer-box shimmer-circle"></div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              ))
                          : properties
                              .filter((property) =>
                                [
                                  "Single Family Home",
                                  "Multi Family Home",
                                  "Townhouse",
                                  "Duplex",
                                  "Triplex",
                                  "Fourplex",
                                  "Luxury Home",
                                ].includes(property.property_type)
                              )
                              .map((property) => (
                                <div
                                  className="col-lg-4 col-md-4"
                                  key={property.id}
                                >
                                  <div className="property-boxarea">
                                    <div className="img1 image-anime">
                                      <a
                                        onClick={() =>
                                          handleDescriptionNavigate(property)
                                        }
                                        style={{ cursor: "pointer" }}
                                      >
                                        <img
                                          src={
                                            property.main_image_path
                                              ? property.main_image_path.startsWith(
                                                  "/uploads"
                                                )
                                                ? `${COMPANY_PRIMARY_DOMAIN_URL}${property.main_image_path}`
                                                : property.main_image_path
                                              : "//client/img/property-placeholder-image.png" // Fallback image
                                          }
                                          alt={property.name} style={{ height: '400px', objectFit: 'cover' }} 
                                        />
                                      </a>
                                    </div>
                                    <div className="category-list">
                                      <ul>
                                        <li>
                                          <a
                                            href={`/listing?search=${property.property_type}`}
                                          >
                                            {property.property_type}
                                          </a>
                                        </li>
                                      </ul>
                                    </div>
                                    <div className="content-area">
                                      <a
                                        onClick={() =>
                                          handleDescriptionNavigate(property)
                                        }
                                        style={{ cursor: "pointer" }}
                                      >
                                        {property.name}
                                      </a>
                                      <div className="space18"></div>
                                      <p>
                                        {property.city}, {property.state},{" "}
                                        {property.country}
                                      </p>
                                      <div className="space24"></div>
                                      <ul>
                                        <li>
                                          <a
                                            onClick={() =>
                                              handleDescriptionNavigate(
                                                property
                                              )
                                            }
                                            style={{ cursor: "pointer" }}
                                          >
                                            <img
                                              src="//client/img/icons/bed1.svg"
                                              alt="bed"
                                            />
                                            x{property.total_bedrooms}
                                          </a>
                                        </li>
                                        <li>
                                          <a href="#">
                                            <img
                                              src="//client/img/icons/bath1.svg"
                                              alt="bath"
                                            />
                                            x{property.total_bathrooms}
                                          </a>
                                        </li>
                                        <li>
                                          <a href="#">
                                            <img
                                              src="//client/img/icons/sqare1.svg"
                                              alt="size"
                                            />
                                            {property.plot_size}
                                          </a>
                                        </li>
                                      </ul>
                                      <div className="btn-area">
                                        <a
                                          onClick={() =>
                                            handleDescriptionNavigate(property)
                                          }
                                          style={{ cursor: "pointer" }}
                                          className="nm-btn"
                                        >
                                          ₦{" "}
                                          {property.property_price.toLocaleString()}
                                        </a>
                                        {/* <a href="javascript:void(0)" className="heart">
                                        <img src="//client/img/icons/heart1.svg" className="heart1" alt="like" />
                                        <img src="//client/img/icons/heart2.svg" alt="liked" className="heart2" />
                                      </a> */}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              ))}
                      </div>
                    </div>

                    <div
                      className="tab-pane fade"
                      id="pills-profile"
                      role="tabpanel"
                      aria-labelledby="pills-profile-tab"
                      tabIndex={0}
                    >
                      <div className="row">
                        {loading
                          ? Array(3)
                              .fill(0)
                              .map((_, index) => (
                                <div className="col-lg-4 col-md-4" key={index}>
                                  <div className="property-boxarea">
                                    <div className="img1 image-anime">
                                      <div className="shimmer-box shimmer-image"></div>
                                    </div>
                                    <div className="content-area">
                                      <div className="shimmer-box shimmer-text-lg"></div>
                                      <div className="shimmer-box shimmer-text-sm"></div>
                                      <ul>
                                        <li>
                                          <div className="shimmer-box shimmer-pill"></div>
                                        </li>
                                        <li>
                                          <div className="shimmer-box shimmer-pill"></div>
                                        </li>
                                        <li>
                                          <div className="shimmer-box shimmer-pill"></div>
                                        </li>
                                      </ul>
                                      <div className="btn-area">
                                        <div className="shimmer-box shimmer-btn"></div>
                                        <div className="shimmer-box shimmer-circle"></div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              ))
                          : properties
                              .filter((property) =>
                                [
                                  "Commercial",
                                  "Industrial",
                                  "Mixed Use",
                                  "Farm Or Ranch",
                                ].includes(property.property_type)
                              )
                              .map((property) => (
                                <div
                                  className="col-lg-4 col-md-4"
                                  key={property.id}
                                >
                                  <div className="property-boxarea">
                                    <div className="img1 image-anime">
                                      <a
                                        onClick={() =>
                                          handleDescriptionNavigate(property)
                                        }
                                        style={{ cursor: "pointer" }}
                                      >
                                        <img
                                          src={
                                            property.main_image_path
                                              ? property.main_image_path.startsWith(
                                                  "/uploads"
                                                )
                                                ? `${COMPANY_PRIMARY_DOMAIN_URL}${property.main_image_path}`
                                                : property.main_image_path
                                              : "//client/img/property-placeholder-image.png" // Fallback image
                                          }
                                          alt={property.name} style={{ height: '400px', objectFit: 'cover' }} 
                                        />
                                      </a>
                                    </div>
                                    <div className="category-list">
                                      <ul>
                                        <li>
                                          <a
                                            href={`/listing?search=${property.property_type}`}
                                          >
                                            {property.property_type}
                                          </a>
                                        </li>
                                      </ul>
                                    </div>
                                    <div className="content-area">
                                      <a
                                        onClick={() =>
                                          handleDescriptionNavigate(property)
                                        }
                                        style={{ cursor: "pointer" }}
                                      >
                                        {property.name}
                                      </a>
                                      <div className="space18"></div>
                                      <p>
                                        {property.city}, {property.state},{" "}
                                        {property.country}
                                      </p>
                                      <div className="space24"></div>
                                      <ul>
                                        <li>
                                          <a href="#">
                                            <img
                                              src="//client/img/icons/bed1.svg"
                                              alt="bed"
                                            />
                                            x{property.total_bedrooms}
                                          </a>
                                        </li>
                                        <li>
                                          <a href="#">
                                            <img
                                              src="//client/img/icons/bath1.svg"
                                              alt="bath"
                                            />
                                            x{property.total_bathrooms}
                                          </a>
                                        </li>
                                        <li>
                                          <a href="#">
                                            <img
                                              src="//client/img/icons/sqare1.svg"
                                              alt="size"
                                            />
                                            {property.plot_size}
                                          </a>
                                        </li>
                                      </ul>
                                      <div className="btn-area">
                                        <a
                                          onClick={() =>
                                            handleDescriptionNavigate(property)
                                          }
                                          style={{ cursor: "pointer" }}
                                          className="nm-btn"
                                        >
                                          ₦{" "}
                                          {property.property_price.toLocaleString()}
                                        </a>
                                        {/* <a href="javascript:void(0)" className="heart">
                                        <img
                                          src="//client/img/icons/heart1.svg"
                                          className="heart1"
                                          alt="like"
                                        />
                                        <img
                                          src="//client/img/icons/heart2.svg"
                                          alt="liked"
                                          className="heart2"
                                        />
                                      </a> */}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              ))}
                      </div>
                    </div>

                    <div
                      className="tab-pane fade"
                      id="pills-contact"
                      role="tabpanel"
                      aria-labelledby="pills-contact-tab"
                      tabIndex={0}
                    >
                      <div className="row">
                        {loading
                          ? Array(3)
                              .fill(0)
                              .map((_, index) => (
                                <div className="col-lg-4 col-md-4" key={index}>
                                  <div className="property-boxarea">
                                    <div className="img1 image-anime">
                                      <div className="shimmer-box shimmer-image"></div>
                                    </div>
                                    <div className="content-area">
                                      <div className="shimmer-box shimmer-text-lg"></div>
                                      <div className="shimmer-box shimmer-text-sm"></div>
                                      <ul>
                                        <li>
                                          <div className="shimmer-box shimmer-pill"></div>
                                        </li>
                                        <li>
                                          <div className="shimmer-box shimmer-pill"></div>
                                        </li>
                                        <li>
                                          <div className="shimmer-box shimmer-pill"></div>
                                        </li>
                                      </ul>
                                      <div className="btn-area">
                                        <div className="shimmer-box shimmer-btn"></div>
                                        <div className="shimmer-box shimmer-circle"></div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              ))
                          : properties
                              .filter((property) =>
                                ["Apartment", "Condo"].includes(
                                  property.property_type
                                )
                              )
                              .map((property) => (
                                <div
                                  className="col-lg-4 col-md-4"
                                  key={property.id}
                                >
                                  <div className="property-boxarea">
                                    <div className="img1 image-anime">
                                      <a
                                        onClick={() =>
                                          handleDescriptionNavigate(property)
                                        }
                                        style={{ cursor: "pointer" }}
                                      >
                                        <img
                                          src={
                                            property.main_image_path
                                              ? property.main_image_path.startsWith(
                                                  "/uploads"
                                                )
                                                ? `${COMPANY_PRIMARY_DOMAIN_URL}${property.main_image_path}`
                                                : property.main_image_path
                                              : "//client/img/property-placeholder-image.png" // Fallback image
                                          }
                                          alt={property.name} style={{ height: '400px', objectFit: 'cover' }} 
                                        />
                                      </a>
                                    </div>
                                    <div className="category-list">
                                      <ul>
                                        <li>
                                          <a
                                            href={`/listing?search=${property.property_type}`}
                                          >
                                            {property.property_type}
                                          </a>
                                        </li>
                                      </ul>
                                    </div>
                                    <div className="content-area">
                                      <a
                                        onClick={() =>
                                          handleDescriptionNavigate(property)
                                        }
                                        style={{ cursor: "pointer" }}
                                      >
                                        {property.name}
                                      </a>
                                      <div className="space18"></div>
                                      <p>
                                        {property.city}, {property.state},{" "}
                                        {property.country}
                                      </p>
                                      <div className="space24"></div>
                                      <ul>
                                        <li>
                                          <a href="#">
                                            <img
                                              src="//client/img/icons/bed1.svg"
                                              alt="bed"
                                            />
                                            x{property.total_bedrooms}
                                          </a>
                                        </li>
                                        <li>
                                          <a href="#">
                                            <img
                                              src="//client/img/icons/bath1.svg"
                                              alt="bath"
                                            />
                                            x{property.total_bathrooms}
                                          </a>
                                        </li>
                                        <li>
                                          <a href="#">
                                            <img
                                              src="//client/img/icons/sqare1.svg"
                                              alt="size"
                                            />
                                            {property.plot_size}
                                          </a>
                                        </li>
                                      </ul>
                                      <div className="btn-area">
                                        <a
                                          onClick={() =>
                                            handleDescriptionNavigate(property)
                                          }
                                          style={{ cursor: "pointer" }}
                                          className="nm-btn"
                                        >
                                          ₦{" "}
                                          {property.property_price.toLocaleString()}
                                        </a>
                                        {/* <a href="javascript:void(0)" className="heart">
                                        <img
                                          src="//client/img/icons/heart1.svg"
                                          className="heart1"
                                          alt="like"
                                        />
                                        <img
                                          src="//client/img/icons/heart2.svg"
                                          alt="liked"
                                          className="heart2"
                                        />
                                      </a> */}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              ))}
                      </div>
                    </div>

                    <div
                      className="tab-pane fade"
                      id="pills-contact1"
                      role="tabpanel"
                      aria-labelledby="pills-contact1-tab"
                      tabIndex={0}
                    >
                      <div className="row">
                        {loading
                          ? Array(3)
                              .fill(0)
                              .map((_, index) => (
                                <div className="col-lg-4 col-md-4" key={index}>
                                  <div className="property-boxarea">
                                    <div className="img1 image-anime">
                                      <div className="shimmer-box shimmer-image"></div>
                                    </div>
                                    <div className="content-area">
                                      <div className="shimmer-box shimmer-text-lg"></div>
                                      <div className="shimmer-box shimmer-text-sm"></div>
                                      <ul>
                                        <li>
                                          <div className="shimmer-box shimmer-pill"></div>
                                        </li>
                                        <li>
                                          <div className="shimmer-box shimmer-pill"></div>
                                        </li>
                                        <li>
                                          <div className="shimmer-box shimmer-pill"></div>
                                        </li>
                                      </ul>
                                      <div className="btn-area">
                                        <div className="shimmer-box shimmer-btn"></div>
                                        <div className="shimmer-box shimmer-circle"></div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              ))
                          : properties
                              .filter((property) =>
                                ["Mobile Home"].includes(property.property_type)
                              )
                              .map((property) => (
                                <div
                                  className="col-lg-4 col-md-4"
                                  key={property.id}
                                >
                                  <div className="property-boxarea">
                                    <div className="img1 image-anime">
                                      <a
                                        onClick={() =>
                                          handleDescriptionNavigate(property)
                                        }
                                        style={{ cursor: "pointer" }}
                                      >
                                        <img
                                          src={
                                            property.main_image_path
                                              ? property.main_image_path.startsWith(
                                                  "/uploads"
                                                )
                                                ? `${COMPANY_PRIMARY_DOMAIN_URL}${property.main_image_path}`
                                                : property.main_image_path
                                              : "//client/img/property-placeholder-image.png" // Fallback image
                                          }
                                          alt={property.name} style={{ height: '400px', objectFit: 'cover' }} 
                                        />
                                      </a>
                                    </div>
                                    <div className="category-list">
                                      <ul>
                                        <li>
                                          <a
                                            href={`/listing?search=${property.property_type}`}
                                          >
                                            {property.property_type}
                                          </a>
                                        </li>
                                      </ul>
                                    </div>
                                    <div className="content-area">
                                      <a
                                        onClick={() =>
                                          handleDescriptionNavigate(property)
                                        }
                                        style={{ cursor: "pointer" }}
                                      >
                                        {property.name}
                                      </a>
                                      <div className="space18"></div>
                                      <p>
                                        {property.city}, {property.state},{" "}
                                        {property.country}
                                      </p>
                                      <div className="space24"></div>
                                      <ul>
                                        <li>
                                          <a href="#">
                                            <img
                                              src="//client/img/icons/bed1.svg"
                                              alt="bed"
                                            />
                                            x{property.total_bedrooms}
                                          </a>
                                        </li>
                                        <li>
                                          <a href="#">
                                            <img
                                              src="//client/img/icons/bath1.svg"
                                              alt="bath"
                                            />
                                            x{property.total_bathrooms}
                                          </a>
                                        </li>
                                        <li>
                                          <a href="#">
                                            <img
                                              src="//client/img/icons/sqare1.svg"
                                              alt="size"
                                            />
                                            {property.plot_size}
                                          </a>
                                        </li>
                                      </ul>
                                      <div className="btn-area">
                                        <a
                                          onClick={() =>
                                            handleDescriptionNavigate(property)
                                          }
                                          style={{ cursor: "pointer" }}
                                          className="nm-btn"
                                        >
                                          ₦{" "}
                                          {property.property_price.toLocaleString()}
                                        </a>
                                        {/* <a href="javascript:void(0)" className="heart">
                                        <img
                                          src="//client/img/icons/heart1.svg"
                                          className="heart1"
                                          alt="like"
                                        />
                                        <img
                                          src="//client/img/icons/heart2.svg"
                                          alt="liked"
                                          className="heart2"
                                        />
                                      </a> */}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              ))}
                      </div>
                    </div>

                    <div
                      className="tab-pane fade"
                      id="pills-contact2"
                      role="tabpanel"
                      aria-labelledby="pills-contact2-tab"
                      tabIndex={0}
                    >
                      <div className="row">
                        {loading
                          ? Array(3)
                              .fill(0)
                              .map((_, index) => (
                                <div className="col-lg-4 col-md-4" key={index}>
                                  <div className="property-boxarea">
                                    <div className="img1 image-anime">
                                      <div className="shimmer-box shimmer-image"></div>
                                    </div>
                                    <div className="content-area">
                                      <div className="shimmer-box shimmer-text-lg"></div>
                                      <div className="shimmer-box shimmer-text-sm"></div>
                                      <ul>
                                        <li>
                                          <div className="shimmer-box shimmer-pill"></div>
                                        </li>
                                        <li>
                                          <div className="shimmer-box shimmer-pill"></div>
                                        </li>
                                        <li>
                                          <div className="shimmer-box shimmer-pill"></div>
                                        </li>
                                      </ul>
                                      <div className="btn-area">
                                        <div className="shimmer-box shimmer-btn"></div>
                                        <div className="shimmer-box shimmer-circle"></div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              ))
                          : properties
                              .filter((property) =>
                                ["Estate"].includes(property.property_type)
                              )
                              .map((property) => (
                                <div
                                  className="col-lg-4 col-md-4"
                                  key={property.id}
                                >
                                  <div className="property-boxarea">
                                    <div className="img1 image-anime">
                                      <a
                                        onClick={() =>
                                          handleDescriptionNavigate(property)
                                        }
                                        style={{ cursor: "pointer" }}
                                      >
                                        <img
                                          src={
                                            property.main_image_path
                                              ? property.main_image_path.startsWith(
                                                  "/uploads"
                                                )
                                                ? `${COMPANY_PRIMARY_DOMAIN_URL}${property.main_image_path}`
                                                : property.main_image_path
                                              : "//client/img/property-placeholder-image.png" // Fallback image
                                          }
                                          alt={property.name} style={{ height: '400px', objectFit: 'cover' }} 
                                        />
                                      </a>
                                    </div>
                                    <div className="category-list">
                                      <ul>
                                        <li>
                                          <a
                                            href={`/listing?search=${property.property_type}`}
                                          >
                                            {property.property_type}
                                          </a>
                                        </li>
                                      </ul>
                                    </div>
                                    <div className="content-area">
                                      <a
                                        onClick={() =>
                                          handleDescriptionNavigate(property)
                                        }
                                        style={{ cursor: "pointer" }}
                                      >
                                        {property.name}
                                      </a>
                                      <div className="space18"></div>
                                      <p>
                                        {property.city}, {property.state},{" "}
                                        {property.country}
                                      </p>
                                      <div className="space24"></div>
                                      <ul>
                                        <li>
                                          <a href="#">
                                            <img
                                              src="//client/img/icons/bed1.svg"
                                              alt="bed"
                                            />
                                            x{property.total_bedrooms}
                                          </a>
                                        </li>
                                        <li>
                                          <a href="#">
                                            <img
                                              src="//client/img/icons/bath1.svg"
                                              alt="bath"
                                            />
                                            x{property.total_bathrooms}
                                          </a>
                                        </li>
                                        <li>
                                          <a href="#">
                                            <img
                                              src="//client/img/icons/sqare1.svg"
                                              alt="size"
                                            />
                                            {property.plot_size}
                                          </a>
                                        </li>
                                      </ul>
                                      <div className="btn-area">
                                        <a
                                          onClick={() =>
                                            handleDescriptionNavigate(property)
                                          }
                                          style={{ cursor: "pointer" }}
                                          className="nm-btn"
                                        >
                                          ₦{" "}
                                          {property.property_price.toLocaleString()}
                                        </a>
                                        {/* <a href="javascript:void(0)" className="heart">
                                        <img
                                          src="//client/img/icons/heart1.svg"
                                          className="heart1"
                                          alt="like"
                                        />
                                        <img
                                          src="//client/img/icons/heart2.svg"
                                          alt="liked"
                                          className="heart2"
                                        />
                                      </a> */}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              ))}
                      </div>
                    </div>

                    <div
                      className="tab-pane fade"
                      id="pills-contact3"
                      role="tabpanel"
                      aria-labelledby="pills-contact3-tab"
                      tabIndex={0}
                    >
                      <div className="row">
                        {loading
                          ? Array(3)
                              .fill(0)
                              .map((_, index) => (
                                <div className="col-lg-4 col-md-4" key={index}>
                                  <div className="property-boxarea">
                                    <div className="img1 image-anime">
                                      <div className="shimmer-box shimmer-image"></div>
                                    </div>
                                    <div className="content-area">
                                      <div className="shimmer-box shimmer-text-lg"></div>
                                      <div className="shimmer-box shimmer-text-sm"></div>
                                      <ul>
                                        <li>
                                          <div className="shimmer-box shimmer-pill"></div>
                                        </li>
                                        <li>
                                          <div className="shimmer-box shimmer-pill"></div>
                                        </li>
                                        <li>
                                          <div className="shimmer-box shimmer-pill"></div>
                                        </li>
                                      </ul>
                                      <div className="btn-area">
                                        <div className="shimmer-box shimmer-btn"></div>
                                        <div className="shimmer-box shimmer-circle"></div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              ))
                          : properties
                              .filter((property) =>
                                ["Vacant Land"].includes(property.property_type)
                              )
                              .map((property) => (
                                <div
                                  className="col-lg-4 col-md-4"
                                  key={property.id}
                                >
                                  <div className="property-boxarea">
                                    <div className="img1 image-anime">
                                      <a
                                        onClick={() =>
                                          handleDescriptionNavigate(property)
                                        }
                                        style={{ cursor: "pointer" }}
                                      >
                                        <img
                                          src={
                                            property.main_image_path
                                              ? property.main_image_path.startsWith(
                                                  "/uploads"
                                                )
                                                ? `${COMPANY_PRIMARY_DOMAIN_URL}${property.main_image_path}`
                                                : property.main_image_path
                                              : "//client/img/property-placeholder-image.png" // Fallback image
                                          }
                                          alt={property.name} style={{ height: '400px', objectFit: 'cover' }} 
                                        />
                                      </a>
                                    </div>
                                    <div className="category-list">
                                      <ul>
                                        <li>
                                          <a
                                            href={`/listing?search=${property.property_type}`}
                                          >
                                            {property.property_type}
                                          </a>
                                        </li>
                                      </ul>
                                    </div>
                                    <div className="content-area">
                                      <a
                                        onClick={() =>
                                          handleDescriptionNavigate(property)
                                        }
                                        style={{ cursor: "pointer" }}
                                      >
                                        {property.name}
                                      </a>
                                      <div className="space18"></div>
                                      <p>
                                        {property.city}, {property.state},{" "}
                                        {property.country}
                                      </p>
                                      <div className="space24"></div>
                                      <ul>
                                        <li>
                                          <a href="#">
                                            <img
                                              src="//client/img/icons/bed1.svg"
                                              alt="bed"
                                            />
                                            x{property.total_bedrooms}
                                          </a>
                                        </li>
                                        <li>
                                          <a href="#">
                                            <img
                                              src="//client/img/icons/bath1.svg"
                                              alt="bath"
                                            />
                                            x{property.total_bathrooms}
                                          </a>
                                        </li>
                                        <li>
                                          <a href="#">
                                            <img
                                              src="//client/img/icons/sqare1.svg"
                                              alt="size"
                                            />
                                            {property.plot_size}
                                          </a>
                                        </li>
                                      </ul>
                                      <div className="btn-area">
                                        <a
                                          onClick={() =>
                                            handleDescriptionNavigate(property)
                                          }
                                          style={{ cursor: "pointer" }}
                                          className="nm-btn"
                                        >
                                          ₦{" "}
                                          {property.property_price.toLocaleString()}
                                        </a>
                                        {/* <a href="javascript:void(0)" className="heart">
                                        <img
                                          src="//client/img/icons/heart1.svg"
                                          className="heart1"
                                          alt="like"
                                        />
                                        <img
                                          src="//client/img/icons/heart2.svg"
                                          alt="liked"
                                          className="heart2"
                                        />
                                      </a> */}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Property Listing Area Ends Here */}

      {/* How To Buy, Sell, or Rent Starts Here */}
      <div className="project1-section-area sp2">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 m-auto">
              <div className="project-heading heading1 space-margin60 text-center">
                <h5>3 step to buy sell property</h5>
                <div className="space20"></div>
                <h2 className="text-anime-style-3">See How We Can Help</h2>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-4 col-md-6">
              <div className="project-featured-box">
                <div className="img1">
                  <img src="//client/img/all-images/project/project-img1.png" />
                </div>
                <div className="space40"></div>
                <div className="btn-area">
                  <a href="/listing">Buy A Property</a>
                </div>
              </div>
            </div>

            <div className="col-lg-4 col-md-6">
              <div className="project-featured-box">
                <div className="img1">
                  <img src="//client/img/all-images/project/project-img2.png" />
                </div>
                <div className="space40"></div>
                <div className="btn-area">
                  <a href="/signin">Sell A Property</a>
                </div>
              </div>
            </div>

            <div className="col-lg-4 col-md-6">
              <div className="project-featured-box">
                <div className="img1">
                  <img src="//client/img/all-images/project/project-img3.png" />
                </div>
                <div className="space40"></div>
                <div className="btn-area">
                  <a href="/signin">Rent A Property</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* How To Buy, Sell, or Rent Ends Here */}

      {/* Price History Starts Here */}
      <div
        className="items-section-area sp1"
        style={{
          backgroundImage: "url(//client/img/all-images/bg/bg2.png)",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-4">
              <div className="item-header heading1">
                <h5>Property Value Updates</h5>
                <div className="space20"></div>
                <h2 className="text-anime-style-3">Lasted Changes</h2>
                <div className="space16"></div>
                <p>
                  Know when to buy, sell, or rent properties with our property
                  value monitor.
                </p>
                <div className="space28"></div>
                <div className="btn-area1">
                  <a href="/pricehistory" className="theme-btn1">
                    View Entire History{" "}
                    <span className="arrow1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="24"
                        height="24"
                        fill="currentColor"
                      >
                        <path d="M12 13H4V11H12V4L20 12L12 20V13Z"></path>
                      </svg>
                    </span>
                    <span className="arrow2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="24"
                        height="24"
                        fill="currentColor"
                      >
                        <path d="M12 13H4V11H12V4L20 12L12 20V13Z"></path>
                      </svg>
                    </span>
                  </a>
                </div>
              </div>
            </div>
            <div className="col-lg-3"></div>

            {loading
              ? Array(1)
                  .fill(0)
                  .map((_, index) => (
                    <div className="col-lg-4" key={index}>
                      <div className="box-slider">
                        <div className="item-featured-boxarea">
                          <h5>
                            <span>
                              <div className="shimmer-box shimmer-circle-sm"></div>
                            </span>
                            <div className="shimmer-box shimmer-text-sm"></div>
                          </h5>
                          <div className="space20"></div>
                          <div className="shimmer-box shimmer-text-lg"></div>
                          <div className="space28"></div>
                          <div className="shimmer-box shimmer-text"></div>
                          <div className="space28"></div>
                          <div className="shimmer-box shimmer-btn"></div>
                        </div>
                      </div>
                    </div>
                  ))
              : priceHistory.length > 0 && (
                  <div className="col-lg-4">
                    <div className="box-slider">
                      <div className="item-featured-boxarea">
                        <h5>
                          <span>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                            >
                              <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2ZM12 20c-4.418 0-8-3.582-8-8s3.582-8 8-8 8 3.582 8 8-3.582 8-8 8Zm.5-13h-1v6l4.25 2.52.5-.87-3.75-2.15V7Z"></path>
                            </svg>
                          </span>
                          {dateToWords(priceHistory[0].created_on)}
                        </h5>
                        <div className="space20"></div>
                        <span className="arrow1">
                          <div className="img1 image-anime">
                            <a
                              href={`/description?id=${priceHistory[0].property_id}`}
                            >
                              <img
                                src={
                                  priceHistory[0].imagePath
                                    ? priceHistory[0].imagePath.startsWith(
                                        "/uploads"
                                      )
                                      ? `${COMPANY_PRIMARY_DOMAIN_URL}${priceHistory[0].imagePath}`
                                      : priceHistory[0].imagePath
                                    : "//client/img/property-placeholder-image.png" // Fallback image
                                }
                                style={{ width: '350px', height: '350px', objectFit: 'cover', borderRadius: 14 }} 
                              />
                            </a>
                          </div>
                          <div className="space20"></div>
                          <h4>
                            <b>{priceHistory[0].property_name}</b>
                          </h4>
                        </span>
                        <div className="space28"></div>
                        <h3>
                          <s>₦{priceHistory[0].old_price.toLocaleString()}</s> ₦
                          {priceHistory[0].new_price.toLocaleString()}{" "}
                          {priceHistory[0].new_price <
                          priceHistory[0].old_price ? (
                            <a href="#" className="status-badge pending">
                              <i className="fas fa-arrow-down text-danger"></i>
                            </a>
                          ) : (
                            <a href="#" className="status-badge approved">
                              <i className="fas fa-arrow-up text-success"></i>
                            </a>
                          )}
                        </h3>
                        <div className="space28"></div>
                        <div className="btn-area1">
                          <a
                            href={`/description?id=${priceHistory[0].property_id}#price-history-section`}
                            className="theme-btn1"
                          >
                            View Property
                            <span className="arrow1">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                width="24"
                                height="24"
                                fill="currentColor"
                              >
                                <path d="M12 13H4V11H12V4L20 12L12 20V13Z"></path>
                              </svg>
                            </span>
                            <span className="arrow2">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                width="24"
                                height="24"
                                fill="currentColor"
                              >
                                <path d="M12 13H4V11H12V4L20 12L12 20V13Z"></path>
                              </svg>
                            </span>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
          </div>
        </div>
      </div>
      {/* Price History Ends Here */}
    </>
  );
};

export default HomePage;
