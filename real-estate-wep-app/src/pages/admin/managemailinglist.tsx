import { useEffect, useState } from "react";
import { IMailingList } from "../../models/interfaces/IMailingList";
import { fetchMailingListAction } from "../../services/dbservices/admin/mailing-list/fetchMailingList";
import { copyToClipboard } from "../../services/Util/CopyText";
import { updateMailingListItemStatus } from "../../services/dbservices/admin/mailing-list/updateMailingListItemStatus";
import { dateToWords } from "../../services/Util/ConvertDateToWords";
import { reomoveFromMailingListAction } from "../../services/dbservices/admin/mailing-list/removeFromMailingList";

const ManageMailingListPage: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [loadingIndex, setLoadingIndex] = useState(0);
  const [mailingList, setMailingList] = useState<IMailingList[]>([]);
  const [searchKeyword, setSearchKeyword] = useState(String);

  useEffect(() => {
    getMailingList();
  }, [searchKeyword]);

  const getMailingList = async () => {
    setLoading(true);
    await refreshPage();
    setLoading(false);
  };

  const deleteMailingList = async (id: number) => {
    setLoadingIndex(id);
    await reomoveFromMailingListAction(id);
    await refreshPage();
    setLoadingIndex(0);
  };

  const updateListItemStatus = async (id: number, status: string) => {
    setLoadingIndex(id);
    await updateMailingListItemStatus(id, status);
    await refreshPage();
    setLoadingIndex(0);
  };

  const refreshPage = async () => {
    const fetchedData = await fetchMailingListAction(searchKeyword);
    setMailingList(fetchedData);
  };

  return (
    <>
      <div className="row">
        <div className="col-lg-12">
          <div className="card" id="invoiceList">
            <div className="card-header border-0 d-flex align-items-center">
              <h5 className="card-title mb-0 flex-grow-1">
                Manage Mailing List
              </h5>
            </div>

            {/* Search Input */}
            <div className="card-body p-0 border-bottom border-bottom-dashed">
              <div className="search-box">
                <input
                  type="text"
                  className="form-control search border-0 py-3"
                  placeholder="Search for users..."
                  value={searchKeyword}
                  onChange={(e) => setSearchKeyword(e.target.value)}
                />
                <i className="ri-search-line search-icon"></i>
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
                ) : mailingList.length === 0 ? (
                  <div className="noresult text-center">
                    <h5 className="mt-2">Sorry! No Result Found</h5>
                    <p className="text-muted mb-0">
                      We've searched more than 150+ results but found none from
                      your search.
                    </p>
                  </div>
                ) : (
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Full Name</th>
                        <th>Email</th>
                        <th>Status</th>
                        <th>Date</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody className="mb-5">
                      {mailingList.map((mailingListItem, index) => (
                        <tr key={mailingListItem.id}>
                          <td>{index + 1}.</td>
                          <td>{mailingListItem.name}</td>
                          <td>{mailingListItem.email}</td>
                          <td>
                            <span
                              className={
                                mailingListItem.status == "extracted"
                                  ? "badge badge-soft-success"
                                  : "badge badge-soft-danger"
                              }
                            >
                              {mailingListItem.status}
                            </span>
                          </td>
                          <td>
                            <b>Added on: </b>
                            {dateToWords(mailingListItem.created_on ?? "")}
                            <br />
                            <b>Last Updated: </b>
                            {dateToWords(mailingListItem.updated_on ?? "")}
                          </td>
                          <td>
                            {loadingIndex == mailingListItem.id ? (
                              <div
                                className="spinner-border text-dark"
                                role="status"
                              >
                                <span className="sr-only">Loading...</span>
                              </div>
                            ) : (
                              <div className="dropdown">
                                <button
                                  className="btn btn-sm btn-outline-dark dropdown-toggle"
                                  type="button"
                                  data-bs-toggle="dropdown"
                                >
                                  Actions
                                </button>
                                <ul className="dropdown-menu">
                                  <li>
                                    <a
                                      className="dropdown-item"
                                      href="#"
                                      onClick={() =>
                                        copyToClipboard(
                                          mailingListItem.email ?? "",
                                          "Email Address"
                                        )
                                      }
                                    >
                                      Copy Email
                                    </a>
                                  </li>
                                  {mailingListItem.status !== "extracted" && (
                                    <li>
                                      <a
                                        className="dropdown-item"
                                        href="#"
                                        onClick={() =>
                                          updateListItemStatus(
                                            mailingListItem.id,
                                            "extracted"
                                          )
                                        }
                                      >
                                        Set As Extracted
                                      </a>
                                    </li>
                                  )}

                                  {mailingListItem.status !== "pending" && (
                                    <li>
                                      <a
                                        className="dropdown-item"
                                        href="#"
                                        onClick={() =>
                                          updateListItemStatus(
                                            mailingListItem.id,
                                            "pending"
                                          )
                                        }
                                      >
                                        Set As Pending Extraction
                                      </a>
                                    </li>
                                  )}

                                  <li>
                                    <a
                                      className="dropdown-item"
                                      href="#"
                                      onClick={() =>
                                        deleteMailingList(mailingListItem.id)
                                      }
                                    >
                                      Remove From Mailing List
                                    </a>
                                  </li>
                                </ul>
                              </div>
                            )}
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
    </>
  );
};

export default ManageMailingListPage;
