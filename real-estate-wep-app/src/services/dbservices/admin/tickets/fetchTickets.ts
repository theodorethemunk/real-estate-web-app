import { ITickets } from "../../../../models/interfaces/ITicket";
import { API_BASE_URL } from "../../../../repo/datarepo";

export const fetchTickets = async (status: string = "open"): Promise<ITickets[]> => {

    console.log("Status", status);

    try {
      const url = new URL(`${API_BASE_URL}/ticket/fetch-tickets?status=${status}`);
      //url.searchParams.append("status", status);

      const response = await fetch(url.toString());
      if (!response.ok) {
        throw new Error("Failed to fetch tickets");
      }

      return await response.json();
    } catch (error) {
      console.error("Error fetching tickets:", error);
      return [];
    }
};
