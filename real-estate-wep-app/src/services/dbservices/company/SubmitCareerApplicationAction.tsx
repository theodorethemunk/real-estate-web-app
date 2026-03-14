import Swal from "sweetalert2";
import { API_BASE_URL } from "../../../repo/datarepo";
import { SubmitCareerApplicationInterface } from "../../../models/interfaces/SubmitCareerApplicationInterface";

const SubmitCareerApplicationAction = async (applicationData: SubmitCareerApplicationInterface): Promise<string> => {

  console.log("Submitting Career Application Data:", JSON.stringify(applicationData));

  try {
    const response = await fetch(`${API_BASE_URL}/careerapplication/submit-career-application`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(applicationData), // Now correctly using ticketData
    });

    const result = await response.text();
    if (!response.ok) throw new Error(result);

    Swal.fire({
      icon: "success",
      title: "Application Submitted!",
      text: "We have received your application and we will get back to you shortly.",
    });

    return "success";

  } catch (error) {
    return "Failed to submit application";
  }
};

const UploadCV = async (cvId: number, cv: File) => {
  try {
    const formData = new FormData();
    formData.append("cvId", cvId.toString());
    formData.append("file", cv);

    for (const [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }

    const response = await fetch(`${API_BASE_URL}/careerapplication/upload-cv`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(errorMessage);
    }

    const result = await response.json();
    console.log("CV uploaded successfully:", result.imageUrl);

  } catch (error) {
    console.error("Failed to upload cv:", error);
  }
};

export {SubmitCareerApplicationAction, UploadCV};
