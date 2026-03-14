export interface SubmitTicketInterface {
  id?: number; // Optional because it's usually auto-generated
  user_id: number;
  ticket_number: number;
  status: string;
  email: string;
  full_name: string;
  department: string;
  title: string;
  query: string;
  created_on?: string;
  updated_on?: string;
}
