import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ResetPasswordAction } from "../../services/dbservices/auth/AuthActions";
import Swal from "sweetalert2";
import { isValidEmail } from "../../services/Util/Validator";

const ResetPasswordPage: React.FC<{ savedUserEmail: string, loginId: string }> = ( {savedUserEmail, loginId} )  => {
  const navigate = useNavigate(); // For routing
  const [marginLeft, setMarginLeft] = useState<string>("30%");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<string>("");

  const [searchParams] = useSearchParams();
  const email = searchParams.get("email") || "";
  const vCode = searchParams.get("vcode") || "";

  const [formData, setFormData] = useState({
    password: "",
    confirm_password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
      setErrors(""); // Clear errors when user types
    };

    const validateForm = (): string => {
      if(!vCode){

        Swal.fire({
              icon: "error",
              title: "Session Expired!",
              text: "Your password reset session has expired. Please request another verification code.",
            });

            navigate("/forgotpassword");
            
        return "";
      }

      if (!formData.password || !formData.confirm_password) {
        return "All fields are required.";
      }

      if (formData.password != formData.confirm_password) {
        return "Passwords don't match.";
      }
      
      return "";
    };

  useEffect(() => {
    if(isValidEmail(savedUserEmail) && loginId){
      navigate("/profile");
    }
    
    // Function to update margin based on screen size
    const updateMargin = () => {
      const width = window.innerWidth;
      if (width >= 1200) {
        setMarginLeft("30%");
      } else if (width >= 900) {
        setMarginLeft("15%");
      } else if (width >= 768) {
        setMarginLeft("5%");
      } else if (width >= 480) {
        setMarginLeft("0%");
      } else {
        setMarginLeft("0");
      }
    };

    if(!vCode || !email){

      Swal.fire({
        icon: "error",
        title: "Session Expired!",
        text: "Your password reset session has expired. Please request another verification code.",
      });

      navigate("/forgotpassword");
    }

    // Initial check and event listener for resizing
    updateMargin();
    window.addEventListener("resize", updateMargin);

    // Cleanup event listener on unmount
    return () => window.removeEventListener("resize", updateMargin);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
  
      setLoading(true);
    
      const validationError = validateForm();
      if (validationError) {
        setLoading(false);
        setErrors(validationError);
        return;
      }
    
      await ResetPasswordAction(email, formData.password, vCode);
      
      setFormData({
        password: "",
        confirm_password: "",
      });

      setLoading(false);

      Swal.fire({
        icon: "success",
        title: "Password Updated!",
        text: "Your password has been updated successfully, you may now sign in.",
      });

      navigate("/signin");
    };  

  return (
    <>
    <div className="space30"></div>
    <div className="space30"></div>
    <form onSubmit={handleSubmit}>
      <div className="contact-inner-section sp1" style={{marginLeft: marginLeft}}>
    <div className="container">
      <div className="row align-items-center">
        <div className="col-lg-10 mx-auto">
          <div className="row">
            <div className="col-lg-6">
              <div className="contact-form-area">
              <div className="footer-logoarea">
                  <img src="/client/img/logo/main-logo.png" height={50} alt="logo" />
                </div>
                <div className="space28"></div>
                <h4>Reset Password</h4>                
                <div className="space10"></div>
                <p>You have entered the correct verification code, now fill the form to reset your password.</p>
                <hr/>
                <div className="space24"></div>
                <div className="row">
                  <div className="col-lg-12">
                    <p className="fs-14 fw-semibold">New Password</p>
                    <div className="input-area">
                      <input className="mt-12" type="password" name="password" placeholder="Enter your password" required value={formData.password} onChange={handleChange} />
                    </div>
                  </div>

                  <div className="col-lg-12 mt-24">
                    <p className="fs-14 fw-semibold">Confirm Password</p>
                    <div className="input-area">
                      <input className="mt-12" type="password" name="confirm_password" placeholder="Enter your password" required value={formData.confirm_password} onChange={handleChange} />
                    </div>
                  </div>
                  <div className="space10"></div>
                  <div className="input-area">
                    {errors && <p style={{ color: "red" }}>{errors}</p>}
                  </div>
                  <div className="space10"></div>

                  <div className="col-lg-12">
                    <div className="input-area">
                      <button type="submit" className="theme-btn1">
                      {loading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  Submitting...
                </>
              ) : (
                <>
                  Submit 
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
                </div>
              </div>
            </div>
            
          </div>

        </div>
      </div>
    </div>
  </div>
  </form>
    </>
  );
};

export default ResetPasswordPage;
