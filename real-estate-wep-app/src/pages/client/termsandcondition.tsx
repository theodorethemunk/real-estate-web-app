import { useEffect } from "react";
import { ShowMailingListPopup } from "../../services/dbservices/company/AddToMailingListAction";
import MiniContactFormComponent from "../../components/client/forms/MiniContactFormComponent";
import HeroComponentLite from "../../components/client/HeroLite";
import PageAnchorListComponent from "../../components/client/PageAnchorListComponent";
import { Setting } from "../../services/dbservices/company/FetchCompanyInfo";


const TermsAndConditionsPage: React.FC<{ settings: Setting[] }> = ({ settings }) => {

  useEffect(() => {
    const timer = setTimeout(() => {
      ShowMailingListPopup();
    }, 15000); // 15 seconds

    return () => clearTimeout(timer); // Cleanup on unmount
  }, []);

  return (
    <>
      <HeroComponentLite
        breadcrumbLinks={[
          { href: "home", text: "Home" },
          { href: "#", text: "Terms And Conditions" },
        ]}
        title="Terms And Conditions"
      />

      <div className="privacy-policy-area sp1">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <div className="policy-details">
                <div className="heading1">
                  <h2 id="intro">Terms and Conditions</h2>
                  <div className="space24"></div>
                  <p>
                    Welcome to Sommy Properties Ltd. These Terms and Conditions ("Terms") govern your use of our website, services, and any related applications. By accessing or using our services, you agree to comply with and be bound by these Terms. If you do not agree, please do not use our services.
                  </p>
                  <div className="space24"></div>
                  <h4>Effective Date: 20th Feb, 2025</h4>
                  <div className="space30" id="ourservices"></div>

                  <h3>1. Use of Our Services</h3>
                  <div className="space16"></div>
                  <p>
                    Sommy Properties Ltd provides real estate services, including property listings, buying, selling, and renting assistance. You must be at least 18 years old to use our services. You agree to provide accurate and up-to-date information when using our platform.
                  </p>

                  <div className="space30" id="useraccount"></div>
                  <h3>2. User Accounts</h3>
                  <div className="space16"></div>
                  <p>
                    To access certain features, you may need to create an account. You are responsible for maintaining the confidentiality of your account credentials and agree not to share your login details. Any unauthorized use of your account must be reported to us immediately.
                  </p>

                  <div className="space30" id="propandtransact"></div>
                  <h3>3. Property Listings and Transactions</h3>
                  <div className="space16"></div>
                  <ul>
                    <li>All property listings must be accurate, lawful, and not misleading.</li>
                    <li>We do not guarantee the accuracy of listings submitted by third parties.</li>
                    <li>Sommy Properties Ltd is not liable for any direct agreements made between buyers and sellers.</li>
                  </ul>

                  <div className="space30" id="paymentsandfees"></div>
                  <h3>4. Payments and Fees</h3>
                  <div className="space16"></div>
                  <p>
                    Some services on our platform may require payments. By making a payment, you agree to our pricing terms. Fees paid for services are generally non-refundable unless otherwise stated.
                  </p>

                  <div className="space30" id="prohibactivity"></div>
                  <h3>5. Prohibited Activities</h3>
                  <div className="space16"></div>
                  <p>When using our services, you agree NOT to:</p>
                  <ul>
                    <li>Submit false, fraudulent, or misleading information.</li>
                    <li>Violate any laws or third-party rights.</li>
                    <li>Engage in hacking, spamming, or unauthorized access.</li>
                    <li>Post or transmit harmful or inappropriate content.</li>
                  </ul>

                  <div className="space30" id="limitations"></div>
                  <h3>6. Limitation of Liability</h3>
                  <div className="space16"></div>
                  <p>
                    Sommy Properties Ltd is not responsible for any losses or damages incurred as a result of using our platform. We provide services on an "as-is" basis and do not guarantee uninterrupted or error-free usage.
                  </p>

                  <div className="space30" id="terminations"></div>
                  <h3>7. Termination</h3>
                  <div className="space16"></div>
                  <p>
                    We reserve the right to suspend or terminate your account if you violate these Terms. We may also discontinue our services at any time without prior notice.
                  </p>

                  <div className="space30" id="changeofterms"></div>
                  <h3>8. Changes to These Terms</h3>
                  <div className="space16"></div>
                  <p>
                    We may update these Terms periodically. Any changes will be effective immediately upon posting. You are encouraged to review these Terms regularly.
                  </p>

                  <div className="space30" id="governlaw"></div>
                  <h3>9. Governing Law</h3>
                  <div className="space16"></div>
                  <p>
                    These Terms are governed by the laws of Nigeria. Any disputes arising from these Terms will be resolved in the appropriate legal jurisdiction.
                  </p>

                  <div className="space30"></div>
                  <h3>10. Contact Us</h3>
                  <div className="space16"></div>
                  <p>
                    If you have any questions regarding these Terms, please <a href="/contact">contact us</a>.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="all-category">
                <PageAnchorListComponent
                  title="Our Terms"
                  categories={[
                    { name: "Introduction", href: "#intro" },
                    { name: "Use Of Services", href: "#ourservices" },
                    { name: "User Account", href: "#useraccount" },
                    { name: "Payment & Fees", href: "#paymentsandfees" },
                    { name: "Prohibited Activities", href: "#prohibactivity" },
                    { name: "imitation of Liability Sharing", href: "#limitations" },
                    { name: "Termination", href: "#terminations" },
                    { name: "Change Of These Terms", href: "#changeofterms" },
                    { name: "Governing Law", href: "#governlaw" },
                    { name: "Contact Us", href: "/contact" },
                  ]}
                />
                <div className="space30"></div>
                <MiniContactFormComponent settings={settings} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TermsAndConditionsPage;
