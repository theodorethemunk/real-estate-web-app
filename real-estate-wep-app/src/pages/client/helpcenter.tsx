import HeroComponentLite from "../../components/client/HeroLite";
import { useState, useEffect } from "react";
import { IFaq } from "../../models/interfaces/FAQInterface";
import { fetchFAQs } from "../../services/dbservices/company/FetchFAQAction";

const HelpCenterPage: React.FC = () => {
  const [faqs, setFaqs] = useState<IFaq[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<string>("security");

  useEffect(() => {
    const getFAQs = async () => {
      setLoading(true);
      const fetchedFAQs = await fetchFAQs();
      setFaqs(fetchedFAQs);
      setLoading(false);
    };
    getFAQs();
  }, []);

  // Group FAQs by category
  const categorizedFaqs: Record<string, IFaq[]> = {
    security: [],
    payments: [],
    properties: [],
    account: [],
  };

  faqs.forEach((faq) => {
    if (categorizedFaqs[faq.category]) {
      categorizedFaqs[faq.category].push(faq);
    }
  });

  return (
    <>
      <HeroComponentLite
        breadcrumbLinks={[
          { href: "home", text: "Home" },
          { href: "#", text: "Help Center" },
        ]}
        title="Help Center"
      />
      <div className="faq-section-area sp1">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 m-auto text-center">
              <div className="heading1 text-center space-margin60">
                <h5>Frequently Asked Questions</h5>
                <div className="space20"></div>
                <h2>Security, Payments, Properties, and Account</h2>
              </div>
            </div>
          </div>
          <div className="space10"></div>
          <div className="row">
            <div className="col-lg-10 m-auto">
              <div className="faq-area">
                <div className="accordion" id="accordionExample">
                  <ul className="nav nav-tabs" role="tablist">
                    {Object.keys(categorizedFaqs).map((tab) => (
                      <li className="nav-item" key={tab}>
                        <button
                          className={`nav-link ${activeTab === tab ? "active" : ""}`}
                          onClick={() => setActiveTab(tab)}
                        >
                          {tab.charAt(0).toUpperCase() + tab.slice(1)}
                        </button>
                      </li>
                    ))}
                  </ul>
                  {loading ? <div className="content-area d-flex justify-content-center align-items-center" style={{ minHeight: "30vh" }}>
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Fetching help...</span>
              </div>
            </div>  : <div className="tab-content mt-3">
                    {categorizedFaqs[activeTab].map((faq, index) => (
                      <div className="accordion-item" key={index}>
                        <h2 className="accordion-header">
                          <button
                            className="accordion-button collapsed"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target={`#collapse${activeTab}${index}`}
                            aria-expanded="false"
                            aria-controls={`collapse${activeTab}${index}`}
                          >
                            {faq.question}
                          </button>
                        </h2>
                        <div
                          id={`collapse${activeTab}${index}`}
                          className="accordion-collapse collapse"
                        >
                          <div className="accordion-body">
                            <p>{faq.answer}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                    {categorizedFaqs[activeTab].length === 0 && (
                      <p className="text-center">Please Wait, We Loading FAQs...</p>
                    )}
                  </div>}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HelpCenterPage;
