import { useEffect, useState } from "react";
import HeroComponentLite from "../../components/client/HeroLite";
import { fetchPropertiesLite } from "../../services/dbservices/company/FetchProperties";
import { IPropertyMain } from "../../models/interfaces/PropertyInterface";
import { useNavigate, useSearchParams } from "react-router-dom";
import { fetchHotPropertiesAction } from "../../services/dbservices/company/FetchHotProperties";
import { COMPANY_PRIMARY_DOMAIN_URL } from "../../repo/datarepo";


const ListingPage: React.FC = () => {

  const [loading, setLoading] = useState(true);
  const [loading2, setLoading2] = useState(true);
  const [hotPropertiesLimit, setHotPropertiesLimit] = useState(3);
  const [searchKeyword, setSearchKeyword] = useState(String);
  const [properties, setProperties] = useState<IPropertyMain[]>([]);
  const [hotProperties, setHotProperties] = useState<IPropertyMain[]>([]);
  const [searchParams] = useSearchParams();

  
useEffect(() => {
  try {
    if (searchParams.has("id")) {
      const parsed: IPropertyMain = {
        id: Number(searchParams.get("id")),
        name: searchParams.get("name") || "",
        about: searchParams.get("about") || "",
        main_image_id: Number(searchParams.get("main_image_id")),
        main_image_path: searchParams.get("main_image_path") || "",
        cover_image_path: searchParams.get("cover_image_path") || "",
        video_url: searchParams.get("video_url") || "",
        property_price: Number(searchParams.get("property_price")),
        property_price_discount: Number(searchParams.get("property_price_discount")),
        published: searchParams.get("published") === "true",
        status: searchParams.get("status") || "",
        likes: Number(searchParams.get("likes")),
        tour_fee: Number(searchParams.get("tour_fee")),
        created_on: searchParams.get("created_on") || "",
        updated_on: searchParams.get("updated_on") || "",
        zip_code: searchParams.get("zip_code") || "",
        country: searchParams.get("country") || "",
        city: searchParams.get("city") || "",
        street_name: searchParams.get("street_name") || "",
        house_number: searchParams.get("house_number") || "",
        state: searchParams.get("state") || "",
        property_type: searchParams.get("property_type") || "",
        latitude: Number(searchParams.get("latitude")),
        longitude: Number(searchParams.get("longitude")),
        total_bedrooms: Number(searchParams.get("total_bedrooms")),
        total_bathrooms: Number(searchParams.get("total_bathrooms")),
        plot_size: searchParams.get("plot_size") || "",
        is_hot_property: searchParams.get("is_hot_property") === "true",
        is_company_property: searchParams.get("is_company_property") === "true",
        agent_id: Number(searchParams.get("agent_id")),
        owner_id: Number(searchParams.get("owner_id")),
      };

      handleDescriptionNavigate(parsed);
    }
  } catch (e) {
    console.error("Failed to parse property from URL:", e);
  }
}, []);

  useEffect(() => {
    setLoading(true);
    getProperties();
    setHotPropertiesLimit(1);
    fetchtHotProperties();
  }, [searchParams]);

  useEffect(() => {
    if (hotPropertiesLimit) {
      fetchtHotProperties();
    }
  }, [hotPropertiesLimit]);

  const getProperties = async () => {
    await setSearchKeyword(searchParams.get("search") || "");
    const fetchedProperties = await fetchPropertiesLite(500, searchKeyword);
    await setProperties(fetchedProperties);
    setTimeout(() => {
      setLoading(false);
    }, 15000);
  };

  const fetchtHotProperties = async () => {
    const fetchedProperties = await fetchHotPropertiesAction(hotPropertiesLimit);
    setHotProperties(fetchedProperties);
    setLoading2(false);
  };

  const updateHotPropertiesLimit = async (limit: number) => {
    setLoading2(true);
    setHotPropertiesLimit(limit);
  };

  const navigate = useNavigate();

  const handleDescriptionNavigate = (property: IPropertyMain) => {
    navigate("/description", { state: property });
  };

  return (
    <>
      <HeroComponentLite
        breadcrumbLinks={[
          { href: "home", text: "Home" },
          { href: "#", text: "Listings" },
        ]}
        title="Property Listings"
      />

      {searchKeyword || !hotProperties || hotProperties.length < 1 ? (
        <div></div>
      ) : (
        <div className="property-inner-section-find" style={{ marginTop: "40px" }}>
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="property-mapgrid-area">
                  <div className="heading1">
                    <h3><svg width="50" height="50" viewBox="0 0 24 24" fill="orange" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2C10 6 7 7 7 11C7 13 8 14 9 15C7 14 5 16 5 18C5 20.5 7.5 22 10 22C14 22 19 19 19 13C19 9 17 6 14 4C14 6 13 8 12 9C11 7 12 5 12 2Z" />
                    </svg> Hot Properties</h3>
                    <div className="tabs-btn">
                      <ul className="nav nav-pills d-none d-lg-block" id="pills-tab" role="tablist">
                        {hotPropertiesLimit < 25 ? <li className="nav-item" role="presentation">
                          <button className="nav-link" style={{ width: "120px" }} id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-selected="false"
                            onClick={() => {
                              updateHotPropertiesLimit(25);
                            }}>
                            Show More
                          </button>
                        </li> : <li className="nav-item" role="presentation">
                          <button className="nav-link" style={{ width: "120px" }} id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-selected="false"
                            onClick={() => {
                              updateHotPropertiesLimit(25);
                            }}>
                            Show Less
                          </button>
                        </li>}
                      </ul>
                    </div>
                  </div>
                  <div className="space32 d-none d-lg-block"></div>
                  <div className="row">

                    <div className="col-lg-12">
                      <div className="tab-content" id="pills-tabContent">
                        <div className="tab-pane fade show active" id="pills-hot" role="tabpanel" aria-labelledby="pills-hot-tab" tabIndex={0}>
                          <div className="row">

                            {loading2
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
                              : hotProperties.map((hotProperty) => (
                                <div className="col-lg-4 col-md-4" key={hotProperty.id}>
                                  <div className="property-boxarea">
                                    <div className="img1 image-anime">
                                      <a onClick={() => handleDescriptionNavigate(hotProperty)} style={{ cursor: "pointer" }}><img src={
                                        hotProperty.main_image_path
                                          ? hotProperty.main_image_path.startsWith('/uploads')
                                            ? `${COMPANY_PRIMARY_DOMAIN_URL}${hotProperty.main_image_path}`
                                            : hotProperty.main_image_path
                                          : '/client/img/property-placeholder-image.png' // Fallback image
                                      } alt={hotProperty.name} style={{ height: '400px', objectFit: 'cover' }}  /></a>
                                    </div>
                                    <div className="category-list">
                                      <ul>
                                        <li>
                                          <a href={`/listing?search=${hotProperty.property_type}`}>{hotProperty.property_type}</a>
                                        </li>
                                      </ul>
                                    </div>
                                    <div className="content-area">
                                      <a onClick={() => handleDescriptionNavigate(hotProperty)} style={{ cursor: "pointer" }}> <svg width="25" height="25" viewBox="0 0 24 24" fill="orange" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12 2C10 6 7 7 7 11C7 13 8 14 9 15C7 14 5 16 5 18C5 20.5 7.5 22 10 22C14 22 19 19 19 13C19 9 17 6 14 4C14 6 13 8 12 9C11 7 12 5 12 2Z" />
                                      </svg> {hotProperty.name}</a>
                                      <div className="space18"></div>
                                      <p>
                                        {hotProperty.city}, {hotProperty.state}, {hotProperty.country}
                                      </p>
                                      <div className="space24"></div>
                                      <ul>
                                        <li>
                                          <a href="#">
                                            <img src="/client/img/icons/bed1.svg" alt="bed" />
                                            x{hotProperty.total_bedrooms}
                                          </a>
                                        </li>
                                        <li>
                                          <a href="#">
                                            <img src="/client/img/icons/bath1.svg" alt="bath" />
                                            x{hotProperty.total_bathrooms}
                                          </a>
                                        </li>
                                        <li>
                                          <a href="#">
                                            <img src="/client/img/icons/sqare1.svg" alt="size" />
                                            {hotProperty.plot_size}
                                          </a>
                                        </li>
                                      </ul>
                                      <div className="btn-area">
                                        <a onClick={() => handleDescriptionNavigate(hotProperty)} style={{ cursor: "pointer" }} className="nm-btn">
                                          ₦ {hotProperty.property_price.toLocaleString()}
                                        </a>
                                        {/* <a href="javascript:void(0)" className="heart">
            <img
              src="/client/img/icons/heart1.svg"
              className="heart1"
              alt="like"
            />
            <img
              src="/client/img/icons/heart2.svg"
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
        </div>
      )}
      <div className="property-inner-section-find" style={{ marginTop: "40px" }}>
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="property-mapgrid-area">
                <div className="heading1">
                  {/* Conditional heading based on search */}
                  {searchKeyword ? (
                    <h3>Showing search results for "{searchKeyword}" ({properties.length})</h3>
                  ) : (
                    <h3>More Properties ({properties.length})</h3>
                  )}
                  <div className="tabs-btn">
                    <ul className="nav nav-pills d-none d-lg-block" id="pills-tab" role="tablist">
                      <li className="nav-item" role="presentation">
                        <button className="nav-link active" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home" aria-selected="true">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M22 12.999V20C22 20.5523 21.5523 21 21 21H13V12.999H22ZM11 12.999V21H3C2.44772 21 2 20.5523 2 20V12.999H11ZM11 3V10.999H2V4C2 3.44772 2.44772 3 3 3H11ZM21 3C21.5523 3 22 3.44772 22 4V10.999H13V3H21Z"></path>
                          </svg>
                        </button>
                      </li>
                      <li className="nav-item" role="presentation">
                        <button className="nav-link" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-selected="false">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M8 4H21V6H8V4ZM3 3.5H6V6.5H3V3.5ZM3 10.5H6V13.5H3V10.5ZM3 17.5H6V20.5H3V17.5ZM8 11H21V13H8V11ZM8 18H21V20H8V18Z"></path>
                          </svg>
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="space32 d-none d-lg-block"></div>
                <div className="row">

                  <div className="col-lg-12">
                    <div className="tab-content" id="pills-tabContent">
                      <div className="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab" tabIndex={0}>
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
                            : properties.map((property) => (
                              <div className="col-lg-4 col-md-4" key={property.id}>
                                <div className="property-boxarea">
                                  <div className="img1 image-anime">
                                    <a onClick={() => handleDescriptionNavigate(property)} style={{ cursor: "pointer" }}><img src={
                                      property.main_image_path
                                        ? property.main_image_path.startsWith('/uploads')
                                          ? `${COMPANY_PRIMARY_DOMAIN_URL}${property.main_image_path}`
                                          : property.main_image_path
                                        : '/client/img/property-placeholder-image.png' // Fallback image
                                    } alt={property.name} /></a>
                                  </div>
                                  <div className="category-list">
                                    <ul>
                                      <li>
                                        <a href={`/listing?search=${property.property_type}`}>{property.property_type}</a>
                                      </li>
                                    </ul>
                                  </div>
                                  <div className="content-area">
                                    <a onClick={() => handleDescriptionNavigate(property)} style={{ cursor: "pointer" }}>{property.name}</a>
                                    <div className="space18"></div>
                                    <p>
                                      {property.city}, {property.state}, {property.country}
                                    </p>
                                    <div className="space24"></div>
                                    <ul>
                                      <li>
                                        <a href="#">
                                          <img src="/client/img/icons/bed1.svg" alt="bed" />
                                          x{property.total_bedrooms}
                                        </a>
                                      </li>
                                      <li>
                                        <a href="#">
                                          <img src="/client/img/icons/bath1.svg" alt="bath" />
                                          x{property.total_bathrooms}
                                        </a>
                                      </li>
                                      <li>
                                        <a href="#">
                                          <img src="/client/img/icons/sqare1.svg" alt="size" />
                                          {property.plot_size}
                                        </a>
                                      </li>
                                    </ul>
                                    <div className="btn-area">
                                      <a onClick={() => handleDescriptionNavigate(property)} style={{ cursor: "pointer" }} className="nm-btn">
                                        ₦ {property.property_price.toLocaleString()}
                                      </a>
                                      {/* <a href="javascript:void(0)" className="heart">
                      <img
                        src="/client/img/icons/heart1.svg"
                        className="heart1"
                        alt="like"
                      />
                      <img
                        src="/client/img/icons/heart2.svg"
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

                      <div className="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab" tabIndex={0}>
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
                            : properties.map((property) => (

                              <div className="col-lg-12" key={property.id}>
                                <div className="property-boxarea2">
                                  <div className="row align-items-center">
                                    <div className="col-lg-6 col-md-6">
                                      <div className="img1 image-anime">
                                        <img src={
                                          property.main_image_path
                                            ? property.main_image_path.startsWith('/uploads')
                                              ? `${COMPANY_PRIMARY_DOMAIN_URL}${property.main_image_path}`
                                              : property.main_image_path
                                            : '/client/img/property-placeholder-image.png' // Fallback image
                                        } alt={property.name} style={{ height: '400px', objectFit: 'cover' }}  />
                                      </div>
                                    </div>

                                    <div className="col-lg-6 col-md-6">
                                      <div className="category-list">
                                        <ul>
                                          <li><a href="#">{property.property_type}</a></li>
                                        </ul>
                                      </div>
                                      <div className="content-area">
                                        <a href="#">{property.name}</a>
                                        <div className="space18"></div>
                                        <p><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                          <path d="M18.364 17.364L12 23.7279L5.63604 17.364C2.12132 13.8492 2.12132 8.15076 5.63604 4.63604C9.15076 1.12132 14.8492 1.12132 18.364 4.63604C21.8787 8.15076 21.8787 13.8492 18.364 17.364ZM12 15C14.2091 15 16 13.2091 16 11C16 8.79086 14.2091 7 12 7C9.79086 7 8 8.79086 8 11C8 13.2091 9.79086 15 12 15ZM12 13C10.8954 13 10 12.1046 10 11C10 9.89543 10.8954 9 12 9C13.1046 9 14 9.89543 14 11C14 12.1046 13.1046 13 12 13Z"></path>
                                        </svg> {property.city}, {property.state}, {property.country}</p>
                                        <div className="space24"></div>
                                        <ul>
                                          <li><a href="#"><img src="/client/img/icons/bed1.svg" alt="housebox" />x{property.total_bedrooms}</a></li>
                                          <li><a href="#"><img src="/client/img/icons/bath1.svg" alt="housebox" />x{property.total_bathrooms}</a></li>
                                          <li><a href="#"><img src="/client/img/icons/sqare1.svg" alt="housebox" />{property.plot_size}</a></li>
                                        </ul>
                                        <div className="btn-area">
                                          {/* <div className="name-area">
                                    <div className="img">
                                      <img src="/client/img/all-images/properties/property-img7.png" alt="housebox"/>
                                    </div>
                                    <div className="text">
                                      <a href="#">Kurt Bates</a>
                                    </div>
                                  </div> */}
                                          <a href="#" className="nm-btn">₦ {property.property_price}</a>
                                        </div>
                                      </div>
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
      </div>
    </>
  );
};

export default ListingPage;
