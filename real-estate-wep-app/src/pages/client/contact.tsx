import MainContactFormComponent from "../../components/client/forms/MainContactFormComponent";
import HeroComponentLite from "../../components/client/HeroLite";
import { Setting } from "../../services/dbservices/company/FetchCompanyInfo";


const ContactPage: React.FC<{ settings: Setting[] }> = ({ settings }) => {

  const infoEmailSettings = settings.find(setting => setting.name.toLowerCase() === "info email");
  const companyPhoneNumberSettings = settings.find(setting => setting.name.toLowerCase() === "company phone");
  const companyAddressSettings = settings.find(setting => setting.name.toLowerCase() === "company address");

  const facebookPageSettings = settings.find(setting => setting.name.toLowerCase() === "facebook page");
  const youtubeChannelSettings = settings.find(setting => setting.name.toLowerCase() === "youtube channel");
  const instagramProfileSettings = settings.find(setting => setting.name.toLowerCase() === "instagram profile");
  const linkedinPageSettings = settings.find(setting => setting.name.toLowerCase() === "linkedin profile");


  return (
    <>
      <HeroComponentLite
        breadcrumbLinks={[
          { href: "home", text: "Home" },
          { href: "#", text: "Contact Us" },
        ]}
        title="Contact Us"
      />
      <div className="contact-inner-section sp1">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <div className="heading1">
                <h5>Contact Us</h5>
                <div className="space32"></div>
                <h2>Let’s Start the Conversation</h2>
                <div className="space24"></div>
                <p>
                  Sommy Properties Ltd, we value communication and are here to assist with all your real estate needs. Whether you’re buying, selling, renting, or
                  managing a property, our dedicated team is ready to provide guidance and support.
                  Reach out to us via phone, email, or visit our office—we’re here to make your real estate journey as smooth and successful as possible.
                  Let’s turn your property goals into reality!</p>
                <div className="space40"></div>
                {settings.length < 1 ? (
                  <div></div>
                ) : (
                  <div className="number-address-area">
                    <div className="phone-number">
                      <div className="img1">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M21 16.42V19.9561C21 20.4811 20.5941 20.9167 20.0705 20.9537C19.6331 20.9846 19.2763 21 19 21C10.1634 21 3 13.8366 3 5C3 4.72371 3.01545 4.36687 3.04635 3.9295C3.08337 3.40588 3.51894 3 4.04386 3H7.5801C7.83678 3 8.05176 3.19442 8.07753 3.4498C8.10067 3.67907 8.12218 3.86314 8.14207 4.00202C8.34435 5.41472 8.75753 6.75936 9.3487 8.00303C9.44359 8.20265 9.38171 8.44159 9.20185 8.57006L7.04355 10.1118C8.35752 13.1811 10.8189 15.6425 13.8882 16.9565L15.4271 14.8019C15.5572 14.6199 15.799 14.5573 16.001 14.6532C17.2446 15.2439 18.5891 15.6566 20.0016 15.8584C20.1396 15.8782 20.3225 15.8995 20.5502 15.9225C20.8056 15.9483 21 16.1633 21 16.42Z"></path>
                        </svg>
                      </div>
                      <div className="content">
                        <p>Phone Number</p>
                        <a href={`tel:${companyPhoneNumberSettings?.context}`}>{companyPhoneNumberSettings?.context}</a>
                      </div>
                    </div>

                    <div className="phone-number m-0">
                      <div className="img1">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M3 3H21C21.5523 3 22 3.44772 22 4V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V4C2 3.44772 2.44772 3 3 3ZM12.0606 11.6829L5.64722 6.2377L4.35278 7.7623L12.0731 14.3171L19.6544 7.75616L18.3456 6.24384L12.0606 11.6829Z"></path>
                        </svg>
                      </div>
                      <div className="content">
                        <p>Email Address</p>
                        <a href={`mailto:${infoEmailSettings?.context}`}>{infoEmailSettings?.context}</a>
                      </div>
                    </div>
                  </div>

                )}

                <div className="space32"></div>
                {settings.length < 1 ? (
                  <div></div>
                ) : (
                  <div className="number-address-area2">
                    <div className="phone-number">
                      <div className="img1">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M18.364 17.364L12 23.7279L5.63604 17.364C2.12132 13.8492 2.12132 8.15076 5.63604 4.63604C9.15076 1.12132 14.8492 1.12132 18.364 4.63604C21.8787 8.15076 21.8787 13.8492 18.364 17.364ZM12 15C14.2091 15 16 13.2091 16 11C16 8.79086 14.2091 7 12 7C9.79086 7 8 8.79086 8 11C8 13.2091 9.79086 15 12 15ZM12 13C10.8954 13 10 12.1046 10 11C10 9.89543 10.8954 9 12 9C13.1046 9 14 9.89543 14 11C14 12.1046 13.1046 13 12 13Z"></path>
                        </svg>
                      </div>
                      <div className="content">
                        <a href="#">{companyAddressSettings?.context}</a>
                      </div>
                    </div>

                  </div>
                )}

                <div className="space40"></div>
                {settings.length < 1 ? (
                  <div></div>
                ) : (
                  <div className="social">
                    <ul>
                      <li><a href={settings.length < 1 || !facebookPageSettings?.context ? "#" : facebookPageSettings.context} target={settings.length < 1 || !facebookPageSettings?.context ? "" : "_blank"}><i className="fa-brands fa-facebook-f"></i></a></li>
                      <li><a href={settings.length < 1 || !linkedinPageSettings?.context ? "#" : linkedinPageSettings.context} target={settings.length < 1 || !linkedinPageSettings?.context ? "" : "_blank"}><i className="fa-brands fa-linkedin-in"></i></a></li>
                      <li><a href={settings.length < 1 || !instagramProfileSettings?.context ? "#" : instagramProfileSettings.context} target={settings.length < 1 || !instagramProfileSettings?.context ? "" : "_blank"}><i className="fa-brands fa-instagram"></i></a></li>
                      <li><a href={settings.length < 1 || !youtubeChannelSettings?.context ? "#" : youtubeChannelSettings.context} target={settings.length < 1 || !youtubeChannelSettings?.context ? "" : "_blank"}><i className="fa-brands fa-youtube"></i></a></li>
                    </ul>
                  </div>
                )}

              </div>
            </div>
            <div className="col-lg-1"></div>
            <div className="col-lg-5">
              <MainContactFormComponent settings={settings} />
            </div>
          </div>
        </div>
      </div>

      <div className="mapouter">
        <div className="gmap_canvas">
          <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d4506257.120552435!2d88.67021924228865!3d21.954385721237916!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sbd!4v1704088968016!5m2!1sen!2sbd" width="600" height="450" style={{ border: "0", }}></iframe>
        </div>
      </div>
    </>
  );
};

export default ContactPage;
