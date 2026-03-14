import Swal from "sweetalert2";
import { API_BASE_URL } from "../../../../repo/datarepo";
import { IFaq } from "../../../../models/interfaces/FAQInterface";

export const AddFAQAction = async (data: IFaq): Promise<string> => {

  console.log("Data:", JSON.stringify(data));

  try {
    const response = await fetch(`${API_BASE_URL}/faq/add-faq`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await response.text();
    if (!response.ok) throw new Error(result);

    Swal.fire({
      icon: "success",
      title: "Congratulations!",
      text: "FAQ added successfully.",
    });

    return "success";

  } catch (error) {
    return "Failed to add FAQ";
  }
};
