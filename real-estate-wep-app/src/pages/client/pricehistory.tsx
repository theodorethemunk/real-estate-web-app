import { useEffect, useState } from "react";
import HeroComponentLite from "../../components/client/HeroLite";
import { IPriceHistory } from "../../models/interfaces/PriceHistoryInterface";
import { fetchPriceHistory } from "../../services/dbservices/company/FetchPriceHistory";
import { dateToWords } from "../../services/Util/ConvertDateToWords";
import { calculatePriceDifference } from "../../services/Util/EvaluatePriceDifference";
import { ShowMailingListPopup } from "../../services/dbservices/company/AddToMailingListAction";
import { COMPANY_PRIMARY_DOMAIN_URL } from "../../repo/datarepo";

const PriceHistoryPage: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [priceHistory, setPriceHistory] = useState<IPriceHistory[]>([]);

  useEffect(() => {
    const getPriceHistory = async () => {
      const fetchedPriceHistory = await fetchPriceHistory();
      setPriceHistory(fetchedPriceHistory);
      setLoading(false);
    };

    // Start both async data fetch and the popup timer
    getPriceHistory();

    const timer = setTimeout(() => {
      ShowMailingListPopup();
    }, 30000); // 30 seconds

    // Cleanup function
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <HeroComponentLite
        breadcrumbLinks={[
          { href: "home", text: "Home" },
          { href: "#", text: "Price History" },
        ]}
        title="Property Price History"
      />

      <div className="dashboard-section-area sp1">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="space30"></div>
              <div className="dashboad-all-details-section">
                <h3>Price History</h3>
                <div className="row">
                  <div className="space28"></div>
                  <h4 className="found">
                    {loading
                      ? "Fetching history..."
                      : "Showing " + priceHistory.length + " properties"}
                  </h4>
                  <div className="space20"></div>
                  <div className="table-container">
                    {/* Header */}
                    <div className="table-header">
                      <div>Properties</div>
                      <div className="d-none d-md-block">Status</div>
                      <div className="d-none d-md-block">Last Updated</div>
                    </div>

                    {/* Row 1 */}
                    {loading
                      ? Array(6)
                          .fill(0)
                          .map((_) => (
                            <div className="table-row">
                              <div className="listing">
                                <div
                                  className="shimmer-box shimmer-image-small"
                                  style={{ marginRight: 20 }}
                                ></div>
                                <div className="details">
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
                      : priceHistory.map((history) => (
                          <div className="table-row" key={history.id}>
                            <div className="listing">
                              <a
                                href={`/description?id=${history.property_id}#price-history-section`}
                              >
                                <img
                                  src={
                                    history.imagePath
                                      ? history.imagePath.startsWith("/uploads")
                                        ? `${COMPANY_PRIMARY_DOMAIN_URL}${history.imagePath}`
                                        : history.imagePath
                                      : "/client/img/property-placeholder-image.png" // Fallback image
                                  }
                                />
                              </a>
                              <div className="details">
                                <a
                                  href={`/description?id=${history.property_id}#price-history-section`}
                                >
                                  {history.property_name}
                                </a>
                                <div className="space5"></div>
                                <a className="price">
                                  Current Price: ₦{" "}
                                  {history.new_price.toLocaleString()}
                                </a>
                                <div className="space10"></div>
                                <a className="status-badge sold">
                                  Old Price: ₦{" "}
                                  {history.old_price.toLocaleString()}
                                </a>
                              </div>
                            </div>
                            <div className="status">
                              {history.new_price < history.old_price ? (
                                <a href="#" className="status-badge pending">
                                  {calculatePriceDifference(
                                    history.old_price,
                                    history.new_price
                                  )}
                                  %&nbsp;&nbsp;
                                  <i className="fas fa-arrow-down"></i>
                                </a>
                              ) : (
                                <a href="#" className="status-badge approved">
                                  {calculatePriceDifference(
                                    history.old_price,
                                    history.new_price
                                  )}
                                  %&nbsp;&nbsp;
                                  <i className="fas fa-arrow-up"></i>
                                </a>
                              )}
                            </div>
                            <div className="actions">
                              <h5 className="edit">
                                {" "}
                                {dateToWords(history.created_on)}
                              </h5>
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

export default PriceHistoryPage;
