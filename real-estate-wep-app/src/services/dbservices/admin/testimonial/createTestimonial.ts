import Swal from "sweetalert2";
import { API_BASE_URL } from "../../../../repo/datarepo";
import { ITestimonial } from "../../../../models/interfaces/ITestimonial";

const UploadTestimonialBanner = async (fileName: string, imageFile: File) => {
  try {
    const formData = new FormData();
    formData.append("fileName", fileName);
    formData.append("file", imageFile);

    for (const [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }

    const response = await fetch(`${API_BASE_URL}/testimonial/upload-banner`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(errorMessage);
    }

    const result = await response.json();
    console.log("Banner uploaded successfully:", result.imageUrl);

  } catch (error) {
    console.error("Failed to upload banner:", error);
  }
};

const UploadTestimonialAvatar = async (fileName: string, imageFile: File) => {
  try {
    const formData = new FormData();
    formData.append("fileName", fileName);
    formData.append("file", imageFile);

    for (const [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }

    const response = await fetch(`${API_BASE_URL}/testimonial/upload-avatar`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(errorMessage);
    }

    const result = await response.json();
    console.log("Avatar uploaded successfully:", result.imageUrl);

  } catch (error) {
    console.error("Failed to upload avatar:", error);
  }
};

const AddTestimonialAction = async (data: ITestimonial): Promise<string> => {

  console.log("Data:", JSON.stringify(data));

  try {
    const response = await fetch(`${API_BASE_URL}/testimonial/add-testimonial`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await response.text();
    if (!response.ok) throw new Error(result);

    Swal.fire({
      icon: "success",
      title: "Congratulations!",
      text: "Testimonial added successfully.",
    });

    return "success";

  } catch (error) {
    return "Failed to add testimonial";
  }
};

export {UploadTestimonialBanner, UploadTestimonialAvatar, AddTestimonialAction}
