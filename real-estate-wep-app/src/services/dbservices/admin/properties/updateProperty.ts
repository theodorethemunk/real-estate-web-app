import Swal from "sweetalert2";
import { API_BASE_URL } from "../../../../repo/datarepo";
import { IPropertyMain } from "../../../../models/interfaces/PropertyInterface";

export const UpdatePropertyAction = async (data: IPropertyMain): Promise<string> => {

  const now = new Date().toISOString();
  data.created_on = now;
  data.updated_on = now;

  if(data.video_url.length < 1){
    data.video_url = "https://propertiessommy.com";
  }

  console.log("Save Changes Data:", JSON.stringify(data));

  try {
    const response = await fetch(`${API_BASE_URL}/estateproperty/update-estate-property`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await response.text();
    if (!response.ok) throw new Error(result);

    Swal.fire({
      icon: "success",
      title: "Congratulations!",
      text: "Your changes were saved successfully.",
    });

    return "success";

  } catch (error) {
    return "Failed to save changes";
  }
};
