import { AdminProfile } from "../../models/interfaces/AdminProfile";
import { generateLoginId } from "../Util/NumberGenerator";

const saveAdminLoginSession = async (adminInfo: AdminProfile) => {
    localStorage.setItem("adminId", adminInfo.id.toString());
    localStorage.setItem("adminEmail", adminInfo.email);
    localStorage.setItem("adminPhone", adminInfo.phone);
    localStorage.setItem("adminLoginId", generateLoginId());
    localStorage.setItem("adminFirstName", adminInfo.first_name);
    localStorage.setItem("adminLastName", adminInfo.last_name);
};

const saveLoginSession = async (userId: string, email: string, loginId: string) => {
    localStorage.setItem("userId", userId);
    localStorage.setItem("userEmail", email);
    localStorage.setItem("loginId", loginId);
};

const getLoginSession = (sessionId: string): Promise<string> => {
    return new Promise((resolve) => {
        const token = localStorage.getItem(sessionId);
        resolve(token ? token : "");
    });
};

const removeLoginSession = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("loginId");
};

const removeAdminLoginSession = () => {
    localStorage.removeItem("adminId");
    localStorage.removeItem("adminEmail");
    localStorage.removeItem("adminPhone");
    localStorage.removeItem("adminLoginId");
    localStorage.removeItem("adminFirstName");
    localStorage.removeItem("adminLastName");
}

export { saveAdminLoginSession, saveLoginSession, getLoginSession, removeLoginSession, removeAdminLoginSession };
