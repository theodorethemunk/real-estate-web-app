import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { GetSignUpVerificationCodeAction, VerifyEmailAction } from "../../services/dbservices/auth/AuthActions";
import { isValidEmail } from "../../services/Util/Validator";

const EmailVerificationPage: React.FC<{ savedUserEmail: string, loginId: string }> = ( {savedUserEmail, loginId} )  => {
  const [marginLeft, setMarginLeft] = useState<string>("30%");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<string>("");
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email") || "";
  const cmd = searchParams.get("cmd") || "";
  const navigate = useNavigate(); // For routing
  

  const [formData, setFormData] = useState({ 
    verification_code: "" 
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
      setErrors(""); // Clear errors when user types
    };

    const validateForm = (): string => {
      if (!formData.verification_code) {
        return "All fields are required.";
      }
      return "";
    };

  // Timer State
  const [timeLeft, setTimeLeft] = useState(120); // 2 minutes countdown
  const [isResendDisabled, setIsResendDisabled] = useState(true);

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
      } else {
        setMarginLeft("0%");
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
      
        if(cmd === "verify-email-sign-up"){

          const vCode = await GetSignUpVerificationCodeAction(email);

          if(!vCode){
            setLoading(false);
            setErrors("Server timed out, kindly check your internet connection and try again.");
            return
          }

          if(vCode.toLowerCase() != formData.verification_code.toLowerCase())
          {
            setLoading(false);
            setErrors("Incorrect verification code.");
            return;
          }
          else
          {
            await VerifyEmailAction(email);  
            setLoading(false);

            navigate("/signin");
          }
          
        }

        if(cmd === "forgot-password"){

          const vCode = await GetSignUpVerificationCodeAction(email);

          if(!vCode){
            setLoading(false);
            setErrors("Server timed out, kindly check your internet connection and try again.");
            return
          }

          if(vCode.toLowerCase() != formData.verification_code.toLowerCase())
          {
            setLoading(false);
            setErrors("Incorrect verification code.");
            return;
          }
          else
          {
            setLoading(false);

            navigate(`/resetpassword?email=${email}&vcode=${formData.verification_code}`);
          }
        }

      }; 

  // Timer Countdown
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setIsResendDisabled(false); // Enable Resend Button
    }
  }, [timeLeft]);

  // Function to Resend Code
  const handleResendCode = async ()=>{
    setIsResendDisabled(true);

    if(email?.length )
      //
    setTimeLeft(120); // Reset Timer to 2 Minutes

    // Simulate API request (Replace with real API call)
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
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
                    <h4>Verify Email</h4>
                    <div className="space10"></div>
                    <p>Enter the verification code that was sent to your email address ({email}).</p>
                    <hr />
                    <div className="space24"></div>
                    <div className="row">
                      <div className="col-lg-12">
                        <p className="fs-14 fw-semibold">Verification Code</p>
                        <div className="input-area">
                          <input className="mt-12" type="text" name="verification_code" maxLength={6} placeholder="Enter verification code" required value={formData.verification_code} onChange={handleChange} />
                        </div>
                      </div>
                      <div className="space10"></div>
                  <div className="input-area">
                    {errors && <p style={{ color: "red" }}>{errors}</p>}
                  </div>
                  <div className="space10"></div>

                      <div className="col-lg-12">
                        <div className="input-area">
                          <button type="submit" className="theme-btn1 w-100">
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

                      {/* Resend Code Section */}
                      <div className="col-lg-12 text-center mt-5">
                        {timeLeft > 0 ? (
                          <p className="text-muted">Resend code in <strong>{Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}</strong></p>
                        ) : (
                          <button
                            className="link-big" style={{border: "none", backgroundColor: "white"}}
                            onClick={handleResendCode}
                            disabled={isResendDisabled || loading}
                          >
                            {loading ? "Resending..." : "Resend Verification Code"}
                          </button>
                        )}
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

export default EmailVerificationPage;
