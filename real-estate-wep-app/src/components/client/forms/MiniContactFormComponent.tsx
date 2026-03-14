import React, { useState } from "react";
import { Setting } from "../../../services/dbservices/company/FetchCompanyInfo";
import SingleBoxShimmer from "../../general/SingleBoxShimmer";
import ContactSupportAction from "../../../services/dbservices/company/ContactSupportAction";

const MiniContactFormComponent: React.FC<{ settings: Setting[] }> = ({ settings }) => {

  const infoEmailSettings = settings.find(setting => setting.name.toLowerCase() === "info email");
  const companyPhoneNumberSettings = settings.find(setting => setting.name.toLowerCase() === "company phone");

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    department: "Technical",
    title: "",
    query: "",
  });

  const [errors, setErrors] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors(""); // Clear errors when user types
  };

  const validateForm = (): string => {
    if (!formData.full_name || !formData.email || !formData.title || !formData.query) {
      return "All fields are required.";
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      return "Enter a valid email address.";
    }
    return "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if(settings.length < 1){
      return;
    }

    setLoading(true);
  
    const validationError = validateForm();
    if (validationError) {
      setLoading(false);
      setErrors(validationError);
      return;
    }

    if(!formData.department){
      setLoading(false);
      setErrors("Department required.");
      return;
    }
  
    const response = await ContactSupportAction({
      user_id: 0,
      ticket_number: parseInt(Date.now().toString().slice(-6)), // Corrected syntax
      status: "pending",
      department: formData.department,
      full_name: formData.full_name,
      email: formData.email,
      title: formData.title,
      query: formData.query,
    });
    
  
    if (response !== "success") {
      setErrors("Failed to submit ticket. Please try again.");
    } else {
      setFormData({
        full_name: "",
        email: "",
        department: "",
        title: "",
        query: "",
      });
    }
    setLoading(false);
  };  

  return (
    <>
      <form onSubmit={handleSubmit} className="d-none d-sm-block">
        <div className="details-siderbar2">
          <h4>Contact Us</h4>
          <div className="space24"></div>
          <div className="personal-info">
            <div className="content">
              <a href="#" style={{ marginBottom: 20 }}>Sommy Properties Ltd</a>
              {settings.length < 1 ? <SingleBoxShimmer /> : 
                <a href={`mailto:${infoEmailSettings?.context}`}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3 3H21C21.5523 3 22 3.44772 22 4V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V4C2 3.44772 2.44772 3 3 3ZM20 7.23792L12.0718 14.338L4 7.21594V19H20V7.23792ZM4.51146 5L12.0619 11.662L19.501 5H4.51146Z"></path>
                  </svg>
                  {infoEmailSettings?.context}
                </a>
              }
              {settings.length < 1 ? <SingleBoxShimmer /> : 
                <a href={`tel:${companyPhoneNumberSettings?.context}`}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M9.36556 10.6821C10.302 12.3288 11.6712 13.698 13.3179 14.6344L14.2024 13.3961C14.4965 12.9845 15.0516 12.8573 15.4956 13.0998C16.9024 13.8683 18.4571 14.3353 20.0789 14.4637C20.599 14.5049 21 14.9389 21 15.4606V19.9234C21 20.4361 20.6122 20.8657 20.1022 20.9181C19.5723 20.9726 19.0377 21 18.5 21C9.93959 21 3 14.0604 3 5.5C3 4.96227 3.02742 4.42771 3.08189 3.89776C3.1343 3.38775 3.56394 3 4.07665 3H8.53942C9.0611 3 9.49513 3.40104 9.5363 3.92109C9.66467 5.54288 10.1317 7.09764 10.9002 8.50444C11.1427 8.9484 11.0155 9.50354 10.6039 9.79757L9.36556 10.6821Z"></path>
                  </svg>
                  {companyPhoneNumberSettings?.context}
                </a>
              }
            </div>
          </div>
          <div className="input-area">
            <input type="text" name="full_name" placeholder="Full Name" maxLength={150} value={formData.full_name} onChange={handleChange} />
          </div>
          <div className="input-area">
            <input type="text" name="email" placeholder="Email Address" maxLength={50} value={formData.email} onChange={handleChange} />
          </div>
          <div className="input-area">
            <select name="department" id="country7" onChange={handleChange} className="country-area nice-select" value={formData.department} style={{height:"60px", width: "100%", border: "none", marginBottom: "20px"}}>
            <option value=""> - Choose Department - </option>
            <option value="Technical">Technical Support</option>
            <option value="Billing">Billing Department</option>
            <option value="Sales">Sales Department</option>
            <option value="HR">HR Department</option>
            <option value="Reviews and Suggestions">Reviews and Suggestions</option>
            <option value="Fraud">Report Fraud</option>
            </select>
          </div>          
          <div className="input-area">
            <input type="text" name="title" placeholder="Subject" maxLength={150} value={formData.title} onChange={handleChange} />
          </div>
          <div className="input-area">
            <textarea name="query" placeholder="Your Message" maxLength={500} value={formData.query} onChange={handleChange}></textarea>
          </div>
          <div className="input-area">
            {errors && <p style={{ color: "red" }}>{errors}</p>}
          </div>
          <div className="input-area">
            <button type="submit" className="theme-btn1" disabled={loading}>
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
      </form>
    </>
  );
};

export default MiniContactFormComponent;
