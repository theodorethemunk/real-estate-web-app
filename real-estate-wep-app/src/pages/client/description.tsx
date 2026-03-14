import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import MiniContactFormComponent from "../../components/client/forms/MiniContactFormComponent";
import HeroComponentLite from "../../components/client/HeroLite";
import { Setting } from "../../services/dbservices/company/FetchCompanyInfo";
import { IPropertyMain } from "../../models/interfaces/PropertyInterface";
import { MapEmbed } from "../../components/client/GoogleMapComponent";
import { IImage } from "../../models/interfaces/IImage";
import { getPropertyImagesAction } from "../../services/dbservices/user/GetPropertyImages";
import { IPlanImage } from "../../models/interfaces/IPlanImage";
import { IExternalProp } from "../../models/interfaces/IExternalProp";
import { IPriceHistory } from "../../models/interfaces/PriceHistoryInterface";
import { IPropertyFeature } from "../../models/interfaces/IPropertyFeature";
import { getPropertyPlanImagesAction } from "../../services/dbservices/user/GetPropertyPlanImages";
import { getExternalPropertiesAction } from "../../services/dbservices/user/GetExternalProperties";
import { getPropertyPriceHistoryAction } from "../../services/dbservices/user/GetPropertyPriceHistory";
import { getPropertyFeaturesAction } from "../../services/dbservices/user/GetPropertyFeatures";
import { dateToWords } from "../../services/Util/ConvertDateToWords";
import BuyPropertyComponent from "../../components/client/forms/BuyPropertyComponent";
import { isValidYouTubeUrl } from "../../services/Util/IsValidYoutubeUrl";

