import Swal from "sweetalert2";
import { API_BASE_URL } from "../../../../repo/datarepo";
import { IMailingList } from "../../../../models/interfaces/IMailingList";

export const AddToMailingListAction = async (data: IMailingList): Promise<string> => {

  console.log("Data:", JSON.stringify(data));

  try {
    const response = await fetch(`${API_BASE_URL}/mailinglist/add-to-mailing-list`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await response.text();
    if (!response.ok) throw new Error(result);

    Swal.fire({
      icon: "success",
      title: "Congratulations!",
      text: "You'll never again miss an important price update, property listing, and more.",
    });

    return "success";

  } catch (error) {
    return "Failed to subscibribe to mailing list, check your connection then try again.";
  }
};
