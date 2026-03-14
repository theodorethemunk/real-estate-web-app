import { useEffect, useState } from "react";
import { IUserProfile } from "../../models/interfaces/IUserProfile";
import { fetchUsers } from "../../services/dbservices/admin/users/fetchUsers";
import { dateToWords } from "../../services/Util/ConvertDateToWords";
import { blockUserAction } from "../../services/dbservices/admin/users/blockUser";
import { activateUserAction } from "../../services/dbservices/admin/users/activateUser";
import { suspendUserAction } from "../../services/dbservices/admin/users/suspendUser";
import { copyToClipboard } from "../../services/Util/CopyText";

const UsersPage: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [loadingIndex, setLoadingIndex] = useState<number>(0);
  const [users, setUsers] = useState<IUserProfile[]>([]);
  const [searchKeyword, setSearchKeyword] = useState<string>("");

  useEffect(() => {
    getUsers();
  }, [searchKeyword]); // Re-fetch users when searchKeyword changes

  const getUsers = async () => {
    setLoading(true);
    await refreshPage();
    setLoading(false);
  };

  const blockUser = async (userId: number) => {
    setLoadingIndex(userId);
    await blockUserAction(userId);
    refreshPage();
  };

  const restoreUser = async (userId: number) => {
    setLoadingIndex(userId);
    await activateUserAction(userId);
    refreshPage();
  };

  const suspendUser = async (userId: number) => {
    setLoadingIndex(userId);
    await suspendUserAction(userId);
    refreshPage();
  };

  const refreshPage = async () => {
    const fetchedData = await fetchUsers(searchKeyword);
    setUsers(fetchedData);
    setLoadingIndex(0);
  }

  return (
    <div className="row">
      <div className="col-lg-12">
        <div className="card" id="invoiceList">
          <div className="card-header border-0 d-flex align-items-center">
            <h5 className="card-title mb-0 flex-grow-1">Manage Users</h5>
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
              ) : users.length === 0 ? (
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
                      <th>ID</th>
                      <th>Name</th>
                      <th>Date Of Birth</th>
                      <th>Contact</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody className="mb-5">
                    {users.map((user, index) => (
                      <tr key={user.id}>
                        <td>{index + 1}.</td>
                        <td>
                          <div className="d-flex gap-2 align-items-center">
                            <div className="flex-shrink-0">
                              <img
                                src={user.profile_image_path?.startsWith("/uploads/users")
                                  ? `https://sommyprop-001-site2.otempurl.com${user.profile_image_path}`
                                  : user.profile_image_path}
                                alt=""
                                className="avatar-xs rounded-circle"
                              />
                            </div>
                            <div className="flex-grow-1">
                              {user.gender == "m" ? "Mr" : "Ms"} {user.last_name} {user.first_name} {user.middle_name}
                              <br />
                              {user.company_name}
                            </div>
                          </div>
                        </td>
                        <td>
                          {dateToWords(user.dob ?? "")}
                        </td>
                        <td>{user.email}<br />{user.country_code} {user.phone}</td>
                        <td>
                          <span className={user.status == "active" ? "badge badge-soft-success" : user.status == "suspended" ? "badge badge-soft-warning" : "badge badge-soft-danger"}>{user.status?.toUpperCase()}</span>
                          <br />
                          Reg-Date: {dateToWords(user.created_on ?? "")}
                        </td>
                        <td>
                          {
                            loadingIndex == user.id
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
                                    <a className="dropdown-item" href="#" onClick={() => copyToClipboard(user.email ?? "", "Email Address")}>
                                      Copy Email
                                    </a>
                                  </li>
                                  <li>
                                    <a
                                      className="dropdown-item"
                                      href="#"
                                      onClick={() => copyToClipboard(`${user.country_code ?? ""}${user.phone ?? ""}`, "Phone Number")}
                                    >
                                      Copy Phone Number
                                    </a>
                                  </li>

                                  <li>
                                    <a className="dropdown-item" href="#" onClick={() => restoreUser(user.id)}>
                                      Restore User
                                    </a>
                                  </li>
                                  <li>
                                    <a className="dropdown-item" href="#" onClick={() => blockUser(user.id)}>
                                      Block User
                                    </a>
                                  </li>
                                  <li>
                                    <a className="dropdown-item" href="#" onClick={() => suspendUser(user.id)}>
                                      Suspend User
                                    </a>
                                  </li>
                                </ul>
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

export default UsersPage;
