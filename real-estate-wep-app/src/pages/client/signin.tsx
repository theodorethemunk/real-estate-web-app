import { useEffect, useState } from "react";
import { SignInAction } from "../../services/dbservices/auth/AuthActions";
import { useNavigate } from "react-router-dom";
import { isValidEmail } from "../../services/Util/Validator";

const SignInPage: React.FC<{ savedUserEmail: string, loginId: string }> = ({ savedUserEmail, loginId }) => {
  const [marginLeft, setMarginLeft] = useState<string>("30%");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<string>("");
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors("");
  };

  const validateForm = (): string => {
    if (!formData.email || !formData.password) {
      return "All fields are required.";
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      return "Enter a valid email address.";
    }
    return "";
  };

  useEffect(() => {
    if (isValidEmail(savedUserEmail) && loginId) {
      navigate("/profile");
    }

    const updateMargin = () => {
      const width = window.innerWidth;
      if (width >= 1200) setMarginLeft("30%");
      else if (width >= 900) setMarginLeft("15%");
      else if (width >= 768) setMarginLeft("5%");
      else if (width >= 480) setMarginLeft("0%");
      else setMarginLeft("0");
    };

    updateMargin();
    window.addEventListener("resize", updateMargin);
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

    const response = await SignInAction(formData.email, formData.password);

    if (!response || typeof response === "string") {
      setErrors(typeof response === "string" ? response : "Incorrect email or password.");
      setLoading(false);
      return;
    }

    // Save user to localStorage
    localStorage.setItem("userEmail", formData.email);
    localStorage.setItem("userId", response.id ?? "");
    localStorage.setItem("user", JSON.stringify(response));

    setLoading(false);
    window.location.href = "/profile";
  };

  return (
    <>
      <div className="space30"></div>
      <div className="space30"></div>
      <form onSubmit={handleSubmit}>
        <div className="contact-inner-section sp1" style={{ marginLeft: marginLeft }}>
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
                      <h4>Welcome Back!</h4>
                      <div className="space10"></div>
                      <p>We believe that owning a home is more than just an investment—it's a legacy.</p>
                      <hr />
                      <div className="space24"></div>
                      <div className="row">
                        <div className="col-lg-12">
                          <p className="fs-14 fw-semibold">Email Address</p>
                          <div className="input-area">
                            <input className="mt-12" type="email" name="email" placeholder="Enter your email address" required value={formData.email} onChange={handleChange} />
                          </div>
                        </div>

                        <div className="col-lg-12 mt-24">
                          <p className="fs-14 fw-semibold">Password</p>
                          <div className="input-area">
                            <input className="mt-12" type="password" name="password" placeholder="Enter your password" required value={formData.password} onChange={handleChange} />
                          </div>
                        </div>

                        <div className="space10"></div>
                        <div className="input-area">
                          {errors && <p style={{ color: "red" }}>{errors}</p>}
                        </div>
                        <div className="space30"></div>
                        <a href="/forgotpassword" className="link-big" style={{ marginLeft: 20 }}>Forgot Password?</a>
                        <div className="space30"></div>
                        <hr />

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
                                  Sign In
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
                            <a href="/signup" className="link-big" style={{ marginLeft: 20 }}>Sign Up</a>
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

export default SignInPage;