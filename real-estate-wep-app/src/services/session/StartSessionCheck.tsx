import { checkSession } from "../dbservices/auth/CheckAdminLoginSessionAction";

export const startSessionCheck = (navigate: (path: string) => void) => {
    const interval = setInterval(async () => {
      const isSessionActive = await checkSession();
      if (!isSessionActive) {
        navigate("/portalaccess");
      }
    }, 30000); // Check every 30 seconds
  
    return () => clearInterval(interval);
  };
  
