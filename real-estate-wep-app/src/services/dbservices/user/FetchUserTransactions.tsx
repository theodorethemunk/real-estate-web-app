import { ITransactions } from "../../../models/interfaces/TransactionInterface";
import { API_BASE_URL } from "../../../repo/datarepo";

export const fetchUserTransactions = async (userId: string | null): Promise<ITransactions[]> => {
  if (!userId || userId === "0") {
    console.error("Invalid userId for transaction fetch.");
    return [];
  }

  console.log("Transaction fetch User Id: " + userId);
  
  try {
    // ✅ Fix: Use query parameters instead of route parameters
    const response = await fetch(`${API_BASE_URL}/usertransactions/fetch-user-transactions?user_id=${userId}`);

    if (!response.ok) {
      throw new Error(`Failed to fetch user transactions. Status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching user transactions:", error);
    return [];
  }
};
