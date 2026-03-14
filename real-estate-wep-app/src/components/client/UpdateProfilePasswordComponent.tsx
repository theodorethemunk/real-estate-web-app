import React, { useState } from "react";
import Swal from "sweetalert2";
import { ResetPasswordAction } from "../../services/dbservices/auth/AuthActions";
import { IUserProfile } from "../../models/interfaces/IUserProfile";

interface Props {
  userProfile: IUserProfile | null;
}

const UpdateProfilePasswordComponent: React.FC<Props> = ({ userProfile }) => {

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<string>("");

  const [formData, setFormData] = useState({
    old_password: "",
    password: "",
    confirm_password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
      setErrors(""); // Clear errors when user types
    };

    const validateForm = (): string => {

      if (!formData.old_password || !formData.password || !formData.confirm_password) {
        return "All fields are required.";
      }

      if (formData.old_password != userProfile?.password) {
        return "Incorrect old password.";
      }

      if (formData.password != formData.confirm_password) {
        return "Passwords don't match.";
      }
      
      return "";
    };

  const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
  
      setLoading(true);
    
      const validationError = validateForm();
      if (validationError) {
        setLoading(false);
        setErrors(validationError);
        return;
      }
    
      await ResetPasswordAction(userProfile?.email ?? "", formData.password, userProfile?.temp_pin ?? "");
      
      setFormData({
        old_password: "",
        password: "",
        confirm_password: "",
      });

      setLoading(false);

      Swal.fire({
        icon: "success",
        title: "Password Updated!",
        text: "Your password has been updated successfully.",
      });
    };

  return (
    <>
    <form onSubmit={handleSubmit}>
    <div className="password-info-area">
            <h2>Change Password</h2>
            <div className="space26"></div>
            <div className="box">
              <div className="row">
                <div className="col-lg-4 col-md-6">
                  <div className="box-fieldset">
                    <label>Old Password:<span>*</span></label>
                    <div className="box-password">
                      <input type="password" className="form-contact style-1 password-field" name="old_password" required value={formData.old_password} onChange={handleChange} placeholder="Password"/>
                      <span className="show-pass">
                        <i className="fa-regular fa-eye"></i>
                        <i className="fa-regular fa-eye-slash"></i>
                      </span>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 col-md-6">
                  <div className="box-fieldset">
                    <label>New Password:<span>*</span></label>
                    <div className="box-password">
                      <input type="password" className="form-contact style-1 password-field2" required name="password" value={formData.password} onChange={handleChange} placeholder="Password"/>
                      <div data-lastpass-icon-root="" style={{ position:"relative", height:"0px", width:"0px", float:"left", }}></div>
                      <span className="show-pass2">
                        <i className="fa-regular fa-eye"></i>
                        <i className="fa-regular fa-eye-slash"></i>
                      </span>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 col-md-6">
                  <div className="box-fieldset">
                    <label>Confirm Password:<span>*</span></label>
                    <div className="box-password">
                      <input type="password" className="form-contact style-1 password-field3" required name="confirm_password" value={formData.confirm_password} onChange={handleChange} placeholder="Password"/>
                      <div data-lastpass-icon-root="" style={{ position:"relative", height:"0px", width:"0px !important", float:"left", }}></div><span className="show-pass3">
                        <i className="fa-regular fa-eye"></i>
                        <i className="fa-regular fa-eye-slash"></i>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="space10"></div>
                  <div className="input-area">
                    {errors && <p style={{ color: "red" }}>{errors}</p>}
                  </div>
            <div className="space32"></div>

            <div className="btn-area1">
            <button type="submit" className="theme-btn1">
                      {loading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  Loading...
                </>
              ) : (
                <>
                  Save Changes 
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
              )}
                      </button>
            </div>
          </div>
          </form>
    </>
  );
};

export default UpdateProfilePasswordComponent;
