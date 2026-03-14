import React, { useState } from "react";
import { loginAdminAction } from "../../services/dbservices/auth/LoginAdminAction";
import { saveAdminLoginSession } from "../../services/session/UserLoginSession";

const PortalAccessPage: React.FC = () => {

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // Loading state

  const validate = () => {
    const newErrors: { email?: string; password?: string } = {};
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
    }
    if (!formData.password || formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");

    if (validate()) {
      setLoading(true); // Start loading
      try
      {
        const adminData = await loginAdminAction(formData.email, formData.password);

        if (adminData) 
        {
          await saveAdminLoginSession(adminData);
          setLoading(false);
          window.location.href = "/users";
        }
        else
        {
          setError("Incorrect email or password.");
        }
      }
      catch (err)
      {
        setError("An error occurred. Please try again.");
      }
      finally
      {
        setLoading(false); // Stop loading
      }
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    setFormData((prevState) => ({ ...prevState, [id]: value }));
  };

  return (
    <div className="auth-page-wrapper bg-dark py-5 d-flex justify-content-center align-items-center min-vh-100">
      <div className="auth-page-content overflow-hidden pt-lg-5">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="card overflow-hidden">
                <div className="row g-0">
                  <div className="p-lg-5 p-4">
                    <div>
                      <img src={""} height="30" style={{ marginBottom: 20 }} />
                      <h5 className="text-primary">Welcome Back Admin!</h5>
                      <p className="text-muted">Sign in to continue.</p>
                    </div>

                    <div className="mt-4">
                      <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                          <label className="form-label">Email</label>
                          <input
                            type="text"
                            className={`form-control ${errors.email ? "is-invalid" : ""}`}
                            id="email"
                            placeholder="Enter email"
                            value={formData.email}
                            onChange={handleChange}
                          />
                          {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                        </div>

                        <div className="mb-3">
                          <label className="form-label">Password</label>
                          <div className="position-relative auth-pass-inputgroup mb-3">
                            <input
                              type="password"
                              className={`form-control pe-5 ${errors.password ? "is-invalid" : ""}`}
                              placeholder="Enter password"
                              id="password"
                              value={formData.password}
                              onChange={handleChange}
                            />
                            <button className="btn btn-link position-absolute end-0 top-0 text-decoration-none text-muted" type="button">
                              <i className="ri-eye-fill align-middle"></i>
                            </button>
                          </div>
                          {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                        </div>

                        {error && <div className="alert alert-danger">{error}</div>} {/* Show error message if any */}

                        <div className="mt-4">
                          <button className="btn btn-dark w-100" type="submit" disabled={loading}>
                              {loading ? (
                                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                              ) : (
                                "Sign In"
                              )}
                            </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortalAccessPage;

