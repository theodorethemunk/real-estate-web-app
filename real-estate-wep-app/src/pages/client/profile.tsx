import { useEffect, useState } from "react";
import HeroComponentLite from "../../components/client/HeroLite";
import ManagePersonalInfoComponent from "../../components/client/ManagePersonalInfoComponent";
import ManageProfileAgentComponent from "../../components/client/ManageProfileAgentComponent";
import UpdateProfilePasswordComponent from "../../components/client/UpdateProfilePasswordComponent";
import { GetUserInfoAction } from "../../services/dbservices/user/FetchUserData";
import { useNavigate } from "react-router-dom";
import { isValidEmail } from "../../services/Util/Validator";
import { IUserProfile } from "../../models/interfaces/IUserProfile";
import UserBalanceComponent from "../../components/client/UserBalanceComponent";


const ProfilePage: React.FC<{ savedUserEmail: string, loginId: string }> = ( {savedUserEmail, loginId} )  => {
  const navigate = useNavigate(); // For routing

  const [userProfile, setUserProfile] = useState<IUserProfile | null>(null);
  
  const fetchUserProfile = async () => {
    if (!isValidEmail(savedUserEmail) || !loginId) {
      navigate("/login"); // Redirect if not logged in
      return;
    }

    const profileData = await GetUserInfoAction(savedUserEmail, loginId);

    console.log("Fetched User Profile:", profileData);
    
    if (profileData) {
      setUserProfile(profileData);
    }
  };

  useEffect(() => {   
    fetchUserProfile();
  }, []);

  return (
    <>
      <HeroComponentLite
        breadcrumbLinks={[
          { href: "home", text: "Home" },
          { href: "#", text: "Profile" },
        ]}
        title="My Profile"
      />

      <div className="profile-section-area sp1">
        <div className="container">
          <div className="row">
            <div className="col-lg-4">
              <div className="heading1">
                <h1>Update Profile</h1>
                <div className="space32"></div>
                {!userProfile && <p>Fetching your data...</p>}
              </div>
            </div>
            <div className="col-lg-12">

              {userProfile ?
                <>
                  <UserBalanceComponent userProfile={userProfile}/>
                  <div className="space48"></div>
                  <ManageProfileAgentComponent userProfile={userProfile}/>
                  <div className="space48"></div>
                  <ManagePersonalInfoComponent userProfile={userProfile}/>
                  <div className="space48"></div>
                  <UpdateProfilePasswordComponent userProfile={userProfile}/>
                </>
                :
                <div className="text-center my-5">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Fetching your data...</span>
                </div>
              </div>
              }

            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
