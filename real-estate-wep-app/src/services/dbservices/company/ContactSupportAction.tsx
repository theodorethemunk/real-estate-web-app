import Swal from "sweetalert2";
import { API_BASE_URL } from "../../../repo/datarepo";
import { SubmitTicketInterface } from "../../../models/interfaces/SubmitTicketInterface";

const ContactSupportAction = async (ticketData: SubmitTicketInterface): Promise<string> => {

  console.log("Submitting Ticket Data:", JSON.stringify(ticketData));

  try {

    

    const response = await fetch(`${API_BASE_URL}/ticket/submit-ticket`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(ticketData), // Now correctly using ticketData
    });

    const result = await response.text();
    if (!response.ok) throw new Error(result);

    Swal.fire({
      icon: "success",
      title: "Ticket Submitted!",
      text: "Your support request has been sent successfully.",
    });

    return "success";

  } catch (error) {
    return "Failed to submit form";
  }
};

export default ContactSupportAction;