const DescriptionPage: React.FC<{ settings: Setting[] }> = ({ settings }) => {

  const location = useLocation();
  const propertyInfo = location.state as IPropertyMain;

  const [propertyFeature, setPropertyFeature] = useState<IPropertyFeature[]>([]);
  const [propertyImages, setImages] = useState<IImage[]>([]);
  const [planImages, setPlanImages] = useState<IPlanImage[]>([]);
  const [externalproperties, setExternalProperties] = useState<IExternalProp[]>([]);
  const [pricehistory, setPriceHistory] = useState<IPriceHistory[]>([]);

  const [videoUrl, setVideoUrl] = useState(propertyInfo?.video_url || "");

  const [loadingImages, setLoadingImages] = useState(true);

  const [mainImage, setMainImage] = useState("");
  const [videoThumbnail, setVideoThumbnailImage] = useState("");

  useEffect(() => {

    setMainImage(propertyInfo.cover_image_path);

    const fetchAllData = async () => {     
      console.log("About to fetch images..."); 
      await getPropertyImages();
      console.log("About to fetch Features..."); 
      await getPropertyFeatures();
      console.log("About to fetch Landmarks..."); 
      await getExternalProperties();
      console.log("About to fetch History..."); 
      await getPropertyPriceHistory();      
      console.log("About to fetch Plans..."); 
      await getPropertyPlanImages();
    };

    if (propertyInfo?.id) {
      fetchAllData();
    }

  }, [propertyInfo]);

  const getPropertyImages = async () => {
    setLoadingImages(true);
    const fetchedData = await getPropertyImagesAction(Number(propertyInfo.id));

    if (fetchedData.length > 0) {
      setImages(fetchedData);
      setVideoThumbnailImage(fetchedData[0].filePath ?? "")

    } else {
      setImages([]);
      setMainImage("");
    }

    setLoadingImages(false);
  };


  const getPropertyPlanImages = async () => {
    const fetchedData = await getPropertyPlanImagesAction(Number(propertyInfo.id));

    if (fetchedData.length > 0) {
      setPlanImages(fetchedData);
    } else {
      setPlanImages([]);
    }
  };

  const getExternalProperties = async () => {
    if (propertyInfo?.id) {
      const fetchedData = await getExternalPropertiesAction(Number(propertyInfo.id));
  
      if (fetchedData.length > 0) {
        setExternalProperties(fetchedData);
      } else {
        setExternalProperties([]);
      }
    }
  };
  

  const getPropertyPriceHistory = async () => {
    const fetchedData = await getPropertyPriceHistoryAction(Number(propertyInfo.id));

    if (fetchedData.length > 0) {
      setPriceHistory(fetchedData);
    } else {
      setPriceHistory([]);
    }
  };

  const getPropertyFeatures = async () => {
    const fetchedData = await getPropertyFeaturesAction(Number(propertyInfo.id));

    if (fetchedData.length > 0) {
      setPropertyFeature(fetchedData);
      console.log("Property Features: ", fetchedData);
    } else {
      setPropertyFeature([]);
    }
  };

  const updateMainImage = (imagePath: string) => {
    setMainImage(imagePath);
  }

  return (
    <>
      <HeroComponentLite
        breadcrumbLinks={[
          { href: "home", text: "Home" },
          { href: "#", text: "Property Description" },
        ]}
        title={propertyInfo?.name ?? "Description Screen"}
      />

      <div className="properties-details1-area sp1">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="images-area-details">
                <div className="img1">
                      <img src={
                              mainImage
                                ? mainImage.startsWith('/uploads')
                                  ? `http://sommyprop-001-site2.otempurl.com${mainImage}`
                                  : mainImage
                                : '//client/img/property-placeholder-image.png'
                            } alt="image" id="main-peroperty-image" />
                    </div>

                <div className="space40"></div>
                <div className="content-area">
                  <div className="content heading2">
                    {
                      <h2>{propertyInfo?.name}</h2>
                    }
                    <ul>
                      <li><a href="#">₦{propertyInfo?.property_price.toLocaleString()}</a></li>
                      <li><a href="#">/For Sale</a></li>
                    </ul>
                  </div>

                  <div className="list-area">
                    <div className="list">
                      <ul>
                        <li>Features:</li>
                        <li><img src="//client/img/icons/bed1.svg" alt="image" />x{propertyInfo?.total_bedrooms} <span> | </span></li>
                        <li><img src="//client/img/icons/bath1.svg" alt="image" />x{propertyInfo?.total_bathrooms} <span> | </span></li>
                        <li><img src="//client/img/icons/sqare1.svg" alt="image" />{propertyInfo?.plot_size}</li>
                      </ul>
                      <ul className="m-0">
                        <li>Location:</li>
                        <li><a href="#"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 23.7279L5.63604 17.364C2.12132 13.8492 2.12132 8.15076 5.63604 4.63604C9.15076 1.12132 14.8492 1.12132 18.364 4.63604C21.8787 8.15076 21.8787 13.8492 18.364 17.364L12 23.7279ZM16.9497 15.9497C19.6834 13.2161 19.6834 8.78392 16.9497 6.05025C14.2161 3.31658 9.78392 3.31658 7.05025 6.05025C4.31658 8.78392 4.31658 13.2161 7.05025 15.9497L12 20.8995L16.9497 15.9497ZM12 13C10.8954 13 10 12.1046 10 11C10 9.89543 10.8954 9 12 9C13.1046 9 14 9.89543 14 11C14 12.1046 13.1046 13 12 13Z"></path>
                        </svg> {propertyInfo?.house_number} {propertyInfo?.street_name} {propertyInfo?.city} {propertyInfo?.zip_code} {propertyInfo?.state} {propertyInfo?.country}</a></li>
                      </ul>
                    </div>

                    <ul className="share">
                      {/* <li><a href="#"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12.001 4.52853C14.35 2.42 17.98 2.49 20.2426 4.75736C22.5053 7.02472 22.583 10.637 20.4786 12.993L11.9999 21.485L3.52138 12.993C1.41705 10.637 1.49571 7.01901 3.75736 4.75736C6.02157 2.49315 9.64519 2.41687 12.001 4.52853ZM18.827 6.1701C17.3279 4.66794 14.9076 4.60701 13.337 6.01687L12.0019 7.21524L10.6661 6.01781C9.09098 4.60597 6.67506 4.66808 5.17157 6.17157C3.68183 7.66131 3.60704 10.0473 4.97993 11.6232L11.9999 18.6543L19.0201 11.6232C20.3935 10.0467 20.319 7.66525 18.827 6.1701Z"></path>
                      </svg></a></li> */}
                      {/* <li><a href="#"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M13.1202 17.0228L8.92129 14.7324C8.19135 15.5125 7.15261 16 6 16C3.79086 16 2 14.2091 2 12C2 9.79086 3.79086 8 6 8C7.15255 8 8.19125 8.48746 8.92118 9.26746L13.1202 6.97713C13.0417 6.66441 13 6.33707 13 6C13 3.79086 14.7909 2 17 2C19.2091 2 21 3.79086 21 6C21 8.20914 19.2091 10 17 10C15.8474 10 14.8087 9.51251 14.0787 8.73246L9.87977 11.0228C9.9583 11.3355 10 11.6629 10 12C10 12.3371 9.95831 12.6644 9.87981 12.9771L14.0788 15.2675C14.8087 14.4875 15.8474 14 17 14C19.2091 14 21 15.7909 21 18C21 20.2091 19.2091 22 17 22C14.7909 22 13 20.2091 13 18C13 17.6629 13.0417 17.3355 13.1202 17.0228ZM6 14C7.10457 14 8 13.1046 8 12C8 10.8954 7.10457 10 6 10C4.89543 10 4 10.8954 4 12C4 13.1046 4.89543 14 6 14ZM17 8C18.1046 8 19 7.10457 19 6C19 4.89543 18.1046 4 17 4C15.8954 4 15 4.89543 15 6C15 7.10457 15.8954 8 17 8ZM17 20C18.1046 20 19 19.1046 19 18C19 16.8954 18.1046 16 17 16C15.8954 16 15 16.8954 15 18C15 19.1046 15.8954 20 17 20Z">
                        </path>
                      </svg></a></li> */}
                    </ul>
                  </div>
                </div>
              </div>
              <div className="space48"></div>

              <div className="container-fluid">
                {loadingImages ? (
                  <div className="d-flex justify-content-center align-items-center my-5">
                    <div className="spinner-border text-dark" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                    <h5 className="ms-2">Loading...</h5>
                  </div>
                ) : propertyImages.length > 0 ? (
                  <div className="d-flex overflow-auto py-3">
                    {propertyImages.map((image, index) => (
                      <div key={index} className="me-3">
                        <a href="#main-peroperty-image" onClick={() => updateMainImage(image.filePath ?? "")}>
                          <img
                            src={
                              image.filePath
                                ? image.filePath.startsWith('/uploads')
                                  ? `http://sommyprop-001-site2.otempurl.com${image.filePath}`
                                  : image.filePath
                                : '//client/img/property-placeholder-image.png' // Fallback image
                            }
                            alt="Property"
                            className="img-fluid rounded"
                            style={{ width: "370px", height: "250px", objectFit: "cover" }}
                          /></a>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-center">No images available</p>
                )}
              </div>

              <div className="space80"></div>

              <div className="content-area">
                <div className="content heading2">
                  <h3>About Property</h3>

                  <div className="space10"></div>
                    <p>
                      {propertyInfo.about ?? ""}
                    </p>
                </div>
              </div>

              <div className="space80 "></div>
              <div className="row">
                <div className="col-lg-8">
                  <div className="details-siderbar">
                    {propertyImages.length > 0 && isValidYouTubeUrl(propertyInfo?.video_url || "") ? (
                      <>
                        <h3>Play Video</h3>
                        <div className="space32"></div>
                        <div className="vide-images">
                          <div className="img1">
                            <img src={
                              videoThumbnail
                                ? videoThumbnail.startsWith('/uploads')
                                  ? `http://sommyprop-001-site2.otempurl.com${videoThumbnail}`
                                  : videoThumbnail
                                : '//client/img/property-placeholder-image.png' // Fallback image
                            } alt="video-thumbnail" />
                          </div>
                          <a
                            href="#"
                            data-bs-toggle="modal"
                            data-bs-target="#videoModal"
                            onClick={() => setVideoUrl(propertyInfo?.video_url || "")}
                            className="popup-youtube"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M6 20.1957V3.80421C6 3.01878 6.86395 2.53993 7.53 2.95621L20.6432 11.152C21.2699 11.5436 21.2699 12.4563 20.6432 12.848L7.53 21.0437C6.86395 21.46 6 20.9812 6 20.1957Z"></path>
                            </svg>
                          </a>
                        </div>
                      </>
                    ) : null}



                    {propertyFeature.length > 0 &&
                      <>
                        <div className="space60"></div>
                        <h3>Property Amenities</h3>
                        <div className="space12"></div>
                        <div className="row">
                          {propertyFeature.map((feature) => (
                            <div className="col-lg-12 col-md-12">
                              <div className="list-box">
                                <div className="icon">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                                    <path d="M4 16L12 24L28 8" stroke="#073B3A" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
                                  </svg>
                                </div>
                                <div className="text" style={{ marginLeft: "16px" }}>
                                  <p style={{ fontSize: "21px" }}>{feature.name}</p><br />
                                  <p>{feature.context}</p>
                                </div>
                              </div>
                            </div>
                          ))}

                        </div></>
                    }

                    {externalproperties.length > 0 &&
                      <>
                        <div className="space60"></div>
                        <h3>Nearby Developments</h3>
                        <div className="space12"></div>
                        <div className="row">
                          {externalproperties.map((property) => (
                            <div className="col-lg-12 col-md-12">
                              <div className="list-box">
                                <div className="icon">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 12 7 12s7-6.75 7-12c0-3.87-3.13-7-7-7z"></path>
                                    <circle cx="12" cy="9" r="3"></circle>
                                  </svg>

                                </div>
                                <div className="text" style={{ marginLeft: "16px" }}>
                                  <p style={{ fontSize: "21px" }}>{property.name}</p> - <b>{property.type?.toUpperCase()}</b><br />
                                  <p>{property.address}</p>
                                </div>
                              </div>
                            </div>
                          ))}

                        </div></>
                    }

                    <div className="space60" id="price-history-section"></div>
                    <h3>Price History</h3>
                    <div className="space32"></div>
                    <div className="accordion-area">
                      <div className="accordion accordion-flush" id="accordionFlushExample">
                        <div className="accordion-item">
                          <h2 className="accordion-header">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                              <span>View History</span>
                            </button>
                          </h2>
                          <div id="flush-collapseOne" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                            <div className="accordion-body">
                              <table className="table table-hover">
                                <thead>
                                  <tr>
                                    <th>Old Price</th>
                                    <th>Current Price</th>
                                  </tr>
                                </thead>
                                <tbody className="mb-5">
                                  {pricehistory.map((history) => (
                                    <tr key={history.id}>
                                      <td>
                                        <span className={history.type == "rise" ? "text-success" : "text-danger"}>&#8226; &nbsp; ₦{history.old_price.toLocaleString()} <i className={history.type == "rise" ? "fas fa-arrow-up" : "fas fa-arrow-down"}></i></span>

                                      </td>
                                      <td className="">
                                        <span className={history.type == "rise" ? "text-success" : "text-danger"}>&#8226; &nbsp; ₦{history.new_price.toLocaleString()} <i className={history.type == "rise" ? "fas fa-arrow-up" : "fas fa-arrow-down"}></i></span>
                                        <p>{dateToWords(history.created_on)}</p>
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>

                      </div>
                    </div>

                    <div className="space60"></div>

                    <h3>Map Location</h3>
                    <div className="space32"></div>
                    <div className="map-section">

                      {/* Google Map Component */}
                      <MapEmbed latitude={Number(propertyInfo?.latitude)} longitude={Number(propertyInfo?.longitude)} />;

                      <div className="space12"></div>
                      <div className="list">
                        <ul>
                          <li>
                            <span>Address:</span>
                            <div>#{propertyInfo?.house_number} {propertyInfo?.street_name} {propertyInfo?.state}</div>
                          </li>
                          <li>
                            <span>City:</span>
                            <div>{propertyInfo?.city}</div>
                          </li>
                        </ul>
                        <ul className="m-0 ">
                          <li>
                            <span>Postal Code:</span>
                            <div>{propertyInfo?.zip_code}</div>
                          </li>
                          <li>
                            <span>Country:</span>
                            <div>{propertyInfo?.country}</div>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="space60"></div>

                    {planImages.length > 0 &&
                      <>
                        <h3>Floor Plans</h3>
                        <div className="space32"></div>
                        <div className="accordion-area">
                          <div className="accordion accordion-flush" id="accordionFlushExample">

                            {planImages.map((image) => (
                              <div className="accordion-item">
                                <h2 className="accordion-header">
                                  <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                                    <span>{image.name}</span>
                                  </button>
                                </h2>
                                <div id="flush-collapseOne" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                                  <div className="accordion-body">
                                    <div className="img1">
                                      <img src={
                              image.image_path
                                ? image.image_path.startsWith('/uploads')
                                  ? `http://sommyprop-001-site2.otempurl.com${image.image_path}`
                                  : image.image_path
                                : '//client/img/property-placeholder-image.png' // Fallback image
                            } alt="floor-plan-image" />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}


                          </div>
                        </div>
                      </>
                    }

                  </div>
                </div>

                <div className="col-lg-4">
                  <div className="all-side-details">
                    <MiniContactFormComponent settings={settings} />
                    <div className="space30"></div>
                    {propertyInfo.published && (
                      <BuyPropertyComponent
                        isCompanyProperty={propertyInfo.is_company_property}
                        propertyName={propertyInfo?.name ?? ""}
                        propertyId={Number(propertyInfo.id)}
                        propertyPrice={propertyInfo?.property_price ?? 0.00}
                      />
                    )}
                    <div className="space30"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isValidYouTubeUrl(videoUrl) && (
        <div className="modal fade" id="videoModal" tabIndex={-1} aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Property Video</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <div className="ratio ratio-16x9">
                  <iframe
                    src={videoUrl.replace("watch?v=", "embed/")}
                    title="YouTube video player"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DescriptionPage;
