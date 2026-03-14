import Swal from "sweetalert2";
import { API_BASE_URL } from "../../../../repo/datarepo";
import { IExternalProp } from "../../../../models/interfaces/IExternalProp";

export const AddExternalPropertyAction = async (data: IExternalProp): Promise<string> => {

  console.log("Data:", JSON.stringify(data));

  try {
    const response = await fetch(`${API_BASE_URL}/externalproperties/create-property`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await response.text();
    if (!response.ok) throw new Error(result);

    Swal.fire({
      icon: "success",
      title: "Congratulations!",
      text: "Property added successfully.",
    });

    return "success";

  } catch (error) {
    return "Failed to add property";
  }
};
