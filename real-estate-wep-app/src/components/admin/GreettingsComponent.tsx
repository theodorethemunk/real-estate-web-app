import React, { useState } from "react";
import { useLocation } from "react-router-dom";

const GreetingsComponent: React.FC = () => {
  const location = useLocation();
  const currentPath = location.pathname.replace(/\/$/, "");

  const actionButtons: Record<string, { modalId: string; label: string }> = {
    "/managefaq": { modalId: "add-faq", label: "Add FAQ" },
    "/manageproperties": { modalId: "add-property", label: "Add Property" },
    "/externalproperties": { modalId: "add-external-property", label: "Add Landmark Property" },
    "/managetestimonials": { modalId: "add-testimonial", label: "Add Testimonial" },
  };

  const handleButtonClick = () => {
    const modalId = actionButtons[currentPath]?.modalId;
    if (!modalId) return;

    const modalEl = document.getElementById(modalId);
    if (!modalEl) return;

    // Try Bootstrap first, fallback to manual show
    if ((window as any).bootstrap?.Modal) {
      const modal = new (window as any).bootstrap.Modal(modalEl);
      modal.show();
    } else {
      modalEl.classList.add('show');
      modalEl.style.display = 'block';
      modalEl.setAttribute('aria-modal', 'true');
      modalEl.removeAttribute('aria-hidden');
      document.body.classList.add('modal-open');

      // Add backdrop
      const backdrop = document.createElement('div');
      backdrop.className = 'modal-backdrop fade show';
      backdrop.id = 'modal-backdrop-custom';
      document.body.appendChild(backdrop);

      // Close on backdrop click
      backdrop.onclick = () => {
        modalEl.classList.remove('show');
        modalEl.style.display = 'none';
        document.body.classList.remove('modal-open');
        backdrop.remove();
      };
    }
  };

  return (
    <div className="row mb-3 pb-1">
      <div className="col-12">
        <div className="d-flex align-items-lg-center flex-lg-row flex-column">
          <div className="flex-grow-1">
            <h4 className="fs-16 mb-1">Good day, Sommy Properties!</h4>
            <p className="text-muted mb-0">
              Here's what's happening with your business today.
            </p>
          </div>

          <div className="mt-3 mt-lg-0">
            <div className="row g-3 mb-0 align-items-center">
              {actionButtons[currentPath] && (
                <div className="col-auto">
                  <button
                    type="button"
                    className="btn btn-soft-success"
                    onClick={handleButtonClick}
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