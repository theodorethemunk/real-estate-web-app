import { API_BASE_URL } from "../../../../repo/datarepo";

export const setPropertyAsCompanyOwnedAction = async (propertyId: number): Promise<boolean> => {
  try {
    const response = await fetch(`${API_BASE_URL}/estateproperty/set-property-as-company-owned?property_id=${encodeURIComponent(propertyId)}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      throw new Error("Failed to set property as company owned");
    }

    return true;
  } catch (error) {
    console.error("Error setting property as company owned:", error);
    return false;
  }
};

export const setPropertyAsIndividualOwnedAction = async (propertyId: number): Promise<boolean> => {
  try {
    const response = await fetch(`${API_BASE_URL}/estateproperty/set-property-as-individual-owned?property_id=${encodeURIComponent(propertyId)}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      throw new Error("Failed to set property as individual owned");
    }

    return true;
  } catch (error) {
    console.error("Error setting property as individual owned:", error);
    return false;
  }
};
