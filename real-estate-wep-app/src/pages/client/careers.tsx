import { useState, useCallback } from "react";
import {SubmitCareerApplicationAction, UploadCV } from "../../services/dbservices/company/SubmitCareerApplicationAction";
import { Setting } from "../../services/dbservices/company/FetchCompanyInfo";
import { generateCVId } from "../../services/Util/NumberGenerator";
import HeroComponentLite from "../../components/client/HeroLite";
import TestimonialComponent from "../../components/client/TestimonialComponent";

interface FormDataState {
  full_name: string;
  email: string;
  phone: string;
  address: string;
  salary: number | null;
  career: string;
  about_career: string;
  gender: string,
  cvFile: File | null;
}

const CareersPage: React.FC<{ settings: Setting[] }> = ({ settings }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<FormDataState>({
    full_name: "",
    email: "",
    phone: "",
    address: "",
    salary: null,
    career: "",
    about_career: "",
    gender: "",
    cvFile: null,
  });

  const [errors, setErrors] = useState<string>("");

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
      setErrors(""); // Clear errors on input change
    },
    []
  );

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file && file.type !== "application/pdf") {
      setErrors("Only PDF files are allowed.");
      return;
    }
    setFormData((prev) => ({ ...prev, cvFile: file }));
  }, []);

  const validateForm = (): string => {
    if (!formData.full_name || !formData.email || !formData.phone || !formData.address || !formData.salary || !formData.career || !formData.about_career) {
      return "All fields are required.";
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      return "Enter a valid email address.";
    }
    if (!formData.cvFile) {
      return "Please upload your CV (PDF format only).";
    }
    return "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (settings.length < 1) return;

    setLoading(true);
    const validationError = validateForm();
    if (validationError) {
      setErrors(validationError);
      setLoading(false);
      return;
    }

    if (!formData.gender || formData.gender.length < 1) {
      setErrors("Kindly select a gender");
      setLoading(false);
      return;
    }

    const cvId = generateCVId();
    const fileExtension = ".pdf";

    await UploadCV(Number(cvId), formData.cvFile as File);

    const response = await SubmitCareerApplicationAction({
      full_name: formData.full_name,
      email: formData.email,
      phone: formData.phone,
      address: formData.address,
      salary: formData.salary ?? 0.00,
      career: formData.career,
      about_career: formData.about_career,
      gender: formData.gender,
      cv_file_path: `/uploads/cv/${cvId}-cv${fileExtension}`,
    });

    if (response !== "success") {
      setErrors("Failed to submit application. Please try again.");
    } else {
      setFormData({
        full_name: "",
        email: "",
        phone: "",
        address: "",
        salary: null,
        career: "",
        about_career: "",
        gender: "",
        cvFile: null,
      });
    }
    setLoading(false);
  };

  return (
    <div>
      <HeroComponentLite
        breadcrumbLinks={[
          { href: "home", text: "Home" },
          { href: "#", text: "Careers" },
        ]}
        title="Career Application"
      />
<div className="about2-section-area sp1">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-7">
              <div className="about-images-area">
                <div className="row align-items-center">
                  <div className="col-lg-6 col-md-6">
                    <div className="img2 d-none d-md-block">
                      <img src="https://images.pexels.com/photos/8837549/pexels-photo-8837549.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="housebox" />
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6">
                    <div className="img1 d-none d-md-block">
                      <img src="https://images.pexels.com/photos/8470774/pexels-photo-8470774.jpeg?auto=compress&cs=tinysrgb&w=600" alt="housebox" />
                    </div>
                    <div className="space30"></div>
                    <div className="img1">
                      <img src="https://images.pexels.com/photos/8761682/pexels-photo-8761682.jpeg?auto=compress&cs=tinysrgb&w=600" alt="housebox" />
                    </div>
                  </div>
                </div>
                <div className="author-img">
                  <h3>Join Our Team</h3>
                  <div className="space20"></div>
                  <p>Grow Your Career with Sommy Properties</p>
                </div>
              </div>
            </div>
            <div className="col-lg-5">
              <div className="about-heading heading1">
                <h5>Career Opportunities</h5>
                <div className="space20"></div>
                <h2 className="text-anime-style-3">Why Join Sommy Properties?</h2>
                <div className="space18"></div>
                <p>
                  At Sommy Properties, we offer a platform for ambitious professionals to thrive in real estate. Whether you're in sales, management, or technology, we provide growth opportunities, expert mentorship, and a rewarding career path.
                </p>
                <div className="accordion" id="accordionExample">
                  <div className="accordion-item">
                    <h2 className="accordion-header">
                      <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                        Management and Security
                      </button>
                    </h2>
                    <div id="collapseOne" className="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                      <div className="accordion-body">
                        <p>Join our management and security team to oversee properties, ensure tenant satisfaction, and maintain a secure investment environment.</p>
                      </div>
                    </div>
                  </div>
                  <div className="accordion-item">
                    <h2 className="accordion-header">
                      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                        Construction and Sales
                      </button>
                    </h2>
                    <div id="collapseTwo" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                      <div className="accordion-body">
                        <p>Build your career in real estate sales or construction, helping clients buy, sell, and develop properties while shaping the future of housing.</p>
                      </div>
                    </div>
                  </div>
                  <div className="accordion-item">
                    <h2 className="accordion-header">
                      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                        Technology and Support
                      </button>
                    </h2>
                    <div id="collapseThree" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                      <div className="accordion-body">
                        <p>Join our tech and support team to develop cutting-edge real estate solutions, streamline operations, and enhance customer experiences.</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="space32"></div>
                <div className="btn-area1">
                  <a href="#applynow" className="theme-btn1">Apply Now <span className="arrow1">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                      <path d="M12 13H4V11H12V4L20 12L12 20V13Z"></path>
                    </svg></span>
                    <span className="arrow2">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                        <path d="M12 13H4V11H12V4L20 12L12 20V13Z"></path>
                      </svg></span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <TestimonialComponent />
      <form onSubmit={handleSubmit}>
        <div className="blog-inner-section sp1" id="applynow">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-12">
                <div className="blog-post-details-area heading1">
                  <h3>Career Application Form</h3>
                  <div className="space32"></div>
                  <div className="contact-boxarea">
                    <h3>Fill and Submit</h3>
                    <div className="space8"></div>
                    <div className="row">
                      <div className="col-lg-6">
                        <div className="input-area">
                          <input type="text" placeholder="Your Full Name" name="full_name" maxLength={150} value={formData.full_name} onChange={handleChange} required />
                        </div>
                      </div>

                      <div className="col-lg-6">
                        <div className="input-area">
                          <select name="gender" className="nice-select" value={formData.career} onChange={handleChange} style={{ height: "60px", width: "100%", border: "none" }}>
                            <option value="">- Select Your Gender -</option>
                            <option value="m">Male</option>
                            <option value="f">Female</option>
                          </select>
                        </div>
                      </div>

                      <div className="col-lg-6">
                        <div className="input-area">
                          <input type="email" placeholder="Email Address" name="email" maxLength={50} value={formData.email} onChange={handleChange} required />
                        </div>
                      </div>

                      <div className="col-lg-6">
                        <div className="input-area">
                          <input type="tel" placeholder="Phone Number" name="phone" maxLength={11} value={formData.phone} onChange={handleChange} required />
                        </div>
                      </div>

                      <div className="col-lg-12">
                        <div className="input-area">
                          <input type="text" placeholder="Residential Address" name="address" maxLength={255} value={formData.address} onChange={handleChange} required />
                        </div>
                      </div>

                      <div className="col-lg-6">
                        <div className="input-area">
                          <select name="career" className="nice-select" value={formData.career} onChange={handleChange} style={{ height: "60px", width: "100%", border: "none" }}>
                            <option value="">- Select Career Path -</option>
                            <option value="Management and Security">Management and Security</option>
                            <option value="Construction and Sales">Construction and Sales</option>
                            <option value="Technology and Support">Technology and Support</option>
                            <option value="Realtor">Realtor</option>
                            <option value="Consultant">Consultant</option>
                            <option value="Freelance">Freelance</option>
                          </select>
                        </div>
                      </div>

                      <div className="col-lg-6">
                        <div className="input-area">
                          <input type="number" step={0.01} placeholder="Expected Salary (₦)" name="salary" value={formData.salary ?? ""} onChange={handleChange} required />
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div className="input-area">
                          <textarea placeholder="Tell us about the role you wish to apply for and any additional information you wish to add.." required name="about_career" maxLength={500} value={formData.about_career} onChange={handleChange}></textarea>
                          <span style={{ color: formData.about_career.length >= 500 ? "red" : "black" }}>{formData.about_career.length} / 500 Characters</span>
                        </div>
                      </div>

                      <div className="space48"></div>
                      <div className="col-lg-12">
                        <h6 className="w-100 d-block d-lg-none"><b>Upload Résumé (PDF File)</b></h6>
                        <h5 className="w-100 d-none d-md-block">Upload Résumé (PDF File)</h5>
                        <div className="input-area">
                          <input type="file" accept=".pdf" onChange={handleFileChange} style={{ height: "60px", width: "100%", border: "none" }} required />
                        </div>
                      </div>

                      {errors && <p style={{ color: "red" }}>ⓘ {errors}</p>}
                      <div className="space30"></div>
                      <div className="col-lg-12">
                        <button type="submit" className="theme-btn1" disabled={loading}>
                          {loading ? "Submitting..." : "Submit Application"}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CareersPage;
