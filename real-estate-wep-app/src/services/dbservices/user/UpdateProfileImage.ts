import { API_BASE_URL } from "../../../repo/datarepo";

const UpdateProfileImage = async (userId: number, image: File) => {
    try {
      const formData = new FormData();
      formData.append("userId", userId.toString());
      formData.append("file", image);

      // Log FormData
      console.log("Uploading profile image with FormData:");
      for (const [key, value] of formData.entries()) {
        console.log(`${key}:`, value);
      }
  
      const response = await fetch(`${API_BASE_URL}/userprofile/update-profile-image`, {
        method: "POST",
        body: formData,
      });
  
      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
      }
  
      const result = await response.json();
      console.log("Profile image updated successfully:", result.imageUrl);
  
      return result.imageUrl;
  
    } catch (error) {
      console.log("User Profile id:", userId);
      console.error("Failed to update profile picture:", error);
      return null;
    }
};

export default UpdateProfileImage;
