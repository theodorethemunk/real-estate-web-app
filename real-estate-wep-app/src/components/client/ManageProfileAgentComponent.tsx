import React, { useEffect, useState } from "react";
import { IUserProfile } from "../../models/interfaces/IUserProfile";
import { API_URL } from "../../repo/datarepo";
import UpdateProfileImage from "../../services/dbservices/user/UpdateProfileImage";
import { switchAgentMode } from "../../services/dbservices/user/SwitchAgentMode";

interface Props {
  userProfile: IUserProfile | null;
}

const ManageProfileAgentComponent: React.FC<Props> = ({ userProfile }) => {

  const [profileImage, setProfileImage] = useState(userProfile?.profile_image_path || "");
  const [agentMode, setAgentMode] = useState(userProfile?.is_agent || Boolean);
  const [loading, setLoading] = useState(false);

  useEffect(() => {   
    setAgentMode(userProfile?.is_agent ?? false);
    }, []);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !userProfile) return;

    const uploadedImageUrl = await UpdateProfileImage(userProfile.id, file);
    if (uploadedImageUrl) {
      setProfileImage(uploadedImageUrl);
      alert("Profile image updated successfully!");
    } else {
      alert("Failed to upload image.");
    }
  };

  const toggleAgentMode = async () => {
    if (!userProfile) {
      return;
    }
  
    setLoading(true);
    await switchAgentMode(userProfile.id);
    setAgentMode(!agentMode);
    setLoading(false);
  };
  

  return (
    <>
      <div className="account-details-boxarea">
            <h2>Account Settings</h2>
            <div className="space32"></div>
            <div className="accout-box">
              <h3>Agent Account</h3>
              <div className="space20"></div>
              <p 
                className={agentMode === true ? "pera" : "alert alert-info"}
              >
                {agentMode
                  ? "Your current account type is set to agent. If you want to remove your agent account and return to a normal account, click the button below." 
                  : "Your current account type is set to normal."
                }
              </p>

              <div className="space20"></div>
              <div className="btn-area1">
                <button className={agentMode ? "btn btn-danger" : "theme-btn1"} onClick={toggleAgentMode}>
                {loading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  Switching...
                </>
              ) : (
                <>
                  {agentMode ? "Disable Agent Account" : "Activate Agent Account"}
                  <span className="arrow1">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                      <path d="M12 13H4V11H12V4L20 12L12 20V13Z"></path>
                    </svg>
                  </span>
                  <span className="arrow2">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                      <path d="M12 13H4V11H12V4L20 12L12 20V13Z"></path>
                    </svg>
                  </span>
                </>
              )}</button>
              </div>
            </div>
            <div className="space32"></div>
            <h4>Edit Profile Picture</h4>
            <div className="space24"></div>
            <div className="box-agent-avt">
            <div className="avatar">
            <img src={profileImage ? `${API_URL}${profileImage}` : "/default-avatar.png"} alt="avatar" loading="lazy" width="128" height="128" />
          </div>
              <div className="content uploadfile">
                <p>Upload a new avatar</p>
                <div className="space16"></div>
                <div className="box-ip">
                  <input type="file" className="ip-file" accept="image/*" onChange={handleFileChange} />
                </div>
                <div className="space16"></div>
                <p>Image max size 300x300</p>
              </div>
            </div>
          </div>
    </>
  );
};

export default ManageProfileAgentComponent;
