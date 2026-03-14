import { useEffect, useState } from "react";
import HeroComponentLite from "../../components/client/HeroLite";
import { IProperty } from "../../models/interfaces/PropertyInterface";
import { fetchUsersProperties } from "../../services/dbservices/user/FetchUsersProperties";
import { dateToWords } from "../../services/Util/ConvertDateToWords";
import { COMPANY_PRIMARY_DOMAIN_URL } from "../../repo/datarepo";


const MyPropertiesPage: React.FC<{ savedUserId: string }> = ({ savedUserId }) => {
  const [loading, setLoading] = useState(true);
  const [myProperties, setMyProperties] = useState<IProperty[]>([]);

  useEffect(() => {    
    getMyProperties();
  }, [savedUserId]);

  const getMyProperties = async () => {
    if (!savedUserId || savedUserId == "0") {
      return;
    }

    setLoading(true);
    const fetchedProperties = await fetchUsersProperties(savedUserId);
    setMyProperties(fetchedProperties);
    setLoading(false);
  };

  return (
    <>
      <HeroComponentLite
        breadcrumbLinks={[
          { href: "home", text: "Home" },
          { href: "#", text: "Properties" },
        ]}
        title="My Properties"
      />
      <div className="dashboard-section-area sp1">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="space30"></div>
              <div className="dashboad-all-details-section">
                <h3>My Properties</h3>
                <div className="row">

                  <div className="space28"></div>
                  <h4 className="found">{loading ? "Fetching your properties..." : myProperties.length == 1 ? "Showing " + myProperties.length + " property" : "Showing " + myProperties.length + " properties"}</h4>
                  <div className="space20"></div>
                  <div className="table-container">
                    {/* Header */}
                    <div className="table-header">
                      <div>Properties</div>
                      <div className="d-none d-md-block">Status</div>
                      <div className="d-none d-md-block">Purchase Date</div>
                    </div>

                    {/* Row 1 */}
                    {loading
                      ? Array(3)
                        .fill(0)
                        .map((_) => (
                          <div className="table-row">
                            <div className="listing">
                              <div className="shimmer-box shimmer-image-small" style={{ marginRight: 20 }}></div>
                              <div className="details" >
                                <div className="shimmer-box shimmer-text"></div>
                                <div className="space5"></div>
                                <div className="shimmer-box shimmer-btn"></div>
                              </div>
                            </div>
                            <div className="status">
                              <div className="shimmer-box shimmer-btn"></div>
                            </div>
                            <div className="actions">
                              <div className="shimmer-box shimmer-text"></div>
                            </div>
                          </div>
                        ))
                      : myProperties.length < 1 ?
                        <div className="text-center p-4">
                          <div className="space30"></div>
                          <p className="fw-bold">You own no properties</p>
                          <div className="space10"></div>
                          <a href="/listing" className="btn btn-dark">Shop Now</a>
                        </div>
                      : myProperties.map((history) => (
                        <div className="table-row" key={history.id}>
                          <div className="listing">
                            <img src={
                                        history.imageFilePath
                                          ? history.imageFilePath.startsWith('/uploads')
                                            ? `${COMPANY_PRIMARY_DOMAIN_URL}${history.imageFilePath}`
                                            : history.imageFilePath
                                          : '/client/img/property-placeholder-image.png' // Fallback image
                                      } />
                            <div className="details">
                              <a href="#">{history.name}</a>
                              <div className="space5"></div>
                              <a className="price">Current Price: ₦ {history.propertyPrice.toLocaleString()}</a>
                            </div>
                          </div>
                          <div className="status">
                            <a href="#" className="status-badge approved">OWNED</a>
                          </div>
                          <div className="actions">
                            <h5 className="edit"> {dateToWords(history.updatedOn ?? "")}</h5>
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
    </>
  );
};

export default MyPropertiesPage;
