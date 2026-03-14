import { useEffect, useState } from "react";
import { dateToWords } from "../../services/Util/ConvertDateToWords";
import { fetchTickets } from "../../services/dbservices/admin/tickets/fetchTickets";
import { ITickets } from "../../models/interfaces/ITicket";
import { updateTicketStatusAction } from "../../services/dbservices/admin/tickets/updateTicketStatus";
import { deleteTicketAction } from "../../services/dbservices/admin/tickets/deleteTicket";
import { copyToClipboard } from "../../services/Util/CopyText";

const TicketPage: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [loadingIndex, setLoadingIndex] = useState<number>(0);
  const [tickets, setTickets] = useState<ITickets[]>([]);
  const [searchKeyword, setSearchKeyword] = useState<string>("pending");

  useEffect(() => {
    getTickets();
  }, [searchKeyword]);

  const getTickets = async () => {
    setLoading(true);
    await refreshPage();
    setLoading(false);
  };

  const openTicket = async (id: number) => {
    setLoadingIndex(id);
    await updateTicketStatusAction(id, "open");
    refreshPage();
  };

  const closeTicket = async (id: number) => {
    setLoadingIndex(id);
    await updateTicketStatusAction(id, "closed");
    refreshPage();
  };

  const deleteTicket = async (id: number) => {
    setLoadingIndex(id);
    await deleteTicketAction(id);
    refreshPage();
  };

  const refreshPage = async () => {
    const fetchedData = await fetchTickets(searchKeyword);
    setTickets(fetchedData);
    setLoadingIndex(0);
  }

  return (
    <div className="row">
      <div className="col-lg-12">
        <div className="card" id="invoiceList">
          <div className="card-header border-0 d-flex align-items-center">
            <h5 className="card-title mb-0 flex-grow-1">Customer Queries</h5>
          </div>

          {/* Search Input */}
          <div className="card-body p-0 border-bottom border-bottom-dashed">
            <div className="search-box">
              <select
                className="form-control search py-3"
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
              >
                <option value="pending">① Show Pending Tickets ▼</option>
                <option value="open">① Show Open Tickets ▼</option>
                <option value="closed">① Show Closed Tickets ▼</option>
              </select>
            </div>
          </div>

          {/* Users List */}
          <div className="card-body">
            <div className="table-responsive table-card">
              {loading ? (
                <div className="text-center mt-5 mb-5 d-flex justify-content-center align-items-center gap-2">
                  <div className="spinner-border text-dark" role="status">
                    <span className="sr-only">Loading...</span>
                  </div>
                  <h5 className="mb-0">Loading...</h5>
                </div>
              ) : tickets.length === 0 ? (
                <div className="noresult text-center">
                  <h5 className="mt-2">Sorry! No Result Found</h5>
                  <p className="text-muted mb-0">
                    We've searched more than 150+ results but found none from your search.
                  </p>
                </div>
              ) : (
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>Ticket Number</th>
                      <th>Contact</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody className="mb-5">
                    {tickets.map((ticket) => (
                      <tr key={ticket.id}>
                        <td>#{ticket.ticket_number}<br />{dateToWords(ticket.created_on?.toString() ?? "")}</td>
                        <td>{ticket.full_name}<br />{ticket.email}</td>
                        <td>
                          <span className={ticket.status == "closed" ? "badge badge-soft-success" : ticket.status == "open" ? "badge badge-soft-warning" : "badge badge-soft-danger"}>{ticket.status?.toUpperCase()}</span>
                          <br />
                          Last-Updated: {dateToWords(ticket.updated_on?.toString() ?? "")}
                        </td>
                        <td>
                          {
                            loadingIndex == ticket.id
                              ?
                              <div className="spinner-border text-dark" role="status">
                                <span className="sr-only">Loading...</span>
                              </div>
                              :
                              <div className="dropdown">
                                <button className="btn btn-sm btn-outline-dark dropdown-toggle" type="button" data-bs-toggle="dropdown">
                                  Actions
                                </button>
                                <ul className="dropdown-menu">
                                  <li>
                                    <a className="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target={`#view-ticket-${ticket.id}`}>
                                      View Message
                                    </a>
                                  </li>
                                  <li>
                                    <a className="dropdown-item" href="#" onClick={() => copyToClipboard(ticket.email ?? "", "Email Address")}>
                                      Copy Email
                                    </a>
                                  </li>
                                  <li>
                                    <a className="dropdown-item" href="#" onClick={() => openTicket(ticket.id)}>
                                      Open Ticket
                                    </a>
                                  </li>
                                  <li>
                                    <a className="dropdown-item" href="#" onClick={() => closeTicket(ticket.id)}>
                                      Close Ticket
                                    </a>
                                  </li>
                                  <li>
                                    <a className="dropdown-item" href="#" onClick={() => deleteTicket(ticket.id)}>
                                      Delete Ticket
                                    </a>
                                  </li>
                                </ul>
                                {/* Modal */}
                                <div id={`view-ticket-${ticket.id}`} className="modal fade" tabIndex={-1} aria-labelledby="myModalLabel" aria-hidden="true" style={{ display: "none", }}>
                                  <div className="modal-dialog">
                                    <div className="modal-content">
                                      <div className="modal-header">
                                        <h5 className="modal-title" id="myModalLabel">Ticket Info</h5>
                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"> </button>
                                      </div>
                                      <div className="modal-body">
                                        <h5 className="fs-15">
                                          {ticket.title}
                                        </h5>
                                        <p className="text-muted">
                                          {ticket.query}
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                          }
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>


  );
};

export default TicketPage;
