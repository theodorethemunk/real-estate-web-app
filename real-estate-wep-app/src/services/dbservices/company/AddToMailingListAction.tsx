import Swal from "sweetalert2";
import { AddToMailingListAction } from "../admin/mailing-list/addToMailingList";

export const ShowMailingListPopup = async () => {
  const { value: formValues } = await Swal.fire({
    title: `
      <img src="/client/img/logo/main-logo.png" alt="Sommy Properties" style="height: 50px; margin-bottom: 10px;" />
      <h2 style="margin: 4px 0 5px;">Get Important Updates</h2>
      <p style="font-size: 14px; color: #444;">Join our mailing list to receive the latest property deals, investment tips, and exclusive offers from Sommy Properties.</p>
    `,
    html:
      '<input id="swal-input-name" class="swal2-input" placeholder="Full Name">' +
      '<input id="swal-input-email" type="email" class="swal2-input" placeholder="Email Address">',
    showCancelButton: true,
    confirmButtonText: "Subscribe",
    customClass: {
      confirmButton: "orange-subscribe-btn",
    },
    didOpen: () => {
      const style = document.createElement("style");
      style.innerHTML = `
        .orange-subscribe-btn {
          background-color: #f97316 !important; /* Tailwind orange-500 */
          color: white !important;
          border: none !important;
          padding: 8px 24px !important;
          font-size: 16px !important;
        }
        .orange-subscribe-btn:hover {
          background-color: #ea580c !important; /* orange-600 */
        }
      `;
      document.head.appendChild(style);
    },
    preConfirm: () => {
      const name = (document.getElementById("swal-input-name") as HTMLInputElement).value.trim();
      const email = (document.getElementById("swal-input-email") as HTMLInputElement).value.trim();

      if (!name || !email) {
        Swal.showValidationMessage("Please enter both name and email");
        return;
      }

      return { name, email };
    },
  });

  if (formValues) {
    const result = await AddToMailingListAction({
      id: 0,
      name: formValues.name,
      email: formValues.email,
      status: "pending",
    });

    if (result !== "success") {
      Swal.fire("Error", result, "error");
    }
  }
};
