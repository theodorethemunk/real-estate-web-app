import { API_BASE_URL } from "../../../repo/datarepo";

export interface AgentModeResponse {
  message: string;
  is_agent: boolean;
}

export const switchAgentMode = async (userId: number): Promise<AgentModeResponse | null> => {
  try {
    if (userId <= 0) throw new Error("Invalid user ID.");

    const response = await fetch(`${API_BASE_URL}/userprofile/switch-agent-mode?userId=${userId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(errorMessage);
    }

    const result: AgentModeResponse = await response.json();
    console.log("Agent mode switched successfully:", result.is_agent);
    return result;
  } catch (error) {
    console.error("Failed to switch agent mode:", error);
    return null;
  }
};
