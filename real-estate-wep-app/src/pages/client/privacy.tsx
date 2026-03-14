import { useEffect } from "react";
import { ShowMailingListPopup } from "../../services/dbservices/company/AddToMailingListAction";
import MiniContactFormComponent from "../../components/client/forms/MiniContactFormComponent";
import HeroComponentLite from "../../components/client/HeroLite";
import PageAnchorListComponent from "../../components/client/PageAnchorListComponent";
import { Setting } from "../../services/dbservices/company/FetchCompanyInfo";


const PrivacyPolicyPage: React.FC<{ settings: Setting[] }> = ({ settings }) => {

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
          { href: "#", text: "Privacy Policy" },
        ]}
        title="Privacy & Policy"
      />

      <div className="privacy-policy-area sp1">
      <div className="container">
        <div className="row">
          <div className="col-lg-8">
            <div className="policy-details">
              <div className="heading1">
                <h2 id="intro">Privacy & Policy</h2>
                <div className="space24"></div>
                <p>
                Sommy Properties Ltd. (“Company,” “we,” “us”), including our affiliates, respect your privacy and understand that you care about your 
                personal data and how it is used. We value your trust in sharing your personal data with us and are dedicated to protecting 
                your privacy, as further described in this Privacy Notice.  
                </p>
                <div className="space24"></div>
                <h4>Effective Date: 20th Feb, 2025</h4>
                <div className="space16"></div>
                <p>
                This Privacy Notice (“Notice”) applies to personal data of both consumers and Professionals collected by the Company, Sommy Properties Ltd, 
                through the family of websites, and mobile apps, mobile-optimized websites and other applications and/or electronic media 
                (such as, emails Sommy Properties Ltd sends) (collectively, the “Services”).
                </p>
                <div className="space16"></div>
                <p>
                This Privacy Notice describes in detail the types of data we collect about you; how we use your data (the purposes for processing your data) and 
                with whom we share it; the choices and rights you have with regard to your data; how we protect your data; and how you can contact us about our privacy practices.
                </p>
                <div className="space16"></div>
                <p>
                  Most of the Services are intended for a general audience, and are not targeted to children under 16. In addition, please review our Terms of Use, 
                  which govern your use of the Services.
                </p>
                <div className="space50" id="infowecollect"></div>
                <h3>Information We Collect</h3>
                <div className="space16"></div>
                <p>We collect the following types of information to provide a seamless experience</p>
                <div className="space32"></div>
                <h4>Personal Information:</h4>
                <div className="space12"></div>
                <p>Name, email address, phone number, mailing address, and payment details.</p>
                <div className="space16"></div>
                <h4>Property Information</h4>
                <div className="space12"></div>
                <p>Details about properties you list or inquire about</p>
                <div className="space16"></div>
                <h4>Usages Data</h4>
                <div className="space12"></div>
                <p> IP address, browser type, pages visited, and other analytics to improve our services.</p>
                <div className="space16"></div>
                <h4>Cookies</h4>
                <div className="space12"></div>
                <p>Small data files stored on your device to enhance website functionality and remember preferences.</p>
                <div className="space50" id="howweuseyourdata"></div>
                <h3>How We Use Your Information</h3>
                <div className="space16"></div>
                <p>We use the information we collect to:</p>
                <div className="space16"></div>
                <ul>
                  <li><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                      <path d="M1 0H17C17.5523 0 18 0.44772 18 1V17C18 17.5523 17.5523 18 17 18H1C0.44772 18 0 17.5523 0 17V1C0 0.44772 0.44772 0 1 0ZM8.0026 13L15.0737 5.92893L13.6595 4.51472L8.0026 10.1716L5.17421 7.3431L3.75999 8.7574L8.0026 13Z" fill="#073B3A" />
                    </svg> Provide and improve our real estate services.</li>
                  <li><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                      <path d="M1 0H17C17.5523 0 18 0.44772 18 1V17C18 17.5523 17.5523 18 17 18H1C0.44772 18 0 17.5523 0 17V1C0 0.44772 0.44772 0 1 0ZM8.0026 13L15.0737 5.92893L13.6595 4.51472L8.0026 10.1716L5.17421 7.3431L3.75999 8.7574L8.0026 13Z" fill="#073B3A" />
                    </svg> Process transactions and manage your listings or inquiries.</li>
                  <li><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                      <path d="M1 0H17C17.5523 0 18 0.44772 18 1V17C18 17.5523 17.5523 18 17 18H1C0.44772 18 0 17.5523 0 17V1C0 0.44772 0.44772 0 1 0ZM8.0026 13L15.0737 5.92893L13.6595 4.51472L8.0026 10.1716L5.17421 7.3431L3.75999 8.7574L8.0026 13Z" fill="#073B3A" />
                    </svg> Communicate updates, offers, and personalized recommendations.</li>
                  <li><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                      <path d="M1 0H17C17.5523 0 18 0.44772 18 1V17C18 17.5523 17.5523 18 17 18H1C0.44772 18 0 17.5523 0 17V1C0 0.44772 0.44772 0 1 0ZM8.0026 13L15.0737 5.92893L13.6595 4.51472L8.0026 10.1716L5.17421 7.3431L3.75999 8.7574L8.0026 13Z" fill="#073B3A" />
                    </svg> Ensure website security and fraud prevention.</li>
                </ul>
                <div className="space50" id="infosharing"></div>
                <h3>Information Sharing</h3>
                <div className="space16"></div>
                <p>We value your trust and do not sell or rent your personal information. However, we may share your information with:</p>
                <div className="space16"></div>
                <ul>
                  <li><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                      <path d="M1 0H17C17.5523 0 18 0.44772 18 1V17C18 17.5523 17.5523 18 17 18H1C0.44772 18 0 17.5523 0 17V1C0 0.44772 0.44772 0 1 0ZM8.0026 13L15.0737 5.92893L13.6595 4.51472L8.0026 10.1716L5.17421 7.3431L3.75999 8.7574L8.0026 13Z" fill="#073B3A" />
                    </svg> Trusted partners, such as payment processors or service providers, to facilitate transactions.</li>
                  <li><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                      <path d="M1 0H17C17.5523 0 18 0.44772 18 1V17C18 17.5523 17.5523 18 17 18H1C0.44772 18 0 17.5523 0 17V1C0 0.44772 0.44772 0 1 0ZM8.0026 13L15.0737 5.92893L13.6595 4.51472L8.0026 10.1716L5.17421 7.3431L3.75999 8.7574L8.0026 13Z" fill="#073B3A" />
                    </svg> Law enforcement or government authorities when required by law.</li>
                  <li><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                      <path d="M1 0H17C17.5523 0 18 0.44772 18 1V17C18 17.5523 17.5523 18 17 18H1C0.44772 18 0 17.5523 0 17V1C0 0.44772 0.44772 0 1 0ZM8.0026 13L15.0737 5.92893L13.6595 4.51472L8.0026 10.1716L5.17421 7.3431L3.75999 8.7574L8.0026 13Z" fill="#073B3A" />
                    </svg> Potential buyers, sellers, or tenants, with your consent, to complete real estate transactions.</li>
                </ul>
                <div className="space50" id="datasecurity"></div>
                <h3>Data Security</h3>
                <div className="space16"></div>
                <p>We implement industry-standard measures to protect your information from unauthorized access, disclosure, or misuse. However, please note that no system is completely secure.</p>
                <div className="space32" id="thirdparty"></div>
                <h3>Third Party Links</h3>
                <div className="space16"></div>
                <p>Our website may contain links to third-party websites. We are not responsible for their privacy practices, so please review their policies independently.</p>
                <div className="space16"></div>
                <p>At Sommy Properties Ltd, your privacy is our priority. We are committed to protecting the personal information you share with us when using our services. We collect information such as your name, contact details, and property preferences to provide a seamless experience in buying, selling, or renting properties. This data helps us personalize your journey, process transactions, and improve our services. Rest assured, we do not sell or rent your information to third parties. We use secure systems to safeguard your data and ensure compliance with privacy standards. For any questions or concerns, feel free to reach out to our team—we're here to assist you.</p>
                <div className="space32" id="change2policy"></div>
                <h3>Changes To Our Privacy Policy</h3>
                <div className="space16"></div>
                <p>
                  From time to time, we may change our Privacy Policy to reflect changes to our privacy practices and Services. 
                  If we modify the Privacy Policy, we will update the “Last Modified Date or Effective Date” and the changes will be effective as of the date we post such Notice. 
                  For material changes, we will notify you by posting a prominent notice on our Services indicating at the top of the Privacy Notice when it was most recently updated or by other appropriate means, such as email through the email address you most recently provided to us.
                </p>
                <div className="space32"></div>
                <h3>How To Contact Us</h3>
                <div className="space16"></div>
                <p>
                  If you have any questions or comments about this Privacy Policy or the manner in which we or our service providers treat your personal data, 
                  would like to exercise your choices, or would like us to update information we have about you or your preferences, please <a href="/contact">contact us</a>
                </p>
              </div>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="all-category">
            <PageAnchorListComponent
              title="Privacy Notice"
              categories={[
                { name: "Introduction", href: "#intro" },
                { name: "Information we collect", href: "#infowecollect" },
                { name: "How we use your data", href: "#howweuseyourdata" },
                { name: "Information Sharing", href: "#infosharing" },
                { name: "Data Security", href: "#datasecurity" },
                { name: "Third Party Links", href: "#thirdparty" },
                { name: "Changes To Our Policy", href: "#change2policy" },
                { name: "Contact Us", href: "/contact" },
              ]}
            />
              <div className="space30"></div>
              <MiniContactFormComponent settings={settings}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
  );
};

export default PrivacyPolicyPage;
