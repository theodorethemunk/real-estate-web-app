import { API_BASE_URL } from "../../../../repo/datarepo";

const UploadPropertyImage = async (propertyId: string, fileName: string, imageFile: File) => {
  try {
    const formData = new FormData();
    formData.append("fileName", fileName);
    formData.append("file", imageFile);
    formData.append("propertyId", propertyId);

    for (const [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }

    const response = await fetch(`${API_BASE_URL}/estateproperty/upload-property-image`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(errorMessage);
    }

    const result = await response.json();
    console.log("Property image uploaded successfully:", result.imageUrl);

  } catch (error) {
    console.error("Failed to upload property image:", error);
  }
};

export {UploadPropertyImage}
