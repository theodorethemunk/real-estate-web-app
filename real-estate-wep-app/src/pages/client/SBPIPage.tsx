import React, { useState } from "react";

const SBPIPage: React.FC = () => {
  const [activeProgram, setActiveProgram] = useState<"sbpi" | "p2p">("sbpi");
  const [formData, setFormData] = useState({
    fullName: "",
    dateOfBirth: "",
    placeOfBirth: "",
    email: "",
    nationality: "",
    religion: "",
    phone: "",
    residentialAddress: "",
    currentOccupation: "",
    gender: "",
    stateOfOrigin: "",
    lga: "",
    idType: "",
    idNumber: "",
    expiryDate: "",
    tin: "",
    employerName: "",
    jobTitle: "",
    organizationName: "",
    employmentType: "",
    officeAddress: "",
    monthlySalary: "",
    approvedPercentage: "",
    guardianName: "",
    guardianRelationship: "",
    guardianAddress: "",
    guardianContact: "",
    agreed: false,
  });
  const [submitted, setSubmitted] = useState(false);
  const [activeStep, setActiveStep] = useState(1);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = "/client/docs/SBPI_FORM.pdf";
    link.download = "SBPI_Application_Form.pdf";
    link.click();
  };

  return (
    <div style={{ fontFamily: "'Georgia', serif", background: "#faf8f5", minHeight: "100vh" }}>
      {/* Hero Section */}
      <div style={{
        background: "linear-gradient(135deg, #7a1a1a 0%, #a52020 40%, #c0392b 100%)",
        padding: "80px 20px 60px",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, bottom: 0,
          backgroundImage: "radial-gradient(circle at 20% 50%, rgba(255,255,255,0.05) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255,255,255,0.05) 0%, transparent 50%)",
        }} />
        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{
            display: "inline-block", background: "rgba(255,255,255,0.15)",
            padding: "6px 20px", borderRadius: "20px", marginBottom: "16px",
            fontSize: "13px", color: "#ffd700", letterSpacing: "3px", textTransform: "uppercase",
          }}>
            Sommy Properties Ltd
          </div>
          <h1 style={{
            color: "#fff", fontSize: "clamp(32px, 5vw, 56px)", fontWeight: "700",
            margin: "0 0 12px", lineHeight: 1.2,
          }}>
            Investment Programs
          </h1>
          <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "18px", maxWidth: "600px", margin: "0 auto" }}>
            Smart, accessible pathways to property ownership for every Nigerian
          </p>
        </div>
      </div>

      {/* Program Tabs */}
      <div style={{ background: "#fff", borderBottom: "1px solid #eee", position: "sticky", top: 0, zIndex: 100 }}>
        <div style={{ maxWidth: "900px", margin: "0 auto", display: "flex" }}>
          {[
            { id: "sbpi", label: "SBPI Program", sub: "Salary Bridge Property Investment" },
            { id: "p2p", label: "Profit 2 Property", sub: "For Market Women & Traders" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveProgram(tab.id as "sbpi" | "p2p")}
              style={{
                flex: 1, padding: "16px 20px", border: "none", background: "transparent",
                cursor: "pointer", textAlign: "center",
                borderBottom: activeProgram === tab.id ? "3px solid #c0392b" : "3px solid transparent",
                transition: "all 0.2s",
              }}
            >
              <div style={{ fontWeight: "700", fontSize: "15px", color: activeProgram === tab.id ? "#c0392b" : "#555" }}>
                {tab.label}
              </div>
              <div style={{ fontSize: "12px", color: "#999", marginTop: "2px" }}>{tab.sub}</div>
            </button>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "40px 20px" }}>

        {/* SBPI Program Content */}
        {activeProgram === "sbpi" && (
          <div>
            {/* Info Card */}
            <div style={{
              background: "#fff", borderRadius: "16px", overflow: "hidden",
              boxShadow: "0 4px 24px rgba(0,0,0,0.08)", marginBottom: "40px",
            }}>
              <div style={{
                background: "linear-gradient(135deg, #7a1a1a, #c0392b)",
                padding: "32px", color: "#fff",
              }}>
                <div style={{ fontSize: "13px", letterSpacing: "2px", textTransform: "uppercase", color: "#ffd700", marginBottom: "8px" }}>
                  Introducing
                </div>
                <h2 style={{ margin: "0 0 8px", fontSize: "32px", fontWeight: "700" }}>The SBPI Program</h2>
                <p style={{ margin: 0, opacity: 0.9, fontSize: "16px" }}>Salary Bridge Property Investment</p>
              </div>
              <div style={{ padding: "32px" }}>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "32px", alignItems: "center", marginBottom: "32px" }}>
                  <div>
                    <p style={{ fontSize: "16px", lineHeight: "1.8", color: "#444", marginBottom: "20px" }}>
                      A smart initiative designed to help companies make property ownership accessible and stress-free for their employees.
                    </p>
                    <p style={{ fontSize: "16px", lineHeight: "1.8", color: "#444", marginBottom: "20px" }}>
                      With the SBPI Program, your employees can own property in their own names, made possible through your support and vision.
                    </p>
                    <p style={{ fontSize: "16px", lineHeight: "1.8", color: "#444" }}>
                      Secure your employees' future with Sommy's Properties because <strong>great companies build people, not just profits.</strong>
                    </p>
                  </div>
                  <div>
                    <img
                      src="/client/img/sbpi-program.jpg"
                      alt="SBPI Program"
                      style={{ width: "100%", borderRadius: "16px", boxShadow: "0 8px 32px rgba(0,0,0,0.15)" }}
                    />
                  </div>
                </div>

                {/* Features */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px", marginTop: "32px" }}>
                  {[
                    { icon: "🏠", title: "Own in Their Name", desc: "Property titled directly to the employee" },
                    { icon: "💰", title: "Salary Deduction", desc: "Stress-free monthly contributions" },
                    { icon: "📋", title: "12 Month Plan", desc: "Consecutive monthly payments" },
                    { icon: "🤝", title: "Company Backed", desc: "Employer supports the program" },
                  ].map((f, i) => (
                    <div key={i} style={{
                      background: "#faf8f5", borderRadius: "12px", padding: "20px",
                      textAlign: "center", border: "1px solid #f0ece6",
                    }}>
                      <div style={{ fontSize: "28px", marginBottom: "8px" }}>{f.icon}</div>
                      <div style={{ fontWeight: "700", fontSize: "14px", color: "#333", marginBottom: "4px" }}>{f.title}</div>
                      <div style={{ fontSize: "13px", color: "#777" }}>{f.desc}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div style={{ display: "flex", gap: "16px", marginBottom: "40px", flexWrap: "wrap" }}>
              <button
                onClick={handleDownload}
                style={{
                  flex: 1, minWidth: "200px", padding: "16px 24px",
                  background: "#fff", border: "2px solid #c0392b", borderRadius: "10px",
                  color: "#c0392b", fontWeight: "700", fontSize: "15px", cursor: "pointer",
                  display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
                }}
              >
                📄 Download PDF Form
              </button>
              <button
                onClick={() => document.getElementById("application-form")?.scrollIntoView({ behavior: "smooth" })}
                style={{
                  flex: 1, minWidth: "200px", padding: "16px 24px",
                  background: "#c0392b", border: "none", borderRadius: "10px",
                  color: "#fff", fontWeight: "700", fontSize: "15px", cursor: "pointer",
                  display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
                }}
              >
                📝 Apply Online
              </button>
            </div>

            {/* Application Form */}
            <div id="application-form" style={{
              background: "#fff", borderRadius: "16px",
              boxShadow: "0 4px 24px rgba(0,0,0,0.08)", overflow: "hidden",
            }}>
              <div style={{ background: "linear-gradient(135deg, #7a1a1a, #c0392b)", padding: "24px 32px" }}>
                <h3 style={{ margin: 0, color: "#fff", fontSize: "22px" }}>SBPI Application Form</h3>
                <p style={{ margin: "4px 0 0", color: "rgba(255,255,255,0.8)", fontSize: "14px" }}>
                  Fill out all sections carefully in CAPITAL LETTERS
                </p>
              </div>

              {/* Step Progress */}
              <div style={{ padding: "24px 32px", background: "#faf8f5", borderBottom: "1px solid #eee" }}>
                <div style={{ display: "flex", gap: "8px" }}>
                  {["Worker's Profile", "ID & Employment", "Guardian Info", "Terms"].map((step, i) => (
                    <div
                      key={i}
                      onClick={() => setActiveStep(i + 1)}
                      style={{
                        flex: 1, textAlign: "center", cursor: "pointer",
                        padding: "10px 8px",
                        borderRadius: "8px",
                        background: activeStep === i + 1 ? "#c0392b" : activeStep > i + 1 ? "#f0ece6" : "#fff",
                        border: `1px solid ${activeStep === i + 1 ? "#c0392b" : "#ddd"}`,
                        transition: "all 0.2s",
                      }}
                    >
                      <div style={{
                        fontSize: "11px", fontWeight: "700",
                        color: activeStep === i + 1 ? "#fff" : activeStep > i + 1 ? "#c0392b" : "#999",
                      }}>
                        {activeStep > i + 1 ? "✓ " : `${i + 1}. `}{step}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {submitted ? (
                <div style={{ padding: "60px 32px", textAlign: "center" }}>
                  <div style={{ fontSize: "64px", marginBottom: "16px" }}>🎉</div>
                  <h3 style={{ color: "#c0392b", fontSize: "24px", marginBottom: "12px" }}>Application Submitted!</h3>
                  <p style={{ color: "#666", fontSize: "16px", maxWidth: "400px", margin: "0 auto" }}>
                    Thank you for applying to the SBPI Program. Our team will contact you at <strong>{formData.email}</strong> within 2-3 business days.
                  </p>
                  <button
                    onClick={() => { setSubmitted(false); setActiveStep(1); setFormData({ ...formData, fullName: "" }); }}
                    style={{
                      marginTop: "24px", padding: "12px 32px",
                      background: "#c0392b", border: "none", borderRadius: "8px",
                      color: "#fff", fontWeight: "700", cursor: "pointer",
                    }}
                  >
                    Submit Another Application
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ padding: "32px" }}>
                  {/* Step 1: Worker's Profile */}
                  {activeStep === 1 && (
                    <div>
                      <h4 style={{ color: "#c0392b", marginTop: 0, marginBottom: "24px", fontSize: "16px", textTransform: "uppercase", letterSpacing: "1px" }}>
                        Section 1: Worker's Profile
                      </h4>
                      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "16px" }}>
                        {[
                          { label: "Full Name *", name: "fullName", type: "text", colSpan: 2 },
                          { label: "Date of Birth *", name: "dateOfBirth", type: "date" },
                          { label: "Place of Birth *", name: "placeOfBirth", type: "text" },
                          { label: "Email Address *", name: "email", type: "email" },
                          { label: "Phone Number *", name: "phone", type: "tel" },
                          { label: "Nationality", name: "nationality", type: "text" },
                          { label: "Religion", name: "religion", type: "text" },
                          { label: "State of Origin", name: "stateOfOrigin", type: "text" },
                          { label: "LGA", name: "lga", type: "text" },
                          { label: "Current Occupation *", name: "currentOccupation", type: "text" },
                        ].map((field) => (
                          <div key={field.name} style={{ gridColumn: (field as any).colSpan === 2 ? "1 / -1" : "auto" }}>
                            <label style={{ display: "block", fontSize: "13px", fontWeight: "600", color: "#555", marginBottom: "6px" }}>
                              {field.label}
                            </label>
                            <input
                              type={field.type}
                              name={field.name}
                              value={(formData as any)[field.name]}
                              onChange={handleChange}
                              style={{
                                width: "100%", padding: "10px 14px", borderRadius: "8px",
                                border: "1px solid #ddd", fontSize: "14px", boxSizing: "border-box",
                                outline: "none",
                              }}
                            />
                          </div>
                        ))}
                        <div>
                          <label style={{ display: "block", fontSize: "13px", fontWeight: "600", color: "#555", marginBottom: "6px" }}>
                            Gender
                          </label>
                          <select
                            name="gender"
                            value={formData.gender}
                            onChange={handleChange}
                            style={{
                              width: "100%", padding: "10px 14px", borderRadius: "8px",
                              border: "1px solid #ddd", fontSize: "14px", boxSizing: "border-box",
                            }}
                          >
                            <option value="">Select Gender</option>
                            <option>Male</option>
                            <option>Female</option>
                            <option>Other</option>
                          </select>
                        </div>
                        <div style={{ gridColumn: "1 / -1" }}>
                          <label style={{ display: "block", fontSize: "13px", fontWeight: "600", color: "#555", marginBottom: "6px" }}>
                            Residential Address *
                          </label>
                          <textarea
                            name="residentialAddress"
                            value={formData.residentialAddress}
                            onChange={handleChange}
                            rows={3}
                            style={{
                              width: "100%", padding: "10px 14px", borderRadius: "8px",
                              border: "1px solid #ddd", fontSize: "14px", boxSizing: "border-box",
                              resize: "vertical",
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Step 2: ID & Employment */}
                  {activeStep === 2 && (
                    <div>
                      <h4 style={{ color: "#c0392b", marginTop: 0, marginBottom: "24px", fontSize: "16px", textTransform: "uppercase", letterSpacing: "1px" }}>
                        Section 2: ID & Employment Details
                      </h4>
                      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "16px" }}>
                        {[
                          { label: "ID Type (e.g. Passport, Driver's License)", name: "idType", type: "text" },
                          { label: "ID Number", name: "idNumber", type: "text" },
                          { label: "ID Expiry Date", name: "expiryDate", type: "date" },
                          { label: "Tax Identification Number (TIN)", name: "tin", type: "text" },
                          { label: "Current Employer's Name", name: "employerName", type: "text" },
                          { label: "Job Title / Position", name: "jobTitle", type: "text" },
                          { label: "Organization Name", name: "organizationName", type: "text" },
                          { label: "Monthly Salary (₦)", name: "monthlySalary", type: "number" },
                          { label: "Approved % to Deduct", name: "approvedPercentage", type: "number" },
                        ].map((field) => (
                          <div key={field.name}>
                            <label style={{ display: "block", fontSize: "13px", fontWeight: "600", color: "#555", marginBottom: "6px" }}>
                              {field.label}
                            </label>
                            <input
                              type={field.type}
                              name={field.name}
                              value={(formData as any)[field.name]}
                              onChange={handleChange}
                              style={{
                                width: "100%", padding: "10px 14px", borderRadius: "8px",
                                border: "1px solid #ddd", fontSize: "14px", boxSizing: "border-box",
                              }}
                            />
                          </div>
                        ))}
                        <div>
                          <label style={{ display: "block", fontSize: "13px", fontWeight: "600", color: "#555", marginBottom: "6px" }}>
                            Employment Type
                          </label>
                          <select
                            name="employmentType"
                            value={formData.employmentType}
                            onChange={handleChange}
                            style={{
                              width: "100%", padding: "10px 14px", borderRadius: "8px",
                              border: "1px solid #ddd", fontSize: "14px", boxSizing: "border-box",
                            }}
                          >
                            <option value="">Select Type</option>
                            <option>Full Time</option>
                            <option>Part Time</option>
                          </select>
                        </div>
                        <div style={{ gridColumn: "1 / -1" }}>
                          <label style={{ display: "block", fontSize: "13px", fontWeight: "600", color: "#555", marginBottom: "6px" }}>
                            Office Address
                          </label>
                          <textarea
                            name="officeAddress"
                            value={formData.officeAddress}
                            onChange={handleChange}
                            rows={3}
                            style={{
                              width: "100%", padding: "10px 14px", borderRadius: "8px",
                              border: "1px solid #ddd", fontSize: "14px", boxSizing: "border-box",
                              resize: "vertical",
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Step 3: Guardian Info */}
                  {activeStep === 3 && (
                    <div>
                      <h4 style={{ color: "#c0392b", marginTop: 0, marginBottom: "24px", fontSize: "16px", textTransform: "uppercase", letterSpacing: "1px" }}>
                        Section 3: Parent / Guardian Information
                      </h4>
                      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "16px" }}>
                        {[
                          { label: "Full Name", name: "guardianName", type: "text" },
                          { label: "Relationship", name: "guardianRelationship", type: "text" },
                          { label: "Contact Number", name: "guardianContact", type: "tel" },
                          { label: "Address", name: "guardianAddress", type: "text" },
                        ].map((field) => (
                          <div key={field.name}>
                            <label style={{ display: "block", fontSize: "13px", fontWeight: "600", color: "#555", marginBottom: "6px" }}>
                              {field.label}
                            </label>
                            <input
                              type={field.type}
                              name={field.name}
                              value={(formData as any)[field.name]}
                              onChange={handleChange}
                              style={{
                                width: "100%", padding: "10px 14px", borderRadius: "8px",
                                border: "1px solid #ddd", fontSize: "14px", boxSizing: "border-box",
                              }}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Step 4: Terms */}
                  {activeStep === 4 && (
                    <div>
                      <h4 style={{ color: "#c0392b", marginTop: 0, marginBottom: "24px", fontSize: "16px", textTransform: "uppercase", letterSpacing: "1px" }}>
                        Terms & Conditions
                      </h4>
                      <div style={{
                        background: "#faf8f5", borderRadius: "12px", padding: "24px",
                        maxHeight: "300px", overflowY: "auto", border: "1px solid #eee",
                        fontSize: "14px", lineHeight: "1.8", color: "#555",
                        marginBottom: "24px",
                      }}>
                        <ul style={{ paddingLeft: "20px", margin: 0 }}>
                          {[
                            "You are required to read through the application form/terms and conditions carefully before appending your signature.",
                            "The Application must be completed in English Language.",
                            "Please provide accurate information (all information shall be treated as confidential and for official use only).",
                            "There shall be no conversion of any amount paid in buying any of our products.",
                            "Failure to meet up with the monthly payment plan will warrant a default charge.",
                            "Plots and final documents will only be handed over to subscribers upon completion of payment.",
                            "This program runs for a duration of 12 consecutive months.",
                            "The company reserves the right to restructure or cancel a participant's plan if default persists.",
                            "Refunds, if applicable, shall be subject to administrative and processing deductions.",
                            "Participation in the program is non-transferrable unless approved in writing by Sommy's Properties Limited.",
                            "Contributions shall be made monthly and must be paid on or before the agreed date.",
                          ].map((term, i) => (
                            <li key={i} style={{ marginBottom: "8px" }}>{term}</li>
                          ))}
                        </ul>
                        <div style={{ marginTop: "16px", padding: "16px", background: "#fff", borderRadius: "8px", border: "1px solid #ddd" }}>
                          <strong>Bank Details for Remittance:</strong><br />
                          Bank Name: ZENITH BANK<br />
                          Account Name: SOMMYS PROPERTIES LIMITED<br />
                          Account Number: 1312426504
                        </div>
                      </div>
                      <label style={{ display: "flex", gap: "12px", alignItems: "flex-start", cursor: "pointer" }}>
                        <input
                          type="checkbox"
                          name="agreed"
                          checked={formData.agreed}
                          onChange={handleChange}
                          style={{ marginTop: "3px", width: "18px", height: "18px" }}
                        />
                        <span style={{ fontSize: "14px", color: "#555", lineHeight: "1.6" }}>
                          I hereby declare that the information provided is accurate and complete. I agree to the terms and conditions of Sommy's Properties Ltd regarding this Salary Bridge Investment Program.
                        </span>
                      </label>
                    </div>
                  )}

                  {/* Navigation Buttons */}
                  <div style={{ display: "flex", justifyContent: "space-between", marginTop: "32px" }}>
                    {activeStep > 1 ? (
                      <button
                        type="button"
                        onClick={() => setActiveStep(activeStep - 1)}
                        style={{
                          padding: "12px 24px", background: "#fff", border: "2px solid #ddd",
                          borderRadius: "8px", color: "#555", fontWeight: "600", cursor: "pointer",
                        }}
                      >
                        ← Previous
                      </button>
                    ) : <div />}

                    {activeStep < 4 ? (
                      <button
                        type="button"
                        onClick={() => setActiveStep(activeStep + 1)}
                        style={{
                          padding: "12px 24px", background: "#c0392b", border: "none",
                          borderRadius: "8px", color: "#fff", fontWeight: "600", cursor: "pointer",
                        }}
                      >
                        Next →
                      </button>
                    ) : (
                      <button
                        type="submit"
                        disabled={!formData.agreed}
                        style={{
                          padding: "12px 32px", background: formData.agreed ? "#c0392b" : "#ccc",
                          border: "none", borderRadius: "8px", color: "#fff",
                          fontWeight: "700", cursor: formData.agreed ? "pointer" : "not-allowed",
                          fontSize: "15px",
                        }}
                      >
                        Submit Application ✓
                      </button>
                    )}
                  </div>
                </form>
              )}
            </div>
          </div>
        )}

        {/* Profit 2 Property Content */}
        {activeProgram === "p2p" && (
          <div>
            <div style={{
              background: "#fff", borderRadius: "16px", overflow: "hidden",
              boxShadow: "0 4px 24px rgba(0,0,0,0.08)", marginBottom: "40px",
            }}>
              <div style={{
                background: "linear-gradient(135deg, #7a1a1a, #c0392b)",
                padding: "32px", color: "#fff",
              }}>
                <h2 style={{ margin: "0 0 8px", fontSize: "32px", fontWeight: "700" }}>Profit 2 Property Investment</h2>
                <p style={{ margin: 0, opacity: 0.9, fontSize: "16px" }}>For Market Women & Traders</p>
              </div>
              <div style={{ padding: "32px" }}>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "32px", alignItems: "center", marginBottom: "32px" }}>
                  <div>
                    <p style={{ fontSize: "16px", lineHeight: "1.8", color: "#444", marginBottom: "20px" }}>
                      A simple initiative designed for market women and traders to make property ownership easy and achievable by redirecting daily Akawo contributions and business profits into real estate savings.
                    </p>
                    <p style={{ fontSize: "16px", lineHeight: "1.8", color: "#444", marginBottom: "20px" }}>
                      With this plan, market women contribute as little as <strong>₦5,000 daily for 365 days</strong>, turning regular Akawo payments and profits into a subscription that secures a plot of land in their own names, based on the estate option chosen.
                    </p>
                    <p style={{ fontSize: "16px", lineHeight: "1.8", color: "#444" }}>
                      Own property with Sommy's Properties because <strong>hard work and profit should lead to lasting assets.</strong> Terms and conditions apply.
                    </p>
                  </div>
                  <div>
                    <img
                      src="/client/img/p2p-program.jpg"
                      alt="Profit 2 Property Program"
                      style={{ width: "100%", borderRadius: "16px", boxShadow: "0 8px 32px rgba(0,0,0,0.15)" }}
                    />
                  </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px", marginTop: "32px" }}>
                  {[
                    { icon: "💵", title: "₦5,000/day", desc: "Minimum daily contribution" },
                    { icon: "📅", title: "365 Days", desc: "Full year savings plan" },
                    { icon: "🌍", title: "Own Land", desc: "Plot in your name" },
                    { icon: "🏪", title: "For Traders", desc: "Market women & entrepreneurs" },
                  ].map((f, i) => (
                    <div key={i} style={{
                      background: "#faf8f5", borderRadius: "12px", padding: "20px",
                      textAlign: "center", border: "1px solid #f0ece6",
                    }}>
                      <div style={{ fontSize: "28px", marginBottom: "8px" }}>{f.icon}</div>
                      <div style={{ fontWeight: "700", fontSize: "14px", color: "#333", marginBottom: "4px" }}>{f.title}</div>
                      <div style={{ fontSize: "13px", color: "#777" }}>{f.desc}</div>
                    </div>
                  ))}
                </div>

                <div style={{
                  marginTop: "32px", background: "#fef9f0", border: "1px solid #fde8c0",
                  borderRadius: "12px", padding: "20px",
                }}>
                  <div style={{ fontWeight: "700", color: "#b7791f", marginBottom: "8px" }}>📞 How to Enroll</div>
                  <p style={{ color: "#666", margin: 0, fontSize: "15px" }}>
                    Contact Sommy's Properties directly to enroll in the Profit 2 Property program. Our team will guide you through the process and help you choose the best estate option for your budget.
                  </p>
                  <a
                    href="/contact"
                    style={{
                      display: "inline-block", marginTop: "16px", padding: "12px 24px",
                      background: "#c0392b", borderRadius: "8px", color: "#fff",
                      fontWeight: "700", textDecoration: "none", fontSize: "14px",
                    }}
                  >
                    Contact Us to Enroll →
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SBPIPage;
