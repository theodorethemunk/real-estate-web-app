import { API_BASE_URL } from "../../../../repo/datarepo";
import { IPropertyFeature } from "../../../../models/interfaces/IPropertyFeature";

export const AddPropertyFeatureAction = async (data: IPropertyFeature): Promise<string> => {

  console.log("Data:", JSON.stringify(data));

  try {
    const response = await fetch(`${API_BASE_URL}/estatepropertyprops/create-estate-property-prop`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await response.text();
    if (!response.ok) throw new Error(result);

    return "success";

  } catch (error) {
    return "Failed to add property feature";
  }
};
