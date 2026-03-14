import HeroComponentLite from "../../components/client/HeroLite";
import { Setting } from "../../services/dbservices/company/FetchCompanyInfo";


const SocialsPage: React.FC<{ settings: Setting[] }> = ({ settings }) => {

  const facebookPageSettings = settings.find(setting => setting.name.toLowerCase() === "facebook page");
  const youtubeChannelSettings = settings.find(setting => setting.name.toLowerCase() === "youtube channel");
  const instagramProfileSettings = settings.find(setting => setting.name.toLowerCase() === "instagram profile");
  const linkedinPageSettings = settings.find(setting => setting.name.toLowerCase() === "linkedin profile");
  const tiktokProfileSettings = settings.find(setting => setting.name.toLowerCase() === "tiktok profile");

  return (
    <div>
      <HeroComponentLite
        breadcrumbLinks={[
          { href: "home", text: "Home" },
          { href: "#", text: "Socials" },
        ]}
        title="Our Socials"
      />
      <div className="location-section-area sp2" style={{ backgroundImage: "url(/client/img/all-images/bg/bg1.png)", backgroundPosition: "center", backgroundRepeat: "no-repeat", backgroundSize: "cover", }}>
        <div className="container">
          <div className="row">
            <div className="col-lg-4 m-auto">
              <div className="heading1 text-center space-margin60">
                <h5>Follows Us</h5>
                <div className="space20"></div>
                <h2>Our Social Media Presence</h2>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-3 col-md-6 col-sm-6 col-6">
              <div
                className="location-boxes"
                style={{
                  background: "linear-gradient(to bottom, white, #0077b5)", // LinkedIn
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                  padding: "20px",
                  borderRadius: "10px",
                }}
              >
                <a
                  href={settings.length < 1 || !linkedinPageSettings?.context ? "#" : linkedinPageSettings.context}
                  target={settings.length < 1 || !linkedinPageSettings?.context ? "" : "_blank"}
                  rel="noopener noreferrer"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "50px",
                    height: "50px",
                    borderRadius: "50%",
                    backgroundColor: "white",
                    marginBottom: "16px",
                  }}
                >
                  <i className="fa-brands fa-linkedin-in" style={{ color: "#0077b5", fontSize: "24px" }}></i>
                </a>
                <div>LinkedIn Profile</div>
                <div className="space24"></div>
                <a href={settings.length < 1 || !linkedinPageSettings?.context ? "#" : linkedinPageSettings.context} className="map" target="_blank">Open LinkedIn</a>
              </div>
            </div>

            <div className="col-lg-3 col-md-6 col-sm-6 col-6">
              <div
                className="location-boxes"
                style={{
                  background: "linear-gradient(to bottom, white, #1877F2)", // Facebook
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                  padding: "20px",
                  borderRadius: "10px",
                }}
              >
                <a
                  href={settings.length < 1 || !facebookPageSettings?.context ? "#" : facebookPageSettings.context}
                  target={settings.length < 1 || !facebookPageSettings?.context ? "" : "_blank"}
                  rel="noopener noreferrer"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "50px",
                    height: "50px",
                    borderRadius: "50%",
                    backgroundColor: "white",
                    marginBottom: "16px",
                  }}
                >
                  <i className="fa-brands fa-facebook-f" style={{ color: "#1877F2", fontSize: "24px" }}></i>
                </a>
                <div>Facebook Page</div>
                <div className="space24"></div>
                <a href={settings.length < 1 || !facebookPageSettings?.context ? "#" : facebookPageSettings.context} className="map" target="_blank">Open Facebook</a>
              </div>
            </div>

            <div className="col-lg-3 col-md-6 col-sm-6 col-6">
              <div
                className="location-boxes"
                style={{
                  background: "linear-gradient(to bottom, white, #E4405F)", // Instagram
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                  padding: "20px",
                  borderRadius: "10px",
                }}
              >
                <a
                  href={settings.length < 1 || !instagramProfileSettings?.context ? "#" : instagramProfileSettings.context}
                  target={settings.length < 1 || !instagramProfileSettings?.context ? "" : "_blank"}
                  rel="noopener noreferrer"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "50px",
                    height: "50px",
                    borderRadius: "50%",
                    backgroundColor: "white",
                    marginBottom: "16px",
                  }}
                >
                  <i className="fa-brands fa-instagram" style={{ color: "#E4405F", fontSize: "24px" }}></i>
                </a>
                <div>Instagram Account</div>
                <div className="space24"></div>
                <a href={settings.length < 1 || !instagramProfileSettings?.context ? "#" : instagramProfileSettings.context} className="map" target="_blank">Open Instagram</a>
              </div>
            </div>

            <div className="col-lg-3 col-md-6 col-sm-6 col-6">
              <div
                className="location-boxes"
                style={{
                  background: "linear-gradient(to bottom, white, #FF0000)", // YouTube
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                  padding: "20px",
                  borderRadius: "10px",
                }}
              >
                <a
                  href={settings.length < 1 || !youtubeChannelSettings?.context ? "#" : youtubeChannelSettings.context}
                  target={settings.length < 1 || !youtubeChannelSettings?.context ? "" : "_blank"}
                  rel="noopener noreferrer"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "50px",
                    height: "50px",
                    borderRadius: "50%",
                    backgroundColor: "white",
                    marginBottom: "16px",
                  }}
                >
                  <i className="fa-brands fa-youtube" style={{ color: "#FF0000", fontSize: "24px" }}></i>
                </a>
                <div>YouTube Channel</div>
                <div className="space24"></div>
                <a href={settings.length < 1 || !youtubeChannelSettings?.context ? "#" : youtubeChannelSettings.context} className="map" target="_blank">Open YouTube</a>
              </div>
            </div>

            <div className="col-lg-3 col-md-6 col-sm-6 col-6">
              <div
                className="location-boxes"
                style={{
                  background: "linear-gradient(to bottom, white, #FE2C55, #25F4EE)", // Facebook
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                  padding: "20px",
                  borderRadius: "10px",
                }}
              >
                <a
                  href={settings.length < 1 || !tiktokProfileSettings?.context ? "#" : tiktokProfileSettings.context}
                  target={settings.length < 1 || !tiktokProfileSettings?.context ? "" : "_blank"}
                  rel="noopener noreferrer"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "50px",
                    height: "50px",
                    borderRadius: "50%",
                    backgroundColor: "black",
                    marginBottom: "16px",
                  }}
                >
                  <i className="fa-brands fa-tiktok" style={{ color: "#fff", fontSize: "24px" }}></i>
                </a>
                <div>TikTok Account</div>
                <div className="space24"></div>
                <a href={settings.length < 1 || !tiktokProfileSettings?.context ? "#" : tiktokProfileSettings.context} className="map" target="_blank">Open TikTok</a>
              </div>
            </div>

            <div className="col-lg-3 col-md-6 col-sm-6 col-6">
              <div
                className="location-boxes"
                style={{
                  background: "linear-gradient(to bottom, white, #505050)", // Facebook
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                  padding: "20px",
                  borderRadius: "10px",
                }}
              >
                <a
                  href="/home"
                  rel="noopener noreferrer"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "50px",
                    height: "50px",
                    borderRadius: "50%",
                    backgroundColor: "black",
                    marginBottom: "16px",
                  }}
                >
                  <i className="fa-solid fa-globe" style={{ color: "#fff", fontSize: "24px" }}></i>
                </a>
                <div>Our Website</div>
                <div className="space24"></div>
                <a href="/home" className="map" target="_blank">Open Website</a>
              </div>
            </div>

            <div className="col-lg-3 col-md-6 col-sm-6 col-6">
              <div
                className="location-boxes"
                style={{
                  background: "linear-gradient(to bottom, white, #505050)", // Facebook
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                  padding: "20px",
                  borderRadius: "10px",
                }}
              >
                <a
                  href="/listing"
                  rel="noopener noreferrer"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "50px",
                    height: "50px",
                    borderRadius: "50%",
                    backgroundColor: "black",
                    marginBottom: "16px",
                  }}
                >
                  <i className="fa-solid fa-globe" style={{ color: "#fff", fontSize: "24px" }}></i>
                </a>
                <div>Buy A House</div>
                <div className="space24"></div>
                <a href="/listing" className="map" target="_blank">View Properties</a>
              </div>
            </div>

            <div className="col-lg-3 col-md-6 col-sm-6 col-6">
              <div
                className="location-boxes"
                style={{
                  background: "linear-gradient(to bottom, white, #505050)", // Facebook
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                  padding: "20px",
                  borderRadius: "10px",
                }}
              >
                <a
                  href="/listing"
                  rel="noopener noreferrer"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "50px",
                    height: "50px",
                    borderRadius: "50%",
                    backgroundColor: "black",
                    marginBottom: "16px",
                  }}
                >
                  <i className="fa-solid fa-globe" style={{ color: "#fff", fontSize: "24px" }}></i>
                </a>
                <div>Housing Price Changes</div>
                <div className="space24"></div>
                <a href="/pricehistory" className="map" target="_blank">Watch Prices</a>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};

export default SocialsPage;
