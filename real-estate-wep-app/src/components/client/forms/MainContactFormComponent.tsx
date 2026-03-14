import React, { useState } from "react";
import { Setting } from "../../../services/dbservices/company/FetchCompanyInfo";
import ContactSupportAction from "../../../services/dbservices/company/ContactSupportAction";

const MainContactFormComponent: React.FC<{ settings: Setting[] }> = ({ settings }) => {

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
        title: "",
        query: "",
        department: "Technical"
      });
    }
    setLoading(false);
  };  

  return (
    <>
      <form onSubmit={handleSubmit}>
      <div className="contact-form-area">
            <h4>Get In Touch</h4>
            <div className="row">
              <div className="col-lg-12">
                <div className="input-area">
                  <input type="text" name="full_name" placeholder="Full Name" maxLength={150} value={formData.full_name} onChange={handleChange} />
                </div>
              </div>

              <div className="col-lg-12">
                <div className="input-area">
                  <input type="text" name="email" placeholder="Email Address" maxLength={50} value={formData.email} onChange={handleChange} />
                </div>
              </div>
              <div className="col-lg-12">
                <div className="input-area">
                  <select name="department" value={formData.department} onChange={handleChange} className="nice-select" style={{height:"60px", width: "100%", marginTop: "20px"}} >
                    <option value=""> - Choose Department - </option>
                    <option value="Technical">Technical Support</option>
                    <option value="Billing">Billing Department</option>
                    <option value="Sales">Sales Department</option>
                    <option value="HR">HR Department</option>
                    <option value="Reviews and Suggestions">Reviews and Suggestions</option>
                    <option value="Fraud">Report Fraud</option>
                  </select>
                </div>
              </div>
              <div className="col-lg-12">
                <div className="input-area">
                  <input type="text" name="title" placeholder="Subject" maxLength={150} value={formData.title} onChange={handleChange} />
                </div>
              </div>
              <div className="col-lg-12">
                <div className="input-area">
                  <textarea name="query" placeholder="Your Message" maxLength={500} value={formData.query} onChange={handleChange}></textarea>
                </div>
              </div>
              <div className="input-area">
            {errors && <p style={{ color: "red" }}>{errors}</p>}
          </div>
              <div className="col-lg-12">
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
            </div>
          </div>
      </form>
    </>
  );
};

export default MainContactFormComponent;
