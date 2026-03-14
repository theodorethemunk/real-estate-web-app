import { useEffect, useState } from "react";
import { SignUpAction } from "../../services/dbservices/auth/AuthActions";
import { useNavigate } from "react-router-dom";
import { generateCode } from "../../services/Util/NumberGenerator";
import { isValidEmail } from "../../services/Util/Validator";

const SignUpPage: React.FC<{ savedUserEmail: string, loginId: string }> = ( {savedUserEmail, loginId} )  => {
  const navigate = useNavigate(); // For routing
  const [marginLeft, setMarginLeft] = useState<string>("30%");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<string>("");

  const [formData, setFormData] = useState({
      first_name: "",
      middle_name: "",
      last_name: "",
      dob: "",
      email: "", 
      password: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setErrors(""); // Clear errors when user types
      };

      const validateForm = (): string => {
        if (!formData.first_name || !formData.middle_name || !formData.last_name || !formData.email || !formData.password || !formData.dob) {
          return "All fields are required.";
        }
        if (!/\S+@\S+\.\S+/.test(formData.email)) {
          return "Enter a valid email address.";
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
  
    const response = await SignUpAction({
      first_name: formData.first_name,
      middle_name: formData.middle_name,
      last_name: formData.last_name,
      dob: formData.dob,
      email: formData.email,
      password: formData.password,
      temp_pin: generateCode()
    });
    
    if (response !== "success") {
      setErrors(response);
    } else {
      setFormData({
        first_name: "",
        middle_name: "",
        last_name: "",
        email: "",
        password: "",
        dob: "",
      });
    }

    navigate(`/emailverification?email=${formData.email}&cmd=verify-email-sign-up`);

    setLoading(false);
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
                <h4>Create Your Account</h4>                
                <div className="space10"></div>
                <p>We believe that owning a home is more than just an investment—it’s a legacy.</p>
                <hr/>
                <div className="space24"></div>
                <div className="row">
                  <div className="col-lg-12">
                    <p className="fs-14 fw-semibold">First Name</p>
                    <div className="input-area">
                      <input className="mt-12" type="text" name="first_name" placeholder="Enter your first name" value={formData.first_name} onChange={handleChange} />
                    </div>
                  </div>

                  <div className="col-lg-12 mt-24">
                    <p className="fs-14 fw-semibold">Middle Name</p>
                    <div className="input-area">
                      <input className="mt-12" type="text" name="middle_name" placeholder="Enter your middle name" value={formData.middle_name} onChange={handleChange} />
                    </div>
                  </div>

                  <div className="col-lg-12 mt-24">
                    <p className="fs-14 fw-semibold">Last Name</p>
                    <div className="input-area">
                      <input className="mt-12" type="text" name="last_name" placeholder="Enter your last name" required value={formData.last_name} onChange={handleChange} />
                    </div>
                  </div>

                  <div className="col-lg-12 mt-24">
                    <p className="fs-14 fw-semibold">Date Of Birth</p>
                    <p className="fs-14 neutral-500">Confirm that you're qualified to be a part of our community</p>
                    <div className="input-area">
                      <input className="mt-12" type="date" name="dob" required value={formData.dob} onChange={handleChange} />
                    </div>
                  </div>

                  <div className="col-lg-12 mt-24">
                    <p className="fs-14 fw-semibold">Email Address</p>
                    <div className="input-area">
                      <input className="mt-12" type="email" name="email" placeholder="Enter your email address" required value={formData.email} onChange={handleChange} />
                    </div>
                  </div>

                  <div className="col-lg-12 mt-24">
                    <p className="fs-14 fw-semibold">Password</p>
                    <p className="fs-14 neutral-500">Password must contain letters, numbers, and special characters</p>
                    <div className="input-area">
                      <input className="mt-12" type="password" name="password" placeholder="Enter your password" required value={formData.password} onChange={handleChange} />
                    </div>
                  </div>
                  <div className="space10"></div>
                  <div className="input-area">
                    {errors && <p style={{ color: "red" }}>{errors}</p>}
                  </div>
                  <div className="space10"></div>
                  <div className="text-muted mt-3">
                    By signing up with Sommy Properties Ltd, you agree to our 
                    <a href="/termsandconditions" className="text-primary"> Terms & Conditions</a> and 
                    <a href="/privacy" className="text-primary"> Privacy Policy</a>.
                  </div>
                  <div className="space30"></div>


                  <div className="col-lg-12">
                    <div className="input-area">
                      <button type="submit" className="theme-btn1">
                      {loading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  Loading...
                </>
              ) : (
                <>
                  Sign Up Now 
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
                          <a href="/signin" className="link-big" style={{marginLeft: 20}}>Sign In</a>
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

export default SignUpPage;
