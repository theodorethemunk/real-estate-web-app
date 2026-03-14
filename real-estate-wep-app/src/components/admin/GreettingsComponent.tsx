import React from "react";
import { useLocation } from "react-router-dom";

const GreetingsComponent: React.FC = () => {
  const location = useLocation();

  // Normalize pathname (removes trailing slash)
  const currentPath = location.pathname.replace(/\/$/, "");

  // Define action buttons for specific pages
  const actionButtons: Record<string, { modalId: string; label: string }> = {
    "/managefaq": { modalId: "add-faq", label: "Add FAQ" },
    "/manageproperties": { modalId: "add-property", label: "Add Property" },
    "/externalproperties": { modalId: "add-external-property", label: "Add Landmark Property" },
    "/managetestimonials": { modalId: "add-testimonial", label: "Add Testimonial" },
  };

  return (
    <div className="row mb-3 pb-1">
      <div className="col-12">
        <div className="d-flex align-items-lg-center flex-lg-row flex-column">
          {/* Greeting Section */}
          <div className="flex-grow-1">
            <h4 className="fs-16 mb-1">Good day, Sommy Properties!</h4>
            <p className="text-muted mb-0">
              Here's what's happening with your business today.
            </p>
          </div>

          {/* Action Button (if available) */}
          <div className="mt-3 mt-lg-0">
            <div className="row g-3 mb-0 align-items-center">
              {actionButtons[currentPath] && (
                <div className="col-auto">
                  <button
                    type="button"
                    className="btn btn-soft-success"
                    data-bs-toggle="modal"
                    data-bs-target={`#${actionButtons[currentPath].modalId}`}
                  >
                    <i className="ri-add-circle-line align-middle me-1"></i> {actionButtons[currentPath].label}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GreetingsComponent;
