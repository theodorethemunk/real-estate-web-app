import Swal from "sweetalert2";
import { IUserProfile } from "../../../models/interfaces/IUserProfile";
import { API_BASE_URL } from "../../../repo/datarepo";

const UpdateUserAddress = async (formData: IUserProfile): Promise<string> => {
  try {
    const response = await fetch(`${API_BASE_URL}/userprofile/update-address`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData)
    });

    const result = await response.text();
    if (!response.ok)
    {
      //throw new Error(result);
      return result;
    };

    Swal.fire({
      icon: "success",
      title: "Success!",
      text: "Address saved successfully.",
    });

    return "success";
  } catch (error) {
    console.log("Error: " + error);
    return "Failed to update address: " + error;
  }
};

export default UpdateUserAddress;
